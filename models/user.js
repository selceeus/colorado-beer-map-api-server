const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    user_priv: {
        type: String,
        default: 'user'
    },
    username: {
        type: String,
        required: true
    },
    first_name: {
        type: String,
        default: false
    },
    last_name: {
        type: String,
        default: false
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String,
        default: false
    },
    profile: {
        type: String,
        default: false
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

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);