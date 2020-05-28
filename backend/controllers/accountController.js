const services = require('C:/Users/Admin/Desktop/SWAP/PORTQII/EloquaWorkbenchportqii/backend/services/accountServices.js');

module.exports.account = (req,res) =>{
    console.log("i am in a controller",req.body.properties.type.type);
    console.log("i am in a controller",req.body.properties.type.type);

    let credentials = {
        "title":req.body.title,
        "properties":{
            "type":req.body.properties.type.type,
        }
    };

    console.log("i am in a controller",credentials);


    services.account(credentials,(err,data)=>{

        let response = {};
        
        if(err){
            response.success = false;
            response.message = 'account creation unsuccessful';
            response.error = err;
            res.send(response).status(500);
        }else{
            response.success = true;
            response.message = 'account creation successful';
            response.result = data;
            res.send(response).status(200);
        }       

    })    

}

