'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());
app.use(express.json());
const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})


// routes method

app.get('/books', handleBook);
app.post('/books', creatNewBook);
app.delete('/books/:_id', deleteBook);
app.put('/books/:_id', updatBook);



function handleBook(req, res) {

  bookModel.find({}, (error, data) => {
    if (error) console.log('reading from db ${error}')
    else res.send(data);
  }
  )
}


mongoose.connect('mongodb+srv://qais-alsgher:qais123@cluster0.evdbsxk.mongodb.net/?retryWrites=true&w=majority',
  {
    useUnifiedTopology: true
  });

const bookSchema = new mongoose.Schema({

  title: String,
  description: String,
  status: String

})

const bookModel = mongoose.model('bookModel', bookSchema);

//creat new book from post 
function creatNewBook(req, res) {

  const { newBook } = req.body;
  // console.log(newBook);
  const book = new bookModel(newBook);
  book.save();
  res.status(201).json(book);

}
// delet book form delet method 
function deleteBook(req, res) {
  const bookId = req.params._id;
  bookModel.findByIdAndDelete(bookId).then(record => {
    res.send(record);
  }).catch(error => {
    res.status(500).send(error.message);
  })
}
// update data from put
function updatBook(req, res) {
  const bookId = req.params._id;
  const { dataUpdat } = req.body;

  bookModel.findByIdAndUpdate(bookId, dataUpdat, { new: true }).then(record => {
    res.send(record);
  }).catch(error => {
    res.status(500).send(error.message);
  })
}

// creat books locale
const cleanCode = new bookModel({

  title: 'Clean Code',
  description: 'A Handbook of Agile Software Craftsmanship',
  status: 'good'

});
const codeWhite = new bookModel({

  title: 'Code White',
  description: ' Sounding the Alarm on Violence Against Healthcare Workers',
  status: 'mormal'
});


const secretCode = new bookModel({

  title: 'Secret Code Book',
  description: 'The Secret Code Book is a short introduction to substitution ciphers',
  status: 'good'
});

cleanCode.save();
codeWhite.save();
secretCode.save();

app.listen(PORT, () => console.log(`listening on ${PORT}`));
