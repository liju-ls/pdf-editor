import jwt from "jsonwebtoken";

export function authorization(req, res, next) {
  const subToken = req.cookies.token;

  if (subToken === undefined) {
    req.save = false;
    return next();
  }

  jwt.verify(subToken, process.env.JWTSECRET, (err, data) => {
    if (err) return console.log(err);

    req.save = true;
    req.email = data;
    return next();
  });
}
