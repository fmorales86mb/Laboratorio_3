namespace SP{
    export class Camioneta extends Vehiculo{
        public cuatroXcuatro: boolean;
        
        constructor (id:number, marca:string, modelo:string, precio:number, cuatroXcuatro:boolean){
            super(id, marca, modelo, precio);
            this.cuatroXcuatro = cuatroXcuatro;;
        }

        public static JsonToObj(objJson:any): Camioneta{
            let obj: Camioneta = new Camioneta(
                Number(objJson.id),
                String(objJson.marca),
                String(objJson.modelo),                
                Number(objJson.precio),
                Boolean(objJson.cuatroXcuatro)
            );
    
            return obj;
        }
    }    
}