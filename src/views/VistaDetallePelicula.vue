<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-lg-6">
        <h2 class="pb-3">{{ pelicula.titulo }}</h2>
        <img class="img-fluid" :src="pelicula.imagen === 'default.webp' ? '../src/assets/imgs/default.webp' : pelicula.imagen" alt="Imagen de la película" />
      </div>
      <div class="col-lg-6 mt-5 pt-3">
        <p class="mt-3"><i class="bi bi-info-circle-fill me-3"><span>Icono info</span></i><strong>Descripción:</strong> {{ pelicula.descripcion }}</p>
        <p><i class="bi bi-camera-reels-fill me-3"><span>Icono camara</span></i><strong>Director:</strong> {{ pelicula.director }}</p>
        <p><i class="bi bi-tag-fill me-3"><span>Icono etiqueta</span></i><strong>Géneros:</strong> {{ pelicula.genero.join(', ') }}</p>
        <p class="pb-5"><i class="bi bi-calendar-fill me-3"><span>Icono calendario</span></i><strong>Año de estreno:</strong> {{ pelicula.estreno }}</p>
        <!--comprobamos si la pelicula fue marcada como fav o vista-->
        <p v-if="pelicula.favorito" class="favorito-mensaje"><i class="bi bi-star-fill me-3"><span>Icono estrella completa</span></i>Esta película está marcada como favorita</p>
        <p v-if="pelicula.visto" class="visto-mensaje"><i class="bi bi-check-circle-fill me-3"><span>Icono check completo</span></i>Esta película ya ha sido vista</p>
      </div>
  </div>
</div>
</template>

<script>
export default {
  name: "VistaDetallePelicula",
  //pasamos el id de la pelicula en especifico
  props: ['id'],
  data() {
    return {
      pelicula: {},
    };
  },
  //al crearse el componente, obtenemos el array de pelis en localstorage
  // y encontramos la pelicula actual con la id
  created() {
    const peliculas = JSON.parse(localStorage.getItem('peliculas'));
    this.pelicula = peliculas.find(p => p.id == this.id) || {};

    //cargamos los estados desde el local (para que si se recarga la pagina se mantengan)
    const estadoGuardado = JSON.parse(localStorage.getItem(`pelicula_${this.id}`));
    if (estadoGuardado) {
      this.pelicula.favorito = estadoGuardado.favorito || false;
      this.pelicula.visto = estadoGuardado.visto || false;
    }
  },
};
</script>

<style scoped>
h2 {
  font-weight: bold;
  text-align: center;
}

img {
  max-height: 70vh;
  margin: auto;
  display: block;
}
</style>