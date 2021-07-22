const express = require("express");
const path = require("path");
const app = express();
require("./db/db");
const router = require("./router");
const port = process.env.PORT || 8000;

// middleware link setup
app.use("/css", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/css")));
app.use("/js", express.static(path.join(__dirname, "../node_modules/bootstrap/dist/js")));
app.use("/jq", express.static(path.join(__dirname, "../node_modules/jquery/dist")));
const staticPath = path.join(__dirname, "../public");
const templatesPath = path.join(__dirname, "../templates/views");

// middleware
app.use(express.static(staticPath));
app.use(router);
app.set("view engine", "ejs");
app.set("views", templatesPath);



// app listening
app.listen(port , ()=> console.log(`express server port is ${port}!`))