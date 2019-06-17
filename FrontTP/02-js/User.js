"use strict";
var login;
(function (login) {
    var User = /** @class */ (function () {
        function User(name, pass) {
            this.Url = "http://localhost:80/LaComanda/login";
            this.name = name;
            this.pass = pass;
        }
        User.prototype.LogearUser = function () {
            $.post(this.Url, { nombre: this.name, clave: this.pass }, function (data, status) {
                if (status == "success") {
                    login.EvalRespuesta(data);
                }
            });
        };
        return User;
    }());
    login.User = User;
})(login || (login = {}));
