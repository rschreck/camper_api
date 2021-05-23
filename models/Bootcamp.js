const mongoose = require("mongoose");
const { default: slugify } = require("slugify");
const geocoder = require("../utils/geoCoder");
const BootcampSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please add a name"],
    unique: true,
    trim: true,
    maxlength: [50, "Name can not be more than 50 characters"],
  },
  slug: String,
  address: String,
  averageCost: Number,
  description: {
    type: String,
    required: [true, "Please add a description"],
    maxlength: [500, "Description can not be more than 50 characters"],
  },
  website: {
    type: String,
    // match: [
    //   "https?://(www.)?[-a-zA-Z0-9@:%._+~#=]{1,256}.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)",
    //   "Please use a valid URL with Http or Https",
    // ],
  },
  phone: {
    type: String,
    maxlength: [20, "Phone can not be more than 50 characters"],
  },
  email: {
    type: String,
    // match: ["/^[^s@]+@[^s@]+$/", "Please use a valid email"],
  },
  location: {
    type: {
      type: String, // Don't do `{ location: { type: String } }`
      enum: ["Point"], // 'location.type' must be 'Point'
    },
    coordinates: {
      type: [Number],
      index: "2dsphere",
    },
    formattedAddress: String,
    street: String,
    city: String,
    state: String,
    zipcode: String,
    country: String,
    careers: {
      type: [String],
      required: true,
      enum: [
        "Web Development",
        "Project Management",
        "Scrum Master",
        "Business",
        "Other",
      ],
    },
    averageRating: {
      type: Number,
      min: [1, "Rating must be atleast 1"],
      min: [10, "Rating can not be more than 10"],
    },
    averageCost: Number,
    photo: {
      type: String,
      default: "no-photo.jpg",
    },
    housing: {
      type: Boolean,
      default: false,
    },
    jobAssistance: {
      type: Boolean,
      default: false,
    },
    jobGuarantee: {
      type: Boolean,
      default: false,
    },
    acceptGi: {
      type: Boolean,
      default: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    lastUpdatedBy: String,
  },
});
// Create bootamp slug from the name
BootcampSchema.pre("save", async function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});
//Geocode & location fields
BootcampSchema.pre("save", async function (next) {
  const loc = await geocoder.geocode(this.address);
  this.location = {
    type: "Point",
    coordinates: [loc[0].longitude, loc[0].latitude],
    formattedAddress: loc.formattedAddress,
    street: loc.streetName,
    city: loc.city,
    state: loc.stateCode,
    zipcode: loc.zipcode,
    country: loc.countryCode,
  };
  //Now don't save address
  this.address = undefined;
  next();
});
module.exports = mongoose.model("Bootcamp", BootcampSchema);
