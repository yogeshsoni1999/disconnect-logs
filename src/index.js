// require(dotenv).config({path:"./env"});
import app from "./app.js";
import connectDB from "./db/connection.js";
import dotenv from "dotenv";

dotenv.config({
    path : "./env"
});

connectDB() // call DB connection code here from db folder
.then(()=>{
    app.listen(process.env.PORT || 5000 , ()=>{
        console.log(`App is listen on port ${process.env.PORT}`)
    })
}).catch((err) => {console.log("ERROR IN MONGODB CONNECTION", err)})
