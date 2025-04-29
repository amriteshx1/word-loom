const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await prisma.post.findMany({
      include: { author: true, comments: true }
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
      include: { author: true, comments: true }
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
    const { title, content, authorId } = req.body;

    const post = await prisma.post.create({
      data: { title, content, authorId }
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
    const { title, content } = req.body;

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { title, content }
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
exports.publishPost = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await prisma.post.update({
      where: { id: parseInt(id) },
      data: { published: true }
    });

    res.json({ message: "Post published", post });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
