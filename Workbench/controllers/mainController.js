workbench
    .controller('mainController', function($http, $scope, $location) {
        var main = $scope.main = {};
        main.init = function() {
            console.log("hello");


        }
        main.init();

        $scope.Query_function = function() {
            document.getElementById("Query_Ui").style.borderBottom = "solid 2px red";
            document.getElementById("Query").style.display = "block";
            document.getElementById("Api_div").style.display = "none";
            document.getElementById("Apiform").style.borderBottom = "";



        }

        $scope.Apidiv_function = function() {
            document.getElementById("Api_div").style.display = "block";
            document.getElementById("Query").style.display = "none";
            document.getElementById("Apiform").style.borderBottom = "solid 2px red";
            document.getElementById("Query_Ui").style.borderBottom = "";

        }

        $scope.getdropdown = function(id) {
            console.log("clicked");
            $http({
                    url: "http://localhost:4000/api/REST/1.0/data/OracleEloquaApis",
                    method: "GET",
                    data: {

                    }
                }).then(function(response) {
                    console.log(response.data);
                    $scope.Eloqua_api = response.data;

                })
                .catch(function(error) {
                    alert("Error" + error)
                });


        }
        $scope.getaccountdropdown = function(id) {
            console.log(id);

            var URL; { URL = "http://localhost:4000/api/REST/1.0/data/AccountApis"; }
            console.log(URL);
            $http({
                    url: URL,
                    method: "GET",
                    data: {}
                }).then(function(response) {
                    console.log(response.data);
                    $scope.Accounts_api = response.data;
                })
                .catch(function(error) {
                    alert("Error" + error)
                });
        }

        $scope.CreateAnAccount = function() {
            $http({
                    url: "http://localhost:4000/api/REST/1.0/data/CreateAccountApis",
                    method: "GET",
                    data: {}
                }).then(function(response) {
                    console.log(response.data);
                    $scope.Create_api = response.data.parameter;
                    $scope.Create_head = response.data.elements;

                })
                .catch(function(error) {
                    alert("Error" + error)
                });
        }
    });