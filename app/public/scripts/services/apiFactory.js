bookApp.service('apiFactory', ['$http', '$log', '$q','$timeout', function($http, $log, $q,$timeout) {
    var urlBase = "http://localhost:8080";

    var authAuthors = function(mail,password) {
        var deferred = $q.defer();
        $timeout(function() {
            $http.post(urlBase + '/api/authenticate',{username:mail, password: password})
                .then(function (response) {
                    console.log("response.data :", response.data);
                    deferred.resolve(response.data);
                }, function (reject) {
                    console.log("reject.data :", reject.data);
                    deferred.reject(reject);
                });
        }, 2000);

        return deferred.promise;
    };

    return {
        authAuthors: authAuthors
    };
/*    return {
        postAuthors : function (mail,password) {
            $http.post(urlBase + '/api/authors', {username:mail, password: password})
                .then(function (response) {
                    console.log("response.data :", response.data);
                    deferred.resolve(response.data);
                }, function (reject) {
                    console.log("reject.data :", response.data);
                    deferred.reject(reject);
                });
            return deferred.promise;
        },
        getAuthors : function () {
            $http.get(urlBase + '/api/authors')
                .then(function (response) {
                    console.log("response.data :", response.data);
                    deferred.resolve(response.data);
                }, function (reject) {
                    console.log("reject.data :", response.data);
                    deferred.reject(reject);
                });
            return deferred.promise;
        },
        authAuthors : function (mail,password) {
            $http.post(urlBase + '/api/authenticate',{username:mail, password: password})
                .then(function (response) {
                    console.log("response.data :", response.data);
                    deferred.resolve(response.data);
                }, function (reject) {
                    console.log("reject.data :", reject.data);
                    deferred.reject(reject);
                });
            return deferred.promise;
        },
        getBooks : function () {
            $http.get(urlBase + '/api/books')
                .then(function (response) {
                    deferred.resolve(response.data);
                }, function (reject) {
                    deferred.reject(reject);
                });
            return deferred.promise;
        }
    }*/
}]);