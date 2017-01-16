'use strict';
module.exports = function () {
            var flagShowMessage = false;
            var finalMessage;
            function responseMessage (messages) {
                    for (var i = 0; i < messages.length; i++) {
                        flagShowMessage = false;
                        if (messages[i].responseType === 'N') {
                            if (messages[i].ResponseCategor != 'INFO' || messages[i].ResponseCategor != 'WARN') {
                                if (messages[i].responseMessage.indexOf("Success") === -1 && messages[i].responseMessage.indexOf("OK") === -1 && messages[i].responseMessage.indexOf("EXITO") === -1 && messages[i].responseMessage.indexOf("Exito") === -1 && messages[i].responseMessage.indexOf("true") === -1 && messages[i].responseMessage.indexOf("TRUE") === -1) {
                                    finalMessage = messages[i].responseMessage;
                                    flagShowMessage = true;
                                    break;
                                }
                            }
                        }
                    }
                    if (!flagShowMessage) {
                        finalMessage = 'Error del Sistema';
                    }
                    return finalMessage;
                };

                return{
                        responseMessage: responseMessage
                 };
};
