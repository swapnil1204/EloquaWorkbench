(function(contentServiceUtility){
    console.log(" I am in contentServiceUtility parseCokkie ");
    contentServiceUtility.parseCookie = function(cookieVar){
		console.log('In parseCookie' , cookieVar);
		var Q = require('q');
		var deferred = Q.defer();
		var cookieObj={};
		// cookieVar =`%7B%22siteId%22%3A250973722%2C%22;siteName%22%3A%22TechnologyPartnerPORTQIIPTELTD%22%2C%22;userId%22%3A38%2C%22
		// baseUrl%22%3A%22https%3A%2F%2Fsecure.p02.eloqua.com%22%2C%22;
		// accesstoken%22%3A%22MjUwOTczNzIyOjE5SGNUZ0FVclJFaXlQbXNVOUF0VmtWZkVkcFMzQ3pVTXlkem0zM3JQV1VoU2Exd2M4V0tZRkV2bElLblRZMXZNejlTb29iMDR5WnpaR3JjUkxFdTB%2BajV2N3Q2RlJvaFVvYVU%3D%22%7D;
		// `;
		if(cookieVar)
		{
			var cookieArr = cookieVar.split(';');
			console.log('In parseCookie this is cookie array : ' , cookieArr);
			for(var i=0; i<cookieArr.length; i++) {
				var name = (cookieArr[i].split('=')[0]).trim();
				var value = (cookieArr[i].split('=')[1]).trim();
				if(name == "userInfo")
				{
					value = JSON.parse(decodeURIComponent(value));
				}
				cookieObj[name]=value;
			}
			deferred.resolve(cookieObj);
		}
		else
		{
			deferred.resolve(cookieObj);
		}
		// console.log('cookieObj ',cookieObj);
		return deferred.promise; 
}
})(module.exports);
