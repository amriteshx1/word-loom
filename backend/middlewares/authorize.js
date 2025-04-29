const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

exports.authorizePostOwner = async (req, res, next) => {
  const postId = parseInt(req.params.id);
  const userId = req.user.id;
  const post = await prisma.post.findUnique({ where: { id: postId } });

  if (!post || post.authorId !== userId) {
    return res.status(403).json({ error: "Not authorized" });
  }

  next();
};

exports.authorizeCommentOwner = async (req, res, next) => {
  const commentId = parseInt(req.params.id);
  const userId = req.user.id;
  const comment = await prisma.comment.findUnique({ where: { id: commentId } });

  if (!comment || comment.authorId !== userId) {
    return res.status(403).json({ error: "Not authorized" });
  }

  next();
};
