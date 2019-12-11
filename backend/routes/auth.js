const express = require('express')
const router = express.Router()
const {time} = require('../controllers/blog')
const {signup} = require('../controllers/auth')

// validators
const {userSignupValidator, userSigninValidator} = require('../validators/auth')
const {runValidation} = require('../validators')


router.post('/signup', userSignupValidator, runValidation, signup);
router.post('/signin', userSigninValidator, runValidation, signin);


module.exports = router