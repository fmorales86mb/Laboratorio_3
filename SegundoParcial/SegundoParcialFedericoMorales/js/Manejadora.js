"use strict";
var SP;
(function (SP) {
    $(document).ready(function () {
        $("#btnAlta").click(Manejadora.AsignarIdAForm);
        $("#btnLimpiar").click(Manejadora.LimpiarClick);
        $("#btnAgregar").click(Manejadora.AgregarElemento);
        $("#btnPromedio").click(Manejadora.Promedio);
        Manejadora.InitLocalStorage();
        Manejadora.MostrarElementos();
        $("#checkId").change(Manejadora.CamposMostrados);
        $("#checkMarca").change(Manejadora.CamposMostrados);
        $("#checkModelo").change(Manejadora.CamposMostrados);
        $("#checkPrecio").change(Manejadora.CamposMostrados);
    });
    var Listado = [{ "id": 32, "marca": "asd", "modelo": "asdf", "precio": 2, "cantidadPuertas": 4 }, { "id": 32, "marca": "asd", "modelo": "asdf", "precio": 4, "cuatroXcuatro": true }, { "id": 32, "marca": "asd", "modelo": "asdf", "precio": 3, "cuatroXcuatro": true }];
    var ListaKey = "Lista";
    var Manejadora = /** @class */ (function () {
        function Manejadora() {
        }
        Manejadora.AgregarElemento = function () {
            var id = Number($("#txtId").val());
            var marca = String($("#txtMarca").val());
            var modelo = String($("#txtModelo").val());
            var precio = Number($("#numPrecio").val());
            var tipo = Number($("#selTipo").val());
            var puertas = Number($("#numPuertas").val());
            var cuatroXcuatro = $("#CheckCuatroXCuatro").prop('checked');
            var obj;
            if (tipo == 1) {
                obj = new SP.Camioneta(id, marca, modelo, precio, cuatroXcuatro);
            }
            else {
                obj = new SP.Auto(id, marca, modelo, precio, puertas);
            }
            Manejadora.AddItemToLocalStorage(obj);
            //$("#AgregarModal").hide();
            Manejadora.MostrarElementos();
        };
        Manejadora.LimpiarFormulario = function () {
            $("#txtNombre").val("");
            $("#txtApellido").val("");
            $("#txtEdad").val("");
            $("#txtLegajo").val("");
            $("#selHorario").val("");
        };
        Manejadora.LimpiarClick = function () {
            localStorage.clear();
            var lista = [];
            localStorage.setItem(ListaKey, JSON.stringify(lista));
            Manejadora.MostrarElementos();
        };
        Manejadora.MostrarElementos = function () {
            Manejadora.ClearGrid();
            var lista = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            var item;
            for (var i = 0; i < lista.length; i++) {
                if (lista[i]["cuatroXcuatro"] != null) {
                    item = SP.Camioneta.JsonToObj(lista[i]);
                }
                else {
                    item = SP.Auto.JsonToObj(lista[i]);
                }
                Manejadora.ElementoToGrilla(item, i);
            }
        };
        Manejadora.AsignarIdAForm = function () {
            var id = Manejadora.GetLastId();
            console.log(id);
            $("#txtId").val(String(id + 1));
        };
        Manejadora.GetLastId = function () {
            var lista = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            var id = lista.reduce(function (idMax, item) {
                if (item.id > idMax) {
                    idMax = item.id;
                }
                return idMax;
            }, -1);
            return id;
        };
        Manejadora.Promedio = function () {
            var lista = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            // console.log($("#selTipor").attr("option"));
            // if($("#selTipor option:selected").val() == 1){
            //     lista = lista.filter(function(ite:any){
            //         //console.log(ite.cantidadPuertas, ite.cuatroXcuatro,ite.cantidadPuertas == undefined);
            //         return ite.cantidadPuertas == undefined;                                    
            //     } );
            // }
            // else{
            //     lista = lista.filter(function(ite){
            //         //console.log(ite)
            //         return ite.cuatroXcuatro;
            //     });
            // }            
            var sumatoria = lista.reduce(function (suma, item) {
                return suma += item.precio;
            }, 0);
            if (sumatoria != 0)
                sumatoria = sumatoria / lista.length;
            console.log(sumatoria);
            $("#lblPromedio").val(sumatoria);
        };
        Manejadora.CamposMostrados = function () {
            var id = $("#checkId").prop('checked');
            var marca = $("#checkMarca").prop('checked');
            var modelo = $("#checkModelo").prop('checked');
            var precio = $("#checkPrecio").prop('checked');
            var listaTR = $("#bodyTabla").children("TR");
            var listaNuevaTD = listaTR.map(function (item) {
                // item.map(function(td:any){
                //     console.log(td);
                // });
            });
        };
        //#region  Métodos propios     
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
        Manejadora.GetTr = function () {
            SP.Tr = Manejadora.BuscarPadreTipo($(this), "TR");
            var index = Number(SP.Tr.getAttribute("index"));
            SP.Tr.remove();
            Manejadora.Eliminar(index);
        };
        Manejadora.Eliminar = function (i) {
            Manejadora.DeleteToLocalStorage(i);
            Manejadora.MostrarElementos();
        };
        return Manejadora;
    }());
    SP.Manejadora = Manejadora;
})(SP || (SP = {}));
