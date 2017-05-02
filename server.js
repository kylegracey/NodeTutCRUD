const express = require('express');
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient
const app = express();

MongoClient.connect('mongodb://nodetut:cruduser@ds129281.mlab.com:29281/nodetutcrud', (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(3000, () => {
    console.log('listening on 3000')
  })
})

app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')


app.get('/', (req, res) => {
  db.collection('quotes').find().toArray((err, results) => {
    if (err) return console.log(err)
    //renders index.ejs
    res.render('index.ejs', {quotes: results})
  })

})

app.post('/quotes', (req, res) => {
  db.collection('quotes').save(req.body, (err, result) => {
    if (err) return console.log(err)

    console.log('saved to database')
    res.redirect('/')
  })
})
