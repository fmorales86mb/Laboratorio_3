namespace SP{
    $(document).ready(function(){
        $("#btnAgregar").click(Manejadora.AgregarEmpleado);
        $("#btnCancelar").click(Manejadora.LimpiarFormulario);
        $("#navMostrar").click(Manejadora.MostrarEmpleados); 
        $("#btnModificar").click(Manejadora.AccionModificar); 
        $("#btnModificar").hide(); 
        Manejadora.InitLocalStorage();       
    })  

    const Listado= [{"nombre":"Maria","apellido":"Mora","edad":333,"horario":"2","legajo":24},{"nombre":"Federico","apellido":"Morales","edad":33,"horario":"2","legajo":41234},{"nombre":"Paula","apellido":"Abeledo","edad":32,"horario":"1","legajo":52345},{"nombre":"Juan","apellido":"Narvaja","edad":24,"horario":"2","legajo":566463},{"nombre":"Juan","apellido":"Bach","edad":10,"horario":"1","legajo":643523},{"nombre":"Tito","apellido":"Pulo","edad":13,"horario":"1","legajo":6345234}];
    const ListaKey = "Lista";
    export var Tr:any;

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

            Manejadora.AddItemToLocalStorage(objEmpleado);                        
        }

        public static LimpiarFormulario(): void {
            $("#txtNombre").val("");
            $("#txtApellido").val("");
            $("#txtEdad").val("");
            $("#txtLegajo").val("");
            $("#selHorario").val(""); 
        }

        public static MostrarEmpleados(): void {
            Manejadora.ClearGrid();
            let lista: any = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);

            for (let i = 0; i<lista.length; i++){
                let item: Empleado = Empleado.JsonToEmpleado(lista[i]);
                Manejadora.ElementoToGrilla(item, i);
            }

            $("[name='accionModificar']").click(Manejadora.GetTr);  
            //$("[name='accionBorrar']").click(Manejadora.GetTr);            
        }

        public static Modificar(i:number): void {
            $("#tituloForm").text("Modificar Empleado");
            $("#btnAgregar").hide();
            $("#btnModificar").show();

            let item = Manejadora.GetItemInLocalStorage(i);

            $("#txtNombre").val(item.nombre);
            $("#txtApellido").val(item.apellido);
            $("#txtEdad").val(item.edad);
            $("#txtLegajo").val(item.legajo);
            $("#selHorario").val(item.horario);                          
        }

        public static Eliminar(i:number): void {
            Manejadora.DeleteToLocalStorage(i);
            Manejadora.MostrarEmpleados();
        }

        public static FiltrarPorHorario(): void {
            
        }

        public static PromedioEdadPorHorario(): void {
            
        }
    
        //#region  Métodos propios     

        public static GetTr():void{
            Tr = Manejadora.BuscarPadreTipo($(this), "TR"); 
            let index:number = Number(Tr.getAttribute("index"));
               
            if($(this).attr("name") == "accionBorrar"){
                Tr.remove();
                Manejadora.Eliminar(index);    
            }
            else{                
                Manejadora.Modificar(index);
            }                                
        }
        
        public static AccionModificar():void{
            let nombre:string = String($("#txtNombre").val());
            let apellido:string = String($("#txtApellido").val());
            let edad:number = Number($("#txtEdad").val());
            let legajo:number = Number($("#txtLegajo").val());
            let horario:string = String($("#selHorario").val());                        
            
            let objEmpleado: Empleado = new Empleado(
                nombre, apellido, edad, horario, legajo
            );

            Manejadora.UpdateItemToLocalStorage(objEmpleado, Tr.getAttribute("index"));
            Tr.replaceWith(objEmpleado.CrearElementoTr());   
            
            $("#tituloForm").text("Alta Empleado");
            $("#btnAgregar").show();
            $("#btnModificar").hide();
        }

        private static ElementoToGrilla(objElemento: Empleado, index:any): void{
            let tr = objElemento.CrearElementoTr();
            tr.setAttribute("index", index);
            $("#bodyTabla").append(tr);
        }

        private static AddItemToLocalStorage(item:Empleado):void{
            let lista: any = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            
            lista[lista.length] = item;
            
            localStorage.setItem(ListaKey, JSON.stringify(lista));
        }  

        private static UpdateItemToLocalStorage(item:Empleado, index:any):void{
            let lista: any = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            
            lista[index] = item;
            
            localStorage.setItem(ListaKey, JSON.stringify(lista));
        }

        private static DeleteToLocalStorage(index:number):void{
            let lista: any = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
                        
            lista.splice(index, 1);
            
            localStorage.setItem(ListaKey, JSON.stringify(lista));
        }
        
        public static InitLocalStorage():void{
            let lista:any = [];
            //localStorage.setItem(ListaKey, JSON.stringify(lista));
            localStorage.setItem(ListaKey, JSON.stringify(Listado));
        }

        private static ClearGrid():void{
            $("[index]").remove();
        }

        private static BuscarPadreTipo(elementoDom:any, tipo:string) : HTMLElement{
            var parent = elementoDom[0];
            
            while(parent.nodeName !== tipo && parent.nodeName !== "body"){                
                parent = parent.parentElement;
            }
            
            return parent;
        }

        private static GetItemInLocalStorage(index: number):any{
            let strLista:any = localStorage.getItem(ListaKey);
            let lista  = JSON.parse(strLista);
            let item = lista[index];
            
            return item;
        }

        //#endregion
    }
}
