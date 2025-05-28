const express   = require('express');
const router    = express.Router();
const { getLikes, createLike } = require('../controllers/likeController');

router.get('/:post_id', getLikes);
router.post('/create', createLike);

module.exports = router;