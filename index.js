const express = require('express')
const dotenv = require('dotenv').config()
const morgan = require('morgan')
const bodyparser = require('body-parser')
const path = require('path')

const connectDB = require('./server/database/conection')

const app = express()

const PORT = process.env.PORT || 8080

//Log request
app.use(morgan('tiny'))

//mongoDB connection
connectDB();

//parse request to body-parser
app.use(bodyparser.urlencoded({ extended: true }))

//set view engine
app.set("view engine","ejs")
// app.set("views",path.resolve(__dirname,"views/ejs"))

//load assets
app.use('/css',express.static(path.resolve(__dirname,"assets/css")))
app.use('/img',express.static(path.resolve(__dirname,"assets/img")))
app.use('/js',express.static(path.resolve(__dirname,"assets/js")))


//Load Routers
app.use('/',require('./server/routes/router'))

app.listen(3000,()=>{
    console.log(`Server is Running at http://localhost:${ PORT}`)
})