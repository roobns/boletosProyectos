'use strict';
var callRest = ["$q", "$http", function ($q, $http) {
        return {
            get: get,
            post: post
        };
        function get(url) {
          

            var deferred = $q.defer();
          $http.get(url).then(onSuccess, onFailure);

          function onSuccess(response) {
            deferred.resolve(response);
          }

          function onFailure(response) {
            deferred.reject(response);
          }
          return deferred.promise;


        };
        function post(url, params) {
            var defered = $q.defer();
            $http({url: url,
                method: "POST",
                data: $.param(params),
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
                }
            }).success(function (data) {
                defered.resolve(data);
            }).error(function (err) {
                defered.reject(err);
            });
            return defered.promise;
        };
    }];
module.exports = callRest;
