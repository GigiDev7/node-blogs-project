const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoose = require("mongoose");

dotenv.config({ path: "./config.env" });

const blogRouter = require("./routes/blogRoutes");

// express app
const app = express();

//connect to Mongo
const dbURI = process.env.DB_KEY;
const port = process.env.PORT || 8000;

mongoose
  .connect(dbURI)
  .then((res) => {
    console.log("Connected to DB");
    app.listen(port);
  })
  .catch((err) => {
    console.log(err);
  });

//register view engine ejs
app.set("view engine", "ejs");

//middleware for static files
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

//routes
app.get("/", (req, res) => {
  res.redirect("/blogs");
});

app.get("/about", (req, res) => {
  res.render("about", { title: "About" });
});

//blog routes
app.use("/blogs", blogRouter);

//404 page
app.use((req, res) => {
  res.status(404).render("404", { title: "404" });
});
