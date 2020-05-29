(function(services) {
    const db = require('../config/dbConfig');
    const Q = require('q');
    services.getInstanceDetails = function () {
        const deferred = Q.defer();
        const query = `SELECT ApiParameter.ApiTypeId, ApiParameter.Name,ApiParameter.Required,ApiType.ApiHeader1,ApiType.ApiHeader2 FROM ApiParameter INNER JOIN ApiType ON ApiParameter.apiTypeid=ApiType.Id`;
        db.query(query).then((pack) => {
            deferred.resolve(pack);
        }, (err) => {
            deferred.reject(err);
        });
        return deferred.promise;
        }

})(module.exports);