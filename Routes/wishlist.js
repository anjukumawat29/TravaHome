const express = require("express");
const router = express.Router();
const User = require("../models/users");
const Listing = require("../models/listing");
const { isLoggedIn } = require("../middleware");

// Add to wishlist
router.post("/:listingId/add", isLoggedIn, async (req, res) => {
  const { listingId } = req.params;
  const user = await User.findById(req.user._id);
if (!user.wishlist.some(id => id.toString() === listingId)) {
  user.wishlist.push(listingId);
  await user.save();
}

  res.status(200).json({ success: true });
});

// Remove from wishlist
router.post("/:listingId/remove", isLoggedIn, async (req, res) => {
  const { listingId } = req.params;
  const user = await User.findById(req.user._id);

  user.wishlist = user.wishlist.filter(id => id.toString() !== listingId);
  await user.save();

  res.status(200).json({ success: true });
});

// Wishlist Page
router.get("/", isLoggedIn, async (req, res) => {
  const user = await User.findById(req.user._id).populate("wishlist");
  const listings = user.wishlist;
  res.render("account/wishlist", { listings, currentUser: req.user });
});

module.exports = router;
