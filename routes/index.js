var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1']});
client.connect(function(err, result){
	console.log('index: cassandra connected');
});



var getAllCustomers = 'SELECT * FROM customer.customers_data';

/* GET home page. */
router.get('/', function(req, res) {
	client.execute(getAllCustomers,[], function(err, result){
		console.log('listdetails: cassandra connected');
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.json({
				customers: result.rows   
			});
		}
	});
});

module.exports = router;
