 // ventana completa del navegador. Veo cuándo se termino de cargar
 window.onload=carga;
 
         // agregar y quitar eventos...
         document.getElementById("btnEnviar").addEventListener("click", ValidarUsuario);
         document.getElementById("btnEnviar").removeEventListener("click", ValidarUsuario);
 
 
         function carga(){
             var btn = document.getElementById("btnEnviar");
             btn.onclick = ValidarUsuario;
         }
 
         // en js se puede guardar una funcion en una variable. VER
         //var miFuncion = function ValidarUsuario(){
             function ValidarUsuario(){
             var usr = document.getElementById(txtUsr);    
             var pass = document.getElementById(txtPass);
             
             console.log(usr);
 
             if(usr.value === "federico" && pass.value === "pass"){
                 alert("joya!");
             }
             else{
                 alert("woo!");
             }
         }