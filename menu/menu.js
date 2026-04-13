window.onload=function(){
    let usuario=JSON.parse(localStorage.getItem("sesionActiva"));
    if(!usuario){
        window.location.href="../login/Login.html";
    }else{
        document.getElementById("bienvenida").innerText="Bienvenido, "+usuario.nombre;
    }
}
function cerrarSesion(){
    localStorage.removeItem("sesionActiva");
    window.location.href="../inicio/Index.html";
}
