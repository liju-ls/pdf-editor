import jwt from "jsonwebtoken";

// verify token is present or not
export function authorization(req, res, next) {
  const subToken = req.cookies.token;

  if (subToken === undefined) {
    req.logged = false;
    return next();
  }

  jwt.verify(subToken, process.env.JWTSECRET, (err, data) => {
    if (err) return console.log(err);

    req.logged = true;
    req.email = data;
    return next();
  });
}
