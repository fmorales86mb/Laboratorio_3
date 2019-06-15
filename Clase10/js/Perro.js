"use strict";
var Animal;
(function (Animal) {
    //Clases
    var Perro = /** @class */ (function () {
        // Constructor. No hay sobrecarga. Se usan parámetros opcionales.
        function Perro(name) {
            this.nombre = name;
        }
        // Propiedades ficticias
        Perro.prototype.GetNombre = function () {
            return this.nombre;
        };
        Perro.prototype.SetNombre = function (nombre) {
            this.nombre = nombre;
        };
        // Funciones
        Perro.prototype.Ladrar = function () {
            return "ladrido";
        };
        return Perro;
    }());
    Animal.Perro = Perro;
})(Animal || (Animal = {}));
