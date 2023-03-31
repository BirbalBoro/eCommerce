const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const { connectDB } = require("./config/db");
const { authRouter } = require("./routes/auth.route");

//configure env
dotenv.config();

//database config
connectDB();

//this is rest object
const app = express();

//middleswares
app.use(morgan('dev'));
app.use(express.json());

//routes
app.use("/api/v1/auth", authRouter);

// this is rest api
app.get("/", (req, res) => {
    res.send({
        message: "Welcome to e-Commerce",
    });
});


//defining PORT
const PORT = process.env.PORT || 8000;


//run listen
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.DEV_MODE} mode on port number ${PORT}`.bgGreen);
});