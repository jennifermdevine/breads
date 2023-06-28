// DEPENDENCIES

const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')


require('dotenv').config();
const PORT = process.env.PORT;

const app = express();

app.use(morgan('tiny'));

// MIDDLEWARE

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))
app.set('views', __dirname + '/views')
app.set('view engine', 'jsx')
app.engine('jsx', require('express-react-views').createEngine())
app.use(methodOverride ('_method'))

// ROUTES

app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Bread!')
})

// BREADS

const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// 404 Page

app.get ('*', (req, res) => {
    res.send('404')
})

// LISTEN

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})