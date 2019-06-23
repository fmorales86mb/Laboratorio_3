namespace SP{
    export class Empleado extends Persona{
        public horario:string;
        public legajo:number;

        constructor(nombre:string, apellido: string, edad: number, horario: string, legajo:number){
            super(nombre, apellido, edad);
            this.horario = horario;
            this.legajo = legajo;
        }

        public EmpleadoToJson():string{
            return JSON.stringify(this);
        }

        public static JsonToEmpleado(objJson:any):Empleado{
            let objEmpleado: Empleado = new Empleado(
                String(objJson.nombre),
                String(objJson.apellido),
                Number(objJson.edad),
                String(objJson.horario),
                Number(objJson.legajo)
            );

            return objEmpleado;
        }

        public CrearElementoTr():HTMLTableRowElement{
            let tr:HTMLTableRowElement = document.createElement("tr");
                                
            let tdEdad = this.CrearElementoTd(String(this.edad), "edad");                
            let tdNombre = this.CrearElementoTd(this.nombre, "nombre");
            let tdApellido = this.CrearElementoTd(this.apellido, "apellido"); 
            let tdHorario = this.CrearElementoTd(this.horario, "horario"); 
            let tdLegajo = this.CrearElementoTd(String(this.legajo), "legajo");     
            let tdAccion = this.CrearElementoTdAccion();   
                        
            tr.appendChild(tdNombre);  
            tr.appendChild(tdApellido);
            tr.appendChild(tdEdad);                                              
            tr.appendChild(tdLegajo);      
            tr.appendChild(tdHorario);
            tr.appendChild(tdAccion);
                          
            return tr;
        }
    
        private CrearElementoTd(dato:string, key:string):HTMLTableCellElement{
            let td:HTMLTableCellElement = document.createElement("td");
            td.setAttribute("name", key);          

            td.innerHTML = dato;
        
            return td;
        }
        
        private CrearElementoTdAccion():HTMLTableCellElement{
            let btnBorrar = document.createElement("button");
            let btnModificar = document.createElement("button");
            let td:HTMLTableCellElement = document.createElement("td");                        

            btnModificar.setAttribute("name", "accionModificar");
            btnBorrar.setAttribute("name", "accionBorrar");
            $(btnBorrar).click(Manejadora.GetTr);
            btnBorrar.innerHTML="Borrar";
            btnModificar.innerHTML="Modificar";
            
            td.appendChild(btnModificar);
            td.appendChild(btnBorrar);

            return td;
        }
    }
}