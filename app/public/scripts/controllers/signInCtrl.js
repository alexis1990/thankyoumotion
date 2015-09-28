bookApp.controller("signInCtrl", function ($scope, apiFactory){
    $scope.createUser = function(mail,password) {
        apiFactory.postAuthors(mail,password)
            .then(function (response) {
                console.log("response :", response);
            }, function (reject) {
                console.log("reject :", reject);
            });
    };
});