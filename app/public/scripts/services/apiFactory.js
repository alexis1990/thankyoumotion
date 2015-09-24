bookApp.service('apiFactory', ['$http', '$log', '$q', function($http, $log, $q) {
    var urlBase = "http://localhost:8080";
    var deferred = $q.defer();

    this.getBooks = function () {
        return $http.get(urlBase + '/api/books')
            .then(function (response) {
                deferred.resolve(response.data);
                return deferred.promise;
            }, function (reject) {
                deferred.reject(reject);
                return deferred.promise;
            });
    };

    this.postAuthors = function (mail,password) {
        return $http.post(urlBase + '/api/authors', {username:mail, password: password})
            .then(function (response) {
                console.log("response :", response.data);
                return deferred.promise;
            }, function (reject) {
                deferred.reject(reject);
                return deferred.promise;
            });
    };
}]);