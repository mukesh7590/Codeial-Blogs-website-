const mongoose = require("mongoose");

mongoose.connect(
   `mongodb+srv://Admin123456:Admin123456@socialmediacluster.fivuvjj.mongodb.net/Codeial?retryWrites=true&w=majority`
);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to MongoDB"));

db.once("open", function () {
   console.log("connected to the database :: MongoDB");
});

module.exports = db;

// const connectDB = async () => {
//    try {
//       // console.log("dfsfsfs ",process.env.MONGO_URI)
//       const conn = await mongoose.connect(process.env.MONGO_URI);

//       console.log(`                                 MongoDB Connection Established

//       `);
//    } catch (error) {
//       console.log(error);
//       process.exit(1);
//    }
// };
// module.exports = connectDB;
