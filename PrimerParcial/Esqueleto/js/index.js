var xml = new XMLHttpRequest;
var url = "http://localhost:3000/";
var api = "personas";
var metodo = "GET";

window.addEventListener("load", function(){
    getPersonas();
    var btnX = document.getElementById("btnX");
    var btnAgregar = document.getElementById("btnAgregar");
    
    btnAgregar.addEventListener("click", clickAgregar);
    btnX.addEventListener("click", clickCerrar);
});

function datosToGrilla(arrayDatos){    
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
    //var indexName = ["nombre", "apellido", "fecha", "telefono"];
    var indexName = Object.keys(arrayDatosFila);

    for (var i =0; i<indexName.length; i++){                    
        var dato = arrayDatosFila[indexName[i]];
        r.appendChild(crearElementoTd(dato));        
    }
    r.appendChild(crearElementoTdLink("Borrar", borrarFila));
    r.appendChild(crearElementoTdLink("Modificar", modificarFila));

    return r;
}

function crearElementoTd(dato){
    var d = document.createElement("td");
    var txt = document.createTextNode(dato);
    d.appendChild(txt);

    return d;
}

function crearElementoTdLink(tdTxt, funcClick){
    var td = document.createElement("td");
    var a = document.createElement("a");
    var txt = document.createTextNode(tdTxt);
    
    a.setAttribute("href", "#");
    a.addEventListener("click", funcClick);
    
    a.appendChild(txt);
    td.appendChild(a);

    return td;
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

function modificarFila(event){    
    event.preventDefault();
    var a = event.srcElement;
    var parent = a;
    
    while(parent.nodeName !== "TR"){        
        parent = parent.parentNode;
        console.log(parent.nodeName);    
    }

    parent.isContentEditable = true;
    console.log(parent);
    // TODO:    
}



function extraerArrayTxtTr(tr){
    var arrayTxt = new arrayTxt();

    for(var i = 0; i<tr.cells.length; i++){
        arrayTxt[i]= extraerTxtTd(tr.cells[i]);
    }
    
    return arrayTxt;
}

function extraerTxtTd(td){
    return td.text; // ver si rompe al no tener txt
}

function clickAgregar(){
    mostrarFormulario(true);
    resetearTxt();
}

function mostrarFormulario(mostrar){
    var form = document.getElementById("formulario");
    var btnAgregar = document.getElementById("btnAgregar");

    form.hidden = !mostrar;
    btnAgregar.hidden = mostrar;
}

function clickCerrar(){
    mostrarFormulario(false);
}

