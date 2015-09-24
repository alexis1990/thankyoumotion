/**
 * Created by alexiszrihen on 21/09/2015.
 */
var bookApp = angular.module("bookApp", []);

bookApp.config(function($routeProvider){
    console.log($routeProvider);
    $routeProvider
        .when("/",{
            controller: "listBooksCtrl",
            templateUrl: "views/listBooksView.html"
        })
        .when("/signIn",{
            controller: "signInCtrl",
            templateUrl: "views/signInView.html"
        });

    $routeProvider.otherwise({"redirectTo": "/"});
});