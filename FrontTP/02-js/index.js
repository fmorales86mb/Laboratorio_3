"use strict";
var LaComanda;
(function (LaComanda) {
    $(document).ready(function () {
        $("#btnAgregar").click(ClickAgregar);
    });
    function ClickAgregar() {
        var descripcion = String($("#txtNombre").val());
        var sector = String($("#selSector").val());
        var precio = Number($("#numPrecio").val());
        var objItem = new LaComanda.Item(0, descripcion, sector, precio);
        console.log(objItem);
    }
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
