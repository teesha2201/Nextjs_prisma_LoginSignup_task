import express from "express";

const app = express();

app.use("/", (req, res) => {
  return res.send({ message: "Ok" });
});

const PORT = 80;
