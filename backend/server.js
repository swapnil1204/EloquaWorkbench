const app = require('./app.js');
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

app.use('/api/REST/1.0/data/',require('./routes/customApiRoute'));
app.use('/',require('./routes/mainApiRoute'));

const port = process.env.port || 4000;

app.listen(port,()=>{
    console.log("server is up and running on : ",port);
});