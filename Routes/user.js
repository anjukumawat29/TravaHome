const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware");
const userController = require("../Controllers/users")

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

module.exports = router;