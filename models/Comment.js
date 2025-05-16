const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: { type: String, required: true },
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
    created_by: { type: mongoose.Schema.Types.ObjectId, ref: 'profile' },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
