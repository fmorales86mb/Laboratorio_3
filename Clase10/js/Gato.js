"use strict";
var Animal;
(function (Animal) {
    //Clases
    var Gato = /** @class */ (function () {
        // Constructor. No hay sobrecarga. Se usan parámetros opcionales.
        function Gato(name) {
            this.nombre = name;
        }
        // Propiedades ficticias
        Gato.prototype.GetNombre = function () {
            return this.nombre;
        };
        Gato.prototype.SetNombre = function (nombre) {
            this.nombre = nombre;
        };
        // Funciones
        Gato.prototype.Ladrar = function () {
            return "ladrido";
        };
        return Gato;
    }());
    Animal.Gato = Gato;
})(Animal || (Animal = {}));
