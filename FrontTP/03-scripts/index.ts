namespace LaComanda{
    $(document).ready(function(){
        $("#btnAgregar").click(ClickAgregar);
    });

    function ClickAgregar():void{
        let descripcion:string = String($("#txtNombre").val());
        let sector:string = String($("#selSector").val());
        let precio:number = Number($("#numPrecio").val());

        let objItem: Item = new Item(0, descripcion, sector, precio);
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
}