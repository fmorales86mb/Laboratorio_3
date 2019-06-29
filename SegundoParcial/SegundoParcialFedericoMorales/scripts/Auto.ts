namespace SP{
    export class Auto extends Vehiculo{
        public cantidadPuertas: number;
        
        constructor (id:number, marca:string, modelo:string, precio:number, cantidadPuertas:number){
            super(id, marca, modelo, precio);
            this.cantidadPuertas = cantidadPuertas;
        }

        public static JsonToObj(objJson:any): Auto{
            let obj: Auto = new Auto(
                Number(objJson.id),
                String(objJson.marca),
                String(objJson.modelo),                
                Number(objJson.precio),
                Number(objJson.cantidadPuertas)
            );
    
            return obj;
        }
    }
}        