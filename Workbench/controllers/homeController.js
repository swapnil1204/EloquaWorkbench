// workbench
//     .controller('homeController', function($http, $scope, $location) {
//         var Home = $scope.Home = {};
//         var paramValue = $location.search();
//         Home.init = function() {
//             // console.log("hello");
//         }
//         Home.init();
//     });

workbench
	.controller('homeController', function ($http, $window,$scope, $rootScope, URLLIST, APIBASEURL, $location, $uibModal, $timeout, _, eloquaConfig, appBaseUrl) {
		var Home = $scope.Home = {};
		//Home.selctedFields=((Home.selctedFields=="undefined")?"":Home.selctedFields);
		Home.textField="SELECT "+((Home.selctedFields==undefined)?"":Home.selctedFields)+" FROM "+ ((Home.eloquaObj==undefined)?"":Home.eloquaObj) ;
		Home.siteId = '';
		var objectArray=[];
		if (APIBASEURL.includes("localhost") || APIBASEURL.includes("agilemeasure")) {

		}
		else {
			APIBASEURL += 'workbench/';
		}
		Home.baseUrl = APIBASEURL;
		Home.loading = true;
		Home.onLoad = false;
		Home.noData = false;
		Home.isCDOLoaded = false;
		Home.isContactLoaded = false;//Changed By Sachin on 8/11/2019
		Home.isAccountLoaded = false;//Changed By Sachin on 12/11/2019
		Home.sortedByString = true;
		Home.sortedByDate = false;
		Home.sortedByNumber = false;
		Home.textAreaChanged=false;
		Home.isEloquaObjUpdated=false;
		

		Home.getSavedThemes = function (siteId) {
			$http({
				url: APIBASEURL + 'getSavedThemesOnHome',
				method: "GET",
				params: { siteId: siteId }
			}).then(function (response) {
				response = response.data;
				Home.themes = response;
			});
		}

		Home.init = function () {
			
			Home.siteId = $location.search().siteId;
			Home.assetName = $location.search().assetName;
			Home.assetId = $location.search().assetId;
			Home.instanceId = $location.search().instanceId;
			Home.selected = [];
			Home.selectedCDOFieldInternalName = '';
			Home.themes = [];
			Home.orderBy = 'Ascending (A-Z)';
			Home.Limit = 200;
			Home.loading = false;
			Home.Operaters = [
				{ 'name': 'exactly', 'value': 'exactly' },
				{ 'name': 'contains', 'value': 'contains' },
				{ 'name': 'starts with', 'value': 'startsWith' },
				{ 'name': 'ends with', 'value': 'endsWith' },
				{ 'name': 'matches wild card pattern', 'value': 'matchesWildCardPattern' },
				{ 'name': 'is blank', 'value': 'isBlank' },
				{ 'name': 'in picklist', 'value': 'inPicklist' },
				{ 'name': 'in quicklist', 'value': 'inQuicklist' },
			];
			Home.showStringOperaters = true;
			Home.sortedByStringOp = ['Ascending (A-Z)', 'Descending (Z-A)'];
			Home.sortedByDateOP = ['Ascending (Newest to Oldest)', 'Descending (Oldest to Newest)']
			Home.sortedByNumberOp = ['Ascending (Smallest to Largest)', 'Descending (Largest to Smallest)'];
			
			/* var info 			='https://apps.portqii.com/workbench/#!/';
			var clientId 		= eloquaConfig.clientId;
			var redirectUri 	= eloquaConfig.redirectUri;		
			//rediercting for OAUTH to get token
			 $window.location.href ='https://login.eloqua.com/auth/oauth2/authorize?response_type=token&client_id=' + clientId + '&redirect_uri=' + redirectUri + '&scope=full&state=' + info +', method="auto",code=302'; */
			 
			function getCookie(key) {
				var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
				return keyValue ? keyValue[2] : null;
			}
			Home.coockiRes = getCookie("userInfo");
			Home.currentUrl = $location.absUrl();
			if(Home.coockiRes){

			}else{
				var info 			='https://apps.portqii.com/EloquaWorkBenchNew/frontend/#!/main';
				var clientId 		= eloquaConfig.clientId;
				var redirectUri 	= eloquaConfig.redirectUri;	
			//console.log("https://login.eloqua.com/auth/oauth2/authorize?response_type=token&client_id=ad08939f-8eb0-4686-b50a-d738f12a6ad1&redirect_uri="+APIBASEURL+"/saveToken&scope=full&state=");
				$window.location.href='https://login.eloqua.com/auth/oauth2/authorize?response_type=token&client_id=' + clientId + '&redirect_uri=' + redirectUri + '&scope=full&state=' + encodeURIComponent(info);
			}
		}	

});