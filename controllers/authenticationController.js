import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/user.js";

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
          .cookie("token", token, {
            httpOnly: true,
            expire: 86400000 + Date.now(),
          })
          .status(200)
          .json({ status: "success", message: "Login successfull." });
      });
    });
  }
}

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
