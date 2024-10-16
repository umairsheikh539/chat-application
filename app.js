require("dotenv").config();
const express = require("express");
const ConnectDB = require("./db/connectdb");
const app = express();
const cookieparser = require("cookie-parser")
const errorHandler = require("./utils/error")

//import routes
const UserRoutes = require("./routes/Userauth")
const messageRoute = require("./routes/message")
const contactRoute = require("./routes/contactlist")

app.use(express.json());
app.use(cookieparser())

const PORT = process.env.PORT || 5000;
app.get("/", (req, res) => {
    res.send("Yes i am alive");
});

//middleware
app.use("/api/User",UserRoutes);
app.use("/api/messages",messageRoute);
app.use("/api/contactlist",contactRoute);


const start = async () => {
    try{
        // await ConnectDB(process.env.MONGO_URL);
        await ConnectDB(process.env.MONGO_URL);
app.listen( PORT, () =>{
    console.log(`${ PORT} Yes I am connected`)
});
    } catch(error) {
        console.log(error);
    }
};


start();

//error handler

app.use((err, req, res, next) =>{
    const statuscode = err.statuscode || 500
    const message = err.message || "internal server error"

    return res.status(statuscode).json({
        success: false,
        statuscode,
        message,
    })
})

