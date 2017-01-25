'use strict';
module.exports = function () {
    var serverPath = "";
    var services = {
        getTickes: {
            getPath: "celebra-back/getTickes"
        },getUsers: {
            getPath: "celebra-back/getUsers"
        },getWrongUser: {
            getPath: "celebra-back/getWrongUser"
        },getSelling: {
            getPath: "celebra-back/getSelling"
        },sendMail: {
            getPath: "celebra-back/sendMail"
        },login: {
            getPath: "celebra-back/login"
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
        return "http://celebrausana.com/" + services[service].getPath;
    };
    this.pathGet = function (service, params) {
        return "http://celebrausana.com/" + services[service].getPath + buildParams(params);
    };

};
