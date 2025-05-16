const express   = require('express');
const router    = express.Router();
const { getComments, createComment, deleteComment, updateComment } = require('../controllers/commentController');

router.get('/:postId', getComments);   
router.post('/create', createComment);
router.delete('/:id', deleteComment);
router.put('/:id', updateComment);

module.exports = router;