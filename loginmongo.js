var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var http = require('http').createServer(app);
var mongo = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/test";
http.listen(process.env.PORT || 3000);

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
    mongo.connect(url,function(err,db){
        var cursor = db.collection('users').find();
        cursor.forEach(function(doc,err){
            if(doc.name==name)
            {
                if(doc.password==password)
                {
                    res.redirect('success.html');
                    db.close();
                }
            }

        },function(){
            db.close();
            //res.redirect('success.html');

        })
    })
  

    

})
app.post('/sign',function(req,res){
    var n = req.body.username;
    var p = req.body.password;
    var user = {
        name: n,
        password: p
    }
    mongo.connect(url,function(err,db){
        db.collection('users').insertOne(user,function(err,result){
            if(err)
            {
                console.log(err);
            }
            else{
                console.log("item inserted");
                db.close();
            }

        })
        res.redirect('index.html');
    })
   

})

//db.collection('users').updateOne({'name':name},{$set:item},function(err,result){........})