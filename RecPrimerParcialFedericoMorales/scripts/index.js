var Url = "http://localhost:3000/"; 
var TrDbClick;

$(document).ready(function(){
    $.get(Url+"personajes", datosToGrilla);  
});

function datosToGrilla(data, status){        
    for(var i= 0; i<data.length; i++){
        var tr = crearElementoTr(data[i]);        
        $("#bodyTabla").append(tr);
    }
}

function crearElementoTr(jsonDatosFila){
    var tr = document.createElement("tr");

    var tdid = crearElementoTd(jsonDatosFila["id"], "id");
    tdid.hidden = true;
    var tdFoto = crearElementoTd(jsonDatosFila["foto"], "foto");
    var tdNombre = crearElementoTd(jsonDatosFila["nombre"], "nombre");
    var tdApellido = crearElementoTd(jsonDatosFila["apellido"], "apellido");
    var tdEstado = crearElementoTd(jsonDatosFila["estado"], "estado");
    
    tr.appendChild(tdid);
    tr.appendChild(tdFoto);
    tr.appendChild(tdNombre);
    tr.appendChild(tdApellido);
    tr.appendChild(tdEstado);
    
    return tr;
}

function crearElementoTd(dato, key){
    var td = document.createElement("td");
    td.setAttribute("name", key);

    if (key == "estado"){
       td.appendChild(crearElementoSelect(dato));
    }
    else if(key == "foto"){
        td.appendChild(crearElementoImagen(dato));
        td.appendChild(crearElementoInputFile());
    }
    else{
        td.innerHTML = dato;
    }

    return td;
}

function crearElementoImagen(data){
    var img = document.createElement("img");
    $(img).attr("src", data);
    $(img).attr("class", "imagen");
    $(img).click(mostarInput);

    return img;
}

function crearElementoInputFile(){
    var inputFile = document.createElement("input");
    $(inputFile).attr("type", "file");
    $(inputFile).change(modificarFoto);
    $(inputFile).hide();

    return inputFile;
}

function mostarInput(){
    var tr = buscarPadreTipo(this, "TR");
    var inputFile = $(tr).find("input");
    
    $(inputFile[0]).animate({
        opacity: "show"
        }, "slow");
}

function crearElementoSelect(dato){
    var select = document.createElement("select");
    $(select).html("<option>Vivo</option><option>Muerto</option>");
    $(select).val(dato);
    $(select).change(modificarEstado);
    return select;
}

function modificarEstado(){
    var estado = $(this).val();
    
    var tr = buscarPadreTipo(this, "TR");
    var id;
    
    for(var i= 0; i<tr.children.length; i++){
        if(tr.children[i].getAttribute("name") == "id"){
            id = $(tr.children[i]).text();
            break;
        }
    }

    var jsonObj={
        id:id,
        estado:estado
    }

    $("#spinner").show();  
    $.post(Url+"editarEstado", jsonObj, function(data, status){                 
        $("#spinner").hide();     
    });
}

function modificarFoto(){
    var foto;
    var id;
    var tr = buscarPadreTipo(this, "TR");

    if(this.files && this.files[0]){
        var fReader = new FileReader();
        fReader.readAsDataURL(this.files[0]);
                
        fReader.addEventListener("load", function(e) {
            foto = e.target.result;

            for(var i= 0; i<tr.children.length; i++){
                if(tr.children[i].getAttribute("name") == "id"){
                    id = $(tr.children[i]).text();
                    break;
                }
            }
            var jsonObj={
                id:id,
                foto:foto
            }
            
            $("#spinner").show();  
            $.post(Url+"editarFoto", jsonObj, function(data, status){                                 
                var nuevoTr = crearElementoTr(data);
                tr.replaceWith(nuevoTr);
                $("#spinner").hide();     
            });
        });
    }
}

function buscarPadreTipo(elementoDom, tipo){
    var parent = elementoDom;
    
    while(parent.nodeName !== tipo){        
        parent = parent.parentNode;        
    }

    return parent;
}
