module.exports.getOraceEloquaApisDetails= (req,res) => {
    const services = require('../services/UserInterfaceServices');
    
    services.getOraceEloquaApisDetails()
        .then((result) => {
            res.send(result).status(200);
        }).catch((error)=>{
            res.send(error);
        })
}

module.exports.getInstanceDetails= (req,res) => {
    const services = require('../services/UserInterfaceServices');
    
    services.getInstanceDetails()
        .then((result) => {
            res.send(result).status(200);
        }).catch((error)=>{
            res.send(error);
        })
}