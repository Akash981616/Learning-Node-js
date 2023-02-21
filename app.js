const express = require("express");
const color = require("color");
const dotenv = require("dotenv");
const ConnectDb = require("./config/ConnectDb");
const userRoutes = require("./routes/userRoutes");

dotenv.config();
ConnectDb();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server Running on ${PORT}`);
});
app.get("/", (req, res) => {
  res.json("Hello Akash This HombePage");
});
app.use("/api/v1/user", userRoutes);
// app.get("/api/:id", (req, res) => {
//   res.json(req.params);
// });
// app.get("/api", (req, res) => {
//   //localhost:4000/api?sercch=fdasfsaf&limit=2
//    res.json(req.query);
// });
