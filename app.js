const cookieParser = require("cookie-parser");
const express = require("express");
const app = express();
const path = require("path");
const expressSession = require("express-session");
const flash = require("connect-flash");


require("dotenv").config();
const config = require("./config/mongoose-config");

const ownersRouter = require("./routes/ownersRouter");
const productsRouter = require("./routes/productsRouter");
const usersRouter = require("./routes/usersRouter");
const indexRouter = require("./routes/index");


app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, "public")));
app.use(cookieParser());



app.use(
    expressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET,
    })
);
app.use(flash());

app.set("view engine", "ejs");

app.use("/", indexRouter);
app.use("/owners", ownersRouter);
app.use("/products", productsRouter);
app.use("/users", usersRouter);


app.listen(3000, function(){
    console.log("The Server is running on port 3000");
});