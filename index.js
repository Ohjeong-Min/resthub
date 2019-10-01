const express = require('express'); 
const badyParser = require('body-parser');
const mongoose = require('mongoose');
const dot = require('dotenv');
const apiRoutes = require('./api-routes')

var app = express();
dot.config();
 
var password = process.env.PASSWORD
mongoose.connect(`mongodb+srv://root:${password}@cluster0-2xpbg.mongodb.net/test?retryWrites=true&w=majority`)

var db = mongoose.connection;

if(!db){
    console.log("Error connecting DB");
}
 
else{
    console.log("DB is connecting successfully");
}
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.set('html', require('ejs').renderFile)

app.use(badyParser.urlencoded({extended:true}))

app.use(badyParser.json())
app.get('/' , (req, res) =>{
    res.send("Hello Express World !")
})
app.use('/api', apiRoutes);

var port = process.env.PORT || 8080; 
app.listen(port, () => {
    console.log(`server is leanning at :http://localhost:${port}`)
})