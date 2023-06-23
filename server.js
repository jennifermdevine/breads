const express = require('express');
const morgan = require('morgan');

const app = express();

require('dotenv').config();
const PORT = process.env.PORT;

app.use(morgan('tiny'));

// ROUTES

app.get('/', (req, res) => {
    res.send('Welcome to an Awesome App about Bread!')
})

// BREADS

const breadsController = require('./controllers/breads_controller.js')
app.use('/breads', breadsController)

// LISTEN

app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`)
})