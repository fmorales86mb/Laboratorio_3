window.addEventListener("load", function(){
    var seccion = document.getElementById("seccion");
    
    seccion.innerHTML += generarParrafo("Hola Mundo");
    // Las comillas simples se ingresan sin problema.    
    seccion.innerHTML += generarParrafo("Puedo mostrar comillas 'simples'");
    // Las comillas dobles requieren la barra invertida para que se tomen como texto.
    seccion.innerHTML += generarParrafo("y \"dobles\"");
})

function generarParrafo (texto){
    return "<p>"+texto+"</p>";
}

