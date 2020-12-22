const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const bodyParser = require("body-parser");
const db = require("./config/database");
const hbs = require("hbs");
const app = express();

// Import routes
const indexRouter = require("./routes/index");
const jobsRouter = require("./routes/jobs");

//Mysql
db.authenticate()
  .then(() => console.log("Database connected.."))
  .catch((error) => console.log(`Error: ${error}`));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

// Set the partials route
hbs.registerPartials(__dirname + "/views/partials", function (err) {});

// Body-parser
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Define routes
app.use("/", indexRouter);
app.use("/jobs", jobsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
