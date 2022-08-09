'use strict';

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
app.use(cors());

const PORT = process.env.PORT || 3001;

app.get('/test', (request, response) => {

  response.send('test request received')

})

app.get('/books',handleBook);

function handleBook(req,res){

bookModel.find({},(error,data)=>{
if(error)console.log('reading from db ${error}')
else res.send(data);
}
)
}


mongoose.connect('mongodb://127.0.0.1:27017/catsDB');

const bookSchema= new mongoose.Schema({

  title:String,
  description:String,
  status:String

})

const bookModel=mongoose.model('bookModel',bookSchema);

const cleanCode= new bookModel({

title:'Clean Code',
description:'A Handbook of Agile Software Craftsmanship',
status:'good'

});
const codeWhite= new bookModel({

title:'Code White',
description:' Sounding the Alarm on Violence Against Healthcare Workers',
status:'mormal'
});


const secretCode=new bookModel({

  title:'Secret Code Book',
  description:'The Secret Code Book is a short introduction to substitution ciphers',
  status:'good'
});

cleanCode.save();
codeWhite.save();
secretCode.save();

app.listen(PORT, () => console.log(`listening on ${PORT}`));
