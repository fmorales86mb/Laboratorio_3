"use strict";
var SPa;
(function (SPa) {
    $(document).ready(function () {
        $("#btnAlta").click(Manejadora.AgregarElemento);
        Manejadora.MostrarElementos();
        // $("#btnCancelar").click(Manejadora.LimpiarFormulario);
        // $("#navMostrar").click(Manejadora.MostrarEmpleados); 
        // $("#btnModificar").click(Manejadora.AccionModificar); 
        // $("#selHorarioModal").change(Manejadora.FiltrarPorHorario);
        // $("#selHorarioPromedioModal").change(Manejadora.PromedioEdadPorHorario);
        // $("#btnModificar").hide(); 
        Manejadora.InitLocalStorage();
    });
    var Listado = [{ "id": "1", "marca": "Mora", "modelo": "model", "precio": 321 }, { "id": "1", "marca": "Mora", "modelo": "model", "precio": 321 }, { "id": "1", "marca": "Mora", "modelo": "model", "precio": 321 },];
    var ListaKey = "Lista";
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarElemento = function () {
            var nombre = String($("#txtNombre").val());
            var apellido = String($("#txtApellido").val());
            var edad = Number($("#txtEdad").val());
            var legajo = Number($("#txtLegajo").val());
            var horario = String($("#selHorario").val());
            var objEmpleado = new Empleado(nombre, apellido, edad, horario, legajo);
            Manejadora.AddItemToLocalStorage(objEmpleado);
        };
        Manejadora.LimpiarFormulario = function () {
            $("#txtNombre").val("");
            $("#txtApellido").val("");
            $("#txtEdad").val("");
            $("#txtLegajo").val("");
            $("#selHorario").val("");
        };
        Manejadora.MostrarElementos = function () {
            Manejadora.ClearGrid();
            var lista = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            for (var i = 0; i < lista.length; i++) {
                var item = Camioneta.JsonToObj(lista[i]);
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
        // public static FiltrarPorHorario(): void {
        //     let lista: any = localStorage.getItem(ListaKey);
        //     lista = JSON.parse(lista);            
        //     if($(this).val() == 1){
        //         lista = lista.filter(ite => ite.horario == "Mañana");
        //     }
        //     else{
        //         lista = lista.filter(ite => ite.horario == "Noche");
        //     }
        //     Manejadora.ClearGrid();
        //     for (let i = 0; i<lista.length; i++){
        //         let item: Empleado = Empleado.JsonToEmpleado(lista[i]);
        //         Manejadora.ElementoToGrilla(item, i);
        //     }    
        // }
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
            SPa.Tr = Manejadora.BuscarPadreTipo($(this), "TR");
            var index = Number(SPa.Tr.getAttribute("index"));
            if ($(this).attr("name") == "accionBorrar") {
                SPa.Tr.remove();
                Manejadora.Eliminar(index);
            }
            else {
                Manejadora.Modificar(index);
            }
        };
        // public static AccionModificar():void{
        //     let nombre:string = String($("#txtNombre").val());
        //     let apellido:string = String($("#txtApellido").val());
        //     let edad:number = Number($("#txtEdad").val());
        //     let legajo:number = Number($("#txtLegajo").val());
        //     let horario:string = String($("#selHorario").val());                        
        //     let index: number = Tr.getAttribute("index");
        //     let objEmpleado: Vehiculo = new Empleado(
        //         nombre, apellido, edad, horario, legajo
        //     );
        //     Manejadora.UpdateItemToLocalStorage(objEmpleado, index);
        //     let nuevoTr = objEmpleado.CrearElementoTr();
        //     nuevoTr.setAttribute("index", String(index));
        //     Tr.replaceWith(nuevoTr);   
        //     $("#tituloForm").text("Alta Empleado");
        //     $("#btnAgregar").show();
        //     $("#btnModificar").hide();
        // }
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
    SPa.Manejadora = Manejadora;
})(SPa || (SPa = {}));
