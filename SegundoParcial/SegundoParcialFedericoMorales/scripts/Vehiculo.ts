namespace SP{
    export abstract class Vehiculo {
        public id:number;
        public marca:string;
        public modelo:string;
        public precio:number;

        constructor (id:number, marca:string, modelo:string, precio:number){
            this.id = id;
            this.marca = marca;
            this.modelo = modelo;
            this.precio = precio;
        }

        public CrearElementoTr():HTMLTableRowElement{
            let tr:HTMLTableRowElement = document.createElement("tr");
                                
            let tdId = this.CrearElementoTd(String(this.id), "id");                
            let tdMarca = this.CrearElementoTd(this.marca, "marca");
            let tdModelo = this.CrearElementoTd(this.modelo, "modelo");             
            let tdPrecio = this.CrearElementoTd(String(this.precio), "precio");     
            let tdAccion = this.CrearElementoTdAccion();
            tdAccion.setAttribute("class", "d-flex justify-content-around");
                        
            tr.appendChild(tdId);  
            tr.appendChild(tdMarca);
            tr.appendChild(tdModelo);                                              
            tr.appendChild(tdPrecio);                  
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
            let btnBorrar = document.createElement("button");            
            let td:HTMLTableCellElement = document.createElement("td");                         

            btnBorrar.innerText= "Eliminar";
            btnBorrar.setAttribute("name", "accionBorrar"); 
            btnBorrar.setAttribute("type", "button");
            btnBorrar.setAttribute("class", "btn btn-success");                                  
            $(btnBorrar).click(Manejadora.GetTr);                                   
                        
            td.appendChild(btnBorrar);

            return td;
        }
    }
}        