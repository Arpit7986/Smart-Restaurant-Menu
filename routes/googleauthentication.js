const express = require('express');
const router = express();
const passport=require('passport');
const Google = require('../controllers/Google');
const GoogleStrategy = require('passport-google-oauth2').Strategy;



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://smart-restaurant-menu.onrender.com/auth/google/callback",
    passReqToCallback: true
},
function(request, accessToken, refreshToken, profile, done) {
    done(null, profile);
}
));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

router.get('/auth/google',
passport.authenticate('google', { scope: ['email', 'profile'] })
);

router.get('/auth/google/callback',
passport.authenticate('google', {
    successRedirect: '/auth/protected',
    failureRedirect: '/auth/google/failure'
})
);

router.get('/auth/protected', isLoggedIn, async (req, res) => {
  try {
    let name = req.user.displayName;
    let email = req.user.email;
    let id = req.user.id;
    await Google.create({ name, email });
    res.redirect('/smartmenu');
  } catch (error) {
    console.error('Error inserting data into MongoDB:', error);
    // Handle the error appropriately, such as sending an error response to the client
    res.status(500).send('Internal Server Error');
  }
});
router.get('/auth/google/failure', (req, res) => {
    res.send('Failure');
});

router.use('/auth/logout',(req,res)=>{
    req.session.destroy()
})

module.exports=router
