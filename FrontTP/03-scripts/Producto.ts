namespace LaComanda{
    export class Producto{
        static readonly UrlProductos : string = "http://localhost:80/LaComanda/productos/"

        private id: number;
        private nombre: string;
        private rolEncargado: number;
        private precio: number;

        constructor (id: number, nombre: string, rolEncargado: number, precio: number){
            this.id = id;
            this.nombre = nombre;
            this.rolEncargado = rolEncargado;
            this.precio = precio;
        }

        public getId ():number{
            return this.id;
        }

        public getDescripcion ():string{
            return this.nombre;
        }

        public getSector ():number{
            return this.rolEncargado;
        }

        public getPrecio ():number{
            return this.precio;
        }     
        
        public ToJson():any{
            let jsonObj = {
                id : this.id,
                nombre : this.nombre,
                rolEncargado : this.rolEncargado,
                precio : this.precio
            };
            return jsonObj;
        }

        public CrearFilaDelElemento():void{
            
            let tr: new () =>HTMLTableRowElement;

            // // let tdId = new HTMLTableCellElement()
            // // tr.appendChild(tdId);

            
            // return tr;
        }
        
        public PostItem():void{
            $.post(Producto.UrlProductos, this.ToJson(), function(data, status){

            });
        }
    }
}