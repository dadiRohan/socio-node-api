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
            await Like.findOneAndDelete({ post_id, user_id });

            const likesCount = await Like.find({ post_id }).countDocuments();

            Post.findByIdAndUpdate(post_id, { $inc: { likes: -1 } }, { new: true });

            console.log(`Likes count for post ${post_id}: ${likesCount}`);

            res.status(200).json({ message: 'Like removed' });
        }else{
            const newLike = new Like({
                post_id,
                user_id
            });
            const savedLike = await newLike.save();

            const likesCount = await Like.find({ post_id }).countDocuments();

            await Post.findByIdAndUpdate(post_id, { $inc: { likes: 1 } }, { new: true });
            console.log(`Likes count for post ${post_id}: ${likesCount}`);

            res.status(201).json(savedLike);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getLikes, createLike };