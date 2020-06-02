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

                    url:"http://localhost:4000/api/REST/1.0/data/AccountApis",
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

        $scope.getParameterForCreateAccount = function() {
            console.log("clicked getParameterForCreateAccount");
            $http({

                    url:"http://localhost:4000/api/REST/1.0/data/CreateAccountApis",
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