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
            var salaryGroup= (req.body.salaryGroup || 'empty salaryGroup');
            var basisYear= (req.body.basisYear || 'empty basisYear');
            var pct10= (req.body.pct10 || 'empty 10 percent');
            var pct25= (req.body.pct25 || 'empty 25 percent');
            var pct50= (req.body.pct50 || 'empty 50 percent');
            var pct75= (req.body.pct75 || 'empty 75 percent');
            var pct90= (req.body.pct90 || 'empty 90 percent');
            var median=(req.body.median || 'empty median');
            
            var insertDocument = {'Salary Group':salaryGroup, 
                                  'Basis Year':basisYear, 
                                  '10 percent':pct10,
                                  '25 percent':pct25,
                                  '50 percent':pct50,
                                  '75 percent':pct75,
                                  '90 percent':pct90,
                                  'median':median};
                                  
            console.log('username'+mongoDBUser+'/password'+mongoDBPassword)
            
            // Connecting to MongoDB
            MongoClient.connect(mongoURL, function(err,db){
              console.log('Connected to the database');
              db.collection('teknaSalaryInfoTestingCrap').insert(insertDocument, {w:1}, function(err, item){
                if (err) {
                  console.log('Error storing to database ' + err);
                  db.close();
                  res.status(400).send('Error, unable to write to database' + insertDocument +'/');
                } else {
                  db.close();
                  console.log('Message stored ok in database:' + salaryGroup + '/' + basisYear + ': 10 percent -' + pct10 + '/25 percent - ' + pct25 + '/ 50 percent - ' + pct50 + '/ 75 percent - ' + pct75 + '/ 90 percent - ' + pct90 + '/ mean - ' + median);
                  res.status(200).send('Message stored: "' + salaryGroup + '/' + basisYear + ': 10 percent -' + pct10 + '/25 percent - ' + pct25 + '/ 50 percent - ' + pct50 + '/ 75 percent - ' + pct75 + '/ 90 percent - ' + pct90 + '/ mean - ' + median + '"');
                }
              });
            });
            //End storing in database
            
 //           console.log('Receiving message '+ req.body.message);
 //           res.send('Message was ' + req.body.message);
          });

module.exports = router;
