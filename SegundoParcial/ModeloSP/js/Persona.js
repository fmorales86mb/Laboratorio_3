"use strict";
var SP;
(function (SP) {
    var Persona = /** @class */ (function () {
        function Persona(nombre, apellido, edad) {
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }
        Persona.prototype.PersonaToJson = function () {
            return JSON.stringify(this);
        };
        return Persona;
    }());
    SP.Persona = Persona;
})(SP || (SP = {}));
