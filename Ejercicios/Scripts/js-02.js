window.addEventListener('load', function(){
    var meses = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio',
    'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
    
    meses.forEach(escribirMes);
});

function escribirMes(value, index, array){
    document.write(index + 1 + ' '+ value + '<br>');
}

