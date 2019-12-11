
const mongoose = require('mongoose')
const postSchema = new mongoose.Schema({
    title: {
        type: String,
        index: true
    }
})



module.exports = mongoose.model('Post', postSchema)