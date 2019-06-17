"use strict";
var login;
(function (login) {
    $(document).ready(function () {
        $("#btnSingin").click(Logear);
        $("#alerta").hide();
    });
    function Logear() {
        if (ValidarImputs()) {
            var objUser = new login.User(String($("#txtUserName").val()), String($("#txtUserPass").val()));
            objUser.LogearUser();
        }
    }
    function ValidarImputs() {
        var txtUserName = $("#txtUserName");
        var txtUserPass = $("#txtUserPass");
        var validos = true;
        if (txtUserName.val() === null || txtUserName.val() == "") {
            txtUserName.addClass("is-invalid");
            validos = false;
        }
        else {
            txtUserName.removeClass("is-invalid");
        }
        if (txtUserPass.val() === null || txtUserPass.val() == "") {
            txtUserPass.addClass("is-invalid");
            validos = false;
        }
        else {
            txtUserPass.removeClass("is-invalid");
        }
        return validos;
    }
    function EvalRespuesta(data) {
        if (data != null && data !== false) {
            sessionStorage.setItem("token", String(data));
            $("#alerta").hide();
            $("#txtUserName").addClass("is-valid");
            $("#txtUserPass").addClass("is-valid");
            window.location.assign("./index.html");
        }
        else {
            $("#alerta").show();
            $("#txtUserName").removeClass("is-valid");
            $("#txtUserPass").removeClass("is-valid");
        }
    }
    login.EvalRespuesta = EvalRespuesta;
})(login || (login = {}));
