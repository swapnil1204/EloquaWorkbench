module.exports.getOraceEloquaApisDetails= (req,res) => {

    const services = require('../services/UserInterfaceServices');

    services.getOraceEloquaApisDetails()
    .then((result) => {
        res.send(result).status(200);
    }).catch((error)=>{
        res.send(error);
    })

}

module.exports.getAccountApis= (req,res) => {

    let params = { parentId:req.params.parentId };

    const services = require('../services/UserInterfaceServices');
    
    services.getAccountApis(params)
    .then((result) => {
        res.send(result).status(200);
    }).catch((error)=>{
        res.send(error);
    })

}

module.exports.getCreateAccountApis= (req,res) => {
   
    let params = { parentId:req.params.parentId, childId:req.params.childId };

    const services = require('../services/UserInterfaceServices');
    
    services.getCreateAccountApis(params)
    .then((result) => {
        res.send(result).status(200);
    }).catch((error)=>{
        res.send(error);
    })

}