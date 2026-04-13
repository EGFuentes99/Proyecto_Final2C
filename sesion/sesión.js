function cerrarSesion(){
    // Borra la sesión activa
    localStorage.removeItem("sesionActiva");
    // Redirige al inicio principal
    window.location.href="../inicio/Index.html";
}
