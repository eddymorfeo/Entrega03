// Objeto Tarea
function Tarea(nombreTarea, descripcionTarea, fechaInicioTarea, estadoTarea) {
    this.nombreTarea = nombreTarea;
    this.descripcionTarea = descripcionTarea;
    this.fechaInicioTarea = fechaInicioTarea;
    this.estadoTarea = estadoTarea;
}

// Obtener lista de tareas almacenadas en el Local Storage
function obtenerListaTareas() {
    let storedData = localStorage.getItem('listaTareas');
    return storedData ? JSON.parse(storedData) : [];
}

// Guardar lista de tareas en el Local Storage
function guardarListaTareas(listaTareas) {
    localStorage.setItem('listaTareas', JSON.stringify(listaTareas));
}

// Método para agregar una tarea
function agregarTarea() {
    let nombreTarea = document.getElementById("nombre").value.trim();
    let descripcionTarea = document.getElementById("descripcion").value;
    let fechaInicioTarea = document.getElementById("fechaInicio").value;
    let estadoTarea = document.getElementById("estado").value;

    if (nombreTarea === "" || descripcionTarea === "" || fechaInicioTarea === "" || estadoTarea === "") {
        alert("Debe ingresar todos los campos para agregar una tarea.");
        return;
    }

    let listaTareas = obtenerListaTareas();

    if (listaTareas.some(tarea => tarea.nombreTarea.toUpperCase() === nombreTarea.toUpperCase())) {
        alert("Ya existe una tarea con el mismo nombre. Ingrese un nombre de tarea distinto.");
        return;
    }

    let nuevaTarea = new Tarea(nombreTarea, descripcionTarea, fechaInicioTarea, estadoTarea);
    listaTareas.push(nuevaTarea);
    guardarListaTareas(listaTareas);

    alert("La tarea " + nombreTarea + " fue agregada correctamente.");
    mostrarTareas(listaTareas);
    limpiarCampos();
}

// Método para eliminar una tarea
function eliminarTarea() {    
    let nombreTarea = document.getElementById("nombre").value.trim();

    if (nombreTarea === "") {
        alert("Debe ingresar un nombre de tarea válido.");
        return;
    }

    let listaTareas = obtenerListaTareas();
    let tareaExistente = listaTareas.findIndex(tarea => tarea.nombreTarea.toUpperCase() === nombreTarea.toUpperCase());

    if (tareaExistente !== -1) {
        listaTareas.splice(tareaExistente, 1);
        guardarListaTareas(listaTareas);
        alert("La tarea " + nombreTarea + " fue eliminada correctamente.");
        mostrarTareas(listaTareas);
        limpiarCampos();
    } else {
        alert("No existe la tarea llamada " + nombreTarea);
    }
}

// Método para mostrar las tareas en una tabla HTML
function mostrarTareas(tareas) {
    let tabla = document.getElementById("tablaTareas");
    let tbody = tabla.querySelector("tbody");
    tbody.innerHTML = "";

    tareas.forEach((tarea) => {
        let fila = tbody.insertRow();
        let nombreCelda = fila.insertCell();
        let descripcionCelda = fila.insertCell();
        let fechaInicioCelda = fila.insertCell();
        let estadoCelda = fila.insertCell();

        nombreCelda.innerText = tarea.nombreTarea;
        descripcionCelda.innerText = tarea.descripcionTarea;
        fechaInicioCelda.innerText = tarea.fechaInicioTarea;
        estadoCelda.innerText = tarea.estadoTarea;
    });
}

// Método para limpiar los campos del formulario
function limpiarCampos() {
    document.getElementById("nombre").value = "";
    document.getElementById("descripcion").value = "";
    document.getElementById("fechaInicio").value = "";
    document.getElementById("estado").value = "";
}

// Cargar las tareas al iniciar la página
document.addEventListener("DOMContentLoaded", () => {
    let listaTareas = obtenerListaTareas();
    mostrarTareas(listaTareas);
});

function limpiarLocalStorage() {
    localStorage.clear();
    alert("Local Storage limpiado correctamente.");
    mostrarTareas([]);
  }