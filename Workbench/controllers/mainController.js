workbench
    .controller('mainController', function($http, $scope, $location) {
        var main = $scope.main = {};
        main.init = function() {
            console.log("hello");


        }
        main.init();

        $scope.Query_function = function() {
            document.getElementById("Query").style.display = "block";
            document.getElementById("Api_div").style.display = "none";


        }

        $scope.Apidiv_function = function() {
            document.getElementById("Api_div").style.display = "block";
            document.getElementById("Query").style.display = "none";

        }

        $scope.getdropdown = function() {
            console.log("clicked");
            $http({
                    url: "/api/REST/1.0/data/OracleEloquaApis",
                    method: "GET",
                    data: {
                        "Id": "1"
                    }
                }).then(function(response) {
                    console.log(response.data);


                })
                .catch(function(error) {
                    alert("Error" + error)
                });
        }
    });