bookApp.controller("signInCtrl", function ($scope, apiFactory){
    $scope.createUser = function(mail,password) {
        apiFactory.authAuthors(mail,password)
            .then(function (response) {
                $scope.authorization = response;
                console.log("response.authors :", $scope.authorization);
            }, function (reject) {
                console.log("reject :", reject);
            });
    };
});