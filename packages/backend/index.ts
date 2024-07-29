import authRouter from "./src/routes/authRoute";
import examRouter from "./src/routes/examRoute";
import labRouter from "./src/routes/labRoute";
import express from "express";
import {config} from "./src/loaders/config";

const app = express()

app.use(express.json());

app.use("/auth", authRouter);
app.use("/exam", examRouter);
app.use("/lab", labRouter);

app.listen(config.server.port, () => {
    console.log(`Server running on port ${config.server.port}`);
});

