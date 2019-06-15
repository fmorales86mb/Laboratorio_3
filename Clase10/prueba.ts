namespace Animal{
    $(document).ready(function(){
        $("#btnAgregar").click(ClickAgregar);
    });

    // Funciones fuera de la clase con "function"
    export function Saludar():string{ // accedo con Animal.Saludar()
        let saludo: string = "hola "

        // Array
        let lista:Array<IAnimal> = new Array<IAnimal>();    
        let miPerro: IAnimal = new Perro("Bach");
        let miGato: IAnimal = new Gato("Tito");

        lista.push(miGato);
        lista.push(miPerro);

        saludo += miPerro.GetNombre() + miGato.GetNombre();
        
        return saludo;
    }

    function ClickAgregar():void{
        let nombre:string = String($("#txtNombre").val());
        let miAnimal:IAnimal = new Perro(nombre);
        console.log(miAnimal);
        
    }

    function crearElementoTr(jsonDatosFila:IAnimal):HTMLTableRowElement{
        let tr = new HTMLTableRowElement();  
        let tdTipo = crearElementoTd("bla");
        let tdNombre = crearElementoTd(jsonDatosFila.GetNombre());
        let tdEdad = crearElementoTd(jsonDatosFila.GetNombre());
        tr.appendChild(tdNombre);

        
        return tr;
    }
    
    function crearElementoTd(dato:string):HTMLTableDataCellElement{
        let td= new HTMLTableDataCellElement();        
        td.innerHTML = dato;
        return td;
    } 
}
