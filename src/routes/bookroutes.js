const express = require('express');
const booksrouter = express.Router();
const bookdata = require('../model/bookdata');
function router(nav){
    // var books = [
    //     {
    //         title: "Tom & Jerry",
    //         author: "Joseph barbera",
    //         genre: "Cartoon",
    //         img: "Tom.jpg"
    //     },
    //     {
    //         title: "Harry potter",
    //         author: "J K Rowling",
    //         genre: "Fantacy",
    //         img: "harry.jpg"
    //     },
    //     {
    //         title: "Pathummayude Aadu",
    //         author: "Basheer",
    //         genre: "Drama",
    //         img: "pathu.jpg"
    //     }
    // ];
    booksrouter.get('/', function(req, res){
        bookdata.find()
        .then((books)=> {
            res.render('books',
            {
                nav,
                title: 'ShiLib: The LIbrary',
                books
            });
        });
        
    });
    booksrouter.get('/:id', function(req, res){
        var id = req.params.id;
        bookdata.findOne({_id : id})
        .then( (book)=> {
            res.render('book',
            {
                nav,
                title: 'ShiLib: The Library',
                book
            });
        });
        // book = books[id];
        
    });
    return booksrouter;
}


module.exports = router;
