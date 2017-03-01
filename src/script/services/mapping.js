'use strict';
module.exports = function () {
    var serverPath = "";
    var services = {
        getTickes: {
            getPath: "dev/celebra-back/getTickes"
        },updateEstatus: {
            getPath: "dev/celebra-back/updateEstatus"
        },getUsers: {
            getPath: "dev/celebra-back/getUsers"
        },getWrongUser: {
            getPath: "dev/celebra-back/getWrongUser"
        },getSelling: {
            getPath: "dev/celebra-back/getSelling"
        },sendMail: {
            getPath: "dev/celebra-back/sendMail"
        },getTicketValidate: {
            getPath: "dev/celebra-back/getTicketValidate"
        },login: {
            getPath: "dev/celebra-back/login"
        },updateUser: {
            getPath: "dev/celebra-back/updateUser"
        },getDataReport: {
            getPath: "dev/celebra-back/getDataReport"
        },getTickesWithTitular: {
            getPath: "dev/celebra-back/getTickesWithTitular"
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
        return sessionStorage.path + "/" + services[service].getPath;
    };
    this.pathGet = function (service, params) {
        return sessionStorage.path + "/" + services[service].getPath + buildParams(params);
    };

};
