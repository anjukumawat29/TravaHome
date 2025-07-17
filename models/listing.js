const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./reviews")
const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  image: {
    url: {
      type: String,
      required: true,
      set: (v) =>
        v === ""
          ? "https://the-manpower.com/wp-content/uploads/2020/12/Dubai-1080x675.jpg"
          : v,
    },
    filename: {
      type: String,
      default: "listingimage",
    },
  },
  location: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
    min: 0,
  },
  description: String,
  country: String,
  reviews:[
    {
      type:Schema.Types.ObjectId,
      ref:"Review"
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  geometry: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true
    }
  },
  category: {
    type: String,
    enum: [
      'hotel', 'price', 'resort', 'arctic', 'villa','room',
      'beach', 'castles', 'heritage', 'trending','rating','boat'
    ],
    required: true
  }
});

listingSchema.post("findOneAndDelete",async(listing)=>{
  if(listing){
    await Review.deleteMany({_id: {$in: listing.reviews}});
  }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
