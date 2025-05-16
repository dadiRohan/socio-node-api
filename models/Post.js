const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post: { type: String, required: true },
    imgPath: { type: String, required: false },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Post = mongoose.model('Post', postSchema);
module.exports = Post;
