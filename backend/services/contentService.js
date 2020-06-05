(function (contentService) {

    const Q = require('q');
    //var _ = require('underscore');
	var request = require('request-promise');	
    console.log("i m in content service");
    
    //var dbUtility = require('./dbUtility');
    //var config = require('../config/config');

    // cron.schedule('*/10 * * * *', () => {		
    //     console.log('Process running every 10 minutes to re-try failed content service');
    // 	contentService.notifyCron()        
    // });

    contentService.getEloquaAccess = function (req,res) {
        // console.log(req);
        var deferred = Q.defer();
        var url = "https://login.eloqua.com/id";
		console.log("req.query " + JSON.stringify(req.query));
        console.log("req.query.access_token " + req.query.access_token);
        var authenticationHeader = "Bearer " + decodeURIComponent(req.query.access_token);
        var options = {
            url: url,
            headers: { "Authorization": authenticationHeader }
        };
        request(options)
            .then(function (result) {
                result = JSON.parse(result);
                // console.log("result " + result + " ");
                var siteId = result.site.id;
				var siteName = result.site.name;
				var userId = result.user.id;
				var baseUrl = result.urls.base;
				var userInfo = {};
				userInfo.siteId = siteId;
				userInfo.siteName = siteName;
				userInfo.userId = userId;
				userInfo.baseUrl = baseUrl;
				userInfo.accesstoken = req.query.access_token;
				//userInfo.currentUrl = req.query.state;
				// res.cookie('userInfo', JSON.stringify(userInfo));
				//res.cookie('userInfo', JSON.stringify(userInfo),{ maxAge: 3600000}); //Set TTL to 1 hour
                res.cookie('userInfo', JSON.stringify(userInfo),{ maxAge: 28800000}); //Set TTL to 1 hour
				//redisSet.setUserDetailsToRedis(JSON.stringify(userInfo));
				console.log(siteId +baseUrl+userId+result.user.username);
                console.log("from content service site Id is :",siteId);
                console.log("from content service base url is :",baseUrl);
                console.log("from content service user id is :",userId);
                console.log("from content service username is :",result.user.username);

				//res.redirect('https://sales-intelligence-dev.portqii.com/');
				
				res.writeHead(301,
				  {Location: req.query.state.replace('aaaa','#')}
				);
				res.end();
                deferred.resolve(result);
            }).catch(function (err) {
                console.log(err);
                deferred.resolve(err);
            })
        return deferred.promise;
    }

    contentService.reachToEloqua = function (headers) {
        console.log(" I am in reachToEloqua service ",headers.cookie);
        var deferred = Q.defer();
		var contentServiceUtility = require('./contentServiceUtility');
		var eloquaCallsOAuth = require('./eloquaCallsOAuth');
		// contentServiceUtility.parseCookie(headers.cookie)
		// .then(function(cookieObj){
			
		// 	if(cookieObj.userInfo)
		// 	{
				// var payload = {
				// 	"siteId": cookieObj.userInfo.siteId,
				// 	"accessToken": cookieObj.userInfo.accesstoken,
				// 	"host": cookieObj.userInfo.baseUrl + "/API/REST/2.0/assets/contact/field/100001",
				// };

				var payload = {
					"siteId": "250973722",
					"accessToken": "MjUwOTczNzIyOjE5SGNUZ0FVclJFaXlQbXNVOUF0VmtWZkVkcFMzQ3pVTXlkem0zM3JQV1VoU2Exd2M4V0tZRkV2bElLblRZMXZNejlTb29iMDR5WnpaR3JjUkxFdTB+ajV2N3Q2RlJvaFVvYVU=",
					"host": "https://secure.p02.eloqua.com" + "/API/REST/2.0/assets/contact/field/100001",
				};
				
				eloquaCallsOAuth.get(payload)
				.then(function (eloquaResponse) {
					console.log("this is what I wanted ",eloquaResponse);		
					deferred.resolve(eloquaResponse);
				})
				.catch(function (error) {
					deferred.reject("Error in Eloqua Get " + error);
				})
			//}
			// else
			// {
				
			// }
		// })
		// .catch(function(error){
		// 	console.log("Error in parseCookie "+error);
		// 		deferred.resolve("Data not found");
		// });
        return deferred.promise;
    }

})(module.exports);