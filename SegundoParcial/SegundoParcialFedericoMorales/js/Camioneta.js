"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var SP;
(function (SP) {
    var Camioneta = /** @class */ (function (_super) {
        __extends(Camioneta, _super);
        function Camioneta(id, marca, modelo, precio, cuatroXcuatro) {
            var _this = _super.call(this, id, marca, modelo, precio) || this;
            _this.cuatroXcuatro = cuatroXcuatro;
            ;
            return _this;
        }
        Camioneta.JsonToObj = function (objJson) {
            var obj = new Camioneta(Number(objJson.id), String(objJson.marca), String(objJson.modelo), Number(objJson.precio), Boolean(objJson.cuatroXcuatro));
            return obj;
        };
        return Camioneta;
    }(SP.Vehiculo));
    SP.Camioneta = Camioneta;
})(SP || (SP = {}));
