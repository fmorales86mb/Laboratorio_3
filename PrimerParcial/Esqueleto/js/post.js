function postElemento(jsonData){
    xml.onreadystatechange = callBack;    
    xml.open("POST", url+api, true);
    xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    
    xml.send(jsonData);
}

function callBackPostElemento(){
    if (xml.readyState === 4){
        if(xml.status === 200){
            var strRespuesta = xml.responseText;
            if(strRespuesta !=""){                                       
                console.log(strRespuesta);
                //datosToGrilla(objRespuesta);
            }
            else if(strRespuesta == ""){
                console.log("No hay datos.");
            }
            else{
                console.log("error del servidor");
            }            
        }        
    }
}
