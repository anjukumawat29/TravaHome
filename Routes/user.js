const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../Controllers/users")
const { isLoggedIn } = require("../middleware");
const Listing = require("../models/listing");
const Review = require("../models/reviews"); 

//signup routes
router.route("/signup")
    .get(userController.signUpForm)
    .post(wrapAsync(userController.signUp));

//login routes
router.route("/login")
    .get(userController.loginForm)
    .post(saveRedirectUrl,
    passport.authenticate("local",{
        failureRedirect: '/login',
        failureFlash:true}
    ),
    wrapAsync(userController.login));

router.get("/logout",userController.logout);


router.get("/account/listings", isLoggedIn, wrapAsync(async (req, res) => {
  const userListings = await Listing.find({ owner: req.user._id });
  res.render("account/listings", { userListings });
}));

router.get("/account/reviews", isLoggedIn, wrapAsync(async (req, res) => {
  const reviews = await Review.find({ author: req.user._id }).populate("listing");
  res.render("account/reviews", { reviews });
}));


module.exports = router;