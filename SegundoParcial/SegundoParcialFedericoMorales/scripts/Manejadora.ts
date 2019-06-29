namespace SP {
    $(document).ready(function () {
        $("#btnAlta").click(Manejadora.AsignarIdAForm);
        $("#btnLimpiar").click(Manejadora.LimpiarClick);
        $("#btnAgregar").click(Manejadora.AgregarElemento);
        $("#btnPromedio").click(Manejadora.Promedio);
        Manejadora.InitLocalStorage();
        Manejadora.MostrarElementos();
        $("#checkId").change(Manejadora.CamposMostrados);
        $("#checkMarca").change(Manejadora.CamposMostrados);
        $("#checkModelo").change(Manejadora.CamposMostrados);
        $("#checkPrecio").change(Manejadora.CamposMostrados);
    })

    const Listado = [{ "id": 32, "marca": "asd", "modelo": "asdf", "precio": 2, "cantidadPuertas":4 }, { "id": 32, "marca": "asd", "modelo": "asdf", "precio": 4, "cuatroXcuatro": true }, { "id": 32, "marca": "asd", "modelo": "asdf", "precio": 3, "cuatroXcuatro": true }];
    const ListaKey = "Lista";
    export var Tr: any;
    export var Lista: any;

    export class Manejadora {

        public static AgregarElemento(): void {
            let id: number = Number($("#txtId").val());
            let marca: string = String($("#txtMarca").val());
            let modelo: string = String($("#txtModelo").val());
            let precio: number = Number($("#numPrecio").val());
            let tipo: number = Number($("#selTipo").val());
            let puertas: number = Number($("#numPuertas").val());
            let cuatroXcuatro: boolean = $("#CheckCuatroXCuatro").prop('checked');                    

            let obj: Vehiculo;
            if (tipo == 1) {
                obj = new Camioneta(
                    id, marca, modelo, precio, cuatroXcuatro
                );
            }
            else {
                obj = new Auto(
                    id, marca, modelo, precio, puertas
                );
            }            
            
            Manejadora.AddItemToLocalStorage(obj);
            //$("#AgregarModal").hide();
            Manejadora.MostrarElementos();
        }

        public static LimpiarFormulario(): void {
            $("#txtNombre").val("");
            $("#txtApellido").val("");
            $("#txtEdad").val("");
            $("#txtLegajo").val("");
            $("#selHorario").val("");
        }

        public static LimpiarClick():void{
            localStorage.clear();
            let lista: any = [];
            localStorage.setItem(ListaKey, JSON.stringify(lista));
            Manejadora.MostrarElementos();            
        }

        public static MostrarElementos(): void {
            Manejadora.ClearGrid();
            let lista: any = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);
            let item: Vehiculo;

            for (let i = 0; i < lista.length; i++) {

                if (lista[i]["cuatroXcuatro"] != null) {
                    item = Camioneta.JsonToObj(lista[i]);
                }
                else {
                    item = Auto.JsonToObj(lista[i]);
                }

                Manejadora.ElementoToGrilla(item, i);
            }
        }

        public static AsignarIdAForm():void{
            let id = Manejadora.GetLastId();
            console.log(id);
            $("#txtId").val(String(id + 1));
        }

        private static GetLastId(): number {
            let lista: any = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);

            let id = lista.reduce(
                function (idMax: any, item: any) {
                    if (item.id > idMax) {
                        idMax = item.id;
                    }
                    return idMax;
                }
                ,
                -1
            );

            return id;
        }

        public static Promedio(): void {
            let lista: any = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);        
                                
            // console.log($("#selTipor").attr("option"));
            // if($("#selTipor option:selected").val() == 1){
            //     lista = lista.filter(function(ite:any){
            //         //console.log(ite.cantidadPuertas, ite.cuatroXcuatro,ite.cantidadPuertas == undefined);
            //         return ite.cantidadPuertas == undefined;                                    
            //     } );
            // }
            // else{
            //     lista = lista.filter(function(ite){
            //         //console.log(ite)
            //         return ite.cuatroXcuatro;
            //     });
            // }            
            let sumatoria:number = lista.reduce(
                function(suma:number, item:any){        
                  return suma+=item.precio;
                }, 0);
            if(sumatoria != 0)
                sumatoria = sumatoria/lista.length                           
            console.log(sumatoria);
            $("#lblPromedio").val(sumatoria);
        }

        public static CamposMostrados():void{
            let id: boolean = $("#checkId").prop('checked');
            let marca: boolean = $("#checkMarca").prop('checked');
            let modelo: boolean = $("#checkModelo").prop('checked');
            let precio: boolean = $("#checkPrecio").prop('checked');

            let listaTR:any = $("#bodyTabla").children("TR");
                                
            let listaNuevaTD:any = listaTR.map(function(item:any){
                // item.map(function(td:any){
                //     console.log(td);
                // });
            });                
            
        }
        //#region  Métodos propios     

        private static ElementoToGrilla(objElemento: Vehiculo, index: any): void {
            let tr = objElemento.CrearElementoTr();
            tr.setAttribute("index", index);
            $("#bodyTabla").append(tr);
        }

        private static AddItemToLocalStorage(item: Vehiculo): void {
            let lista: any = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);

            lista[lista.length] = item;

            localStorage.setItem(ListaKey, JSON.stringify(lista));
        }

        private static UpdateItemToLocalStorage(item: Vehiculo, index: any): void {
            let lista: any = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);

            lista[index] = item;

            localStorage.setItem(ListaKey, JSON.stringify(lista));
        }

        private static DeleteToLocalStorage(index: number): void {
            let lista: any = localStorage.getItem(ListaKey);
            lista = JSON.parse(lista);

            lista.splice(index, 1);

            localStorage.setItem(ListaKey, JSON.stringify(lista));
        }

        public static InitLocalStorage(): void {
            let lista: any = [];
            //localStorage.setItem(ListaKey, JSON.stringify(lista));
            localStorage.setItem(ListaKey, JSON.stringify(Listado));
        }

        private static ClearGrid(): void {
            $("[index]").remove();
        }

        private static BuscarPadreTipo(elementoDom: any, tipo: string): HTMLElement {
            var parent = elementoDom[0];

            while (parent.nodeName !== tipo && parent.nodeName !== "body") {
                parent = parent.parentElement;
            }

            return parent;
        }

        private static GetItemInLocalStorage(index: number): any {
            let strLista: any = localStorage.getItem(ListaKey);
            let lista = JSON.parse(strLista);
            let item = lista[index];

            return item;
        }

        public static GetTr():void{
            Tr = Manejadora.BuscarPadreTipo($(this), "TR"); 
            let index:number = Number(Tr.getAttribute("index"));
            Tr.remove();
            Manejadora.Eliminar(index);                                
        }

        public static Eliminar(i:number): void {
            Manejadora.DeleteToLocalStorage(i);
            Manejadora.MostrarElementos();
        }

        //#endregion
    }
}
