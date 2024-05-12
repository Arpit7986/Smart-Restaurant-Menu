const express=require('express')
const router=express.Router()
const passport=require('passport')

router.get('/',(req,res)=>{
    res.render('login');
  })

router.get('/login',(req,res)=>{
    res.render('login')
})


  router.get('/register',(req,res)=>{
    res.render('register')
  })
  
  
  router.post('/register',async (req,res)=>{
    let {username,email,password}=req.body
    const user=new User({username,email})
    await User.register(user,password)
    res.redirect('/login')
  })
  
  router.post('/login', 
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
      res.redirect('/smartmenu');
    });
  
    
  
    router.get('/logout', function(req, res, next){
      req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
      });
    });

    module.exports=router