const groupSchema = require('C:/Users/Admin/Desktop/SWAP/PORTQII/EloquaWorkbenchportqii/backend/schema/ApiGroup.js');

//const userSchemaInstance = mongoose.model('APIGROUP',groupSchema);

module.exports.account = (credential,callback) => {
    console.log("i am in a model");
    callback(null,"<h1>server is ready<h1>");
    // const credentialParam = new userSchemaInstance({ });

    // console.log('credential param from register ',credential.email,credential.password);

    // credentialParam.save((err,data)=>{

    //     let result = {}
        
    //     if(err){
    //         callback(err);
    //     }else{
    //         callback(null,data);
    //     }       

    //});

}



