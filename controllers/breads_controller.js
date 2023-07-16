const express = require('express')
const breads = express.Router()

const Bread = require('../models/bread')
const Baker = require('../models/baker')
const seedData = require('../seeds')


// INDEX /breads/

breads.get('/', async (req, res) => {
  const foundBakers = await Baker.find().lean()
  const foundBreads = await Bread.find().limit(5).lean().populate('baker')
  console.log(foundBreads)
  res.render('index', {
    breads: foundBreads,
    bakers: foundBakers,
    title: 'Index Page'
  })
})


  // NEW
  breads.get('/new', (req, res) => {
    Baker.find()
      .then(foundBakers => {
          console.log(foundBakers)
          res.render('new', {
              bakers: foundBakers
          })
      })
    console.log('hello')
})


// SHOW 
breads.get('/:id', (req, res) => {
  Bread.findById(req.params.id)
      .populate('baker')
      .then(foundBread => {
        res.render('show', {
            bread: foundBread
        })
      })
      .catch(err => {
        res.send('404')
      })
})


// CREATE
breads.post('/', (req, res) => {
  if(!req.body.image) {
      req.body.image = undefined 
  }

  if(req.body.hasGluten === 'on') {
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }

  Bread.create(req.body)
  .then(() => {
    res.redirect('/breads')
  })
})

  // DELETE
breads.delete('/:id', (req, res) => {
  // Bread.splice(req.params.indexArray, 1)

  Bread.findByIdAndDelete(req.params.id)
  .then(() => {
    res.status(303).redirect('/breads')
  })
})

// UPDATE
breads.put('/:id', (req, res) => {
  if(req.body.hasGluten === 'on'){
    req.body.hasGluten = true
  } else {
    req.body.hasGluten = false
  }
  const id = req.params.id;
  Bread.findByIdAndUpdate(id,  req.body, {new: true})
  .then(foundBread => {
    res.redirect(`/breads/${id}`)
  })
})


  // EDIT
breads.get('/:id/edit', (req, res) => {
  Baker.find()
    .then(foundBakers => {
  Bread.findById(req.params.id)
  .then(foundBread => {
    res.render('edit', {
      bread: foundBread,
      bakers: foundBakers
    })
  })
})
})

breads.get('/data/updatefield', (req, res) => {
  Bread.updateMany({baker: {$exists: false}}, {baker: 'Rachel'})
  .then(() => {
    res.redirect('/breads')
  })
})



module.exports = breads