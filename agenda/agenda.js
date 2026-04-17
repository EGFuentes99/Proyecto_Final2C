let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
let indiceEdicion = null;
let displayedContactos = contactos;
let currentFilter = "";
let currentSearch = "";

function mostrarContactos(){
    const lista = document.getElementById("listaContactos");
    lista.innerHTML="";

    // Si no hay contactos, agregar algunos de ejemplo
    if(contactos.length === 0){
        contactos = [
            {nombre: "Juan Pérez", telefono: "123-456-7890", correo: "juan@example.com", categoria: "Amigo", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()},
            {nombre: "María García", telefono: "098-765-4321", correo: "maria@example.com", categoria: "Familia", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()},
            {nombre: "Carlos López", telefono: "555-123-4567", correo: "carlos@example.com", categoria: "Trabajo", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()}
        ];
        localStorage.setItem("contactos", JSON.stringify(contactos));
        displayedContactos = contactos;
    }

    // Asegurar que todos los contactos tengan fechas
    if(contactos.length > 0 && !contactos[0].createdAt){
        contactos.forEach(c => {
            if(!c.createdAt) c.createdAt = new Date().toISOString();
            if(!c.updatedAt) c.updatedAt = new Date().toISOString();
        });
        localStorage.setItem("contactos", JSON.stringify(contactos));
    }

    displayedContactos.forEach((c,index)=>{
        lista.innerHTML+=`
        <div class="contacto">
            <div class="contacto-info">
                <strong>👤 ${c.nombre}</strong>
                <span>🧷 ${c.categoria}</span>
                <span>📞 ${c.telefono}</span>
                <span>📧 ${c.correo}</span>
            </div>
            <div>
                <button class="edit" onclick="editar('${c.nombre}')">✏️ Editar</button>
                <button class="delete" onclick="eliminar('${c.nombre}')">🗑️ Eliminar</button>
            </div>
        </div>`;
    });
    populateFiltro();
}

function guardarContacto(){
    const nombre=document.getElementById("nombre").value;
    const telefono=document.getElementById("telefono").value;
    const correo=document.getElementById("correo").value;
    const categoria=document.getElementById("categoria").value;

    if(nombre==""||telefono==""||correo==""||categoria==""){
        alert("Completa todos los campos");
        return;
    }

    if(indiceEdicion===null){
        contactos.push({nombre,telefono,correo,categoria, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString()});
    }else{
        contactos[indiceEdicion]={...contactos[indiceEdicion], nombre,telefono,correo,categoria, updatedAt: new Date().toISOString()};
        indiceEdicion=null;
    }

    limpiar();
    displayedContactos = contactos;
    cerrarModal();
    updateDisplayed();
}

function editar(nombre){
    const index = contactos.findIndex(c => c.nombre === nombre);
    if(index === -1) return;
    const c = contactos[index];
    document.getElementById("tituloFormulario").textContent = "Editar Contacto";
    document.getElementById("btnGuardar").textContent = "Actualizar";
    document.getElementById("nombre").value = c.nombre;
    document.getElementById("telefono").value = c.telefono;
    document.getElementById("correo").value = c.correo;
    document.getElementById("categoria").value = c.categoria;
    indiceEdicion = index;
    mostrarFormulario();
}

function eliminar(nombre){
    const index = contactos.findIndex(c => c.nombre === nombre);
    if(index === -1) return;
    contactos.splice(index,1);
    displayedContactos = contactos;
    updateDisplayed();
}

function buscarContacto(){
    const texto = document.getElementById("buscador").value.toLowerCase();
    currentSearch = texto;
    updateDisplayed();
}

function limpiar(){
    document.getElementById("nombre").value="";
    document.getElementById("telefono").value="";
    document.getElementById("correo").value="";
    document.getElementById("categoria").value="";
}

function mostrarFormulario(){
    document.getElementById("tituloFormulario").textContent = "Añadir Contacto";
    document.getElementById("btnGuardar").textContent = "Guardar Contacto";
    document.getElementById("modalFormulario").style.display="block";
}

function mostrarLista(){
    document.getElementById("modalFormulario").style.display="none";
    mostrarContactos();
}

function cerrarModal(){
    document.getElementById("modalFormulario").style.display="none";
    limpiar();
    indiceEdicion = null;
}

function updateDisplayed(){
    let list = contactos;
    if(currentFilter !== ""){
        list = list.filter(c => c.categoria === currentFilter);
    }
    if(currentSearch !== ""){
        list = list.filter(c => c.nombre.toLowerCase().includes(currentSearch) || c.telefono.includes(currentSearch) || c.correo.toLowerCase().includes(currentSearch));
    }
    displayedContactos = list;
    mostrarContactos();
}

function populateFiltro(){
    const select = document.getElementById("filtroCategoria");
    select.innerHTML = '<option value="">Todas</option>';
    const categorias = [...new Set(contactos.map(c => c.categoria))];
    categorias.forEach(cat => {
        select.innerHTML += `<option value="${cat}">${cat}</option>`;
    });
    select.value = currentFilter;
}

function filtrarPorCategoria(){
    const cat = document.getElementById("filtroCategoria").value;
    currentFilter = cat;
    if(cat === ""){
        currentSearch = "";  // Reset search when selecting "Todas"
        document.getElementById("buscador").value = "";  // Clear the input
    }
    updateDisplayed();
}

function ordenar(){
    const tipo = document.getElementById("ordenar").value;
    if(tipo === "nombre-az"){
        displayedContactos = [...displayedContactos].sort((a,b) => a.nombre.localeCompare(b.nombre));
    }else if(tipo === "nombre-za"){
        displayedContactos = [...displayedContactos].sort((a,b) => b.nombre.localeCompare(a.nombre));
    }else if(tipo === "recientes"){
        displayedContactos = [...displayedContactos].sort((a,b) => new Date(b.createdAt) - new Date(a.createdAt));
    }else if(tipo === "modificados"){
        displayedContactos = [...displayedContactos].sort((a,b) => new Date(b.updatedAt) - new Date(a.updatedAt));
    }else{
        // Ninguno: reset to filtered
        filtrarPorCategoria();
        return;
    }
    mostrarContactos();
}

updateDisplayed();
