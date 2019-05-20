var xml = new XMLHttpRequest;
var url = "http://localhost:3000/"; 
var trDbClick;




window.addEventListener("load", function(){
    getElementos();    
    var btnX = document.getElementById("btnX");        
    var btnModificar = document.getElementById("btnModificar");
    var btnEliminar = document.getElementById("btnEliminar");
    var bodyTabla = $("bodyTabla");
        
    btnX.addEventListener("click", clickCerrar);    
    bodyTabla.addEventListener("dblclick", filaDobleClick);
    btnModificar.addEventListener("click", clickModificar);
    btnEliminar.addEventListener("click", clickEliminar);
});

function filaDobleClick(event){
    event.preventDefault();
    var a = event.srcElement; //event.target traería td.
    var tr = buscarPadreTipo(a, "TR");
    trDbClick = tr;
    console.log(tr);

    var arrayTxt = extraerArrayTxtTr(tr);
    var objJson = paresearArrary(arrayTxt);
    mostrarFormulario(true);
    cargarDatosEnFormulario(arrayTxt);
}

function clickEliminar(){
    var objJson = tomarDatosFormulario();    
    //setElementoEnLocalStorage(objJson);
    postDeleteElemento(objJson);                
}

function datosToGrilla(arrayDatos){    
    guardarArrayEnLocalStorage(arrayDatos);
    for(var i = 0; i<arrayDatos.length; i++){
        agregarTr(arrayDatos[i]);
    }    
}

function agregarTr(arrayDatosFila){
    var tr = crearElementoTr(arrayDatosFila);
    var tbody = document.getElementById("bodyTabla");

    tbody.appendChild(tr);
}

function crearElementoTr(arrayDatosFila){
    var r = document.createElement("tr");
    r.setAttribute("indentificador", arrayDatosFila["id"]);        
    var indexName = Object.keys(arrayDatosFila);

    for (var i =0; i<indexName.length; i++){                    
        var dato = arrayDatosFila[indexName[i]];
        var d= crearElementoTd(dato);        
        if(indexName[i] == "id"){
            d.hidden = true;
        }
        r.appendChild(d);
    }    

    return r;
}

function crearElementoTd(dato){
    var d = document.createElement("td");
    var txt = document.createTextNode(dato);
    d.appendChild(txt);

    return d;
}

function borrarFilaById(id){
    var tbody = document.getElementById("bodyTabla");
    var trs = tbody.children;    
    for(var i = 0; i<trs.length;i++){
        if(trs[i].getAttribute("indentificador") == id){
            trs[i].parentNode.removeChild(trs[i]);

            break;
        }
    }
}

function borrarFila(event){    
    event.preventDefault();
    var a = event.srcElement;
    var parent = a;
    
    while(parent.nodeName !== "TR"){        
        parent = parent.parentNode;
        console.log(parent.nodeName);    
    }

    parent.parentNode.removeChild(parent);
}

function buscarPadreTipo(elementoDom, tipo){
    var parent = elementoDom;
    
    while(parent.nodeName !== tipo){        
        parent = parent.parentNode;        
    }

    return parent;
}

function extraerArrayTxtTr(tr){
    var arrayTxt = new Array();

    for(var i = 0; i<tr.cells.length; i++){        
        arrayTxt[i]= extraerTxtTd(tr.cells[i]);
    }
    
    return arrayTxt;
}

function paresearArrary(arrayTxt){
    var objJson = {
        id : arrayTxt[0],
        nombre : arrayTxt[1],
        cuatrimestre : arrayTxt[2],
        fecha : arrayTxt[3],
        turno : arrayTxt[4]
    }

    return objJson;
}

function extraerTxtTd(td){
    console.log(td);
    return td.innerText; // ver si rompe al no tener txt // ver td.innerHTML
}

function mostrarFormulario(mostrar){
    var form = document.getElementById("formulario");    
    form.hidden = !mostrar;    
}

function clickCerrar(){
    mostrarFormulario(false);
}

function cargarDatosEnFormulario(jsonData){
    $("id").value = jsonData[0];
    $("nombreTxt").value = jsonData[1];
    $("cuatrimestreTxt").value = jsonData[2];
    $("fechaTxt").value = aFechaConGuion(jsonData[3]);  
    if(jsonData[4] == "Mañana"){
        $("maniana").checked  = true;
    }else{
        $("noche").checked  = true;
    }    
}

function aFechaConBarra(date){
    var fecha = date.split("-");
    var fechaFormateada = fecha[2]+"/"+fecha[1]+"/"+fecha[0];  
    return fechaFormateada; 
}

function aFechaConGuion(date){
    var fecha = date.split("/");
    var fechaFormateada = fecha[2]+"-"+fecha[1]+"-"+fecha[0];   
    return fechaFormateada;
}

function tomarDatosFormulario(){
    var turno;
    if($("maniana").checked  == true){
        turno = $("maniana").value;
    }else{
        turno = $("noche").value;
    }  

    var objJson ={
        "id":$("id").value[0],
        "nombre":$("nombreTxt").value,
        "cuatrimestre":$("cuatrimestreTxt").value,
        "fechaFinal":aFechaConBarra($("fechaTxt").value),
        "turno":turno}

    return objJson;
}

function $(id){
    return document.getElementById(id);
}

function clickModificar(){    
    var objJson = tomarDatosFormulario();
    //updateElementLocalStorage(objJson);
    postElemento(objJson);
}

function modificarTr(tr, data){
    var arrayTd = tr.children;    

    for(var i = 0; i< arrayTd.length; i++){
        arrayTd[i].innerText = data[i];
    }
}

function guardarArrayEnLocalStorage(data){
    for(var i = 0; i<data.length; i++){
        localStorage.setItem(data[i].id, JSON.stringify(data[i]));    
    }
}

function setElementoEnLocalStorage(data){
        localStorage.setItem("borrar", JSON.stringify(data));        
}

function deleteElementByIdLocalStorage(id){
    return localStorage.removeItem(id);
}

function updateElementLocalStorage(data){
    deleteElementByIdLocalStorage(data.id);
    localStorage.setItem(data.id, JSON.stringify(data));
}