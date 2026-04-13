function mostrarLogin(){
    document.getElementById("seleccion").style.display="none";
    document.getElementById("formLogin").style.display="block";
}
function mostrarRegistro(){
    document.getElementById("seleccion").style.display="none";
    document.getElementById("formRegistro").style.display="block";
}

function registrar(){
    const nombre=document.getElementById("nombre").value;
    const correo=document.getElementById("correo").value;
    const pass=document.getElementById("pass").value;
    const pass2=document.getElementById("pass2").value;

    if(!nombre||!correo||!pass||!pass2){alert("Completa todos los campos");return;}
    if(pass!==pass2){alert("Las contraseñas no coinciden");return;}

    let usuarios=JSON.parse(localStorage.getItem("usuarios"))||[];
    usuarios.push({nombre,correo,pass});
    localStorage.setItem("usuarios",JSON.stringify(usuarios));

    alert("Registro exitoso. Ahora inicia sesión.");
    mostrarLogin();
}

function iniciarSesion(){
    const correo=document.getElementById("loginCorreo").value;
    const pass=document.getElementById("loginPass").value;
    let usuarios=JSON.parse(localStorage.getItem("usuarios"))||[];
    let usuarioValido=usuarios.find(u=>u.correo===correo && u.pass===pass);

    if(usuarioValido){
        localStorage.setItem("sesionActiva", JSON.stringify(usuarioValido));
        window.location.href="../menu/menu.html";
    }else{
        alert("Correo o contraseña incorrectos");
    }
}
