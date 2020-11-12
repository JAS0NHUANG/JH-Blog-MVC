// npm modules
require('dotenv').config()

const express =     require('express')
const bodyParser =  require('body-parser')
const session =     require('express-session')
const flash =       require('connect-flash')

// global variables
const app =         express()
const port =        777
const routes =      require('./routes')

// set
app.set('view engine', 'ejs')

// use
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(flash())
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
}))
app.use((req, res, next) => {
    res.locals.admin = req.session.admin
    res.locals.errorMessage = req.flash('errorMessage')
    next()
})
app.use(express.static(__dirname + '/public'))
app.use('/', routes)

// Listen
app.listen(port, () => {
    console.log('Running')
    console.log(process.env.SECRET)
})
