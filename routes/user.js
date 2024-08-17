
const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { sanitizeFilter } = require("mongoose");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.get("/",(req,res)=>{
    res.redirect("/listings")
})

router
 .route("/signup")
 .get(userController.renderSignupForm)
 .post(wrapAsync (userController.signup))





// right now changes
// router.get("/",(req,res)=>{
//     res.redirect("/listings")
// });
// router
//  .route("/signup")
//  .get(userController.renderSignupForm)
//  .post(wrapAsync (userController.signup));
// router.get("/signup",(req,res) =>{
//     let{username,email,password} =req.body;
//     const newUser = new User({email,username});
//     const registeredUser = await.User.register(newUser,password);
//     console.log(registeredUser);
//     req.flash("success","welcome to Wanderlust");
//     res.redirect("/listings");
// })

 router
.route("/login")
.get(userController.renderloginForm)
.post(
    saveRedirectUrl,
    passport.authenticate("local",{
    failureRedirect:'/login', 
    failureFlash: true}),
userController.login
);

router.get("/logout",userController.logout);

module.exports = router;
