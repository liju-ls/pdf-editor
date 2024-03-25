import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

// get login data, look for user in
// database, generate token and return token
export async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;

  const accounts = await userModel.find({ email: email });
  if (accounts.length === 0)
    return res
      .status(400)
      .json({ status: "failed", message: "Invalid email." });
  else {
    const hashedPass = accounts[0].password;
    bcrypt.compare(password, hashedPass).then(async (data) => {
      if (!data)
        return res
          .status(400)
          .json({ status: "failed", message: "Invalid password." });

      jwt.sign(email, process.env.JWTSECRET, (err, token) => {
        if (err) return console.log(err);
        res
          .status(200)
          .cookie("token", token, {
            httpOnly: true,
          })
          .json({
            status: "success",
            message: "Login successfull.",
            token: token,
          });
      });
    });
  }
}

// get register user data, check database
// for user and create new user
export async function register(req, res) {
  const email = req.body.email;
  const plainPassword = req.body.password;

  const isMailExist = await userModel.find({ email: email });

  if (isMailExist.length !== 0)
    return res
      .status(401)
      .json({ status: "failed", message: "Email already exist." });
  else
    bcrypt.hash(plainPassword, 8).then(async (hashed) => {
      const userData = new userModel({ email: email, password: hashed });
      await userData.save();
      res
        .status(200)
        .json({ status: "success", message: "Account created succesfully." });
    });
}
