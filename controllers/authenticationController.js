import bcrypt from "bcrypt";
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
    bcrypt.compare(password, hashedPass).then((data) => {
      if (data)
        return res
          .status(200)
          .json({ status: "success", message: "Login successfull." });
      else
        return res
          .status(400)
          .json({ status: "failed", message: "Invalid password." });
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
