namespace login{
    $(document).ready(function(){
        $("#btnSingin").click(Logear);
        $("#alerta").hide();
    }); 

    function Logear(){        
        if(ValidarImputs()){
            let objUser:User = new User(
                String($("#txtUserName").val()),
                String($("#txtUserPass").val())
            );
            
            objUser.LogearUser();
        }
    }

    function ValidarImputs():boolean{
        let txtUserName = $("#txtUserName");
        let txtUserPass = $("#txtUserPass");
        let validos:boolean = true;

        if (txtUserName.val() === null || txtUserName.val() == ""){
            txtUserName.addClass("is-invalid");
            validos = false;
        }else{
            txtUserName.removeClass("is-invalid");
        }
        
        if (txtUserPass.val() === null || txtUserPass.val() == ""){
            txtUserPass.addClass("is-invalid");
            validos = false;
        }else{
            txtUserPass.removeClass("is-invalid");
        }

        return validos;
    }

    export function EvalRespuesta(data:any){
        if (data != null && data !== false){
            sessionStorage.setItem("token", String(data));
            $("#alerta").hide();
            $("#txtUserName").addClass("is-valid");
            $("#txtUserPass").addClass("is-valid");
            window.location.assign("./index.html");            
        }
        else{
            $("#alerta").show();
            $("#txtUserName").removeClass("is-valid");
            $("#txtUserPass").removeClass("is-valid");
        }
    }
}