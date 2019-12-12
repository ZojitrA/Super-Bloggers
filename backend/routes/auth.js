const express = require('express')
const router = express.Router()
const {time} = require('../controllers/blog')
const {signUp, signIn, signOut, requireSignIn} = require('../controllers/auth')

// validators
const {userSignUpValidator, userSignInValidator} = require('../validators/auth')
const {runValidation} = require('../validators')


router.post('/signup', userSignUpValidator, runValidation, signUp);
router.post('/signin', userSignInValidator, runValidation, signIn);
router.get('/signout', signOut)

router.get('/secret', requireSignIn, (req, res)=>{
    res.json({
        message: 'you have access to secret page'
    })
})

module.exports = router