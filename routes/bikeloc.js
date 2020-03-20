var express = require('express');
var router = express.Router();

// Load the AWS SDK for Node.js
var AWS = require('aws-sdk');

//unique id for dynamoDB primary key
const uuidv1 = require('uuid/v1');

// Set the region 
AWS.config.update({region: 'us-east-1'});

router.get('/bikelocId/:bikelocId', function(req, res, next) {
    bikelocId = req.params.bikelocId,
	
	console.log("bikelocId: " + bikelocId);
    
    console.log("reached api route");

     //var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
     var docClient = new AWS.DynamoDB.DocumentClient();

    var params = {
        TableName: 'bikeloc',
        Key: {'bikelocId': bikelocId}
       };
       
    docClient.get(params, function(err, data) {
        if (err) {
            console.log("Error", err);
            res.send("Err: " + JSON.stringify(err)); 
        } else {
           console.log("Success", data.Item);
           res.send(JSON.stringify(data.Item));
        }
    });
});

router.get('/*', function(req, res, next) {
    bikelocId = req.params.bikelocId,
    console.log("reached api route");

    var dynamoClient = new AWS.DynamoDB.DocumentClient();
    var params = {
        TableName: 'bikeloc', // give it your table name 
        Select: "ALL_ATTRIBUTES"
  };

  dynamoClient.scan(params, function(err, data) {
    if (err) {
       console.error("Unable to read item. Error JSON:", JSON.stringify(err, null, 2));
       res.send("Err: " + JSON.stringify(err));
    } else {
       console.log("Success: " + JSON.stringify(data, null, 2));
       res.send(JSON.stringify(data, null, 2));
    }
  });

 
});

router.post('/', function (req, res) {
        console.log("In router.put");
        console.log(JSON.stringify(req.body));
        console.log("lat: " + req.body.lat);
        
        //var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});
        var docClient = new AWS.DynamoDB.DocumentClient();

        const bikeloc = {
            bikelocId: uuidv1(),
            lat: req.body.lat,
            long: req.body.long,
            reason: req.body.reason,
            bikelocDate: new Date().toISOString()
        }

        var params = {
            TableName: 'bikeloc',
            Item: bikeloc
           };
           
        docClient.put(params, function(err, data) {
            if (err) {
               console.log("Error", err);
               res.send("Err: " + err);
            } else {
               console.log("Success", JSON.stringify(params.Item));
               res.send("Success: " + JSON.stringify(params.Item));
            }
           });

        
        
});


module.exports = router;
