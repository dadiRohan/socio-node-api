const express   = require('express');
const router    = express.Router();
const { getPosts, createPost, deletePost, updatePost } = require('../controllers/postController');

router.get('/', getPosts);
router.post('/create', createPost);
router.delete('/:id', deletePost);
router.put('/:id', updatePost);

module.exports = router;