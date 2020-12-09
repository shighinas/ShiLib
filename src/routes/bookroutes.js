const express = require('express');
const booksrouter = express.Router();
function router(nav){
    var books = [
        {
            title: "Tom & Jerry",
            author: "Joseph barbera",
            genre: "Cartoon",
            img: "Tom.jpg"
        },
        {
            title: "Harry potter",
            author: "J K Rowling",
            genre: "Fantacy",
            img: "harry.jpg"
        },
        {
            title: "Pathummayude Aadu",
            author: "Basheer",
            genre: "Drama",
            img: "pathu.jpg"
        }
    ];
    nav[2] = {link: '/books/new', name: 'Add new Book'};
    booksrouter.get('/', function(req, res){
        res.render('books',
            {
                nav,
                title: 'ShiLib: The LIbrary',
                books
            });
    });
    booksrouter.get('/:id', function(req, res){
        const id = req.params.id;
        if(id==='new'){
            res.render('newbook', {nav, title: 'ShiLib: The LIbrary'});
        }
        else {
            book = books[id];
            res.render('book',
                {
                    nav,
                    title: 'ShiLib: The LIbrary',
                    book
                });
        }
    });
    return booksrouter;
}


module.exports = router;
