namespace SP{
    export class Persona{
        public nombre: string;
        public apellido: string;
        public edad: number;

        constructor (nombre:string, apellido:string, edad: number){
            this.nombre = nombre;
            this.apellido = apellido;
            this.edad = edad;
        }

        public PersonaToJson():string{
            return JSON.stringify(this);
        }
    }
}