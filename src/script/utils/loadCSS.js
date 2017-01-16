var loadCSS = function (url){
    var element=  document.createElement('link');
    element.rel='stylesheet';
    element.href=url;
    document.head.appendChild(element);
};
module.exports = loadCSS;