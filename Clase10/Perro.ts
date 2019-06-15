namespace Animal{
    //Clases
    export class Perro implements IAnimal{
        // Constructor. No hay sobrecarga. Se usan parámetros opcionales.
        constructor (name:string){
            this.nombre = name;
        }
        
        // atributos. Sin var ni let dentro de la clase.
        private nombre: string;

        // Propiedades ficticias
        GetNombre():string{
            return this.nombre;
        }

        SetNombre(nombre:string):void{
            this.nombre = nombre;
        }

        // Funciones
        Ladrar (): string{
            return "ladrido";
        }
        private hola:string;
    } 
}
