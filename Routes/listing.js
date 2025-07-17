const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync");
const {isLoggedIn, isOwner,validateListing} = require("../middleware");
const listingController = require("../Controllers/listings");
const multer = require("multer");
const {storage} = require("../cloudConfig");
const upload = multer({storage});
const Listing = require("../models/listing"); 


// INDEX - Show all listings
// CREATE - Add new listing
router.route("/")
      .get( wrapAsync(listingController.index))
      .post(isLoggedIn,validateListing,
        upload.single('listing[image][url]'),
      wrapAsync(listingController.createListings));
      
// SEARCH 
router.get("/search", wrapAsync(listingController.search));

router.get("/new",isLoggedIn,listingController.newForm);

// SHOW - Show one listing
// UPDATE - Update listing
// DELETE - Delete listing
router.route("/:id")
      .get( wrapAsync(listingController.showListings))
      .put( upload.single('listing[image][url]'),isLoggedIn,isOwner,
        validateListing,
        wrapAsync(listingController.updateListings))
      .delete( isLoggedIn,isOwner,
        wrapAsync(listingController.delteListing));

// EDIT - Show edit form
router.get("/:id/edit",isLoggedIn, isOwner,
  wrapAsync(listingController.editForm));

  router.post("/:id/reserve", isLoggedIn, listingController.reserveListing);
module.exports = router;