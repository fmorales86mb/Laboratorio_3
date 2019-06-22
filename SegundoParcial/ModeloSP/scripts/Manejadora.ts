namespace SP{
    $(document).ready(function(){
        $("#btnAgregar").click(Manejadora.AgregarEmpleado);
        $("#btnCancelar").click(Manejadora.LimpiarFormulario);
        $("#navMostrar").click(Manejadora.MostrarEmpleados);
        Lista = {};    
        localStorage.setItem("lista", JSON.stringify(Lista));    
    })

    var Lista;

    export class Manejadora{        

        public static AgregarEmpleado(): void {
            let nombre:string = String($("#txtNombre").val());
            let apellido:string = String($("#txtApellido").val());
            let edad:number = Number($("#txtEdad").val());
            let legajo:number = Number($("#txtLegajo").val());
            let horario:string = String($("#selHorario").val());                        
            
            let objEmpleado: Empleado = new Empleado(
                nombre, apellido, edad, horario, legajo
            );

            Lista = localStorage.getItem("lista");
            localStorage.setItem(String(objEmpleado.legajo), objEmpleado.EmpleadoToJson());
        }

        public static LimpiarFormulario(): void {
            $("#txtNombre").val("");
            $("#txtApellido").val("");
            $("#txtEdad").val("");
            $("#txtLegajo").val("");
            $("#selHorario").val(""); 
        }

        public static MostrarEmpleados(): void {
            for(let i = localStorage.length-1; i>=0; i--){
                let key:any = localStorage.key(i);
                let storage:any = localStorage.getItem(key);            
                let data = JSON.parse(storage);            
                Manejadora.datosToGrilla(data, i);
            }   

            $("[name='accionModificar']").click(Manejadora.GetTr);  
            $("[name='accionBorrar']").click(Manejadora.GetTr);            
        }

        public static Modificar(i:number): void {
            
        }

        public static Eliminar(i:number): void {
            
        }
        public static FiltrarPorHorario(): void {
            
        }
        public static PromedioEdadPorHorario(): void {
            
        }

        private static datosToGrilla(data: any, index:any): void{        
            let objEmpleado: Empleado = new Empleado(
                data.nombre, data.apellido, data.edad, data.horario, data.legajo
            );
            let tr = objEmpleado.CrearElementoTr();
            tr.cells[0].innerHTML = index;                    
            $("#bodyTabla").append(tr);
        }

        private static GetTr():void{
            let tr = $(this).parent().parent();
            //Manejadora.Eliminar()  

        }
    }
}