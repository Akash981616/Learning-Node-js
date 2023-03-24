const mongoose = require("mongoose");
const color = require("color");
const ConnectDb = async () => {
  try {
    await mongoose.set("strictQuery", false);
    const conn = await mongoose.connect(
     "mongodb+srv://Akash:Autviz2022@cluster0.iqd7kzh.mongodb.net/?retryWrites=true&w=majority"
     ,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
    console.log(`Mongo db connected ${conn.connection.host}`);
  } catch (error) {
    console.log(error);
  }
};
module.exports = ConnectDb;
