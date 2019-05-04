
window.addEventListener("load",function()
{
    var url = window.location;
    var mail = getParameterByName("mail",url);
    var fuente = getParameterByName("fuente",url);
    var colorD = getParameterByName("color",url);
    var btn= $("btnNewPost");
    btn.addEventListener("click",mostrarEntrada);
    //btn.addEventListener("click",capturarData);
    var btnPostear = $("btnGuardar");
    btnPostear.addEventListener("click",capturarData);
    
});
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}   

function mostrarEntrada()
{
    console.log("entroo!");
    var contAgregar = document.getElementById("contenedor");
    var btn = document.getElementById("btnNewPost");
    contAgregar.hidden=false;
    btn.hidden = true;
    
    

}
function $(id)
{
    return document.getElementById(id);
}

var xml = new XMLHttpRequest(); 
function callback()
{
    if(xml.readyState===4)
     {
         if(xml.status===200)
         {
           
            var respuesta = xml.responseText;
            if(respuesta=="true")
            {
              alert("login OK");
             }else if(respuesta=="false")
            {
              alert("login incorrecta");
            }else
            {
               alert(respuesta);
            //    var obj = JSON.parse(respuesta);
            //    var color = obj['preferencias']['color'];
            //    var fuente = obj['preferencias']['font'];
            //    var emailD= document.getElementById("mail").value;
            //    var parametros = "?color="+color+"&"+"fuente="+fuente+"&"+"mail="+emailD;
            //    window.location.replace("./index.html"+parametros);
             }
            }
    else
     {
           alert("Error del servidor");
        }
    }
}

function capturarData()
{
    var titulo= document.getElementById("titulo").value;
    var header = document.getElementById("header").value;
    var postText= document.getElementById("texto").value;
    //var autor = document.getElementById("pass").value;
    var url = window.location;
    var autor = getParameterByName("mail",url);

     var datosPost={
         title:titulo,
         header:header,
        posttext:postText,
        author:autor
        }
    enviarPost(datosPost);
}

 function enviarPost(data)
 {
        var datos = JSON.stringify(data);
         xml.open("POST","http://localhost:1337/postearNuevaEntrada",true);
         //xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         //ahora no viajan mas por url sino por el sen si es POST.
         //le tenemos q avisar al servidor como le estamos pasando la informacion (setREquesHeader)
         //si es GET esa linea no va
         xml.onreadystatechange = callback; 
         xml.send(datos);
         var gif = document.getElementById("load");
         gif.hidden=false;
         console.log("envie la data");
         //
 }
