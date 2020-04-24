import express from "express";
import bodyParser from "body-parser";
import connectDB from "../config/database";
import HttpStatusCodes from "http-status-codes";
import user from "./routes/api/user";
import workspace from "./routes/api/workspace";
import cors from 'cors';

const app = express();

// Connect to MongoDB
connectDB();

// Express configuration
app.set("port", process.env.PORT || 5000);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get("/", (_req, res) => {
  res.send("API Running").status(HttpStatusCodes.OK).end();
});

app.use("/api/user", user);
app.use("/api/workspace", workspace);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
