bookApp.controller("signInCtrl", function ($scope, apiFactory){
    $scope.createUser = function(mail,password) {
        apiFactory.authAuthors(mail,password).then(function(messages) {
            $scope.messages = messages;
            console.log("response.data :", messages);
        });
    };
});