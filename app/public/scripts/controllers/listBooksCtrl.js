bookApp.controller("listBooksCtrl", function ($scope, apiFactory, $q){
    apiFactory.getBooks()
        .then(
        function (data) {
            $scope.booksList = data;
        },
        function (error) {
            console.log(error);
        }
    );
});