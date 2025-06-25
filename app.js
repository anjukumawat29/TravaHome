//anju_kmwt anju7890
if(process.env.NODE_ENV !="production"){
require("dotenv").config();
}

const express = require("express");
const MongoStore = require('connect-mongo');
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const path = require("path");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const flash = require('connect-flash');
const passport = require("passport");
const localStrategy = require("passport-local");
const User = require("./models/users");

const listingsRouter = require("./Routes/listing.js");
const reviewsRouter = require("./Routes/review.js");
const userRouter = require("./Routes/user.js");

const app = express();

const dbUrl = process.env.ATLAS_URL;

// Connect to DB
async function connectDB() {
  try {
    await mongoose.connect(dbUrl);
    console.log("✅ Connected to DB");
  } catch (err) {
    console.error("❌ DB Connection Error:", err.message);
  }
}
connectDB();

async function main() {
  await mongoose.connect(dbUrl);
}

// App setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "/public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
    crypto : {
      secret:process.env.SECRET,
    },
    touchAfter: 24 *3600,
});

store.on("error",(err)=>{
  console.log("Error In Mongo Session Store",err);
})
const sessionOptions = {
  store,
  secret:process.env.SECRET,
  resave: false,
  saveUninitialized : true,
  cookie:{
    expires: Date.now() + 7*24*60*60*1000,
    maxAge: 7*24*60*60*1000,
    httpOnly:true,
  },
};


app.use(session(sessionOptions));
app.use(flash());



//passport authentication
app.use(passport.initialize());
app.use(passport.session());
passport.use(new localStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currentUser = req.user; 
  next();
});


// Home route
app.get("/", (req, res) => {
  res.render("home");
});


app.use("/listings",listingsRouter);
app.use("/listings/:id/reviews",reviewsRouter);
app.use("/",userRouter)

// Catch undefined routes
app.use((req, res, next) => {
  const err = new ExpressError(404, "Page Not Found!!");
  next(err);
});
// Global error handler
app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("err", { err });
});

// Server listen
app.listen(8080, () => {
  console.log("Server is listening on port 8080");
});
