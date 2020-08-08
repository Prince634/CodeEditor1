process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"
const express = require('express')
const app = express()
const path = require('path')
var request = require('request');
app.use(function(req, res, next) {
	
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, access-control-allow-origin");
    next();
});


app.get('/user', function(req, res){
	
		let searchString = ''
		if(req.query && req.query.searchString){
			searchString = req.query.searchString
		}
		let data =  request(`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyDWTEhDOgNqy_slfhFrk7fanPCPZK9O1Vs&input=${searchString}`, function (error, response, body) {
		  res.send(body) 
		});

})

app.get('/searchPlace', function(req, res){
		console.log(req.query);
		let searchString = ''
		if(req.query && req.query.searchString){
			searchString = req.query.searchString
		}
		let data =  request({method:'GET',uri:`https://maps.googleapis.com/maps/api/place/autocomplete/json?key=AIzaSyCQPOQQHyA2COIUGhG-PFIdUQ_faYjsN6c&input=${searchString}`}, function (error, response, body) {
		  res.send(body) 
		});

})



app.listen(4001, function () {
  console.log('Server Code running on port 4001!\n');
})