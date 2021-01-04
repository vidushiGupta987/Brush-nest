//Load modules
const express = require('express');
const exphbs = require('express-handlebars');
const mongoose = require('mongoose');
//connect to MongoURI exported from external file
const keys = require('./config/keys');
//initialize express application
const app = express();
//setup template engine
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
//setup static file to serve css, javascript and images
app.use(express.static('public'));
//connect to remote database
mongoose.connect(keys.MongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})//returns promise
.then(() => {
    console.log('connected to remote database....');//if connection is successful
}).catch((err) => { //to catch any error
    console.log(err);
});
//set environment variable for port
const port =process.env.PORT || 3000;
//handle routes
app.get('/',(req,res) =>{
    res.render('home');
});
app.get('/about', (req,res)=>{
    res.render('about');
});
app.listen(port, ()=>{
    console.log(`Server is running on port ${port}`);
});