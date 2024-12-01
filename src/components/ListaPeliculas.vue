<template>
  <div class="pb-5">
    <div v-if="peliculas.length === 0" class="sin-peliculas">
      <p>
        No hay películas agregadas.</p>
        <router-link to="/agregar"><button class="btn-cargar-mas mt-3">Empieza a agregar películas acá</button></router-link>
    </div>
    <div class="row mb-4" v-else>
      <div class="col-lg-2 col-6 justify">
        <router-link to="/agregar"><button class="btn-cargar-mas mt-3">Cargar más</button></router-link>
      </div>
      <div class="col-lg-2 col-6">
        <!--Llamamos al metodo de borrar-->
        <button @click="confirmarBorrar" class="btn-borrar-todo mt-3">
        Borrar todo
        </button>
      </div>
    </div>

    <div class="lista-peliculas row justify-content-center align-items-center">
      <!--A cada tarjeta le pasamos sus valores y los botones que ejecutan su metodo-->
      <TarjetaPelicula
        v-for="pelicula in peliculas"
        :key="pelicula.id"
        :pelicula="pelicula"
        @eliminar="eliminarPelicula"
        @editar="editarPelicula"
        @actualizar="actualizarPelicula"
        class="col-lg-3 me-0 me-lg-4 col-10"
      />
    </div>
  </div>

  <div v-if="showModal" class="modal-overlay">
    <div class="mod animate__animated animate__zoomIn">
        <h3>Confirmación</h3>
        <p>¿Estás seguro de que deseas eliminar <span class="cuidado">todas las peliculas</span>?</p>
        <button @click="borrarTodasPeliculas">Confirmar</button>
        <button @click="cancelarBorrar">Cancelar</button>
    </div>
  </div>
</template>

<script>
//importamos el comp hijo
import TarjetaPelicula from './TarjetaPelicula.vue'

export default {
  name: 'ListaPeliculas',
  components: { TarjetaPelicula },
  data() {
    return {
      showModal: false,
      peliculas: JSON.parse(localStorage.getItem('peliculas')) || [],
    }
  },
  methods: {
    //eliminamos la pelicula con id y lo sacamos del local
    eliminarPelicula(id) {
      this.peliculas = this.peliculas.filter(pelicula => pelicula.id !== id)
      localStorage.setItem('peliculas', JSON.stringify(this.peliculas))
    },
    //pusheamos la la id a la vista de agregar para modificarlo
    editarPelicula(pelicula) {
      this.$router.push(`/agregar?id=${pelicula.id}`)
    },
    //muestra la modal de confirmación
    confirmarBorrar() {
      this.showModal = true;
    },
    //cancela la acción de borrado y cerramos la modal
    cancelarBorrar() {
      this.showModal = false;
    },
    //vaciamos las peliculas y las sacamos del local
    borrarTodasPeliculas() {

      //vaciamos todo asi no queda guardado el estado favorito y visto al borrar TODAS las peliculas
      this.peliculas.forEach(pelicula => {
      localStorage.removeItem(`pelicula_${pelicula.id}`);
      });

      this.peliculas = []
      localStorage.removeItem('peliculas')
      this.showModal = false;
    },
    //se ejecuta cuando el componente hijo manda el emit para visto / favorito
    actualizarPelicula(peliculaActualizada) {
      const index = this.peliculas.findIndex(p => p.id === peliculaActualizada.id);
      if (index !== -1) {
        this.peliculas.splice(index, 1, peliculaActualizada);
        localStorage.setItem('peliculas', JSON.stringify(this.peliculas));
      }
    }
  },
}
</script>

<style scoped>
.btn-borrar-todo, .btn-cargar-mas {
  border-radius: 10px;
  padding: 1.5em;
  margin-bottom: 2em;
  border: 0;
  font-size: 1.25em;
  transition: all ease-in-out 0.2s;
}

.btn-borrar-todo {
  background-color: grey;
}

.btn-cargar-mas {
  background-color: green;
  color: white;
}

.btn-borrar-todo:hover{
  background-color: red;
  color: white;
}

.btn-cargar-mas:hover {
  background-color: lime;
  color: black;
}

.tarjeta-pelicula {
  background-color: black;
}

.cuidado {
  color: red;
}
</style>
