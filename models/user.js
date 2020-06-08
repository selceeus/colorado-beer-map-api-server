const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        required: true
    },
    profile: {
        type: String,
        required: true
    },
    favorites: {
        type: Array,
        default: false
    },
    social_links: {
        type: Array,
        default: false
    },
    post_id: {
        type: Array,
        default: false
    },
    comment_id: {
        type: Array,
        default: false
    }
}, {
    timestamps: true
});

const User  = mongoose.model('User', userSchema);
module.exports = User;