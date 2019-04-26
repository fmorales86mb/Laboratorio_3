// lo creo afuera para que lo tomen las funciones. Variables globales
var xml = new XMLHttpRequest();
var url ="loginUsuario";

window.addEventListener("load", function(){
    var btnLogin = $("btnLogin");
    var btnLoginSubmit = $("btnLoginSubmit"); // con el submit queda recargando la página.

    btnLogin.addEventListener("click", ClickLogin);    
    btnLoginSubmit.addEventListener("click", ClickLogin);
});

function ClickLogin(){
    var txtUsuario = document.getElementById("txtUsr").value;
    var txtPass = document.getElementById("txtPass").value;
    
    if(txtUsuario != "" && txtPass != ""){
        
        /// Esto se ejecuta cuando el servidor responde. Es asincrònico.
        xml.onreadystatechange = callback;        

  
        

        strConsulta = CrearStrParametrosLogin(txtUsuario, txtPass);   
        xml.open("POST", "http://localhost:3000/" + url, true); 
        // POST le tengo que avisar al servidor cómo le paso la información 
        // le avisamos de què manera le pasamos la data. Va despuès del open 
        xml.setRequestHeader("Content-type", "application/x-www-form-urlencoded");    
        // acà le puedo pasar los parametros por POST
        xml.send(strConsulta); 
    }
    else{
        alert("Debe ingresar datos");
    }    
}

function CrearStrParametrosLogin(user, pass){
    var strConsulta = "usr=" + user + "&pass=" + pass;
    return strConsulta;
}

//no hacer un return
function callback(){
    if(xml.readyState === 4){
        if(xml.status === 200){
            var respuesta = xml.responseText;
            if(respuesta =="true"){
                alert("Login ok");
            }
            else if(respuesta == "false"){
                alert(respuesta + " bla");
            }
            else{
                alert("error del servidor");
            }
        }
    }        
}

function callback1 (){
    if(xml.readyState === 4){
        if(xml.status === 200){
            console.log("llego la respuesta del servidor", 
            xml.readyState, // 1, 2, 3, 4
            xml.responseText, // ok en 200
            xml.status); // còdigo de respuesta        
        }
        else{
        alert("error servidor"+ xml.status);
        }
    }
    
    // console.log("llego la respuesta del servidor", 
    //     xml.readyState, // 1, 2, 3, 4
    //     xml.responseText, // ok en 200
    //     xml.status); // còdigo de respuesta
}

// para evitar escribir todo.
function $(id){
    return document.getElementById(id);
}

// 1 se conecta, 2 procesa, 3 bla, 4 hay respuesta del servidor.
// Con 4 tengo un còdigo de respuesta. El 200 es ok
