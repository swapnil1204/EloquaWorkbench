const app = require('C:/Users/Admin/Desktop/SWAP/PORTQII/EloquaWorkbenchportqii/backend/app.js');
const routes = require('C:/Users/Admin/Desktop/SWAP/PORTQII/EloquaWorkbenchportqii/backend/routes/routes.js');
const bodyparser = require('body-parser');
require('dotenv').config();

app.use(bodyparser.urlencoded({ extended:true }));

app.use(bodyparser.json());

app.use('/',routes);

const port = process.env.port;
app.listen(port,()=>{
    console.log("server is up and running on : ",port);
});
