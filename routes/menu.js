const express=require('express')
const router=express.Router()


function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
}

router.get('/smartmenu',isLoggedIn,(req,res)=>{
    let user=req.user.name.givenName
    console.log(user);
    res.render('index',{user})
})  

router.get('/order', (req, res)=>{
    res.render('payment')
})

router.get('/table',(req,res)=>{
    res.render('tablebook')
})

router.get('/qrcode',(req,res)=>{
    res.render('qrcode')
})

router.get('/additem',(req,res)=>{
    res.render('food')
})

router.get('/fastdelivery',(req,res)=>{
    res.render('fast')
})

router.get('/about',(req,res)=>{
    res.render('about')
})

module.exports=router