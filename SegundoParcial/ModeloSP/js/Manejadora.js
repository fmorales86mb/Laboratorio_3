"use strict";
var SP;
(function (SP) {
    $(document).ready(function () {
        $("#btnAgregar").click(Manejadora.AgregarEmpleado);
        $("#btnCancelar").click(Manejadora.LimpiarFormulario);
        $("#navMostrar").click(Manejadora.MostrarEmpleados);
        Lista = {};
        localStorage.setItem("lista", JSON.stringify(Lista));
    });
    var Lista;
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarEmpleado = function () {
            var nombre = String($("#txtNombre").val());
            var apellido = String($("#txtApellido").val());
            var edad = Number($("#txtEdad").val());
            var legajo = Number($("#txtLegajo").val());
            var horario = String($("#selHorario").val());
            var objEmpleado = new SP.Empleado(nombre, apellido, edad, horario, legajo);
            Lista = localStorage.getItem("lista");
            localStorage.setItem(String(objEmpleado.legajo), objEmpleado.EmpleadoToJson());
        };
        Manejadora.LimpiarFormulario = function () {
            $("#txtNombre").val("");
            $("#txtApellido").val("");
            $("#txtEdad").val("");
            $("#txtLegajo").val("");
            $("#selHorario").val("");
        };
        Manejadora.MostrarEmpleados = function () {
            for (var i = localStorage.length - 1; i >= 0; i--) {
                var key = localStorage.key(i);
                var storage = localStorage.getItem(key);
                var data = JSON.parse(storage);
                Manejadora.datosToGrilla(data, i);
            }
            $("[name='accionModificar']").click(Manejadora.GetTr);
            $("[name='accionBorrar']").click(Manejadora.GetTr);
        };
        Manejadora.Modificar = function (i) {
        };
        Manejadora.Eliminar = function (i) {
        };
        Manejadora.FiltrarPorHorario = function () {
        };
        Manejadora.PromedioEdadPorHorario = function () {
        };
        Manejadora.datosToGrilla = function (data, index) {
            var objEmpleado = new SP.Empleado(data.nombre, data.apellido, data.edad, data.horario, data.legajo);
            var tr = objEmpleado.CrearElementoTr();
            tr.cells[0].innerHTML = index;
            $("#bodyTabla").append(tr);
        };
        Manejadora.GetTr = function () {
            var tr = $(this).parent().parent();
            //Manejadora.Eliminar()  
        };
        return Manejadora;
    }());
    SP.Manejadora = Manejadora;
})(SP || (SP = {}));
