const express=require('express')
const app=express()
const mongoose = require('mongoose');
const LocalStrategy=require('passport-local')
const passport=require('passport')
const passportLocalMongoose = require('passport-local-mongoose');
var session = require('express-session')
const User=require('./controllers/User')
const Razorpay=require('razorpay')
const AuthenticationRoutes=require('./routes/googleauthentication')
const bodyParser = require('body-parser');
const Menu=require('./routes/menu')
const path=require('path')
const Login=require('./routes/login')
const paymentRoute = require('./routes/paymentRoute');
const ejsMate=require('ejs-mate')

app.engine('ejs',ejsMate)


app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());


app.set('views', path.join(__dirname, 'views'));

app.use(express.json())
app.use(passport.initialize())

app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
passport.use(new LocalStrategy(User.authenticate()));

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
   

app.use(AuthenticationRoutes)
app.use(Menu)
app.use(Login)      
app.use('/',paymentRoute)

const port=process.env.PORT || 8000
app.listen(port,()=>{
    console.log(`Server is Connected At Port No ${port}`);
})
