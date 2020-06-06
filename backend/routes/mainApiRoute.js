const express = require('express');

const router = express.Router();

const contentService = require('../services/contentService');

router.post('/account',(req,res)=>{
	res.send(" Acccount created successfully ! ");
});

router.get('/saveToken',function(req,res){	
	if(req.query.state)
	{
		console.log("I am in /saveToken if block "+req.query.state);
		res.redirect(req.query.state);
	}
	else
	{
		console.log("I am in /saveToken else block"+req.query.state);
		res.send('<html><script> function getUrl(){var url = window.location.href;var currentUrl1 =  url.split("&")[3];var accesstoken=location.hash.split("&")[0]; accesstoken=accesstoken.substr(14)+"&"+currentUrl1;console.log(currentUrl1); window.location.href="http://localhost:8080/saveToken?access_token="+accesstoken+"";}window.onload= getUrl();</script><p>HI</p></html>');
	}			
})

router.get('/saveToken_New',function(req,res){	
	console.log("i am in  /saveToken_New ", req.query);
	contentService.getEloquaAccess(req,res)
	.then(function(response){
        console.log(response);
	})			
})

router.get('/getEndpoint',function(req,res){
	console.log(" I am in /getEndPoint ",req.headers.cookie);
	contentService.reachToEloqua(req.headers)
	.then(function(result){
		res.send(result)
	})
})

module.exports = router;