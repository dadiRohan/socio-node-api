const Post = require('../models/Post');

const getPosts = async (req, res) => {
  try {
    // const posts = (await Post.find()).reverse();

    const posts = await Post.find()
      .populate('created_by','username email')  // This populates the profile details
      .sort({ created_at: -1 });  // Instead of .reverse(), use .sort()

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}   

const createPost = async (req, res) => {
    try {
        const { post, imgPath , created_by } = req.body;
        const newPost = new Post({
        post,
        imgPath,
        created_by,
        created_at  : new Date(),
        updated_at  : new Date(),
        });
        const savedPost = await newPost.save();
        res.status(201).json(savedPost);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
}

const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    await post.remove();
    res.status(200).json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { post, imgPath } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      { post, imgPath },
      { new: true }
    );
    if (!updatedPost) {
      return res.status(404).json({ message: 'Post not found' });
    }
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

module.exports = { getPosts, createPost, deletePost, updatePost };