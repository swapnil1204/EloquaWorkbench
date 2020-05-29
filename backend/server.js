const app = require('./app.js');
const routes = require('./routes/routes');
const bodyparser = require('body-parser');
require('dotenv').config();

app.use(bodyparser.urlencoded({ extended:true }));

app.use(bodyparser.json());

app.use('/api/REST/1.0/data/',routes);

const port = process.env.port;
app.listen(port,()=>{
    console.log("server is up and running on : ",port);
});
