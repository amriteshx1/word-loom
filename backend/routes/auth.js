const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/google', (req, res, next) => {
  const isAdmin = req.query.type === 'admin';

  passport.authenticate('google', {
    scope: ['profile', 'email'],
    state: isAdmin ? 'admin' : 'user',
  })(req, res, next);
});

router.get('/google/callback', passport.authenticate('google', { session: false }), (req, res) => {
  const token = req.user.token;
  const isAdmin = req.query.state === 'admin';

  const redirectURL = isAdmin
    ? `${process.env.FRONTEND_URL_ADMIN}/auth/success?token=${token}`
    : `${process.env.FRONTEND_URL_USER}/auth/success?token=${token}`;

  res.redirect(redirectURL);
});

module.exports = router;
