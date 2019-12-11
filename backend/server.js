const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()

// import routes

const blogRoutes = require('./routes/blog')
const authRoutes = require('./routes/auth')


const app = express()

mongoose.connect(process.env.DATABASE_LOCAL, {useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false})
.then(()=> console.log("db connected"))

// middleware
app.use(morgan('dev'))
app.use(bodyParser.json())
app.use(cookieParser())

// cors
if(process.env.NODE_env = 'development'){
    app.use(cors({origin: `${process.env.CLIENT_URL}`}))
}


// routes

app.use('/api', blogRoutes)
app.use('/api', authRoutes)


// port 

const port = process.env.PORT || 8000

app.listen(port, () =>{
    console.log(`Server in running on port ${port}`)
})
