workbench
    .controller('homeController', function($http, $scope, $location) {
        var Home = $scope.Home = {};
        var paramValue = $location.search();
        Home.init = function() {
            // console.log("hello");
        }
        Home.init();
    });