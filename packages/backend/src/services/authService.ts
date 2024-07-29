import {config} from "../loaders/config";
import db from "../loaders/kysle";
import jwt from "jsonwebtoken";

export const AuthService = {
    login: async (username: string, password: string): Promise<false | string> => {
        const res = await db.selectFrom("users")
            .where("username", "=", username)
            .where("password", "=", password)
            .execute();
        if (res.length === 0) {
            return false 
        }
        const token = jwt.sign({ username }, config.auth.secret, { expiresIn: "12h" });
        return token
    }
}