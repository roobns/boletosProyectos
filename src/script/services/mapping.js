'use strict';
module.exports = function () {
    var serverPath = "http://vsdlapafro02.actinver.com.mx/fichaValor_App/jaxrs";
    var services = {
        issuerByStockExchange: {
            getPath: "/CapitalMarketRest/cmc01"
        },
        issuerOperationByPeriodQuery:{
            getPath: "/CapitalMarketRest/cmc02"
        },
        factsbyIssuerQuery:{
            getPath: "/CapitalMarketRest/cmc03"
        },
        issuerGeneralInfoQuery:{
            getPath: "/CapitalMarketRest/cmc04"
        },
        issuerHystoricalInfoQuery:{
            getPath: "/FtpConnectionRest/ftp01"
        },
        marketInfo:{
            getPath: "/MarketInfoRest/mki01"
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
