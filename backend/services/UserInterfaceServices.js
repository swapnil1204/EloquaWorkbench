(function(services) {
    const db = require('../config/dbConfig');
    const Q = require('q');
    services.getOraceEloquaApisDetails = function () {
        const deferred = Q.defer();
        
        const query = `SELECT * from ApiAssetGroup`;
                             
        db.query(query).then((pack) => {                  
            deferred.resolve(pack); 
        }, (err) => {
            deferred.reject(err);
        });
        return deferred.promise;
    }

    services.getInstanceDetails = function () {
        const deferred = Q.defer();
        
        const query2 = `SELECT ApiTypeId, Name, Required from ApiParameter where ApiTypeId=1`;
        
        const query3 = `SELECT ApiHeader1, ApiHeader2, TypeOfActivity,
                        HttpMethod, Tab1, Tab2, Tab3, ApiEndPoint from ApiType where ApiType.Id=1`;
                        
        db.query(query3).then((pack) => {
            db.query(query2).then((result)=>{
            let response = {}
            response.elements = pack;
            response.parameter = result;
            deferred.resolve(response);
            },(err)=>{
            deferred.reject(err);
            })                      
            //deferred.resolve(pack); 
        }, (err) => {
            deferred.reject(err);
        });
        return deferred.promise;
        }


})(module.exports);