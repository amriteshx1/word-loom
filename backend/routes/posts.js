const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { authorizePostOwner } = require('../middlewares/authorize');
const { authorizeCommentOwner } = require('../middlewares/authorize');

router.get('/', authenticateToken, postController.getAllPosts);
router.get('/:id', authenticateToken, postController.getPostbyId);
router.post('/', authenticateToken, postController.createPost);
router.put('/:id', authenticateToken, authorizePostOwner, postController.updatePost);
router.delete("/:id", authenticateToken, authorizePostOwner, postController.deletePost);
router.patch('/:id/publish', authenticateToken, postController.publishPost);

router.get('/:postId/comments', commentController.getAllComments);
router.post('/:postId/comments', authenticateToken, commentController.addComment);
router.put('/:postId/comments/:id', authenticateToken, authorizeCommentOwner, commentController.editComment);
router.delete("/:postId/comments/:id", authenticateToken, authorizeCommentOwner, commentController.deleteComment);


module.exports = router;