import express from "express";
import cors from "cors";
import morgan from "morgan";

import studentRouter from "./routes/student.mjs";
import enrollmentRouter from "./routes/enrollment.mjs";
import subjectRouter from "./routes/subject.mjs";

const app = express();
const port = 3000;
// middlewares
app.use(cors());
app.use(morgan("tiny"));
app.use(express.json());
// routes
app.use("/students", studentRouter);
app.use("/enrollment", enrollmentRouter);
app.use("/subjects", subjectRouter);

app.listen(port, () => {
  console.log("server listen on port 3000");
});
