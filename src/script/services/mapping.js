'use strict';
module.exports = function () {
    var serverPath = "";
    var services = {
        issuerByStockExchange: {
            getPath: "/CapitalMarketRest/cmc01"
        }
    };

    var buildParams = function (params) {
        var paramsStr = '';
        params.forEach(function (entry) {
            paramsStr += "/" + entry;
        });
        if (params.length > 0)
            paramsStr += "?language=SPA";
        return paramsStr;
    };

    this.pathPost = function (service) {
        return serverPath + services[service].getPath;
    };
    this.pathGet = function (service, params) {
        return serverPath + services[service].getPath + buildParams(params);
    };

};
