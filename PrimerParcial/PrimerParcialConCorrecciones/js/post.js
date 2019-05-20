function postElemento(jsonData){
    xml.onreadystatechange = callBackPostElemento; 
    var api = "editar";       
    xml.open("POST", url+api, true);
    xml.setRequestHeader("Content-Type", "application/json");   
    xml.send(JSON.stringify(jsonData));
}

function postDeleteElemento(jsonData){
    xml.onreadystatechange = callBackDeleteElemento; 
    var api = "eliminar";       
    xml.open("POST", url+api, true);
    xml.setRequestHeader("Content-Type", "application/json");   
    xml.send(JSON.stringify(jsonData));
}

function callBackDeleteElemento(){
    $("spinner").hidden = false;
    if (xml.readyState === 4){                       
        if(xml.status === 200){                 
            var strRespuesta = JSON.parse(xml.responseText);                     
            if(strRespuesta["type"] == "ok"){                                       
                trDbClick.parentNode.removeChild(trDbClick);
                mostrarFormulario(false);
                //var obj = JSON.parse(localStorage.getItem("borrar"));                
                //borrarFilaById(obj.id);            
            }
            else if(strRespuesta == "error"){
                console.log("No hay datos.");
            }
            else{
                console.log("error del servidor");
            }            
        }        
        $("spinner").hidden = true;
    }
}

function callBackPostElemento(){
    $("spinner").hidden = false;
    if (xml.readyState === 4){
        if(xml.status === 200){             
            var strRespuesta = JSON.parse(xml.responseText);           
            if(strRespuesta["type"] == "ok"){                                       
                var data = tomarDatosFormulario();
                var trNuevo = crearElementoTr(data);                
                trDbClick.parentNode.replaceChild(trNuevo, trDbClick);    
                mostrarFormulario(false);           
            }
            else if(strRespuesta == "error"){
                console.log("No hay datos.");
            }
            else{
                console.log("error del servidor");
            }            
            $("spinner").hidden = true;
        }        
    }
}
