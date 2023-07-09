// DEPENDENCIES

const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override')
const mongoose = require('mongoose');

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

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => {
        console.log('Connected to MongoDB:', process.env.MONGO_URI)
        // Continue with your application logic here
    })
    .catch((error) => {
    console.error('Error connecting to MongoDB:', error)
})


// ROUTES

app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Bread!')
})

// BREADS

const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// Bakers

const bakersController = require('./controllers/bakers_controller.js')
app.use('/bakers', bakersController)

// 404 Page

app.get ('*', (req, res) => {
    res.send('404')
})

// LISTEN

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})