const User = require('../models/user')
const shortId = require('shortId')
const jwt = require('jsonwebtoken')
const expressJwt =require('express-jwt')


exports.signUp = (req, res) =>{
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

exports.signIn = (req, res) =>{
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
       const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: '1d'})

       res.cookie('token', token, {expiresIn: '1d'})

       const {_id, username, name, email, role} = user
       return res.json({
           token,
           user: {_id, username, name, email, role}
       })

   })
}

exports.signOut = (req, res, next)=>{
    res.clearCookie('token')
    res.json({
        message: 'Signed out'
    })
}

exports.requireSignIn = expressJwt({
    secret: process.env.JWT_SECRET
})