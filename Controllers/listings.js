const Listing = require("../models/listing");
const axios = require("axios");

//search controller
module.exports.search = async (req, res) => {
  const { q } = req.query;
  const results = await Listing.find({
    $or: [
      { title: { $regex: q, $options: "i" } },
      { location: { $regex: q, $options: "i" } }
    ]
  });
  res.render("listings/search", { results, query: q });
};

//index
module.exports.index = async (req, res) => {
  const { category } = req.query;
  let allListing;

  if (category) {
    allListing = await Listing.find({ category });
  } else {
    allListing = await Listing.find({});
  }

  res.render("listings/index", { allListing, category });
};

//new form
module.exports.newForm =(req, res) => {
  res.render("listings/new");
};

// create listing
module.exports.createListings = async (req, res) => {
  const maptilerKey = process.env.MAPTILER_API_KEY;
  const { location } = req.body.listing;

  // 🌍 Geocode using MapTiler
  let coordinates = [0, 0]; 
  try {
    const geoRes = await axios.get(`https://api.maptiler.com/geocoding/${location}.json`, {
      params: { key: maptilerKey }
    });
    coordinates = geoRes.data.features[0].center; // [lng, lat]
  } catch (err) {
    console.log("Geocoding failed:", err.message);
    req.flash("error", "Could not get map coordinates.");
  }
  let url = req.file.path;
  let filename = req.file.filename;
  const newListing = new Listing(req.body.listing);
  newListing.owner = req.user._id;
  newListing.image = { url, filename };

  newListing.geometry = {
    type: "Point",
    coordinates: coordinates
  };

  await newListing.save();
  req.flash("success", "New listing created!!");
  res.redirect("/listings");
};


//show listing
module.exports.showListings =async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id)
  .populate({
    path: "reviews",
    populate: {
      path: "author"
    }
  })
  .populate("owner");
if (!listing) {
  req.flash("error", "Listing you requested for does not exist.");
  return res.redirect("/listings");
}
const maptilerKey = process.env.MAPTILER_API_KEY;
res.render("listings/show", { listing,maptilerKey});
};

//edit
module.exports.editForm = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if(!listing){
    req.flash("error","Listing you requested for doesn't exist.");
    return res.redirect("/listings");
  }
  res.render("listings/edit", { listing});
}
//update 
module.exports.updateListings = async (req, res) => {
  const { id } = req.params;

  let listing = await Listing.findByIdAndUpdate(id, req.body.listing, {
    runValidators: true,
    new: true
  });

  // 🌍 Geocode updated location if present
  if (req.body.listing.location) {
    const maptilerKey = process.env.MAPTILER_API_KEY;
    try {
      const geoRes = await axios.get(`https://api.maptiler.com/geocoding/${req.body.listing.location}.json`, {
        params: { key: maptilerKey }
      });
      const coordinates = geoRes.data.features[0].center;
      listing.geometry = {
        type: "Point",
        coordinates: coordinates
      };
    } catch (err) {
      console.log("Geocoding failed:", err.message);
      req.flash("error", "Could not update coordinates for new location.");
    }
  }

  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { url, filename };
  }
  await listing.save();
  req.flash("success", "Listing Updated!");
  res.redirect(`/listings/${id}`);
};

//Delete
module.exports.delteListing = async (req, res) => {
  const { id } = req.params;
  await Listing.findByIdAndDelete(id);
  req.flash("error","Listing Deleted!");
  res.redirect("/listings");
};

module.exports.userListings = async (req, res) => {
  const userListings = await Listing.find({ owner: req.user._id });
  res.render("account/listings", { userListings });
};

module.exports.reserveListing = (req, res) => {
  const { id } = req.params;
  req.flash("success", "Reservation submitted! Check your account for updates.");
  res.redirect(`/listings/${id}`);
};

