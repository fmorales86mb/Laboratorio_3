"use strict";
var SP;
(function (SP) {
    var Vehiculo = /** @class */ (function () {
        function Vehiculo(id, marca, modelo, precio) {
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }
        Vehiculo.prototype.CrearElementoTr = function () {
            var tr = document.createElement("tr");
            var tdId = this.CrearElementoTd(String(this.id), "id");
            var tdMarca = this.CrearElementoTd(this.marca, "marca");
            var tdModelo = this.CrearElementoTd(this.modelo, "modelo");
            var tdPrecio = this.CrearElementoTd(String(this.precio), "precio");
            var tdAccion = this.CrearElementoTdAccion();
            tdAccion.setAttribute("class", "d-flex justify-content-around");
            tr.appendChild(tdId);
            tr.appendChild(tdMarca);
            tr.appendChild(tdModelo);
            tr.appendChild(tdPrecio);
            tr.appendChild(tdAccion);
            return tr;
        };
        Vehiculo.prototype.CrearElementoTd = function (dato, key) {
            var td = document.createElement("td");
            td.setAttribute("name", key);
            td.setAttribute("class", "text-center");
            td.innerHTML = dato;
            return td;
        };
        Vehiculo.prototype.CrearElementoTdAccion = function () {
            var btnBorrar = document.createElement("button");
            var td = document.createElement("td");
            btnBorrar.innerText = "Eliminar";
            btnBorrar.setAttribute("name", "accionBorrar");
            btnBorrar.setAttribute("type", "button");
            btnBorrar.setAttribute("class", "btn btn-success");
            $(btnBorrar).click(SP.Manejadora.GetTr);
            td.appendChild(btnBorrar);
            return td;
        };
        return Vehiculo;
    }());
    SP.Vehiculo = Vehiculo;
})(SP || (SP = {}));
