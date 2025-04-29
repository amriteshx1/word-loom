const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all comments for a post
exports.getAllComments = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await prisma.comment.findMany({
        where: { postId: parseInt(postId) },
        select: {
          id: true,
          content: true,
          createdAt: true,
          author: {
            select: {
              id: true,
              username: true,
            }
          }
        }
      });      

    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Add a comment to a post
exports.addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, authorId } = req.body;

    const comment = await prisma.comment.create({
      data: { content, postId: parseInt(postId), authorId }
    });

    res.status(201).json({ message: "Comment added", comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Edit a comment
exports.editComment = async (req, res) => {
  try {
    const { postId, id } = req.params;
    const { content } = req.body;

    const comment = await prisma.comment.update({
      where: { id: parseInt(id) },
      data: { content }
    });

    res.json({ message: "Comment updated", comment });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a comment
exports.deleteComment = async (req, res) => {
  try {
    const { postId, id } = req.params;

    await prisma.comment.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Comment deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
