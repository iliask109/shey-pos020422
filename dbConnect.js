const mongoose = require("mongoose");

const URL =
  "mongodb+srv://ilia109:123456987@cluster0.teb0u.mongodb.net/sheypos";

mongoose.connect(URL);

let connectionObj = mongoose.connection;

connectionObj.on("connected", () => {
  console.log("Mongo db connection Successfully");
});

connectionObj.on("error", () => {
  console.log("Mongo db connection Failed");
});
