const express = require('express');
const adminrouter = express.Router();
const bookdata = require('../model/bookdata');
const authordata = require('../model/authordata');
var fs = require('fs');
var path = require('path');
var multer = require('multer');
 
var upload = multer({ dest: '/images' });



function router() {

    const nav = [
        {
            link: '/admin/welcome', name: 'Books'
        }, 
        {
            link: '/admin/authors', name: 'Authors'
        },
    ];

    // admin login page
    adminrouter.get('/', (req, res) => {
        res.render('adminlogin');
    });

    // redirect to adminbooks page
    adminrouter.get('/welcome', (req, res)=>{
        bookdata.find()
        .then((books)=> {
            res.render('adminbooks',
            {
                nav,
                title: 'ShiLib: The LIbrary',
                books,
                message: req.flash('info')
            });
        });
    });
    // redirect to adminbooks page

    // redirect to admin authors page
    adminrouter.get('/authors', (req, res)=>{
        authordata.find()
        .then((authors)=> {
            res.render('adminauthors',
            {
                nav,
                title: 'ShiLib: The LIbrary',
                authors,
                message: req.flash('info')
            });
        });
    });
    // redirect to admin authors page

    // { Single author page
    adminrouter.get('/authors/:id', function(req, res){
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
    // single author page }

    // { single book page 
    adminrouter.get('/books/:id', function(req, res){
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
    });
    // single book page }

    // delete book operation
    adminrouter.get('/delbook/:id', (req, res)=>{
        const id = req.params.id;
        bookdata.findByIdAndRemove({_id : id}, (err, book)=>{
            if(err){console.log("err")}
            else{req.flash('info', 'Successfully deleted '+ book.title +' from books list')}
        })
        .then( (book)=>{
            
            res.redirect('/admin/welcome')
        })
    });
    // delete book operation

    // delete author Operation
    adminrouter.get('/delauthor/:id', (req, res)=>{
        const id = req.params.id;
        authordata.findByIdAndRemove({_id : id}, (err, author)=>{
            if(err){console.log("err")}
            else{req.flash('info', 'Successfully deleted '+ author.name +' from authors list')}
        })
        .then( ()=>{
            res.redirect('/admin/authors')
        })
    });
    // delete author Operation


    // edit book operation
    adminrouter.get('/editbook/:id', (req, res)=>{
        var id = req.params.id;
        bookdata.find({_id: id})
        .then( (book)=>{
            res.render('editbook',
            {
                nav,
                title: 'ShiLib: The Library',
                book
            });
        });
    });
    adminrouter.post('/edbook/:id', upload.single('pic'), (req, res)=>{
        var id = req.params.id;
        var item ={
            title : req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publisher: req.body.pub,
            awards: req.body.awards,
            review: req.body.review
        };
        if(req.file){
            item.pic = {
                data: fs.readFileSync(req.file.path).toString('base64'),
                contentType: 'image/png'
            };
        }
        bookdata.findOneAndUpdate({_id: id}, item, { new: true})
        .then( (book)=>{ 
            req.flash('info', 'Successfully updated '+book.title + ' from books list')
            res.redirect('/admin/welcome',);
        })
    });
    // edit book operation

    // edit author Operation
    adminrouter.get('/editauthor/:id', (req, res)=>{
        var id = req.params.id;
        authordata.findOne({_id: id})
        .then( (author)=>{
            res.render('editauthor',
            {
                nav,
                title: 'ShiLib: The Library',
                author
            });
        });
    });
    adminrouter.post('/edauthor/:id', upload.single('pic'), (req, res)=>{
        var id = req.params.id;
        var item ={
            name : req.body.name,
            work: req.body.work,
            awards: req.body.awards,
            description: req.body.des
        };
        if(req.file){
            item.pic = {
                data: fs.readFileSync(req.file.path).toString('base64'),
                contentType: 'image/png'
            };
        }
        authordata.findOneAndUpdate({_id: id}, item, { new: true})
        .then( (author)=>{ 
            req.flash('info', 'Successfully updated '+author.name + ' from authors list')
            res.redirect('/admin/authors',);
        })
    });
    // edit author Operation

    // adding new book
    adminrouter.get('/newbook', (req, res)=> {
        res.render('newbook',
        {
            nav, title:'ShiLib: The Library'
        })
    })
    adminrouter.post('/bookadd', upload.single('pic'), (req, res)=>{
        // // when data is send using get method
        // var item = {
        //     title : req.query.title,
        //     author: req.query.author,
        //     publisher: req.query.pub,
        //     awards: req.query.awards,
        //     pic: req.query.pic,
        //     review: req.query.review
        // }
        // var book = bookdata(item);
        // book.save();
        // res.redirect('/books');


        // when data is send using POST method
        var item = {
            title : req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publisher: req.body.pub,
            awards: req.body.awards,
            pic: {
                data: fs.readFileSync(req.file.path).toString('base64'),
                contentType: 'image/png'
            },
            review: req.body.review
        }
        var book = bookdata(item);
        book.save();
        req.flash('info', 'Successfully added '+ book.title + ' into books list')
        res.redirect('/admin/welcome');
        
    });
    // adding new book
    
    // adding new Author
    adminrouter.get('/newauthor', (req, res)=> {
        res.render('newauthor',
        {
            nav, title:'ShiLib: The Library'
        })
    })
    adminrouter.post('/authoradd', upload.single('pic'), (req, res)=>{
        var item = {
            name : req.body.name,
            dob: req.body.dob,
            work: req.body.work,
            awards: req.body.awards,
            pic: {
                data: fs.readFileSync(req.file.path).toString('base64'),
                contentType: 'image/png'
            },
            description: req.body.des
        }
        var author = authordata(item);
        author.save();
        req.flash('info', 'Successfully added '+ author.name + ' into authors list')
        res.redirect('/admin/authors');
        
    });
    // adding new Author

    

    return adminrouter
}

module.exports = router;

