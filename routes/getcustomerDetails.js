var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1']});
client.connect(function(err, result){
	//console.log('customers: cassandra connected');
});
/* GET users listing. */
router.get('/', function(req, res) {
	res.json({getcustomerDetails});
});

var getCustomerById = 'SELECT * FROM customer.customers_data WHERE cust_id = ?';
/* GET users listing. */
router.get('/:cust_id', function(req, res) {
	client.execute(getCustomerById,[req.params.cust_id], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {

			res.json({
				cust_id: result.rows[0].cust_id,
				cust_first_name: result.rows[0].cust_first_name,
				cust_last_name: result.rows[0].cust_last_name,
				mobile_number: result.rows[0].mobile_number,
				address: result.rows[0].address,
				email_id: result.rows[0].email_id,
				gender: result.rows[0].gender
			});
		}
	});
});
/* Delete users listing. */
router.get('/', function(req, res) {
	res.json({deletecustomerDetails});
});
var deleteCustomer = "DELETE FROM customer.customers_data WHERE cust_id = ?";

router.delete('/:cust_id', function(req, res){
	client.execute(deleteCustomer,[req.params.cust_id], function(err, result){
		if(err){
			res.status(404).send({msg: err});
		} else {
			res.json({message :'Customer deleted'});
		}
	});
});

module.exports = router;
