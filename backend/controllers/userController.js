require('dotenv').config();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const jwt = require('jsonwebtoken');

//validate user
const validateUser = [
    body("username").trim().notEmpty()
       .isAlphanumeric().withMessage(`Username ${alphaErr}`)
       .isLength({ min: 1, max: 10 }).withMessage(`Username ${lengthErr}`),
    body("email").trim().notEmpty()
       .isEmail().normalizeEmail().withMessage('Enter a valid email'),
    body("password").trim().notEmpty()
       .isStrongPassword({
           minLength: 8,
           minUppercase: 1,
           minLowercase: 1,
           minNumbers: 1,
           minSymbols: 1
        })
    .withMessage('Password must be at least 8 characters long and include uppercase, lowercase, numbers, and special characters'),
    body('confirmPassword')
      .custom((value, { req }) => value === req.body.password)
      .withMessage('Passwords do not match'),
];

//Register user
exports.postRegister = [
    validateUser,
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array() });
          }

        try{
        const user = await prisma.user.create({
            data: {
              username: req.body.username,
              email: req.body.email,
              password: await bcrypt.hash(req.body.password, 10),
            }
          });

          res.status(201).json({ message: "User registered", user });
        } catch (err){
            res.status(400).json({ error: error.message });
        }
    }
];

// Login user
exports.postLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) return res.status(401).json({ error: "Invalid credentials" });
  
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return res.status(401).json({ error: "Invalid credentials" });
  
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
  
      res.json({ message: "Login successful", token });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

// Get user by ID
exports.getUser = async (req, res) => {
    try {
      const { id } = req.params;
      const user = await prisma.user.findUnique({
        where: { id: parseInt(id) },
        select: {
          id: true,
          username: true,
          email: true,
          createdAt: true,
          posts: true,
          comments: true
        }
      });
  
      if (!user) return res.status(404).json({ error: "User not found" });
  
      res.json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};