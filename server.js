//Install express server
const express = require('express');
const path = require('path');

const app = express();
var router = express.Router();


const MongoClient = require('mongodb').MongoClient;
const uri = process.env.MONGODB_URI 
const client = new MongoClient(uri, { useNewUrlParser: true });

router.get('/createDB', function(err, res){

    client.connect(err => {
        const collection = client.db("heroku_j7g82tzg").collection("users");
        // perform actions on the collection object
        var myObj = [
            {
                name: 'bah',
                email: 'kanabah55@gmail.com'
            },
            {
                name: 'bah',
                email: 'kanabah55@gmail.com'
            },
        ];
        
        collection.insertMany(myObj, function(err, res){
            if(err){
                return res.status(404).send(new Error('404 not found'));
            }else{
                return res.status(200);
            }
        });
      
    })
});


// Serve only the static files form the dist directory
app.use(express.static(__dirname + '/dist/deploy-origin'));

app.get('/*', function(req,res) {
    
res.sendFile(path.join(__dirname+'/dist/deploy-origin/index.html'));
});

// Start the app by listening on the default Heroku port
app.listen(process.env.PORT || 8080);