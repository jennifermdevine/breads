const express = require('express');
const breads = express.Router();
const Bread = require('../models/bread.js');

//INDEX /breads/

breads.get('/', (req, res) => {
    res.render('index', {
        breads: Bread,
        title: 'Index Page'
    }
    );
})

// SHOW

breads.get('/:arrayIndex', (req, res) => {
    const index = req.params.arrayIndex;
    res.send(Bread[index]);
})



module.exports = breads