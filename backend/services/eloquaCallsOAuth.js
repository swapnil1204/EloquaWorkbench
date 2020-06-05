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

	// eloquaCallsOAuth.post = function (userInformation, resultantFunction) {
	// 	var deferred = Q.defer();
	// 	var authenticationHeader = "Bearer " + userInformation.accessToken;
	// 	var options = {
	// 		url: userInformation.host,
	// 		headers: { "Authorization": authenticationHeader, "Connections": "keep-alive" },
	// 		method: 'POST',
	// 		body: userInformation.body,
	// 		json: true,
	// 	}
	// 	request(options, resultantFunction)
	// 		.then(function (result) {
	// 			console.log("POST Eloqua Success");
	// 			deferred.resolve(result);
	// 		})
	// 		.catch(function (error) {
	// 			if (error.statusCode === 401) {
	// 				eloquaCallsOAuth.refreshToken(userInformation.refreshToken)
	// 					.then(function (refreshedToken) {
	// 						if (refreshedToken.refreshTokenStatus) {
	// 							// get the refresh token and make re-get call
	// 							userInformation.accessToken = refreshedToken.accessToken;
	// 							eloquaCallsOAuth.get(userInformation)
	// 								.then(function (getRetryResult) {
	// 									console.log("POST Eloqua Result Re-try");
	// 									deferred.resolve(getRetryResult);
	// 								})
	// 								.catch(function (error) {
	// 									console.log("Error in POST Eloqua Re-try " + error);
	// 									deferred.reject(error);
	// 								})
	// 						}
	// 						else {
	// 							// make the get call using basic auth					
	// 							dbUtility.getInstanceDetails(userInformation.siteId)
	// 								.then(function (instanceDetails) {
	// 									var eloquaPassword = adminConfig.decryptPass(instanceDetails[0].Eloqua_Password);
	// 									var getPayload = {
	// 										"host": userInformation.host,
	// 										"siteName": config.instanceConfig.siteName,
	// 										"userName": instanceDetails[0].Eloqua_Username,
	// 										"password": eloquaPassword,
	// 									}
	// 									eloquaCallBasicAuth.post(getPayload)
	// 										.then(function (getResult) {
	// 											console.log("POST Eloqua Success - Basic Auth");
	// 											deferred.resolve(getResult);
	// 										})
	// 										.catch(function (error) {
	// 											console.log("Error in Eloqua POST - Basic Auth " + error)
	// 											deferred.reject(error)
	// 										})
	// 								})
	// 								.catch(function (error) {
	// 									console.log("POST Database handshake failed !!" + error)
	// 									deferred.reject(error)
	// 								})
	// 						}
	// 					})
	// 			}
	// 			else {
	// 				console.log("Error in POST Eloqua Error Code " + error.statusCode + "Error " + error)
	// 				deferred.reject(error);
	// 			}
	// 		})
	// 	return deferred.promise;
	// }

	// eloquaCallsOAuth.put = function (userInformation, resultantFunction) {
	// 	var deferred = Q.defer();
	// 	var authenticationHeader = "Bearer " + userInformation.accessToken;
	// 	var options = {
	// 		url: userInformation.host,
	// 		headers: { "Authorization": authenticationHeader, "Connections": "keep-alive" },
	// 		method: 'PUT',
	// 		body: userInformation.body,
	// 		json: true,
	// 	}
	// 	request(options, resultantFunction)
	// 		.then(function (result) {
	// 			console.log("PUT Eloqua Success");
	// 			deferred.resolve(result);
	// 		})
	// 		.catch(function (error) {
	// 			if (error.statusCode === 401) {
	// 				eloquaCallsOAuth.refreshToken(userInformation.refreshToken)
	// 					.then(function (refreshedToken) {
	// 						if (refreshedToken.refreshTokenStatus) {
	// 							// get the refresh token and make re-put call
	// 							userInformation.accessToken = refreshedToken.accessToken;
	// 							eloquaCallsOAuth.put(userInformation)
	// 								.then(function (getRetryResult) {
	// 									console.log("PUT Eloqua Result Re-try");
	// 									deferred.resolve(getRetryResult);
	// 								})
	// 								.catch(function (error) {
	// 									console.log("Error in PUT Eloqua Re-try " + error);
	// 									deferred.reject(error);
	// 								})
	// 						}
	// 						else {
	// 							// make the put call using basic auth
	// 							dbUtility.getInstanceDetails(userInformation.siteId)
	// 								.then(function (instanceDetails) {
	// 									var eloquaPassword = adminConfig.decryptPass(instanceDetails[0].Eloqua_Password);
	// 									var getPayload = {
	// 										"host": userInformation.host,
	// 										"siteName": config.instanceConfig.siteName,
	// 										"userName": instanceDetails[0].Eloqua_Username,
	// 										"password": eloquaPassword,
	// 									}
	// 									eloquaCallBasicAuth.put(getPayload)
	// 										.then(function (getResult) {
	// 											console.log("PUT Eloqua Success - Basic Auth");
	// 											deferred.resolve(getResult);
	// 										})
	// 										.catch(function (error) {
	// 											console.log("Error in Eloqua PUT - Basic Auth " + error)
	// 											deferred.reject(error)
	// 										})
	// 								})
	// 								.catch(function (error) {
	// 									console.log("PUT Database handshake failed !!" + error)
	// 									deferred.reject(error)
	// 								})
	// 						}
	// 					})
	// 			}
	// 			else {
	// 				console.log("Error in PUT Eloqua " + error)
	// 				deferred.reject(error);
	// 			}

	// 		})
	// 	return deferred.promise;
	// }

	// eloquaCallsOAuth.Credentials = function (eloquaUserName, eloquaPassword, siteName, resultantFunction) {
	// 	var authenticationHeader = "Basic " + new Buffer(siteName + "\\" + eloquaUserName + ":" + eloquaPassword).toString("base64");
	// 	var options = {
	// 		url: "https://login.eloqua.com/id",
	// 		timeout: 90000,
	// 		headers: { "Authorization": authenticationHeader }
	// 	};
	// 	return request(options, resultantFunction);
	// }

	// eloquaCallsOAuth.getUtility = function (userInformation) {
	// 	var deferred = Q.defer();
	// 	var hostNew;
	// 	var globalElements = [];
	// 	eloquaCallsOAuth.get(userInformation)
	// 		.then(function (getResult) {
	// 			var resultParse = JSON.parse(getResult);
	// 			console.log("Total Record : " + resultParse.total);
	// 			if (resultParse.elements.length > 0) {
	// 				var pageCount = Math.floor((resultParse.total / 1000)) + 1;
	// 				var pageArr = [];
	// 				for (var i = 2; i <= pageCount; i++) {
	// 					pageArr.push(i);
	// 				}
	// 				console.log("Total Number Of Pages " + pageCount)
	// 				if (pageArr.length > 0) {
	// 					globalElements = resultParse.elements;
	// 					async.forEachLimit(pageArr, 1, function (item, callback) {
	// 						if (userInformation.host.includes("?")) {
	// 							if (userInformation.host.indexOf('page=' + (item - 1)) != -1) {
	// 								userInformation.host = userInformation.host.replace('page=' + (item - 1), 'page=' + (item));
	// 							}
	// 							else {
	// 								userInformation.host = userInformation.host + "&page=" + (item)
	// 							}
	// 						}
	// 						else {
	// 							if (userInformation.host.indexOf('page=' + (item - 1)) != -1) {
	// 								userInformation.host = userInformation.host.replace('page=' + (item - 1), 'page=' + (item));
	// 							}
	// 							else {
	// 								userInformation.host = userInformation.host + "?page=" + (item);
	// 							}
	// 						}
	// 						eloquaCallsOAuth.get(userInformation)
	// 							.then(function (getResult1) {
	// 								var resultParse1 = JSON.parse(getResult1);
	// 								globalElements = globalElements.concat(resultParse1.elements);
	// 								callback();
	// 							})

	// 					}, function (err) {
	// 						resultParse.elements = globalElements;
	// 						deferred.resolve(resultParse);
	// 					})
	// 				}
	// 				else {
	// 					deferred.resolve(resultParse);
	// 				}
	// 			}
	// 			else {
	// 				deferred.resolve(resultParse);
	// 			}
	// 		})
	// 	return deferred.promise;
	// }


	// eloquaCallsOAuth.getUtilityApiUses = function (userInformation) {
	// 	var deferred = Q.defer();
	// 	var hostNew;
	// 	var globalElements = [];
	// 	eloquaCallsOAuth.get(userInformation)
	// 		.then(function (getResult) {
	// 			var resultParse = JSON.parse(getResult);
	// 			console.log("Total Record : " + resultParse.totalResults);
	// 			if (resultParse.items.length > 0) {
	// 				var pageCount = Math.floor((resultParse.totalResults / 1000)) + 1;
	// 				var pageArr = [];
	// 				for (var i = 1; i < pageCount; i++) {
	// 					pageArr.push(i);
	// 				}
	// 				console.log("Total Number Of Pages " + pageCount)
	// 				if (pageArr.length > 0) {
	// 					globalElements = resultParse.items;
	// 					async.forEachLimit(pageArr, 1, function (item, callback) {
	// 						if (userInformation.host.includes("?")) {
	// 							if (userInformation.host.indexOf('offset=' + (item - 1) * 1000) != -1) {
	// 								userInformation.host = userInformation.host.replace('offset=' + (item - 1) * 1000, 'offset=' + (item * 1000));
	// 							}
	// 							else {
	// 								userInformation.host = userInformation.host + "&offset=" + (item * 1000)
	// 							}
	// 						}
	// 						else {
	// 							if (userInformation.host.indexOf('offset=' + (item - 1) * 1000) != -1) {
	// 								userInformation.host = userInformation.host.replace('offset=' + (item - 1) * 1000, 'offset=' + (item * 1000));
	// 							}
	// 							else {
	// 								userInformation.host = userInformation.host + "?offset=" + (item * 1000);
	// 							}
	// 						}
	// 						console.log('in eloquaCallsOAuth.getUtilityApiUses ' + userInformation.host);
	// 						eloquaCallsOAuth.get(userInformation)
	// 							.then(function (getResult1) {
	// 								var resultParse1 = JSON.parse(getResult1);
	// 								globalElements = globalElements.concat(resultParse1.items);
	// 								callback();
	// 							})

	// 					}, function (err) {
	// 						resultParse.items = globalElements;
	// 						deferred.resolve(resultParse);
	// 					})
	// 				}
	// 				else {
	// 					deferred.resolve(resultParse);
	// 				}
	// 			}
	// 			else {
	// 				deferred.resolve(resultParse);
	// 			}
	// 		})
	// 	return deferred.promise;
	// }

})(module.exports);