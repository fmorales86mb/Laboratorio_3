namespace LaComanda{
    export class Item{
        private readonly Url : string = "http://localhost:80/LaComanda/items"

        private id: number;
        private descripcion: string;
        private sector: string;
        private precio: number;

        constructor (id: number, descripcion: string, sector: string, precio: number){
            this.id = id;
            this.descripcion = descripcion;
            this.sector = sector;
            this.precio = precio;
        }

        public getId ():number{
            return this.id;
        }

        public getDescripcion ():string{
            return this.descripcion;
        }

        public getSector ():string{
            return this.sector;
        }

        public getPrecio ():number{
            return this.precio;
        }     
        
        public ToJson():any{
            let jsonObj = {
                id : this.id,
                descripcion : this.descripcion,
                sector : this.sector,
                precio : this.precio
            };
            return jsonObj;
        }
        
        public PostItem():void{
            $.post(this.Url, this.ToJson(), function(data, status){

            });
        }
    }
}