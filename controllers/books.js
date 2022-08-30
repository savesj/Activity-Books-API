const router = require('express').Router()
const db = require('../models')

router.get('/', (req, res) => {
    db.Book.find()
    .then((o) => {
        console.log("book", o);
        res.type('json').status(200).send(o)
    })
    .catch(err => {
      console.log(err) 
      res.type('json').status(400).send(err)
    })
})

router.post('/', (req, res) => {

    console.log(req.body);
    req.body.imageURL = req.body.imageURL || undefined
    console.log(req.body); 
  
    db.Book.create(req.body)
    .then(() => {
        res.redirect('/books')
    })
    .catch(err => {
        console.log(err) 
        res.type('json').status(400).send(err)
    })
  })

router.get('/seed', (req, res) => {
    db.Book.insertMany([{
        "title": "The Shinobi Initiative",
        "description": "The reality-bending adventures of a clandestine service agency in the year 2166",
        "year": 2014,
        "quantity": 10,
        "imageURL": "https://imgur.com/LEqsHy5.jpeg"
      },
      {
        "title": "Tess the Wonder Dog",
        "description": "The tale of a dog who gets super powers",
        "year": 2007,
        "quantity": 3,
        "imageURL": "https://imgur.com/cEJmGKV.jpg"
      },
      {
        "title": "The Annals of Arathrae",
        "description": "This anthology tells the intertwined narratives of six fairy tales.",
        "year": 2016,
        "quantity": 8,
        "imageURL": "https://imgur.com/VGyUtrr.jpeg"
      },
      {
        "title": "W∀RP",
        "description": "A time-space anomaly folds matter from different points in earth's history in on itself, sending six unlikely heroes on a race against time as worlds literally collide.",
        "year": 2010,
        "quantity": 4,
        "imageURL": "https://imgur.com/qYLKtPH.jpeg"
      }])
        .then(res.status(200).json({
            message: 'Seed successful'
        }))
        .catch(res.status(400).json({
            message: 'Seed unsuccessful'
        }))
})

router.delete('/:id', (req, res) => {

    // get the ID 
    const id = req.params.id

    db.Book.findByIdAndDelete(id)
            .then(o => {
                console.log("book", o);
                res.type('json').status(200).send(`deleted - ${id}`)
            }).catch(err => {
                console.log(err) 
                res.type('json').status(400).send(err)
            })
})

router.put('/:id', (req, res) => {
  console.log("***PUT-METHOD***");
    // get the ID   
    const id = req.params.id
    console.log(id); 
    console.log(req.body);
    req.body.imageURL = req.body.imageURL || undefined
    console.log(req.body);    
    db.Book.findByIdAndUpdate(id, req.body).orFail()
        .then(o => {
          console.log("***findByIdAndUpdate-then***");
            console.log("book", o);
          res.redirect(`/books/${id}`);          
        })
        .catch(err => {
            console.log(err) 
            res.type('json').status(400).send(err)
        })
})

router.get('/:id', (req, res) => {
    db.Book.findById(req.params.id)
    .then((o) => {
        console.log("book", o);
        res.type('json').status(200).send(o)
    })
    .catch(err => {
      console.log(err) 
      res.type('json').status(400).send(err)
    })
})



module.exports = router