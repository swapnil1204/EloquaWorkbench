(function(services) {
    const db = require('../config/dbConfig');
    const Q = require('q');

    services.getOraceEloquaApisDetails = function() {

        const deferred = Q.defer();

        const query = `SELECT * from ApiAssetGroup`;

        db.query(query).then((pack) => {
            deferred.resolve(pack);
        }, (err) => {
            deferred.reject(err);
        });
        return deferred.promise;

    }

    services.getAccountApis = function(params) {
        const deferred = Q.defer();

        let apiAssetGroupId = params.parentId;

        const query = `select Id, Name from ApiType where ApiAssetGroupId=${apiAssetGroupId};`;

        db.query(query).then((pack) => {
            deferred.resolve(pack);
        }, (err) => {
            deferred.reject(err);
        });
        return deferred.promise;

    }


    services.getCreateAccountApis = function(params) {
        const deferred = Q.defer();

        let apiTypeIdForeignKey = params.parentId;
        let apiTypeIdPrimaryKey = params.childId;

        const query1 = `SELECT ApiTypeId, Name, Placeholder, Required from ApiParameter where ApiTypeId=${apiTypeIdForeignKey}`;

        const query2 = `SELECT Id, ApiHeader1, ApiHeader2, TypeOfActivity,
                        HttpMethod, Tab1, Tab2, Tab3, ApiEndPoint from ApiType where ApiType.Id=${apiTypeIdPrimaryKey}`;

        db.query(query2).then((pack) => {
            db.query(query1).then((result) => {
                    let response = {}
                    response.elements = pack;
                    response.parameter = result;
                    deferred.resolve(response);
                }, (err) => {
                    deferred.reject(err);
                })
                //deferred.resolve(pack); 
        }, (err) => {
            deferred.reject(err);
        });
        return deferred.promise;

    }

    services.account = function(parameter, rq, res) {
        //const account = require('../model/model');
        //let Account = new account.account(parameter);
        // let Account = {
        // "name" : parameter.name,
        // "address1" : parameter.address1
        // };
        console.log(req.body);
        const deferred = Q.defer();
        console.log(" i m in service account ", Account.name, Account.address1);

        const query = `INSERT INTO ACCOUNT (name,address1) VALUES ("${Account.name}", "${Account.address1}")`;

        db.query(query).then((pack) => {
            deferred.resolve(pack);
        }, (err) => {
            deferred.reject(err);
        });
        return deferred.promise;

    }



})(module.exports);