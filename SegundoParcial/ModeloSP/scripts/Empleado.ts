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
            tdAccion.setAttribute("class", "d-flex justify-content-around");
                        
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
            td.setAttribute("class", "text-center");          

            td.innerHTML = dato;
        
            return td;
        }
        
        private CrearElementoTdAccion():HTMLTableCellElement{
            let btnBorrar = this.CrearSpanIcon("oi oi-trash");
            let btnModificar = this.CrearSpanIcon("oi oi-pencil");
            let td:HTMLTableCellElement = document.createElement("td");                        

            btnModificar.setAttribute("name", "accionModificar");            
            $(btnModificar).click(Manejadora.GetTr);  

            btnBorrar.setAttribute("name", "accionBorrar");                                   
            $(btnBorrar).click(Manejadora.GetTr);                                   
            
            td.appendChild(btnModificar);
            td.appendChild(btnBorrar);

            return td;
        }
        
        private CrearSpanIcon(iconClass:string):HTMLElement{
            let span = document.createElement("span");
            span.setAttribute("class", iconClass);
            return span;
        }
    }
}