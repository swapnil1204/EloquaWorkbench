(function(db) {
	// here I change datatype to let and removed "con"
	const mysql = require('mysql');
	const Q = require('q');
	require('dotenv').config();

	let config,pool;
	
	db.init = function(configParam) {
		config = configParam;
		pool = mysql.createPool({
            "host": process.env.host,
			"user": process.env.user,
			"password":process.env.password,
            "database":process.env.database,
			"multipleStatements": true
		});
	}

	db.init();	
	
	db.query = function(queryStatement,params,resultantFunction,largeConnectionStatus) {
		let deferred = Q.defer();
		let parameters = [];
        pool.getConnection(function(err, con)
        {			
			parameters = params;
			if(params && params.length > 0){
				if(typeof(queryStatement) == 'string' && typeof(resultantFunction) == 'function'){
					con.query(queryStatement, parameters,function (err, result) {
						if(err){
							console.error(new Date()+': While running the query '+queryStatement+' Error in database',err);
	
							deferred.reject(err);
							return;
						}
						resultantFunction(result,err,con);
						con.release();
					});
				}else if(typeof(queryStatement) == 'string'){
					con.query(queryStatement,parameters, function (err, result1) {
						if(err){
							console.error(new Date()+': Error in database',err);
							deferred.reject(err);
							return;
						}
						deferred.resolve(result1);
						con.release();
	
					});
				}				
			}
			else{
				if(typeof(queryStatement) == 'string' && typeof(resultantFunction) == 'function'){
					con.query(queryStatement, function (err, result) {
						if(err){
							console.error(new Date()+': While running the query '+queryStatement+' Error in database',err);
	
							deferred.reject(err);
							return;
						}
						resultantFunction(result,err,con);
						con.release();
					});
				}else if(typeof(queryStatement) == 'string'){
					con.query(queryStatement, function (err, result1) {
						if(err){
							console.error(new Date()+': Error in database',err);
							deferred.reject(err);
							return;
						}
						deferred.resolve(result1);
						con.release();
	
					});
				}
			}			
		});		
		return deferred.promise;
	}
})(module.exports);