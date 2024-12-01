<template>
<div>
  <div class="justify-content-center align-items-center p-4 mb-5 tarjeta-pelicula animate__animated animate__fadeIn"
    :class="{ favorito: pelicula.favorito }">
    <img :src="pelicula.imagen === 'default.webp' ? 'src/assets/imgs/default.webp' : pelicula.imagen"
      class="m-auto img-fluid mt-3 img-fluid card-img-top" alt="Imagen de la película" />
    <div class="card-body">
      <h3 class="pt-4 pb-4 card-title">{{ pelicula.titulo }}</h3>
      <div class="row">
        <div class="col-12 mb-4">
          <router-link :to="`/pelicula/${pelicula.id}`">
            <button class="me-2 btn btn-success ver-detalles">Ver Detalles</button>
          </router-link>
        </div>
        <div class="col-12">

          <!--boton para alternar fav-->
          <button @click="alternarFavorito" class="btn-estrella btn btn-warning me-2">
            <span v-if="pelicula.favorito">
              <i class="bi bi-star-fill"><span>Icono estrella completa</span></i>
            </span>
            <span v-else>
              <i class="bi bi-star"><span>Icono estrella</span></i>
            </span>
          </button>

          <!--boton para alternar visto-->
          <button @click="alternarVisto" class="btn-visto btn btn-info me-2">
            <span v-if="pelicula.visto">
              <i class="bi bi-check-circle-fill"><span>Icono check completo</span></i>
            </span>
            <span v-else>
              <i class="bi bi-check-circle"><span>Icono check</span></i>
            </span>
          </button>
          <!--boton para editar, emite un evento 'editar' al comp padre -->
          <button class="me-2 btn btn-primary" @click="$emit('editar', pelicula)">
            <i class="bi bi-pencil-square"><span>Modificar</span></i>
          </button>

          <!--boton para eliminar la peli, emite un evento para abrir la modal -->
          <button class="btn btn-danger" @click="confirmarBorrar">
            <i class="bi bi-trash-fill"><span>Eliminar</span></i>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="showModal" class="modal-overlay">
      <div class="mod animate__animated animate__zoomIn">
        <h3>Confirmación</h3>
        <p>¿Estás seguro de que deseas eliminar esta película?</p>
        <button @click="borrarPelicula">Confirmar</button>
        <button @click="cancelarBorrar">Cancelar</button>
      </div>
    </div> 
</div>
</template>

<script>
export default {
  props: ['pelicula'],
  emits: ['eliminar', 'editar', 'actualizar'],
  data() {
    return {
      showModal: false,
    };
  },
  methods: {
    alternarFavorito() {
      //emitimos el evento actualizar al comp padre y guardamos en local
      this.pelicula.favorito = !this.pelicula.favorito;
      this.$emit('actualizar', this.pelicula);
      this.guardarEstado();
    },
    alternarVisto() {
      //igual al metodo anterior solo que con visto
      this.pelicula.visto = !this.pelicula.visto;
      this.$emit('actualizar', this.pelicula);
      this.guardarEstado();
    },
    guardarEstado() {
      //guardamos en local los estados
      localStorage.setItem(`pelicula_${this.pelicula.id}`, JSON.stringify({
        favorito: this.pelicula.favorito,
        visto: this.pelicula.visto,
      }));
    },
    //muestra la modal de confirmación
    confirmarBorrar() {
      this.showModal = true;
    },
    //cancela la acción de borrado y cerramos la modal
    cancelarBorrar() {
      this.showModal = false;
    },
    //emite el evento de eliminación al componente padre y cerramos la modal
    borrarPelicula() {
      //borra el item del local completamente para no preservar favorito / visto al borrar individualmente
      localStorage.removeItem(`pelicula_${this.pelicula.id}`);
      this.$emit('eliminar', this.pelicula.id);
      this.showModal = false;
    },
  },
  mounted() {
    //recuperamos el estado guardado en local al montar el componente
    const estadoGuardado = JSON.parse(localStorage.getItem(`pelicula_${this.pelicula.id}`));
    if (estadoGuardado) {
      this.pelicula.favorito = estadoGuardado.favorito || false;
      this.pelicula.visto = estadoGuardado.visto || false;
    }
  },
};
</script>

<style scoped>
.tarjeta-pelicula {
  z-index: 1;
  background-color: black;
}

.tarjeta-pelicula.favorito {
  background-color: gold;
}

.tarjeta-pelicula.favorito h3 {
  color: black;
}

img {
  width: 100%;
  height: 350px;
}

h3 {
  color: white;
}

.ver-detalles {
  font-weight: bold;
}

.lista-peliculas img {
  object-fit: cover;
}

/* Estilos para botones de favorito y visto */
.btn-estrella,
.btn-visto {
  font-weight: bold;
  display: inline-flex;
  align-items: center;
  border: 2px solid black;
}
</style>
