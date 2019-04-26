var xml = new XMLHttpRequest;
var url = "http://localhost:3000/";
var api = "personas";
var metodo = "GET";

window.addEventListener("load", function(){
    getPersonas();
    
    var btnAgregar = document.getElementById("btnAgregar");
    
    btnAgregar.addEventListener("click", clickAgregar);
});

function datosToGrilla(arrayDatos){    
    for(var i = 0; i<arrayDatos.length; i++){
        agregarFila(arrayDatos[i]);
    }
}

function agregarFila(arrayDatosFila){
    var filaHtml = crearHtmlFila(arrayDatosFila);
    var tbody = document.getElementById("bodyTabla");

    tbody.innerHTML += filaHtml;
}

function crearHtmlFila(arrayDatosFila){
    var filaHtml = "<tr><td>"+arrayDatosFila["nombre"]+
    "</td><td>"+arrayDatosFila["apellido"]+
    "</td><td>"+arrayDatosFila["fecha"]+
    "</td><td>"+arrayDatosFila["telefono"]+"</td></tr>";
    return filaHtml;
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