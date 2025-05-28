const Like = require('../models/Like');

const getLikes = async (req, res) => {
  try {
    const { post_id } = req.params;
    const likes = await Like.find({post_id});
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
            res.status(200).json({ message: 'Like removed' });
        }else{
            const newLike = new Like({
                post_id,
                user_id
            });
            const savedLike = await newLike.save();
            res.status(201).json(savedLike);
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

module.exports = { getLikes, createLike };