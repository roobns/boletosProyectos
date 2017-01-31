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
        },getTicketValidate: {
            getPath: "celebra-back/getTicketValidate"
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
        console.log(sessionStorage.path + "/" + services[service].getPath);
        return sessionStorage.path + "/" + services[service].getPath;
    };
    this.pathGet = function (service, params) {
        return sessionStorage.path + "/" + services[service].getPath + buildParams(params);
    };

};
