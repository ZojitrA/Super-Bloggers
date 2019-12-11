const User = require('../models/user')
const shortId = require('shortId')
const jwt = require('jsonwebtoken')
const expressJwt =require('express-jwt')
exports.signup = (req, res) =>{
    User.findOne({email: req.body.email}).exec((err, user)=>{
        if(user){
            return res.status(400).json({
                error: 'Already an account with that email'
            })
        }

        const {name, email, password} = req.body
        let username = shortId.generate()
        let profile = `${process.env.CLIENT_URL}/profile/${username}`

        let newUser = new User({name, email, password, profile, username})
        newUser.save((err, success)=>{
            if(err){
                return res.status(400).json({
                    error: err
                })
            }
            res.json({
                message: "Signup success!"
            })
        })
    })
}
exports.signin = (req, res) =>{
   const{email, password} = req.body
   User.findOne({email}).exec((err, user) =>{
       if(err || !user){
           return res.status(400).json({
               error: "User not found. Try again later maybe."
           })
       }
       if(!user.authenticate(password)){
           return res.status(400).json({
               error: "Email and password do not match."
           })
       }

   })
}