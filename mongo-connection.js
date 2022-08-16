const mongoose = require("mongoose");

async function main() {
  await mongoose.connect("mongodb://127.0.0.1:27017/deneme", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  });
  console.log("mongodb connected...");
}

main();
