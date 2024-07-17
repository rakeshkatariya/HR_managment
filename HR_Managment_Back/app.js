var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var cors = require("cors");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const bodyParser = require("body-parser");
const pdf = require("html-pdf");

/** Add APIs Here */
var authentication = require("./api/AuthenticationAPI");
var userProfile = require("./api/UserProfileAPI");
var Attendance = require("./api/AttendanceAPI");
var Holiday = require("./api/HolidayAPI");
var Expenses = require("./api/ExpensesAPI");
var Leave = require("./api/LeaveAPI");
var HiringDetails = require("./api/HiringDetailsAPI");
var CompanyEmployee = require("./api/CompanyEmployeeAPI");
var Event = require("./api/EventAPI");
var OverTime = require("./api/OverTimeAPI");
var TimeSheet = require("./api/TimeSheetAPI");

var app = express();


// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Logger
app.use(logger("dev"));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// CORS setup
app.use(cors({
  origin: ["http://localhost:3000", "http://192.168.1.4:3000", "http://10.107.16.106:3000"],
  credentials: true
}));
// let allowedOrigins = ["http://localhost:3000", "http://192.168.1.7:3000"];
// app.use(function(req, res, next) {
//   var origin = req.headers.origin;
//   if (allowedOrigins.includes(origin)) {
//       res.header("Access-Control-Allow-Origin", origin);
//   }
//   next();
// });

// Routes
app.use("/", indexRouter);
app.use("/users", usersRouter);

/** Add Controllers Here */
app.use("/authentication", authentication);
app.use("/userProfile", userProfile);
app.use("/attendance", Attendance);
app.use("/holiday", Holiday);
app.use("/expenses", Expenses);
app.use("/leave", Leave);
app.use("/hiringDetails", HiringDetails);
app.use("/companyEmployee", CompanyEmployee);
app.use("/event", Event);
app.use("/overTime", OverTime);
app.use("/timeSheet", TimeSheet);

// Static files
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.join(__dirname, "document")));

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


const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
































































































// var createError = require("http-errors");
// var express = require("express");
// var path = require("path");
// var cookieParser = require("cookie-parser");
// var logger = require("morgan");
// var cors = require("cors");
// var indexRouter = require("./routes/index");
// var usersRouter = require("./routes/users");
// const bodyParser = require("body-parser");
// const pdf = require("html-pdf");

// /** Add APIs Here */
// var authentication = require("./api/AuthenticationAPI");
// var userProfile = require("./api/UserProfileAPI");
// var Attendance = require("./api/AttendanceAPI");
// var Holiday = require("./api/HolidayAPI");
// var Expenses = require("./api/ExpensesAPI");
// var Leave = require("./api/LeaveAPI");
// var HiringDetails = require("./api/HiringDetailsAPI");
// var CompanyEmployee = require("./api/CompanyEmployeeAPI");
// var Event = require("./api/EventAPI");
// var OverTime = require("./api/OverTimeAPI");

// var app = express();
// MySQL = require("./MySqlConnect");

// app.use(
//   cors({
//     origin: ["http://localhost:3000", "http://192.168.1.7:3000"],
//   })
// );

// // view engine setup
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");

// app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Headers", "Content-type,Authorization");
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST");
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   next();
// });

// // app.use(cors());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// app.use(logger("dev"));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "document")));
// // app.use(bodyParser.json({ limit: '10mb' }));
// // app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// app.use("/", indexRouter);
// app.use("/users", usersRouter);

// /** Add Controllers Here */
// app.use("/authentication", authentication);
// app.use("/userProfile", userProfile);
// app.use("/attendance", Attendance);
// app.use("/holiday", Holiday);
// app.use("/expenses", Expenses);
// app.use("/leave", Leave);
// app.use("/hiringDetails", HiringDetails);
// app.use("/companyEmployee", CompanyEmployee);
// app.use("/event", Event);
// app.use("/overTime", OverTime);

// // catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function (err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get("env") === "development" ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render("error");
// });

// module.exports = app;


