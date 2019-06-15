"use strict";
var Animal;
(function (Animal) {
    $(document).ready(function () {
        $("#btnAgregar").click(ClickAgregar);
    });
    // Funciones fuera de la clase con "function"
    function Saludar() {
        var saludo = "hola ";
        // Array
        var lista = new Array();
        var miPerro = new Animal.Perro("Bach");
        var miGato = new Animal.Gato("Tito");
        lista.push(miGato);
        lista.push(miPerro);
        saludo += miPerro.GetNombre() + miGato.GetNombre();
        return saludo;
    }
    Animal.Saludar = Saludar;
    function ClickAgregar() {
        var nombre = String($("#txtNombre").val());
        var miAnimal = new Animal.Perro(nombre);
        console.log(miAnimal);
    }
    function crearElementoTr(jsonDatosFila) {
        var tr = new HTMLTableRowElement();
        var tdTipo = crearElementoTd("bla");
        var tdNombre = crearElementoTd(jsonDatosFila.GetNombre());
        var tdEdad = crearElementoTd(jsonDatosFila.GetNombre());
        tr.appendChild(tdNombre);
        return tr;
    }
    function crearElementoTd(dato) {
        var td = new HTMLTableDataCellElement();
        td.innerHTML = dato;
        return td;
    }
})(Animal || (Animal = {}));
