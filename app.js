const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const expressSession = require('express-session');
const flash = require("connect-flash")

require('dotenv').config();

const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const ownerRoute = require("./routes/ownerRoute");
const index = require('./routes/index')

const db = require("./config/mongoose-connection");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(expressSession({
    resave:false,
    saveUninitialized: false,
    secret: process.env.SESSION_SECRET
}))
app.use(flash())
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.use("/", index)
app.use("/owners", ownerRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);

app.listen(3000);
