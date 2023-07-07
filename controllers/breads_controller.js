const express = require('express')
const breads = express.Router()

const Bread = require('../models/bread')
const seedData = require('../seeds')


// INDEX /breads/
breads.get('/', (req, res) => {
  Bread.find()
      .then(foundBreads => {
          res.render('index', {
              breads: foundBreads,
              title: 'Index Page'
          })
      })
})

  // NEW
  breads.get('/new', (req, res) => {
    console.log('hello')
    res.render('New')
})


// SHOW 
breads.get('/:id', function(req, res) {
    const id = req.params.id;
    Bread.findById(id)
    .then(foundBread => {
      const bakersName = foundBread.baker;
      Bread.findBakersOtherBreads(bakersName)
      .then((bakersOtherBreads) => {
        console.log({bakersOtherBreads})
        res.render('Show', {
          bread: foundBread,
          bakersOtherBreads
        })
      })
  
    })
    .catch((error) => {
      console.log('Whoops error', error)
      res.render('404')
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
  .catch(error => {
      res.render('New', {
        error
      })
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
  // Bread[req.params.arrayIndex] = req.body

  const id = req.params.id;

  Bread.findByIdAndUpdate(id,  req.body, {new: true})
  .then(foundBread => {
    res.redirect(`/breads/${id}`)
  })
})


  // EDIT
breads.get('/:id/edit', (req, res) => {

  Bread.findById(req.params.id)
  .then(foundBread => {
    res.render('edit', {
      bread: foundBread,
    })
  })
})

// SEED ROUTE

breads.get('/data/seed', (req, res) => {
  Bread.insertMany(seedData).then(() => {
    res.redirect('/breads')
  })
})

breads.get('/data/updatefield', (req, res) => {
  Bread.updateMany({baker: {$exists: false}}, {baker: 'Rachel'})
  .then(() => {
    res.redirect('/breads')
  })
})



  


module.exports = breads