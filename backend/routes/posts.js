const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController')

router.get('/', postController.getAllPosts);
router.get('/:id', postController.getPostbyId);
router.post('/', postController.createPost);
router.put('/:id', postController.updatePost);
router.delete("/:id", postController.deletePost);
router.patch('/:id/publish', postController.publishPost);

router.get('/:postId/comments', commentController.getAllComments);
router.post('/:postId/comments', commentController.addComment);
router.put('/:postId/comments/:id', commentController.editComment);
router.delete("/:postId/comments/:id", commentController.deleteComment);


module.exports = router;