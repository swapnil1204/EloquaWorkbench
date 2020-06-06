workbench
    .controller('mainController', function($http, $scope, $location) {
        var main = $scope.main = {};
        main.init = function() {
            // console.log("hello");
        }
        main.init();

        //Get Eloqua Api's list
        $scope.getEloquaDropDown = function(id) {
            $scope.Eloqua_api = null;
            console.log("clicked");
            $http({
                    url: "http://localhost:8080/custom-api/1.0/assets",
                    method: "GET",
                    params: { "id": "1" }
                }).then(function(response) {
                    console.log(response.data);
                    $scope.Eloqua_api = response.data;

                })
                .catch(function(error) {
                    alert("Error" + error)
                });
        }

        //Get Accounts List Options
        $scope.getAccountsDropDown = function(id) {
            //console.log(id);

            let parentid = id;
            var URL; { URL = "http://localhost:8080/custom-api/1.0/assets-types/" + parentid; }
            //console.log(URL);
            $http({
                    url: URL,
                    method: "GET",
                    //params: { "id": id }
                }).then(function(response) {
                    console.log(response.data);
                    $scope.Accounts_api = response.data;
                    $scope.id = id;
                })
                .catch(function(error) {
                    alert("Error" + error)
                });
        }

        //Get the field Title for inputs(Create Account Api)
        $scope.CreateAnAccount = function(id) {
                document.getElementById("getStarted").style.display = "none";
                document.getElementById("main").style.display = "block";
                $http({
                        url: "http://localhost:8080/custom-api/1.0/assets-type-parameters/" + id + '/' + id,
                        method: "GET",
                        params: { "id": id }
                    }).then(function(response) {
                        console.log(response.data);
                        $scope.Create_api = response.data.parameter;
                        $scope.Create_head = response.data.elements;
                        $scope.Id = id;

                    })
                    .catch(function(error) {
                        alert("Error" + error)
                    });
            }
            //Get data from Form
        $scope.getFormData = function() {
            $scope.text;
            console.log($scope.text);
        }

        //Swap Api div And Query div
        $scope.Query_function = function() {
            document.getElementById("Query_Ui").style.borderBottom = "solid 2px red";
            document.getElementById("Query").style.display = "block";
            document.getElementById("Api_div").style.display = "none";
            document.getElementById("Apiform").style.borderBottom = "";
            document.getElementById("getStarted").style.display = "none";
        }

        $scope.Apidiv_function = function() {
            document.getElementById("Api_div").style.display = "block";
            document.getElementById("Query").style.display = "none";
            document.getElementById("Apiform").style.borderBottom = "solid 2px red";
            document.getElementById("Query_Ui").style.borderBottom = "";
            document.getElementById("getStarted").style.display = "none";
        }

        $scope.getStartedpage = function() {

            document.getElementById("getStarted").style.display = "block";
            document.getElementById("main").style.display = "none";
            //  document.getElementById("howToStart").style.color = "red";

        }


    });