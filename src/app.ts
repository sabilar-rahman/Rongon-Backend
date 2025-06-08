import express, { Application, Request, Response } from "express";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorhandelers";
import notFound from "./app/middlewares/notfound";
import cookieParser from "cookie-parser";
import cors from "cors";

// const app = express();

const app: Application = express();

// "https://turbo-shine-client-frontend.vercel.app",
// "https://turbo-shine-server-backend.vercel.app",
// "https://turboshine.netlify.app",
app.use(
  cors({
    origin: [
      "https://turbo-shine-client-frontend.vercel.app",
      "http://localhost:5173",
    ],
    credentials: true,
    // Allow cookies, authorization headers with the same origin, and credentials
  })
);

// Add body-parser middleware to handle JSON request bodies
app.use(express.json()); // This will parse incoming JSON requests
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
  res.send("Hello!, This is Turbo Shine Backend washing system.");
});

// application routes
app.use("/api", router);

app.use(globalErrorHandler);
app.use(notFound);

export default app;
