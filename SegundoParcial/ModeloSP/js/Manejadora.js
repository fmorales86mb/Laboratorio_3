"use strict";
var SP;
(function (SP) {
    $(document).ready(function () {
        $("#btnAgregar").click(Manejadora.AgregarEmpleado);
        $("#btnCancelar").click(Manejadora.LimpiarFormulario);
        $("#navMostrar").click(Manejadora.MostrarEmpleados);
        $("#btnModificar").click(Manejadora.AccionModificar);
        $("#selHorarioModal").change(Manejadora.FiltrarPorHorario);
        $("#selHorarioPromedioModal").change(Manejadora.PromedioEdadPorHorario);
        $("#btnModificar").hide();
        Manejadora.InitLocalStorage();
    });
    var Listado = [{ "nombre": "Maria", "apellido": "Mora", "edad": 333, "horario": "Mañana", "legajo": 24 }, { "nombre": "Federico", "apellido": "Morales", "edad": 33, "horario": "Mañana", "legajo": 41234 }, { "nombre": "Paula", "apellido": "Abeledo", "edad": 32, "horario": "Noche", "legajo": 52345 }, { "nombre": "Juan", "apellido": "Narvaja", "edad": 24, "horario": "Mañana", "legajo": 566463 }, { "nombre": "Juan", "apellido": "Bach", "edad": 10, "horario": "Noche", "legajo": 643523 }, { "nombre": "Tito", "apellido": "Pulo", "edad": 13, "horario": "Noche", "legajo": 6345234 }];
    var ListaKey = "Lista";
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
            Manejadora.AddItemToLocalStorage(objEmpleado);
        };
        Manejadora.LimpiarFormulario = function () {
            $("#txtNombre").val("");
            $("#txtApellido").val("");
            $("#txtEdad").val("");
            $("#txtLegajo").val("");
            $("#selHorario").val("");
        };
        Manejadora.MostrarEmpleados = function () {
            Manejadora.ClearGrid();
            var lista = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            for (var i = 0; i < lista.length; i++) {
                var item = SP.Empleado.JsonToEmpleado(lista[i]);
                Manejadora.ElementoToGrilla(item, i);
            }
        };
        Manejadora.Modificar = function (i) {
            $("#tituloForm").text("Modificar Empleado");
            $("#btnAgregar").hide();
            $("#btnModificar").show();
            var item = Manejadora.GetItemInLocalStorage(i);
            $("#txtNombre").val(item.nombre);
            $("#txtApellido").val(item.apellido);
            $("#txtEdad").val(item.edad);
            $("#txtLegajo").val(item.legajo);
            $("#selHorario").val(item.horario);
        };
        Manejadora.Eliminar = function (i) {
            Manejadora.DeleteToLocalStorage(i);
            Manejadora.MostrarEmpleados();
        };
        Manejadora.FiltrarPorHorario = function () {
            var lista = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            if ($(this).val() == 1) {
                lista = lista.filter(function (ite) { return ite.horario == "Mañana"; });
            }
            else {
                lista = lista.filter(function (ite) { return ite.horario == "Noche"; });
            }
            Manejadora.ClearGrid();
            for (var i = 0; i < lista.length; i++) {
                var item = SP.Empleado.JsonToEmpleado(lista[i]);
                Manejadora.ElementoToGrilla(item, i);
            }
        };
        Manejadora.PromedioEdadPorHorario = function () {
            var lista = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            if ($(this).val() == 1) {
                lista = lista.filter(function (ite) { return ite.horario == "Mañana"; });
            }
            else {
                lista = lista.filter(function (ite) { return ite.horario == "Noche"; });
            }
            var sumatoria = lista.reduce(function (suma, item) {
                return suma += item.edad;
            }, 0);
            $("#lblPromedio").text("Promedio de " + String(sumatoria));
        };
        //#region  Métodos propios     
        Manejadora.GetTr = function () {
            SP.Tr = Manejadora.BuscarPadreTipo($(this), "TR");
            var index = Number(SP.Tr.getAttribute("index"));
            if ($(this).attr("name") == "accionBorrar") {
                SP.Tr.remove();
                Manejadora.Eliminar(index);
            }
            else {
                Manejadora.Modificar(index);
            }
        };
        Manejadora.AccionModificar = function () {
            var nombre = String($("#txtNombre").val());
            var apellido = String($("#txtApellido").val());
            var edad = Number($("#txtEdad").val());
            var legajo = Number($("#txtLegajo").val());
            var horario = String($("#selHorario").val());
            var index = SP.Tr.getAttribute("index");
            var objEmpleado = new SP.Empleado(nombre, apellido, edad, horario, legajo);
            Manejadora.UpdateItemToLocalStorage(objEmpleado, index);
            var nuevoTr = objEmpleado.CrearElementoTr();
            nuevoTr.setAttribute("index", String(index));
            SP.Tr.replaceWith(nuevoTr);
            $("#tituloForm").text("Alta Empleado");
            $("#btnAgregar").show();
            $("#btnModificar").hide();
        };
        Manejadora.ElementoToGrilla = function (objElemento, index) {
            var tr = objElemento.CrearElementoTr();
            tr.setAttribute("index", index);
            $("#bodyTabla").append(tr);
        };
        Manejadora.AddItemToLocalStorage = function (item) {
            var lista = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            lista[lista.length] = item;
            localStorage.setItem(ListaKey, JSON.stringify(lista));
        };
        Manejadora.UpdateItemToLocalStorage = function (item, index) {
            var lista = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            lista[index] = item;
            localStorage.setItem(ListaKey, JSON.stringify(lista));
        };
        Manejadora.DeleteToLocalStorage = function (index) {
            var lista = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            lista.splice(index, 1);
            localStorage.setItem(ListaKey, JSON.stringify(lista));
        };
        Manejadora.InitLocalStorage = function () {
            var lista = [];
            //localStorage.setItem(ListaKey, JSON.stringify(lista));
            localStorage.setItem(ListaKey, JSON.stringify(Listado));
        };
        Manejadora.ClearGrid = function () {
            $("[index]").remove();
        };
        Manejadora.BuscarPadreTipo = function (elementoDom, tipo) {
            var parent = elementoDom[0];
            while (parent.nodeName !== tipo && parent.nodeName !== "body") {
                parent = parent.parentElement;
            }
            return parent;
        };
        Manejadora.GetItemInLocalStorage = function (index) {
            var strLista = localStorage.getItem(ListaKey);
            var lista = JSON.parse(strLista);
            var item = lista[index];
            return item;
        };
        return Manejadora;
    }());
    SP.Manejadora = Manejadora;
})(SP || (SP = {}));
