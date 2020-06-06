(function (contentService) {

    const Q = require('q');
    //var _ = require('underscore');
	const contentServiceUtility = require('./contentServiceUtility');
	const eloquaCallsOAuth = require('./eloquaCallsOAuth');
	const request = require('request-promise');	
    console.log("i m in content service");

    contentService.getEloquaAccess = function (req,res) {
        // console.log(req);
        const deferred = Q.defer();
        let url = "https://login.eloqua.com/id";
		console.log("req.query " + JSON.stringify(req.query));
        console.log("req.query.access_token " + req.query.access_token);
        let authenticationHeader = "Bearer " + decodeURIComponent(req.query.access_token);
        let options = {
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
        const deferred = Q.defer();
		contentServiceUtility.parseCookie(headers.cookie)
		 .then(function(cookieObj){	
			if(cookieObj.userInfo)
			{
				var payload = {
					"siteId": cookieObj.userInfo.siteId,
					"accessToken": cookieObj.userInfo.accesstoken,
					"host": cookieObj.userInfo.baseUrl + "/API/REST/2.0/assets/contact/field/100001",
				};

				eloquaCallsOAuth.get(payload)
				.then(function (eloquaResponse) {
					console.log("this is what I wanted ",eloquaResponse);		
					deferred.resolve(eloquaResponse);
				})
				.catch(function (error) {
					deferred.reject("Error in Eloqua Get " + error);
				})
			}
			else
			{
				
			}
		})
		.catch(function(error){
			console.log("Error in parseCookie "+error);
				deferred.resolve("Data not found");
		});
        return deferred.promise;
    }

})(module.exports);