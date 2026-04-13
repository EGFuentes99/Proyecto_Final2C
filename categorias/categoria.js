let categorias = JSON.parse(localStorage.getItem("categorias")) || ["Trabajo","Amigo","Casa"];
let indiceEdicion = null;

function mostrarCategorias(){
    const lista=document.getElementById("listaCategorias");
    lista.innerHTML="";
    categorias.forEach((c,index)=>{
        lista.innerHTML+=`
        <div class="categoria">
            <div class="categoria-info">
                <strong>${c}</strong>
            </div>
            <div>
                <button class="edit" onclick="editar(${index})">✏️ Editar</button>
                <button class="delete" onclick="eliminar(${index})">🗑️ Eliminar</button>
            </div>
        </div>`;
    });
    localStorage.setItem("categorias",JSON.stringify(categorias));
}

function guardarCategoria(){
    const nombre=document.getElementById("nombreCategoria").value;
    if(nombre===""){
        alert("Introduce un nombre de categoría");
        return;
    }
    if(indiceEdicion===null){
        categorias.push(nombre);
    }else{
        categorias[indiceEdicion]=nombre;
        indiceEdicion=null;
    }
    document.getElementById("nombreCategoria").value="";
    mostrarCategorias();
}

function editar(index){
    document.getElementById("nombreCategoria").value=categorias[index];
    indiceEdicion=index;
}

function eliminar(index){
    categorias.splice(index,1);
    mostrarCategorias();
}

mostrarCategorias();
