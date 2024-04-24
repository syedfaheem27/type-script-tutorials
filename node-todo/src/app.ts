import express, {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import todoRouter from "./routes/todos";

const app = express();

//Body parser
app.use(express.json());

app.use("/todos", todoRouter);

const errHandler: ErrorRequestHandler = (err, req, res, next) => {
  res.status(500).json({
    message: err.message,
  });
};

app.use(errHandler);

const server = app.listen(3000, () => {
  console.log("listening on port 3000...");
});
