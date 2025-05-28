const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    post_id: { type: String, required: true },
    user_id: { type: String, required: true }
});

const Like = mongoose.model('Like', likeSchema);
module.exports = Like;
