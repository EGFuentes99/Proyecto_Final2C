let contactos = JSON.parse(localStorage.getItem("contactos")) || [];
let indiceEdicion = null;

function mostrarContactos(){
    const lista = document.getElementById("listaContactos");
    lista.innerHTML="";
    contactos.forEach((c,index)=>{
        lista.innerHTML+=`
        <div class="contacto">
            <div class="contacto-info">
                <strong>👤 ${c.nombre}</strong>
                <span>🧷 ${c.categoria}</span>
                <span>📞 ${c.telefono}</span>
                <span>📧 ${c.correo}</span>
            </div>
            <div>
                <button class="edit" onclick="editar(${index})">✏️ Editar</button>
                <button class="delete" onclick="eliminar(${index})">🗑️ Eliminar</button>
            </div>
        </div>`;
    });
    localStorage.setItem("contactos",JSON.stringify(contactos));
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
        contactos.push({nombre,telefono,correo,categoria});
    }else{
        contactos[indiceEdicion]={nombre,telefono,correo,categoria};
        indiceEdicion=null;
    }

    limpiar();
    mostrarLista();
}

function editar(index){
    const c=contactos[index];
    document.getElementById("nombre").value=c.nombre;
    document.getElementById("telefono").value=c.telefono;
    document.getElementById("correo").value=c.correo;
    document.getElementById("categoria").value=c.categoria;
    indiceEdicion=index;
    mostrarFormulario();
}

function eliminar(index){
    contactos.splice(index,1);
    mostrarContactos();
}

function buscarContacto(){
    const texto=document.getElementById("buscador").value.toLowerCase();
    const filtrados=contactos.filter(c=>c.nombre.toLowerCase().includes(texto));
    const lista=document.getElementById("listaContactos");
    lista.innerHTML="";
    filtrados.forEach((c)=>{
        lista.innerHTML+=`
        <div class="contacto">
            <div class="contacto-info">
                <strong>${c.nombre}</strong>
                <span>${c.categoria}</span>
                <span>📞 ${c.telefono}</span>
                <span>📧 ${c.correo}</span>
            </div>
        </div>`;
    });
}

function limpiar(){
    document.getElementById("nombre").value="";
    document.getElementById("telefono").value="";
    document.getElementById("correo").value="";
    document.getElementById("categoria").value="";
}

function mostrarFormulario(){
    document.getElementById("formulario").style.display="block";
}

function mostrarLista(){
    document.getElementById("formulario").style.display="none";
    mostrarContactos();
}

mostrarContactos();
