const express = require('express')
const bodyParser = require('body-parser')
const session = require('express-session')
const flash = require('connect-flash')
const path = require('path')

const app = express()
const port = 777

const postController = require('./controllers/post')
const adminController = require('./controllers/admin')

app.set('view engine', 'ejs')

app.use('/public', express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

app.use((req, res, next) => {
    res.locals.admin = req.session.admin
    next()
})

app.get('/public/css/index.css', (req, res) => {
    res.send('/public/css/index.css')
    res.end()
})

app.get('/', postController.index)
app.get('/admin', adminController.adminPage)
app.get('/editor', postController.editor)
app.get('/login', adminController.loginPage)
app.get('/delete/:id', postController.handleDelete)

app.post('/handleAdd', postController.handleAdd)
app.post('/handleLogin', adminController.handleLogin)

app.listen(port, () => {
    console.log('Running')
})