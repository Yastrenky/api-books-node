const express = require('express');
const bodyParser = require('body-parser');
const _ = require('lodash');
const app = express();
const port = 3000;

app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

 var books = [{
     id:"0",
     name:"Iliada",
     author:"Homero",
     theme:"Guerra de Troya",
     characters:[
             "Aquiles",
             "Odiseo",
             "Héctor",
             "Agamenón",
             "Helena",
             "Apolo"],
     gender:[
             "Poesía",
             "Epopeya",
             "épico",
             "Ficció",
             "Fantasy Fiction",
             "Novela de aventuras"
     ],
     url:"http://t1.gstatic.com/images?q=tbn:ANd9GcTBal5uGoiDj2aq6mwRhE2F-GfMHT7DhV8Cor5ILKElaXi_j2Zz"
   }]

 var id = 0;
app.get('/books',(req,res)=>{
  res.json(books);
})
app.get('/books/:id',(req,res)=>{
  let book = _.find(books,{id: req.params.id} );
  res.json(book || {});
})
 app.post('/books', (req, res)=>{
   let book = req.body;
   id++;
   book.id = id+'';
   books.push(book);
   res.json(book);
 })
 app.put('/books/:id', (req, res) => {
     let update = req.body;
     if (update.id) {
         delete update.id;
     }

     let book = _.findIndex(books, {id: req.params.id});
     if (!books[book]) {
         res.send();
     } else {
         let updatedBooks = _.assign(books[book], update);
         res.json(updatedBooks);
     }
 });

 app.delete('/books/:id', (req, res) => {
     let book = _.findIndex(books, {id: req.params.id});

     if (!books[book]) {
         res.send();
     } else {
         let deletedBook = books[book];
         books.splice(book,1);
         res.json(deletedBook);
     }
 });
app.listen(port, ()=>{
  console.log('Listening on http://localhost:',port);
});
