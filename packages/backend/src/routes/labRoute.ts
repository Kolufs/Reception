import { addLabController, getLabByNameController, getLabsController, getLabsPaginatedController, removeLabController, updateLabController, addExamToLabController, updateLabExamController, removeExamFromLabController, getLabController, getLabExamsController } from "../controllers/labController";
import { Router } from "express";
import authMiddleware from "../middlewares/auth";

const labRouter = Router();

labRouter.use(authMiddleware);

labRouter.get("/:labId", getLabController);
labRouter.get("/", getLabsController);
labRouter.get("/paginated", getLabsPaginatedController);
labRouter.get("/byname/:name", getLabByNameController);
labRouter.post("/", addLabController);
labRouter.delete("/:labId", removeLabController);
labRouter.put("/:labId", updateLabController);

labRouter.get("/:labId/exams", getLabExamsController);
labRouter.post("/:labId/exams", addExamToLabController);
labRouter.put("/:labId/exams/:examId", updateLabExamController);
labRouter.delete("/:labId/exams/:examId", removeExamFromLabController);

export default labRouter;