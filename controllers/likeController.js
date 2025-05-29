const Like = require('../models/Like');
const Post = require('../models/Post');

const getLikes = async (req, res) => {
  try {
    const { post_id } = req.params;
    const likes = await Like.find({post_id}).countDocuments();
    res.status(200).json(likes);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}   

const createLike = async (req, res) => {
    try {
        const { post_id, user_id } = req.body;
        const existingLike = await Like.findOne({ post_id, user_id });

        if (existingLike) {
            // Remove like
            await Like.findOneAndDelete({ post_id, user_id });

            // Update like count
            const updatedCount = await Like.countDocuments({ post_id });
            await Post.findByIdAndUpdate(post_id, { likes: updatedCount });

            res.status(200).json({ message: 'Like removed' });
        } else {
            // Add like
            const newLike = new Like({ post_id, user_id });
            await newLike.save();

            // Update like count
            const updatedCount = await Like.countDocuments({ post_id });
            await Post.findByIdAndUpdate(post_id, { likes: updatedCount });

            res.status(201).json({ message: 'Like added' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = { getLikes, createLike };