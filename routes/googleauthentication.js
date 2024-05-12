const express = require('express');
const router = express();
const passport=require('passport');
const Google = require('../controllers/Google');
const GoogleStrategy = require('passport-google-oauth2').Strategy;



passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "http://localhost:8080/auth/google/callback",
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

router.get('/auth/protected', isLoggedIn,async (req, res) => {
    let name = req.user.displayName;
    let email=req.user.email
    let id=req.user.id
    let existingUser=await Google.findOne({email})
    if(!existingUser)
    await Google.create({name,email})   
    res.redirect('/smartmenu')
});

router.get('/auth/google/failure', (req, res) => {
    res.send('Failure');
});

router.use('/auth/logout',(req,res)=>{
    req.session.destroy()
})

module.exports=router