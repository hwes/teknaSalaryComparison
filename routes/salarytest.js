var express = require('express');
var MongoClient = require('mongodb').MongoClient;
var mongoDBUser = process.env.MONGODBUSER;
var mongoDBPassword = process.env.MONGODBPASSWORD;
var mongoURL = 'mongodb://'+mongoDBUser+':'+mongoDBPassword+'@ds042138.mongolab.com:42138/hwestutorialdb';
var router = express.Router();

/* GET STORE subpage */

router.get('/', function(req,res, next){
  res.render('salarytest', { title: 'salarytest', 
  messageURL: process.env.MESSAGE_URL});
});

router.route('/result')
          .post(function(req, res, next){
            var txtMessage= (req.body.message || 'empty message');
            console.log('username'+mongoDBUser+'/password'+mongoDBPassword)
            
            // Connecting to MongoDB
            MongoClient.connect(mongoURL, function(err,db){
              console.log('Connected to the database');
              db.collection('messages').insert({'message': txtMessage}, {w:1}, function(err, item){
                if (err) {
                  console.log('Error storing to database ' + err);
                  db.close();
                  res.status(400).send('Error, unable to write to database' + txtMessage);
                } else {
                  db.close();
                  console.log('Message stored ok in database' + txtMessage);
                  res.status(200).send('Message stored: "' + txtMessage + '"');
                }
              });
            });
            //End storing in database
            
 //           console.log('Receiving message '+ req.body.message);
 //           res.send('Message was ' + req.body.message);
          });

module.exports = router;
