workbench
    .controller('homeController', function($http, $scope, $location) {

        var Home = $scope.Home = {};
        var paramValue = $location.search();
        //var siteId = paramValue.siteId;
        //var userId = paramValue.userId;
        // var Home = $scope.Home = {};
        //var todayDate = new Date();

        Home.init = function() {
            console.log("hello");

        }



        Home.init();
    });