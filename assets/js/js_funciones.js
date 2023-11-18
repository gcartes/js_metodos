
let id_tarea            = document.getElementById('id_tarea')  // campo de texto
let id_TotalTareas      = document.getElementById('id_TotalTareas')
let id_TareasRealizadas = document.getElementById('id_TareasRealizadas')
let id_Tareas_tabla     = document.getElementById('id_Tareas_tabla')


let array_contenidoTareas = []
let htmlTareas = ''
let countRealizadas = 0;
let countTotalTareas = 0;
let countID_tareas = 3; // por defecto mi ID tendra tres tareas y cada vez que se cree una tarea se incrementara, al restar no se restara esta variable por lo cual tendrá ID saltados pero nunca duplicados

// agregamos nuestras primeras tres tareas por defecto
window.addEventListener("load", function () {
    
    id_TareasRealizadas.innerHTML = 0

    array_contenidoTareas = [
        {id: 1, nombre: 'Tarea 1'},
        {id: 2, nombre: 'Tarea 2'},
        {id: 3, nombre: 'Tarea 3'}
    ]
    
    f_llenar_datos()

});


// funcion para tareas terminadas
function f_tarea_terminada(){
    
    // recorro primero todos los imput y luego selecciono solo los checkbox, luego cuento solo los checkbox que son true
    let checkMarcados = document.getElementsByTagName('input').length

    countRealizadas = 0;

    for (let ck=0; ck < checkMarcados; ck++){
        let checkbox = document.getElementsByTagName("input")[ck].checked
        
        if (checkbox)
            countRealizadas++
        
    }

    id_TareasRealizadas.innerHTML = countRealizadas
}


function f_tarea_eliminada(op){

    let borrar = array_contenidoTareas.findIndex(tarea => tarea.id == op)
    array_contenidoTareas.splice(borrar,1)

    f_llenar_datos()

    // reiniciamos el contador de tareas terminadas
    f_tarea_terminada()

}


let btn_agregar = document.getElementById('id_btn_agregar');
btn_agregar.addEventListener('click', function() {

    countID_tareas++
    let agregarTarea = id_tarea.value;

    array_contenidoTareas.push({id: countID_tareas, nombre: agregarTarea})
    
    f_llenar_datos()

    id_tarea.value = ""


})

function f_llenar_datos(){

    countTotalTareas = array_contenidoTareas.length;

    htmlTareas = '';
    for (let tarea of array_contenidoTareas){

        htmlTareas+= `
                    <tr>
                    <td>${tarea.id}</td>
                    <td>${tarea.nombre}</td>
                    <td><input class="form-check-input" type="checkbox" id="id_check" onclick="f_tarea_terminada()"></td>
                    <td><button type="button" class="btn btn-danger btn-sm"  onclick="f_tarea_eliminada(${tarea.id})">Eliminar</button></td>
                    </tr>
                    `
        }

        id_Tareas_tabla.innerHTML = htmlTareas;
        id_TotalTareas.innerHTML = countTotalTareas

}
