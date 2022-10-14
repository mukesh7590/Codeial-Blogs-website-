const app = require("express")()
const dotenv = require("dotenv");
const connectDB = require("./config/mongoose");

dotenv.config();
connectDB();

app.listen(process.env.PORT, (error) => {
    if (error) {
       console.log("error in the port");
    }
    console.log(
       `     
 
       ******************* HEY! SERVER IS RUNNING on Link :  http://localhost:${process.env.PORT} **********************
       
       `
    );
 });