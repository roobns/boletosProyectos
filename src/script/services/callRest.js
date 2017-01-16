'use strict';
var callRest = ["$q", "$http", function ($q, $http) {
        return {
            get: get,
            post: post
        };
        function get(url) {
            var defered = $q.defer();
            $http.get(url).success(function (data) {
                defered.resolve(data);
            }).error(function (err) {
                defered.reject(err);
            });
            return defered.promise;
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
