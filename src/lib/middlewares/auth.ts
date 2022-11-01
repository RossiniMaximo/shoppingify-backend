import { verifyToken } from "..";

export function authMiddlware(req, res, next) {
  const token = req.headers.authorization.split(" ")[1];
  const verify = verifyToken(token);
  const data = verify;
  const { authId } = req.body;

  if (authId == data) {
    next();
  } else {
    res.send({ error: "Users ids don't match" });
  }
}
