bookApp.controller("signInCtrl", function ($scope, apiFactory, $q){

    $scope.createUser = function(mail,password) { // <-- here is you value from the input
        apiFactory.postAuthors(mail,password)
            .then(
            function (data) {
                console.log("data :", data);
            },
            function (error) {
                console.log(error);
            }
        );
        
    };
});