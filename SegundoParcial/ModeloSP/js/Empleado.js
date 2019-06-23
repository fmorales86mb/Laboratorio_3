"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SP;
(function (SP) {
    var Empleado = /** @class */ (function (_super) {
        __extends(Empleado, _super);
        function Empleado(nombre, apellido, edad, horario, legajo) {
            var _this = _super.call(this, nombre, apellido, edad) || this;
            _this.horario = horario;
            _this.legajo = legajo;
            return _this;
        }
        Empleado.prototype.EmpleadoToJson = function () {
            return JSON.stringify(this);
        };
        Empleado.JsonToEmpleado = function (objJson) {
            var objEmpleado = new Empleado(String(objJson.nombre), String(objJson.apellido), Number(objJson.edad), String(objJson.horario), Number(objJson.legajo));
            return objEmpleado;
        };
        Empleado.prototype.CrearElementoTr = function () {
            var tr = document.createElement("tr");
            var tdEdad = this.CrearElementoTd(String(this.edad), "edad");
            var tdNombre = this.CrearElementoTd(this.nombre, "nombre");
            var tdApellido = this.CrearElementoTd(this.apellido, "apellido");
            var tdHorario = this.CrearElementoTd(this.horario, "horario");
            var tdLegajo = this.CrearElementoTd(String(this.legajo), "legajo");
            var tdAccion = this.CrearElementoTdAccion();
            tr.appendChild(tdNombre);
            tr.appendChild(tdApellido);
            tr.appendChild(tdEdad);
            tr.appendChild(tdLegajo);
            tr.appendChild(tdHorario);
            tr.appendChild(tdAccion);
            return tr;
        };
        Empleado.prototype.CrearElementoTd = function (dato, key) {
            var td = document.createElement("td");
            td.setAttribute("name", key);
            td.innerHTML = dato;
            return td;
        };
        Empleado.prototype.CrearElementoTdAccion = function () {
            var btnBorrar = document.createElement("button");
            var btnModificar = document.createElement("button");
            var td = document.createElement("td");
            btnModificar.setAttribute("name", "accionModificar");
            btnBorrar.setAttribute("name", "accionBorrar");
            $(btnBorrar).click(SP.Manejadora.GetTr);
            btnBorrar.innerHTML = "Borrar";
            btnModificar.innerHTML = "Modificar";
            td.appendChild(btnModificar);
            td.appendChild(btnBorrar);
            return td;
        };
        return Empleado;
    }(SP.Persona));
    SP.Empleado = Empleado;
})(SP || (SP = {}));
