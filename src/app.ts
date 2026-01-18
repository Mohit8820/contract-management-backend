import express from "express";
import cors from "cors";

import mongoose from "mongoose";

import blueprintRoutes from "./routes/blueprint-routes";
import contractRoutes from "./routes/contract-routes";

// const HttpError = require("./models/http-error");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/blueprints", blueprintRoutes);
app.use("/api/contracts", contractRoutes);

// app.use((error, req, res, next) => {
//   if (res.headerSent) return next(error);
//   res.status(error.code || 500);
//   res.json({ message: error.message || "there was some error" });
// }); //this function will be executed only to requests that have an error attached to it.

const port = process.env.PORT || 4000;
console.log(port);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(port, function () {
      console.log(`server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
