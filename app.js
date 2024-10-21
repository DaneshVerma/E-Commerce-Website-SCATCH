const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const path = require("path");
const db = require("./config/mongoose-connection");
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const ownerRoute = require("./routes/ownerRoute");
const index = require('./routes/index')
require('dotenv').config();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");


app.use("/", index)
app.use("/owners", ownerRoute);
app.use("/products", productRoute);
app.use("/users", userRoute);

app.listen(3000);
