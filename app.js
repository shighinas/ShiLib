const express = require('express');
const app = new express();
const port = process.env.PORT || 9000;
const nav = [
    {
        link: '/books', name: 'Books'
    }, 
    {
        link: '/authors', name: 'Authors'
    }
];
const booksrouter = require('./src/routes/bookroutes')(nav);
const authorsrouter = require('./src/routes/authorsroutes')(nav);
app.use(express.static('./public'));
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/books', booksrouter);
app.use('/authors', authorsrouter);

app.get('/', function(req, res){
    res.render('index',
        {
            nav,
            title: 'ShiLib: The LIbrary'
        });
});
app.get('/signIn', function(req, res){
    res.render('signIn');
});

app.listen(port, ()=>{console.log("Server ready at" + port)});