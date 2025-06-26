const { isLoggedIn, isAuthor } = require("../middleware");
const express = require("express");
const router = express.Router({ mergeParams: true });
const { reviewSchema } = require("../schema.js");
const wrapAsync = require("../utils/wrapAsync");
const ExpressError = require("../utils/ExpressError");
const reviewController = require("../Controllers/reviews");
const Review = require("../models/reviews"); 

router.get("/account/reviews", isLoggedIn, wrapAsync(async (req, res) => {
  const reviews = await Review.find({ author: req.user._id }).populate("listing");
  res.render("account/reviews", { reviews });
}));

const validateReview = (req, res, next) => {
  let { error } = reviewSchema.validate(req.body);
  if (error) {
    let errMsg = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errMsg);
  } else {
    next();
  }
};

// Reviews POST route
router.post("/", validateReview, isLoggedIn, wrapAsync(reviewController.createReview));


// Delete review route
router.delete("/:reviewId", isLoggedIn, isAuthor, wrapAsync(reviewController.deleteReview));

module.exports = router;
