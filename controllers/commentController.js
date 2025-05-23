const Comment = require('../models/Comment');

const getComments = async (req, res) => {
    try {
        const { postId } = req.params;
        console.log('postId:', postId);
        if (!postId) {
            return res.status(400).json({ message: 'Post ID is required' });
        }
        // const comments = await (await Comment.find({ postId })).reverse();
        const comments = await Comment.find({ postId })
              .populate('created_by','username email')  // This populates the profile details
              .sort({ created_at: -1 });  // Instead of .reverse(), use .sort()

        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const createComment = async (req, res) => {
    try {
        const { comment, postId , created_by } = req.body;
        const newComment = new Comment({
        comment,
        postId,
        created_by,
        created_at  : new Date(),
        updated_at  : new Date(),
        });
        const savedComment = await newComment.save();
        res.status(201).json(savedComment);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}
const deleteComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    await comment.remove();
    res.status(200).json({ message: 'Comment deleted' });   
    }
    catch (error) {
    res.status(500).json({ message: 'Server error' });
    }
}
const updateComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const { comment } = req.body;
    const updatedComment = await Comment.findByIdAndUpdate(
      commentId,
      { comment },  
        { new: true }
    );
    if (!updatedComment) {
      return res.status(404).json({ message: 'Comment not found' });
    }   
    res.status(200).json(updatedComment);
    }
    catch (error) {
    res.status(500).json({ message: 'Server error' });
    }
}
module.exports = { getComments, createComment , deleteComment , updateComment };