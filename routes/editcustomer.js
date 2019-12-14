var express = require('express');
var router = express.Router();
var cassandra = require('cassandra-driver');

var client = new cassandra.Client({contactPoints: ['127.0.0.1']});
client.connect(function(err, result){
	console.log('editcustomer: cassandra connected');
});
/* GET users listing. */
router.get('/', function(req, res) {
	res.json({editCustomer});
});



//Put --update customer details
router.put('/:cust_id', function(req, res){

	console.log('editcustomer: Chandra connected'+req.params.cust_id);	
	console.log('editcustomer: first connected'+req.body.cust_first_name);
	var upsertCustomer = 'UPDATE customer.customers_data SET  cust_first_name=? ,cust_last_name=?, address=?,mobile_number=?,email_id=?,gender=? WHERE cust_id = ?';
	cust_id = cassandra.types.uuid();
	console.log('=================='+upsertCustomer);
	
	client.execute(upsertCustomer, [req.params.cust_id, req.body.cust_first_name, req.body.cust_last_name, req.body.address,req.body.mobile_number,req.body.email_id,req.body.gender],
		function(err, result){
			if(err){
			res.status(404).send({msg: err});
		} else {
			//console.log('Customer Added');
			res.json({message :'Customer updated'});
		}
		});
});

module.exports = router;


/*var getCustomerById = 'SELECT * FROM customer.customers_data WHERE cust_id = ?';

//GET users listing. 
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
				
			})
		}
	});
});




var upsertCustomer = 'UPDATE customer.customers_data SET  cust_first_name=? ,cust_last_name=?, address=?,mobile_number=?,email_id=?,gender=? WHERE cust_id = ?';

 //PUT Edit Customer 

router.put('/:cust_id', function(req, res){
console.log('=================='+upsertCustomer);
	client.execute(upsertCustomer, [req.params.cust_id, req.body.cust_first_name, req.body.cust_last_name, req.body.address,req.body.mobile_number,req.body.email_id,req.body.gender],
		function(err, result){
			if(err){
			res.status(404).send({msg: err});
		} else {
			res.json({message :'Customer detail Updated'});
		}
		});
});
*/
//module.exports = router;
