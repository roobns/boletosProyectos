'use strict';
var app = angular.module('recordApp');






app.directive('myRow', function () {
     return {
        restrict : 'A',
        replace : true,
        scope : { 
                  id: '@id',
                  nombre : '@nombre',
                  apellidos : '@apellidos',
                  ciudad: '@ciudad',
                  estado: '@estado',
                  telefono: '@telefono',
                  email: '@email',
                  noOrden: '@noOrden',
                  rango: '@rango',
                  avanceRango: '@avanceRango',
                  motivadorPlatino: '@motivadorPlatino',
                  motivadorPlatinoPremier: '@motivadorPlatinoPremier',
                  ejecutivo: '@ejecutivo',
                  chf: '@chf',
                  transferencia: '@transferencia',
                  accesoEntrenamiento: '@accesoEntrenamiento',
                  accesoSalaEjecutiva: '@accesoSalaEjecutiva',
                  observaciones: '@observaciones'   },
        template : '<tbody> '+
        '<tr class=" ">'+
            '<td data-title="\'Nombre\'" sortable="\'nombre\'" filter="{ nombre: \'text\'}">'+
            '   Nombre:</br><input type="text" name="" value="{{nombre}}" >'+
            '</td>'+
            '<td data-title="\'Apellidos\'" sortable="\'apellidos\'" filter="{ apellidos: \'text\'}">'+
            '    Apellidos:</br><input type="text" name="" value="{{apellidos}}" >    '+
            '</td>'+
        '</tr>'+    
        '<tr class=" ">'+
            '<td data-title="\'Ciudad\'" sortable="\'ciudad\'" filter="{ ciudad: \'text\'}">'+
            '    Ciudad:</br><input type="text" name="" value="{{ciudad}}" >'+
            '</td>'+
            '<td data-title="\'Estado\'" sortable="\'estado\'" filter="{ estado: \'text\'}">'+
            '    Estado:</br><input type="text" name="" value="{{estado}}" >'+
            '</td>'+
        '</tr>'+    
        '<tr class=" ">'+
            '<td data-title="\'Teléfono\'" sortable="\'telefono\'" filter="{ telefono: \'text\'}">'+
            '    Teléfono:</br><input type="text" name="" value="{{telefono}}"  >'+
            '</td>'+
            '<td data-title="\'E-Mail\'" sortable="\'email\'" filter="{ email: \'text\'}">'+
            '    E-Mail:</br><input type="text" name="" value="{{email}}" >'+
            '</td>'+
        '</tr>'+    
        '<tr class=" ">'+
            '<td data-title="\'Numero orden\'" sortable="\'noOrden\'" filter="{ noOrden: \'text\'}">'+
            '    Numero orden:</br><input type="text" name="" value="{{noOrden}}"   >'+
            '</td>'+
            '<td data-title="\'Rango\'" sortable="\'rango\'" filter="{ rango: \'text\'}">'+
            '    Rango:</br><input type="text" name="" value="{{rangod}}"   >'+
            '</td>'+
        '</tr>'+    
        '<tr class=" ">'+
            '<td data-title="\'Avance de rango\'" sortable="\'avanceRango\'" filter="{ avanceRango: \'text\'}">'+
            '    Avance de rango:</br><input type="text" name="" value="{{avanceRangod}}"   >'+
            '</td>'+
            '<td data-title="\'Motivador platino\'" sortable="\'motivadorPlatino\'" filter="{ motivadorPlatino: \'text\'}">'+
            '    Motivador platino:</br><input type="text" name="" value="{{motivadorPlatinod}}"   >'+
            '</td>'+
        '</tr>'+    
        '<tr class=" ">'+
            '<td data-title="\'Motivador platino premier\'" sortable="\'motivadorPlatinoPremier\'" filter="{ motivadorPlatinoPremier: \'text\'}">'+
            '    Motivador platino premier:</br><input type="text" name="" value="{{motivadorPlatinoPremierd}}"   >'+
            '</td>'+
            '<td data-title="\'Ejecutivo\'" sortable="\'ejecutivo\'" filter="{ ejecutivo: \'text\'}">'+
            '    Ejecutivo:</br><input type="text" name="" value="{{ejecutivod}}"   >'+
            '</td>'+
        '</tr>'+    
        '<tr class=" ">'+
            '<td data-title="\'CHF\'" sortable="\'chf\'" filter="{ chf: \'text\'}">'+
            '    CHF:</br><input type="text" name="" value="{{chfd}}"   >'+
            '</td>'+
            '<td data-title="\'Transferencia\'" sortable="\'transferencia\'" filter="{ transferencia: \'text\'}">'+
            '    Transferencia:</br><input type="text" name="" value="{{transferenciad}}"   >'+
            '</td>'+
        '</tr>'+    
        '<tr class=" ">'+
            '<td data-title="\'Acceso al entrenamiento\'" sortable="\'accesoEntrenamiento\'" filter="{ accesoEntrenamiento: \'text\'}">'+
            '    Acceso al entrenamiento:</br><input type="text" name="" value="{{accesoEntrenamientod}}"   >'+
            '</td>'+
            '<td data-title="\'Acceso a sala ejecutiva\'" sortable="\'accesoSalaEjecutiva\'" filter="{ accesoSalaEjecutiva: \'text\'}">'+
            '     Acceso a sala ejecutiva:</br><input type="text" name="" value="{{accesoSalaEjecutivad}}"   >'+
            '</td>'+
        '</tr>'+    
        '<tr class=" ">'+
            '<td data-title="\'Observaciones\'" sortable="\'observaciones\'" filter="{ observaciones: \'text\'}">'+
            '    Observaciones:</br><input type="text" name="" value="{{observacionesd}}"   >'+
            '</td>'+
            '<td>'+
            '</td>'+

        '</tr>'+
        ' </tbody>' 
     }
 });

 angular.module('ngJsonExportExcel', [])
        .directive('ngJsonExportExcel', function () {
            return {
                restrict: 'AE',
                scope: {
                    data : '=',
                    filename: '=?',
                    reportFields: '='
                },
                link: function (scope, element) {
                    scope.filename = !!scope.filename ? scope.filename : 'export-excel';

                    var fields = [];
                    var header = [];

                    angular.forEach(scope.reportFields, function(field, key) {
                        if(!field || !key) {
                            throw new Error('error json report fields');
                        }

                        fields.push(key);
                        header.push(field);
                    });

                    element.bind('click', function() {
                        var bodyData = _bodyData();
                        var strData = _convertToExcel(bodyData);

                        var blob = new Blob([strData], {type: "text/plain;charset=utf-8"});

                        return saveAs(blob, [scope.filename + '.csv']);
                    });

                    function _bodyData() {
                        var data = scope.data;
                        var body = "";
                        angular.forEach(data, function(dataItem) {
                            var rowItems = [];

                            angular.forEach(fields, function(field) {
                                if(field.indexOf('.')) {
                                    field = field.split(".");
                                    var curItem = dataItem;

                                    // deep access to obect property
                                    angular.forEach(field, function(prop){
                                        if (curItem !== null && curItem !== undefined) {
                                            curItem = curItem[prop];
                                        }
                                    });

                                    data = curItem;
                                }
                                else {
                                    data = dataItem[field];
                                }

                                var fieldValue = data !== null ? data : ' ';

                                if (fieldValue !== undefined && angular.isObject(fieldValue)) {
                                    fieldValue = _objectToString(fieldValue);
                                }

                                rowItems.push(fieldValue);
                            });

                            body += rowItems.toString() + '\n';
                        });

                        return body;
                    }

                    function _convertToExcel(body) {
                        return header + '\n' + body;
                    }

                    function _objectToString(object) {
                        var output = '';
                        angular.forEach(object, function(value, key) {
                            output += key + ':' + value + ' ';
                        });

                        return '"' + output + '"';
                    }
                }
            };
        });