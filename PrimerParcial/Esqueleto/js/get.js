function getElementos(){
    xml.onreadystatechange = callBack;
    strParametros = "";
    xml.open("GET", url+api+strParametros, true);
    xml.send();
}

function getPersonasById(){
    xml.onreadystatechange = callBack;
    strParametros = "";
    xml.open("GET", url+api+strParametros, true);
    xml.send();
}

function callBack(){
    if (xml.readyState === 4){
        if(xml.status === 200){
            var strRespuesta = xml.responseText;
            if(strRespuesta !=""){
                var objRespuesta = parsearDatos(strRespuesta);                        
                datosToGrilla(objRespuesta);
            }
            else if(strRespuesta == ""){
                alert("No hay datos.");
            }
            else{
                alert("error del servidor");
            }            
        }        
    }
}

function parsearDatos(respuesta){
    var arraryPersonas = JSON.parse(respuesta);
    console.log(arraryPersonas);
    return arraryPersonas;
}