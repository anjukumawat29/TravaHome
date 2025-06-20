const Listing = require("./models/listing");
const Review = require("./models/reviews");
const ExpressError = require("./utils/ExpressError");
const {listingSchema} = require("./schema.js");
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl;
    req.flash("error", "You must be logged in to perform this action.");
    return res.redirect("/login");
  }
  next();
};
//passport will get undefined url cause 
// after login it will be null so save it in locals
module.exports.saveRedirectUrl = (req,res,next)=>{
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
};

module.exports.isOwner = async(req,res,next)=>{
  const { id } = req.params;
  let listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currentUser._id)) {
    req.flash("error","You dont have permission to make any change.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el)=> el.message).join(",")
      throw new ExpressError(400,errMsg);
    }else{
      next();
    }
};


module.exports.isAuthor = async (req, res, next) => {
  const { id, reviewId } = req.params;

  const review = await Review.findById(reviewId);
  if (!review || !review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You don't have permission to delete this review.");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
