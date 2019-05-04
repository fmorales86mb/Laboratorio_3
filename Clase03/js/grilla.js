window.addEventListener("load", function(){
    var btnGuardar = document.getElementById("btnGuardar");
    var btnAgregar = document.getElementById("btnAgregar");
    var btnX = document.getElementById("btnX");
    
    btnGuardar.addEventListener("click", clickGuardar);
    btnAgregar.addEventListener("click", clickAgregar);
    btnX.addEventListener("click", clickCerrar);
});

function crearHtmlFila(nombre, apellido){
    var filaHtml = "<tr><td>"+nombre+"</td><td>"+apellido+"</td><td><a href=\"\">Borrar</a></td></tr>";
    return filaHtml;
}

function agregarFila(nombre, apellido){
    var filaHtml = crearHtmlFila(nombre, apellido);
    var tbody = document.getElementById("bodyTabla");

    tbody.innerHTML += filaHtml;
}

function clickGuardar(){
    var nombre = document.getElementById("nombreTxt").value;
    var apellido = document.getElementById("apellidoTxt").value;

    if(!evalError(nombre, apellido))
    {
        agregarFila(nombre, apellido);
        mostrarFormulario(false);
    }    
}

function inputTextError(inputID){
    var inputText = document.getElementById(inputID);
    inputText.className="conError";
}

function inputTextSinError(inputId){
    var inputText = document.getElementById(inputId);
    inputText.className="sinError";
}

function evalError(nombre, apellido){
    var error = false;
    
    if(nombre == "")
    {
        error = true;
        inputTextError("nombreTxt");
    }
    else{
        inputTextSinError("nombreTxt");
    }

    if(apellido == "")
    {
        error = true;
        inputTextError("apellidoTxt");
    }
    else{
        inputTextSinError("apellidoTxt");
    }

    return error;
}

function clickCerrar(){
    mostrarFormulario(false);
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

function resetearTxt(){
    document.getElementById("nombreTxt").value = "";
    document.getElementById("apellidoTxt").value = "";
}

