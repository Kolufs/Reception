import zod from "zod"
import { AuthService } from "../services/authService";
import { RequestHandler } from "express";
import { config } from "../loaders/config";

const loginSchema = zod.object({
    body: zod.object({
        email: zod.string().email(),
        password: zod.string().nonempty(),
    })
});

export const loginController: RequestHandler = async (req, res, next) => {
    try {
        const { email, password } = loginSchema.parse(req.body).body;
        const token = await AuthService.login(email, password);
        if (!token) {
            res.status(401).json({ message: "Invalid credentials" });
            return;
        }
        res.status(200)
            .cookie("token", token, { httpOnly: true, secure: true, sameSite: true, maxAge: config.auth.maxAge})
    } catch (e) {
        next(e);
    }
}