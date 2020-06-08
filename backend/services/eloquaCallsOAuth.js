(function (eloquaCallsOAuth) {
	var Q = require('q');
	//var async = require('async');
	//var CryptoJS = require('crypto-js');
	var request = require('request-promise');

	// var dbUtility = require('./dbUtility');
	// var config = require('../config/config');
	// var adminConfig = require('../services/adminConfig');
	// var eloquaCallsOAuth = require('./eloquaCallsOAuth');
	// var eloquaCallBasicAuth = require('../services/eloquaCallsBasicAuth');

	// var eloquaConfig = config.eloquaConfig;
	// var instanceConfig = config.instanceConfig;

	// eloquaCallsOAuth.refreshToken = function (refreshToken) {
	// 	console.log("Entry Refresh token");
	// 	var deferred = Q.defer();
	// 	var tokenInfo = {
	// 		"host": eloquaConfig.tokenUrl,
	// 		"username": eloquaConfig.clientId,
	// 		"password": eloquaConfig.clientSecret,
	// 		"body": {
	// 			"scope": "full",
	// 			"grant_type": "refresh_token",
	// 			"refresh_token": refreshToken,
	// 			"redirect_uri": eloquaConfig.redirectUri,
	// 		}
	// 	};
	// 	eloquaCallBasicAuth.post(tokenInfo)
	// 		.then(function (refreshTokenResult) {
	// 			dbUtility.updateTokenDetails(instanceConfig.siteId, refreshTokenResult)
	// 				.then(function (result) {
	// 					deferred.resolve({ "refreshTokenStatus": true, "accessToken": refreshTokenResult.access_token });
	// 				})
	// 		})
	// 		.catch(function (error) {
	// 			console.log("refreshToken Error " + error);
	// 			deferred.resolve({ "refreshTokenStatus": false });
	// 		});
	// 	return deferred.promise;
	// }

	eloquaCallsOAuth.get = function (userInformation, resultantFunction) {
		console.log(" I am in reachToEloqua service ");
		var deferred = Q.defer();
		var authenticationHeader = "Bearer " + userInformation.accessToken;
		var options = {
			url: userInformation.host,
			headers: { "Authorization": authenticationHeader }
		};
		request(options, resultantFunction)
			.then(function (getResult) {
				console.log("GET Eloqua Success");
				deferred.resolve(getResult);
			})
			.catch(function (error) {
				if (error.statusCode === 401) {
					eloquaCallsOAuth.refreshToken(userInformation.refreshToken)
						.then(function (refreshedToken) {
							if (refreshedToken.refreshTokenStatus) {
								// get the refresh token and make re-get call
								userInformation.accessToken = refreshedToken.accessToken;
								eloquaCallsOAuth.get(userInformation)
									.then(function (getRetryResult) {
										console.log("GET Eloqua Re-try");
										deferred.resolve(getRetryResult);
									})
									.catch(function (error) {
										console.log("GET Eloqua Error Re-try " + error);
										deferred.reject(error);
									})
							}
							// else {
							// 	// make the get call using basic auth
							// 	dbUtility.getInstanceDetails(userInformation.siteId)
							// 		.then(function (instanceDetails) {
							// 			var eloquaPassword = adminConfig.decryptPass(instanceDetails[0].Eloqua_Password);
							// 			var getPayload = {
							// 				"host": userInformation.host,
							// 				"siteName": config.instanceConfig.siteName,
							// 				"userName": instanceDetails[0].Eloqua_Username,
							// 				"password": eloquaPassword,
							// 			}
							// 			eloquaCallBasicAuth.get(getPayload)
							// 				.then(function (getResult) {
							// 					console.log("GET Eloqua Success - Basic Auth");
							// 					deferred.resolve(getResult);
							// 				})
							// 				.catch(function (error) {
							// 					console.log("Error in Eloqua GET - Basic Auth " + error)
							// 					deferred.reject(error)
							// 				})
							// 		})
							// 		.catch(function (error) {
							// 			console.log("Database handshake failed !!" + error)
							// 			deferred.reject(error)
							// 		})
							// }
						})
				}
				else {
					console.log("Error in GET Eloqua " + error)
					deferred.reject(error)
				}
			})
		return deferred.promise;
	}

	eloquaCallsOAuth.post = function (userInformation, resultantFunction) {
		var deferred = Q.defer();
		var authenticationHeader = "Bearer " + userInformation.accessToken;
		// var options = {
		// 	url: userInformation.host,
		// 	headers: { "Authorization": authenticationHeader, "Connections": "keep-alive" },
		// 	method: 'POST',
		// 	body: userInformation.body,
		// 	json: true,
		// }
		var options = {
			url: userInformation.host + '/api/REST/1.0/data/account',
			headers: { "Authorization": authenticationHeader, "Connections": "keep-alive" },
			method: 'POST',
			body: userInformation.body,
			json: true,
		}
		
		console.log('I am eloqua calls oauth ',options);
		
		request(options, resultantFunction)
			.then(function (result) {
				console.log("POST Eloqua Success",result);
				deferred.resolve(result);
			})
			.catch(function (error) {
			// 	if (error.statusCode === 401) {
			// 		eloquaCallsOAuth.refreshToken(userInformation.refreshToken)
			// 			.then(function (refreshedToken) {
			// 				if (refreshedToken.refreshTokenStatus) {
			// 					// get the refresh token and make re-get call
			// 					userInformation.accessToken = refreshedToken.accessToken;
			// 					eloquaCallsOAuth.get(userInformation)
			// 						.then(function (getRetryResult) {
			// 							console.log("POST Eloqua Result Re-try");
			// 							deferred.resolve(getRetryResult);
			// 						})
			// 						.catch(function (error) {
			// 							console.log("Error in POST Eloqua Re-try " + error);
			// 							deferred.reject(error);
			// 						})
			// 				}
			// 				else {
			// 					// make the get call using basic auth					
								// dbUtility.getInstanceDetails(userInformation.siteId)
								// 	.then(function (instanceDetails) {
								// 		var eloquaPassword = adminConfig.decryptPass(instanceDetails[0].Eloqua_Password);
								// 		var getPayload = {
								// 			"host": userInformation.host,
								// 			"siteName": config.instanceConfig.siteName,
								// 			"userName": instanceDetails[0].Eloqua_Username,
								// 			"password": eloquaPassword,
								// 		}
								// 		eloquaCallBasicAuth.post(getPayload)
								// 			.then(function (getResult) {
								// 				console.log("POST Eloqua Success - Basic Auth");
								// 				deferred.resolve(getResult);
								// 			})
			// 								.catch(function (error) {
			// 									console.log("Error in Eloqua POST - Basic Auth " + error)
			// 									deferred.reject(error)
			// 								})
			// 						})
			// 						.catch(function (error) {
			// 							console.log("POST Database handshake failed !!" + error)
			// 							deferred.reject(error)
			// 						})
			// 				}
			// 			})
			// 	}
			// 	else {
			 		console.log("Error in POST Eloqua Error Code " + error.statusCode + "Error " + error)
					deferred.reject(error);
			// 	}
			 })
		return deferred.promise;
	}

})(module.exports);