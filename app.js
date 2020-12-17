const express = require('express');
const app = new express();
const session = require('express-session');
const flash = require('connect-flash');

const mongoose = require('mongoose');
// connecting to the database
mongoose.connect('mongodb+srv://userone:userone@shilib2.dlg5n.mongodb.net/LIBRARYAPP?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex : true, useFindAndModify: false });

const signupdata = require('./src/model/signupdata')
const port = process.env.PORT || 9000;
const nav = [
    {
        link: '/books', name: 'Books'
    }, 
    {
        link: '/authors', name: 'Authors'
    },

];
const booksrouter = require('./src/routes/bookroutes')(nav);
const authorsrouter = require('./src/routes/authorsroutes')(nav);
const adminrouter = require('./src/routes/adminroutes')();
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(session({
    secret: 'secret',
    cookie: { maxAge: 1000 },
    resave: false,
    saveUninitialized: false
}));
app.use(flash());


app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/books', booksrouter);
app.use('/authors', authorsrouter);
app.use('/admin', adminrouter);

app.get('/', function(req, res){
    res.render('index',
        {
            nav,
            title: 'ShiLib: The LIbrary'
        });
});

app.get('/signIn', function(req, res){
    res.render('signIn', { message: req.flash('message')});
});


// sign Up validation
app.post('/signIn/up', (req, res)=>{
    var item = {
        name : req.body.name,
        email : req.body.email,
        phone : req.body.phone,
        password : req.body.pwd
    }
    signupdata.findOne({email: item.email}, (err, user)=>{
        if(err){
            console.log("error during signUp server side validation"+ err);
        }
        if(!user){
            var user = signupdata(item);
            user.save();
            req.flash('message', 'Successfully created your account. Please Login to Continue.');
        }
        else{
            req.flash('message', 'User already exists with the same email. Please login or try using another email.');
        }
        res.redirect('/signIn');
    })
});
// sign Up validation


// sign In validation
app.post('/signIn/in', (req, res)=>{
    signupdata.findOne({email : req.body.email, password : req.body.pwd}, (err, user)=>{
        if(err){
            console.log(err);
            res.status(500).send();
        }
        if(!user){
            req.flash('message', 'Incorrect username or password');
            res.redirect('/signIn');
        }
        else {
            res.redirect('/books');
        }
    });
});
// sign In validation

app.listen(port, ()=>{console.log("Server ready at" + port)});
