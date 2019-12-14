var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1']});
client.connect(function(err, result){
	console.log('addcustomer: cassandra connected');
});

/* GET users listing. */
router.get('/', function(req, res) {
	res.json({addcustomer});
});



/* POST Add Customers */
router.post('/', function(req, res){
	cust_id = cassandra.types.uuid();

	var upsertCustomer = 'INSERT INTO customer.customers_data(cust_id, cust_first_name, cust_last_name, address,mobile_number,email_id,gender) VALUES(?,?,?,?,?,?,?)';

	client.execute(upsertCustomer, [cust_id, req.body.cust_first_name, req.body.cust_last_name, req.body.address,req.body.mobile_number,req.body.email_id,req.body.gender],
		function(err, result){
			if(err){
			res.status(404).send({msg: err});
		} else {
			//console.log('Customer Added');
			//res.redirect('/');
			res.json({message :'Customer Added'});
		}
		});
});

module.exports = router;
