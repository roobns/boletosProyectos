'use strict';
module.exports = function () {
    var serverPath = "";
    var services = {
        getTickes: {
            getPath: "celebra-back/getTickes"
        },getUsers: {
            getPath: "celebra-back/getUsers"
        }

    };

    var buildParams = function (params) {
        var paramsStr = '';
        params.forEach(function (entry) {
            paramsStr += "/" + entry;
        });

        return paramsStr;
    };

    this.pathPost = function (service) {
        return serverPath + services[service].getPath;
    };
    this.pathGet = function (service, params) {
        return "http://celebrausana.com/" + services[service].getPath + buildParams(params);
    };

};
