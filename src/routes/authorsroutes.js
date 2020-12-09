const express = require('express');
const authorsrouter = express.Router();
function router(nav){
    var authors = [
        {
            title: "Joseph barbera",
            book: "Tom &jerry",
            genre: "Cartoon",
            img: "joe.jpeg"
        },
        {
            book: "Harry potter",
            title: "J K Rowling",
            genre: "Fantacy",
            img: "jk.jpg"
        },
        {
            book: "Pathummayude Aadu",
            title: "Vaikam Muhammed Basheer",
            genre: "Drama",
            img: "basheer.jpg"
        }
    ];
    nav[2] = {link: '/authors/new', name: 'Add new Author'};
    authorsrouter.get('/', function(req, res){
        res.render('authors',
            {
                nav,
                title: 'ShiLib: The LIbrary',
                authors
            });
    });
    authorsrouter.get('/:id', function(req, res){
        const id = req.params.id;
        if(id==='new'){
            res.render('newauthor', {nav, title: 'ShiLib: The LIbrary'});
        }
        else {
            author = authors[id];
            res.render('author',
                {
                    nav,
                    title: 'ShiLib: The LIbrary',
                    author
                });
        }
    });
    return authorsrouter;
}


module.exports = router;
