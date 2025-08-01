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
// wishlist.js
async function toggleWishlist(listingId, icon) {
  const isWished = icon.classList.contains('fa-solid');
  const url = `/wishlist/${listingId}/${isWished ? 'remove' : 'add'}`;

  try {
    const res = await fetch(url, { method: 'POST' });
    if (res.ok) {
      icon.classList.toggle('fa-solid');
      icon.classList.toggle('fa-regular');
      icon.classList.toggle('text-danger');
    } else {
      alert('Please login or try again.');
    }
  } catch (err) {
    console.error('Error updating wishlist:', err);
  }
}
module.exports = router;
