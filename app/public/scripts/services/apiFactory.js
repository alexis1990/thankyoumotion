bookApp.service('apiFactory', ['$http', '$log', '$q', function($http, $log, $q) {
    var urlBase = "http://localhost:8080";
    var deferred = $q.defer();
    return {
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
        authAuthors : function (mail,password) {
            $http.post(urlBase + '/api/authenticate',{username:mail, password: password})
                .then(function (response) {
                    console.log("response.data :", response.data);
                    deferred.resolve(response.data);
                }, function (reject) {
                    console.log("reject.data :", response.data);
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
    }
}]);