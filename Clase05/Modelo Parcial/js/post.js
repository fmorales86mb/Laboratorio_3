var xml = new XMLHttpRequest(); 
window.addEventListener("load",function()
 {
     var btn= $("btnSingIn");
     //btn.addEventListener("click",enviarGet);
     btn.addEventListener("click",capturarData);
     
 });

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
                var obj = JSON.parse(respuesta);
                var color = obj['preferencias']['color'];
                var fuente = obj['preferencias']['font'];
                var emailD= document.getElementById("mail").value;
                var parametros = "?color="+color+"&"+"fuente="+fuente+"&"+"mail="+emailD;
                window.location.replace("./index.html"+parametros);
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
    var emailD= document.getElementById("mail").value;
    var passD = document.getElementById("pass").value;

     var datosLogin={
         email:emailD,
         password:passD
        }
    enviarPost(datosLogin);
}


 function enviarPost(data)
 {
        var datos = JSON.stringify(data);
         xml.open("POST","http://localhost:1337/login",true);
         //xml.setRequestHeader("Content-type","application/x-www-form-urlencoded");
         //ahora no viajan mas por url sino por el sen si es POST.
         //le tenemos q avisar al servidor como le estamos pasando la informacion (setREquesHeader)
         //si es GET esa linea no va
         xml.onreadystatechange = callback; 
         xml.send(datos);
         //
 }

 function $(id)
 {
     return document.getElementById(id);
 }