"use strict";
var LaComanda;
(function (LaComanda) {
    var Item = /** @class */ (function () {
        function Item(id, descripcion, sector, precio) {
            this.Url = "http://localhost:80/LaComanda/items";
            this.id = id;
            this.descripcion = descripcion;
            this.sector = sector;
            this.precio = precio;
        }
        Item.prototype.getId = function () {
            return this.id;
        };
        Item.prototype.getDescripcion = function () {
            return this.descripcion;
        };
        Item.prototype.getSector = function () {
            return this.sector;
        };
        Item.prototype.getPrecio = function () {
            return this.precio;
        };
        Item.prototype.ToJson = function () {
            var jsonObj = {
                id: this.id,
                descripcion: this.descripcion,
                sector: this.sector,
                precio: this.precio
            };
            return jsonObj;
        };
        Item.prototype.PostItem = function () {
            $.post(this.Url, this.ToJson(), function (data, status) {
            });
        };
        return Item;
    }());
    LaComanda.Item = Item;
})(LaComanda || (LaComanda = {}));
