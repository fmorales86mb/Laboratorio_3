var Url = "http://localhost:3000/"; 
var TrDbClick;

$(document).ready(function(){
    $.get(Url+"materias", datosToGrilla);
    $("#btnX").click(function(){
        $("#formulario").hide();
    });
    $("#btnModificar").click(clickModificar);
    $("#btnEliminar").click(clickEliminar);    
});

function datosToGrilla(data, status){    
    for(var i= 0; i<data.length; i++){
        var tr = crearElementoTr(data[i]);        
        $("#bodyTabla").append(tr);
    }
}

function crearElementoTr(jsonDatosFila){
    var tr = document.createElement("tr");
    $(tr).dblclick(cargarFormulario);
    var indexName = Object.keys(jsonDatosFila);


    for(var i= 0; i<indexName.length; i++){
        var dato = jsonDatosFila[indexName[i]];
        var td= crearElementoTd(dato, indexName[i]);        
        if(indexName[i] == "id"){
            td.hidden = true;
        }
        tr.appendChild(td);
    }
    
    return tr;
}

function crearElementoTd(dato, key){
    var td = document.createElement("td");
    td.setAttribute("name", key);
    td.innerHTML = dato;
    return td;
}

function cargarFormulario(){
    TrDbClick = $(this);
    var tds = $(this).find("td");
    
    var obj = {
        id:tds[0].innerHTML,
        nombre:tds[1].innerHTML,
        cuatrimestre:tds[2].innerHTML,
        fechaFinal:tds[3].innerHTML,
        turno:tds[4].innerHTML
    };    

    cargarDatosEnFormulario(obj);
    estadoInicialForm();
    $("#formulario").show();
}

function cargarDatosEnFormulario(jsonData){
    $("#id").val(jsonData["id"]);
    $("#nombreTxt").val(jsonData["nombre"]);
    $("#cuatrimestreTxt").val(jsonData["cuatrimestre"]);
    $("#fechaTxt").val(aFechaConGuion(jsonData["fechaFinal"]));  
    if(jsonData["turno"] == "Mañana"){
        $("#maniana").prop("checked", true);
    }else{
        $("#noche").prop("checked", true);
    }    
}

function tomarDatosFormulario(){
    var turno;
    if($("#maniana").prop("checked") == true){
        turno = $("#maniana").val();
    }else{
        turno = $("#noche").val();
    }  

    var objJson ={
        id:$("#id").val(),
        nombre:$("#nombreTxt").val(),
        cuatrimestre:$("#cuatrimestreTxt").val(),
        fechaFinal:aFechaConBarra($("#fechaTxt").val()),
        turno:turno
    }

    return objJson;
}

function aFechaConBarra(date){
    var fecha = date.split("-");
    var fechaFormateada = fecha[2]+"/"+fecha[1]+"/"+fecha[0];  
    return fechaFormateada; 
}

function aFechaConGuion(date){
    var fecha = date.split("/");
    var fechaFormateada = fecha[2]+"-"+fecha[1]+"-"+fecha[0];   
    return fechaFormateada;
}

function clickModificar(){
    if(validarDatosForm()){
        var jsonObj = tomarDatosFormulario();
        $("#spinner").show();  
    
        $.post(Url+"editar", jsonObj, function(data, status){              
            if(data["type"] == "ok"){
                var trNuevo = crearElementoTr(jsonObj);
                TrDbClick.replaceWith(trNuevo);
                $("#formulario").hide();
            }else{
                console.log(status, data);
            }    
            $("#spinner").hide();     
        });
    }
}

function validarDatosForm(){
    var validos = true;
    var today = new Date();

    var fechaArr = $("#fechaTxt").val().split("-");
    var fecha = new Date(fechaArr[0], fechaArr[1], fechaArr[2]);

    console.log(fecha);
    if(fecha.getDate == undefined || fecha < today){
        $("#fechaTxt").attr("class", "conError");
        validos = false;
    }
    if($("#nombreTxt").val().length < 6){
        $("#nombreTxt").attr("class", "conError");
        validos = false;
    }
    

    return validos;
}

function estadoInicialForm(){
    $("#fechaTxt").attr("class", "");
    $("#nombreTxt").attr("class", "");
}

function clickEliminar(){
    var jsonObj = tomarDatosFormulario();
    $("#spinner").show();

    $.post(Url+"eliminar", jsonObj, function(data, status){           
        if(data["type"] == "ok"){
            TrDbClick.remove();
            $("#formulario").hide();
        }else{
            console.log(status, data);
        }
        $("#spinner").hide(); 
    });    
}