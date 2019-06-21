"use strict";
var LaComanda;
(function (LaComanda) {
    var Producto = /** @class */ (function () {
        function Producto(id, nombre, rolEncargado, precio) {
            this.id = id;
            this.nombre = nombre;
            this.rolEncargado = rolEncargado;
            this.precio = precio;
        }
        Producto.prototype.getId = function () {
            return this.id;
        };
        Producto.prototype.getDescripcion = function () {
            return this.nombre;
        };
        Producto.prototype.getSector = function () {
            return this.rolEncargado;
        };
        Producto.prototype.getPrecio = function () {
            return this.precio;
        };
        Producto.prototype.ToJson = function () {
            var jsonObj = {
                id: this.id,
                nombre: this.nombre,
                rolEncargado: this.rolEncargado,
                precio: this.precio
            };
            return jsonObj;
        };
        Producto.prototype.CrearFilaDelElemento = function () {
            var tr;
            // // let tdId = new HTMLTableCellElement()
            // // tr.appendChild(tdId);
            // return tr;
        };
        Producto.prototype.PostItem = function () {
            $.post(Producto.UrlProductos, this.ToJson(), function (data, status) {
            });
        };
        Producto.UrlProductos = "http://localhost:80/LaComanda/productos/";
        return Producto;
    }());
    LaComanda.Producto = Producto;
})(LaComanda || (LaComanda = {}));
