const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
    authorName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    numLikes: {
        type: Number,
    },
    blogNumber: {
        type: String,
    },
    description: {
        type: String,
        required: true

    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

module.exports = mongoose.model("blogs", blogSchema);
