// Tipos
var batman = "Bruce";
var superman = "Clark";
var existe = false;
// Tuplas
var parejaHeroes = [batman, superman];
var villano = ["Lex Lutor", 5, true];
// Arreglos
var aliados = ["Mujer Maravilla", "Acuaman", "San", "Flash"];
//Enumeraciones
var fuerzas;
(function (fuerzas) {
    fuerzas[fuerzas["fuerzaFlash"] = 5] = "fuerzaFlash";
    fuerzas[fuerzas["fuerzaSuperman"] = 100] = "fuerzaSuperman";
    fuerzas[fuerzas["fuerzaBatman"] = 1] = "fuerzaBatman";
    fuerzas[fuerzas["fuerzaAcuaman"] = 0] = "fuerzaAcuaman";
})(fuerzas || (fuerzas = {}));
;
// var fuerzaFlash = 5;
// var fuerzaSuperman = 100;
// var fuerzaBatman = 1;
// var fuerzaAcuaman = 0;
// Retorno de funciones
function activar_batiseñal() {
    return "activada";
}
function pedir_ayuda() {
    console.log("Auxilio!!!");
}
// Aserciones de Tipo
var poder = "100";
var largoDelPoder = poder.length;
console.log(largoDelPoder);
