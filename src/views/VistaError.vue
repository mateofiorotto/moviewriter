<template>
    <div class="text-center mt-5 container animate__animated animate__fadeIn">
      <h1 class="mb-3">404 - Página No Encontrada</h1>
      <p>Lo sentimos, la página que buscas no existe.</p>
      <p><i class="bi bi-emoji-frown emoji-404"></i></p>
      <div class="animate__animated animate__zoomIn">
        <router-link to="/"><a class="volver-404">Volver a la página principal</a></router-link>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'VistaError',
  };
  </script>
  
  <style scoped>
  h1 {
    color: black !important;
    font-weight: bold;
  }
  
/*404*/

.emoji-404 {
  font-size: 15em;
}

.volver-404 {
  font-size: 2em;
  transition: 0.2s ease-in-out all;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: bold;
}

.volver-404:hover {
  color: blue;
}

  
  </style>