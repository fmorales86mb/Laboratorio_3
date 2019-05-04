window.addEventListener("load", function(){
    var lista = document.getElementById("lista");
    
    // Agregar un nodo.
    var nuevoNodo = document.createTextNode("texto del nodo");
    var parrafo = document.getElementById("parrafo");
    parrafo.appendChild(nuevoNodo);

    // Agrego elemento.
    var nuevoNodoLi = document.createElement("li");
    nuevoNodoLi.appendChild(nuevoNodo); // me quita el nuevoNodo de donde estaba y lo pone donde le digo
    lista.appendChild(nuevoNodoLi);

    // Remover elemento del dom.
    var primerElemento = lista.firstElementChild;
    primerElemento.parentNode.removeChild(primerElemento);

    // Agregar atributo a elemento (clave, valor). Se puede guardar cualquier atributo.
    nuevoNodoLi.setAttribute("id", "nuevoNodo");
    nuevoNodoLi.setAttribute("class", "classNodo");
    nuevoNodoLi.setAttribute("NuevoAtributo", "ValorAtributo");
    // Get value atributo
    console.log(nuevoNodoLi.getAttribute("NuevoAtributo"));

    // Guardar en el LocalStorage. Se guarda en el navegador.
    var objJson = {"key":"clave1","edad":"32"};
    localStorage.setItem("clave1", JSON.stringify(objJson));
    // Get item
    console.log(localStorage.getItem("clave1"));

});