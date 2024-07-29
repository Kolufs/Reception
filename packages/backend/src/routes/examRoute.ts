import {
    getExamController, addExamController, removeExamController, updateExamController, getExamsController, getExamsPaginatedController
} from "../controllers/examController"
import { Router } from "express";
import authMiddleware from "../middlewares/auth";

const examRouter = Router();

examRouter.use(authMiddleware);

examRouter.post("/exams", addExamController);
examRouter.delete("/exams/:examId", removeExamController);
examRouter.put("/exams/:examId", updateExamController);

examRouter.get("/exams/:examId", getExamsController);
examRouter.get("/exams/examId", getExamsPaginatedController);

export default examRouter