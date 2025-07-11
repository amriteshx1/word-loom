const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      where: { published: true },
      include: {
        author: true,
        _count: {
            select: { comments: true }
        }
      }
    });
    res.json(posts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get post by ID
exports.getPostbyId = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
      include: {
        author: true,
        comments: true,
        _count: {
          select: { comments: true }
        }
      }
    });
    if (!post) return res.status(404).json({ error: "Post not found" });

    res.json(post);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Create a post
exports.createPost = async (req, res) => {
  try {
    const { title, content, thumbnail, category } = req.body;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    const authorId = decodedToken.id; 

    const post = await prisma.post.create({
      data: { title, content, authorId, thumbnail, category }
    });

    res.status(201).json({ message: "Post created", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update a post
exports.updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, thumbnail, category } = req.body;

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content, thumbnail, category }
    });

    res.json({ message: "Post updated", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a post
exports.deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.post.delete({ where: { id: parseInt(id) } });

    res.json({ message: "Post deleted" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Publish/unpublish a post
exports.togglePublishPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.findUnique({
      where: { id: parseInt(id) },
    });

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const updatedPost = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { published: !post.published },
    });

    res.json({
      message: updatedPost.published ? "Post published" : "Post unpublished",
      post: updatedPost,
    });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// Get posts by logged-in user
exports.getUserPosts = async (req, res) => {
  try {
    const id = parseInt(req.params.id);

    const userPosts = await prisma.post.findMany({
      where: { authorId: id },
      include: { comments: true }
    });

    res.json(userPosts);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//increase blog-post likes
exports.increaseLike = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: {
        likes: { increment: 1 }
      },
    });

    res.status(200).json(post);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error updating likes" });
  }
};