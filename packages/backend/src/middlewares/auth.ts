import { RequestHandler } from "express";
import { errorJsonRes } from "../helpers/jsonResponseHelper";
import db from "../loaders/kysle";
import { HttpStatusCode } from "../utils/httpStatusCode";
import jwt, { JwtPayload } from "jsonwebtoken";

export interface AuthPayload extends JwtPayload {
    userId: number;
    username: string;
  }
  
  const authMiddleware: RequestHandler = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
      return errorJsonRes(
        res,
        HttpStatusCode.Unauthorized,
        "Token not found",
      ).send();
    }
    const userToken = jwt.verify(token, process.env.JWT_SECRET as string) as AuthPayload;
    const user = await db.selectFrom("users").selectAll().where("id", "=", userToken.userId).execute();
    if (user[0] === undefined) {
      return errorJsonRes(
        res,
        HttpStatusCode.Unauthorized,
        "User not found",
      ).send();
    }
    res.locals.token = userToken;
  };
  
  export default authMiddleware;