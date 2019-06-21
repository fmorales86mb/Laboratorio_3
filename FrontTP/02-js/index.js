"use strict";
var LaComanda;
(function (LaComanda) {
    $(document).ready(function () {
        GetListadoProductos();
        //$("#btnAgregar").click(ClickAgregar);
    });
    function GetListadoProductos() {
        $.get(LaComanda.Producto.UrlProductos, function (data, status) {
            //console.log(data);
            datosToGrilla(data);
        });
    }
    function datosToGrilla(data) {
        for (var i = 0; i < data.length; i++) {
            var tr = crearElementoTr(data[i]);
            $("#bodyTabla").append(tr);
        }
    }
    function crearElementoTr(jsonDatosFila) {
        var tr = document.createElement("tr");
        var tdid = crearElementoTd(jsonDatosFila["id"], "id");
        var tdNombre = crearElementoTd(jsonDatosFila["nombre"], "nombre");
        var tdApellido = crearElementoTd(jsonDatosFila["rolEncargado"], "rolEncargado");
        tr.appendChild(tdid);
        tr.appendChild(tdNombre);
        tr.appendChild(tdApellido);
        return tr;
    }
    function crearElementoTd(dato, key) {
        var td = document.createElement("td");
        td.setAttribute("name", key);
        td.innerHTML = dato;
        return td;
    }
    // function ClickAgregar():void{
    //     let descripcion:string = String($("#txtNombre").val());
    //     let sector:string = String($("#selSector").val());
    //     let precio:number = Number($("#numPrecio").val());
    //     let objItem: Item = new Item(0, descripcion, sector, precio);
    //     console.log(objItem);
    // }
    // function crearElementoTr(jsonDatosFila:IAnimal):HTMLTableRowElement{
    //     let tr = new HTMLTableRowElement();  
    //     let tdTipo = crearElementoTd("bla");
    //     let tdNombre = crearElementoTd(jsonDatosFila.GetNombre());
    //     let tdEdad = crearElementoTd(jsonDatosFila.GetNombre());
    //     tr.appendChild(tdNombre);
    //     return tr;
    // }
    // function crearElementoTd(dato:string):HTMLTableDataCellElement{
    //     let td= new HTMLTableDataCellElement();        
    //     td.innerHTML = dato;
    //     return td;
    // } 
})(LaComanda || (LaComanda = {}));
