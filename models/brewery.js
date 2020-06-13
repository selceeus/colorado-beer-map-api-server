const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const locationSchema = new Schema({
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipcode: {
        type: String,
        required: true
    },
    phone_number: {
        type: Number,
        required: false
    },
    coordinates: {
        type: Array,
        required:false
    }
}, {
    timestamps: true
});

const brewerySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: false
    },
    venue_type: {
        type: String,
        required: false
    },
    location_details: [locationSchema],
    logo_image: {
        type: String,
        required: false
    },
    feature_image: {
        type: String,
        required: false
    },
    slideshow_images: {
        type: Array,
        required: false
    },
    featured: {
        type: Boolean,
        default: false
    },
    website_link: {
        type: String,
        default: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Brewery', brewerySchema);