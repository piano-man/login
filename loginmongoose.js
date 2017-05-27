var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/test');
http.listen(process.env.PORT || 3000);
var Schema = mongoose.Schema;
var UserDataSchema = new Schema({
    name: String ,
    password: String
},{collection: "users"})

var userdata = mongoose.model('userdata',UserDataSchema);
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: true }));
var name;
var password;
var path = __dirname + '/index.html';
app.get('/', function (req, res) {
  res.sendFile(path);
});
var session;

app.post('/login',function(req,res){
    var resultArray = [];
         name = req.body.username;
    console.log(name);
    password = req.body.password;
    console.log(password);
    userdata.find()
            .then(function(doc){
                var len = doc.length;
                console.log(len);
                for(i=0;i<len;i++)
                {
                    if(doc[i].name==name)
                    {
                        if(doc[i].password==password)
                        {
            res.redirect('success.html');
        break;                        }
                    }
                }
            })
  

    

})
app.post('/sign',function(req,res){
    var n = req.body.username;
    var p = req.body.password;
    var user = {
        name: n,
        password: p
    }
    var data = new userdata(user);
    data.save();
res.redirect('index.html');
    

})


//userdata.findById(id,function(err,doc){doc.title = new value;doc.save()})
//userdata.findByIdAndRemove(id).exec()