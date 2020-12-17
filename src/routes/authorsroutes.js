const express = require('express');
const authorsrouter = express.Router();
const authordata = require('../model/authordata');
function router(nav){
    
    authorsrouter.get('/', function(req, res){
        authordata.find()
        .then((authors)=> {
            res.render('authors',
            {
                nav,
                title: 'ShiLib: The LIbrary',
                authors
            });
        });
    });
    authorsrouter.get('/:id', function(req, res){
        var id = req.params.id;
        authordata.findOne({_id : id})
        .then( (author)=> {
            res.render('author',
            {
                nav,
                title: 'ShiLib: The Library',
                author
            });
        });
    });
    return authorsrouter;
}


module.exports = router;
