const app = require('./app.js');
const routes = require('./routes/routes');
const bodyparser = require('body-parser');
require('dotenv').config();

app.use(bodyparser.urlencoded({ extended:true }));

app.use(bodyparser.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === 'OPTIONS') {
      res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
      return res.status(200).json({});
  }
  next();
});

app.use('/api/REST/1.0/data/',routes);

const port = process.env.port || 4000;

app.listen(port,()=>{
    console.log("server is up and running on : ",port);
});

const contentService = require('./services/contentService');
app.get('/saveToken',function(req,res){	
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
app.get('/saveToken_New',function(req,res){	
	console.log("i am in  /saveToken_New ", req.query);
	contentService.getEloquaAccess(req,res)
	.then(function(response){
        console.log(response);
	})			
})

app.get('/getEndpoint',function(req,res){
	console.log(" I am in /getEndPoint ",req.headers.cookie);
	contentService.reachToEloqua(req.headers)
	.then(function(result){
		res.send(result)
	})
	//res.send("ok");
})