const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport = require('passport');
const { PrismaClient } = require('@prisma/client');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const prisma = new PrismaClient();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:3000/api/auth/google/callback"
  },
  async function(accessToken, refreshToken, profile, done) {
    try {
      const email = profile.emails[0].value;
      let user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        const hashedPassword = await bcrypt.hash('google-oauth', 10);
        user = await prisma.user.create({
          data: {
            username: profile.displayName.slice(0, 10).replace(/\s/g, ''),
            email,
            password: hashedPassword,
          }
        });
      }


      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
      return done(null, { user, token });
    } catch (err) {
      return done(err, null);
    }
  }
));
