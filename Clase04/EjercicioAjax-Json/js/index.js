var xml = new XMLHttpRequest;
var url = "http://localhost:3000/";
var api = "personas";
var metodo = "GET";

window.addEventListener("load", function(){
    TraerDatosGrilla();
});

function TraerDatosGrilla(){
    xml.onreadystatechange = CargarGrilla;
    strParametros = "";
    xml.open(metodo, url+api+strParametros, true);
    xml.send();
}

function CargarGrilla(){
    if (xml.readyState === 4){
        if(xml.status === 200){
            var strRespuesta = xml.responseText;
            var objRespuesta = ParsearDatos(strRespuesta);        

        }
        else{

        }
    }
}

function ParsearDatos(respuesta){
    var arraryPersonas = JSON.parse(respuesta);
    console.log(arraryPersonas);
    return arraryPersonas;
}

function DatosToGrilla(arrayDatos){
    for(var i = 0; i<arrayDatos.length; i++){
        arrayDatos[i];
    }
}

