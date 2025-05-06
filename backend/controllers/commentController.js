const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

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
    const { content} = req.body;

    // Decode the JWT from the Authorization header
        const token = req.headers.authorization.split(' ')[1]; // Assuming "Bearer <token>"
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET); // Use your JWT secret
        const authorId = decodedToken.id; 

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

//get all comments on posts by specific authors
exports.getAllCommentsByAuthor = async (req, res) => {
  try {
    const { authorId } = req.params;

    const comments = await prisma.comment.findMany({
      where: {
        post: {
          authorId: parseInt(authorId),
        },
      },
      select: {
        id: true,
        content: true,
        postId: true,
        author: { select: { username: true } },
        post: { select: { title: true } },
      },
      orderBy: { createdAt: 'desc' }
    });

    res.json(comments);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
