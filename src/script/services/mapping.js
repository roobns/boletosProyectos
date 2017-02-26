'use strict';
module.exports = function () {
    var serverPath = "";
    var services = {
        getTickes: {
            getPath: "celebra-back/getTickes"
        },updateEstatus: {
            getPath: "celebra-back/updateEstatus"
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
        },updateUser: {
            getPath: "celebra-back/updateUser"
        },getDataReport: {
            getPath: "celebra-back/getDataReport"
        },getTickesWithTitular: {
            getPath: "celebra-back/getTickesWithTitular"
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
