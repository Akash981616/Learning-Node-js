const mongoose = require("mongoose");
const color = require("color");
const ConnectDb = async () => {
  try {
    await mongoose.set("strictQuery", false);
    const conn = await mongoose.connect("mongodb://localhost:27017/Todo", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Mongo db connected ${conn.connection.host}`);
  } catch (error) {
    console.log(eroor);
  }
};
module.exports = ConnectDb;
