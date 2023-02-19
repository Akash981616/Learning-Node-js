const express = require("express");
const color = require("color");
const dotenv = require("dotenv");
const ConnectDb = require("./config/ConnectDb");
dotenv.config();
ConnectDb();
const app = express();
console.log("This is a node jsfdsaf Server");
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
app.get("/", (req, res) => {
  res.json("Hello Akash This HombePage");
});
app.get("/api/:id", (req, res) => {
  res.json(req.params);
});
app.get("/api", (req, res) => {
  //localhost:4000/api?sercch=fdasfsaf&limit=2
  http: res.json(req.query);
});
