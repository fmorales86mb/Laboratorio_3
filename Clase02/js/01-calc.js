
// puntero a funcion, sin parentesis
// cuando se carga la ventana ejecuta la funcion anonima
window.addEventListener("load", function(){
    // document.getElementById("btnSumar").addEventListener("click", Sumar);    
    var btnSumar = document.getElementById("btnSumar");
    var btnSumarGuardar = document.getElementById("btnSumarGuardar");

    btnSumar.addEventListener("click", Sumar);
    btnSumarGuardar.addEventListener("click", SumarGuardar);                
})

function Sumar ()
{
    var nro1 = document.getElementById("nro1");
    var nro2 = document.getElementById("nro2");
    var resultado = document.getElementById("result");

    // por defecto el operador + concatena strings. Es necesario el parse int
    resultado.value = parseInt(nro1.value) + parseInt(nro2.value);
}

function SumarGuardar()
{
    Sumar();
    Guardar();
}

function Guardar()
{
    var nro1 = document.getElementById("nro1").value;
    var nro2 = document.getElementById("nro2").value;
    var resultado = document.getElementById("result").value;

    var tbody = document.getElementById("bodyTable");

    tbody.innerHTML += CrearFila(nro1, nro2, resultado);
}

function CrearFila(val1, val2, val3)
{
    var fila = "<tr><td>"+val1+"</td><td>"+val2+"</td><td>"+val3+"</td></tr>";
    return fila;
}
