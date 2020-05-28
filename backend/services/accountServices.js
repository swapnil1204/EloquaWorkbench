const model = require('C:/Users/Admin/Desktop/SWAP/PORTQII/EloquaWorkbenchportqii/backend/model/accountModel.js')

module.exports.account = (credentials,callback) => {
    console.log("i am in a services");

    model.account(credentials,(err,data) => {
        if(err){
            callback(err);
        }else{
            callback(null,data);  //it has two param first error is null and second is data
        }
    })
}
