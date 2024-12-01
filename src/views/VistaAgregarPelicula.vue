<template>
  <div class="container mb-5 mt-5 pt-4 pb-5 contenedor">
    <h2 class="mb-4">{{ editando ? 'Editar Película' : 'Agregar Película' }}</h2>
    <!--
      Definición del form, aca se comprueba si se esta editando o no
    -->
    <form @submit.prevent="enviarFormulario" novalidate>
      <div class="mb-3">
        <label for="titulo" class="form-label">Título:</label>
        <input v-model="titulo" id="titulo" type="text" class="form-control" />
      </div>

      <div class="mb-3">
        <label for="descripcion" class="form-label">Descripción:</label>
        <textarea v-model="descripcion" id="descripcion" class="form-control" style="resize: none;"></textarea>
      </div>

      <div class="row mb-3">
        <div class="col-md-6 mb-3">
          <label for="imagen" class="form-label">URL de Imagen:</label>
          <input v-model="imagen" id="imagen" value="default.webp" type="text" class="form-control mb-3" />
          <span>En lo posible, lo ideal es introducir imágenes tipo poster (vertical)</span>
          <span class="cuidado d-block mt-3"><i class="bi bi-exclamation-triangle me-2"><span>Cuidado</span></i>¡Cuidado! Debes si cargas una URL incorrecta o borras el campo por defecto (default.webp), tu imágen no se podra ver.</span>
        </div>

        <div class="col-md-6">
          <label for="director" class="form-label">Director:</label>
          <input v-model="director" id="director" type="text" class="form-control" />
        </div>
      </div>

      <div class="row mb-3">

        <div class="col-md-6 mb-3">
          <div class="row">
          <label class="form-label fw-bold">Género:</label>
          <div v-for="(opcion, index) in generosDisponibles" :key="index" class="col-lg-4">
          <input 
            type="checkbox" 
            :id="'genero-' + index"
            :value="opcion" 
            v-model="genero"
            class="me-3"
          />
          <label :for="'genero-' + index">{{ opcion }}</label>
        </div>
          </div>
        </div>

        <div class="col-md-6 mb-3">
          <label for="estreno" class="form-label">Año de estreno:</label>
          <input v-model="estreno" id="estreno" type="date" class="form-control" />
        </div>

      </div>

      <button type="submit" class="btn btn-primary">{{ editando ? 'Guardar Cambios' : 'Agregar' }}</button>

      <!--mensaje de error(es)-->
      <div v-if="errores.length" class="mt-3">
        <p class="pt-3 texto-error">Por favor, corrige los siguientes errores:</p>
        <ul>
          <li v-for="(error, index) in errores" :key="index" class="texto-error">{{ error }}</li>
        </ul>
      </div>

      <div v-if="mensajeExito" class="mt-3 text-success">
        <p class="pt-3">{{ mensajeExito }}</p>
      </div>
    </form>
    <p class="text-center mt-5">{{ editando ? 'Si cometiste un error, corregilo acá!' : 'Las películas que agregues se verán en la home!' }}</p>
  </div>
</template>

<script>
export default {
  name: "VistaAgregarPelicula",
  data() {
    return {
      titulo: '',
      descripcion: '',
      imagen: 'default.webp',
      director: '',
      estreno: '',
      editando: false,
      id: null,
      errores: [],
      mensajeExito: '', 
      genero: [],
      generosDisponibles: ['Acción', 'Comedia', 'Drama', 'Terror', 'Documental', 'Ciencia Ficción', 'Animación', 'Romance', 'Aventura'],
    };
  },
  //Uso de hook created
  //verifica si hay una id en la ruta (para indicar que se esta editando una peli)
  //si encuentra los datos los carga del localStorage
  created() {
    if (this.$route.query.id) {
      const pelicula = JSON.parse(localStorage.getItem('peliculas')).find(p => p.id == this.$route.query.id);
      if (pelicula) {
        this.titulo = pelicula.titulo;
        this.descripcion = pelicula.descripcion;
        this.imagen = pelicula.imagen;
        this.director = pelicula.director;
        this.genero = pelicula.genero;
        this.estreno = pelicula.estreno;
        this.id = pelicula.id;
        this.editando = true;
      }
    } else {
      this.resetFormulario();
    }
  },
  methods: {
    enviarFormulario() {
      this.errores = [];
      this.mensajeExito = '';

      if (!this.titulo || this.titulo.length < 3) {
        this.errores.push("El título debe tener al menos 3 caracteres.");
      }
      if (!this.descripcion || this.descripcion.length < 10) {
        this.errores.push("La descripción debe tener al menos 10 caracteres.");
      }
      if (!this.imagen) {
        this.errores.push("Debe ingresar una URL para la imagen.");
      }
      if (!this.director || this.director.length < 3) {
        this.errores.push("El nombre del director debe tener al menos 3 caracteres.");
      }
      if (!this.genero.length) {
        this.errores.push("Debe seleccionar al menos un género.");
      }
      if (!this.estreno) {
        this.errores.push("Debe ingresar una fecha de estreno.");
      }

      //retornamos los errores
      if (this.errores.length) return;

      const peliculas = JSON.parse(localStorage.getItem('peliculas')) || [];
      const nuevoId = this.id || peliculas.length + 1;

      //carga nueva peli
      const nuevaPelicula = {
        id: nuevoId,
        titulo: this.titulo,
        descripcion: this.descripcion,
        imagen: this.imagen,
        director: this.director,
        genero: this.genero,
        estreno: this.estreno,
      };

      //si estamos editando pasar el indice
      if (this.editando) {
        const indice = peliculas.findIndex(p => p.id == this.id);
        peliculas.splice(indice, 1, nuevaPelicula);
        //lo mandamos a la home
        this.$router.push({ path: '/' });
      } else {
        peliculas.push(nuevaPelicula);
      }

      localStorage.setItem('peliculas', JSON.stringify(peliculas));
      this.mensajeExito = '¡Película agregada exitosamente!';
      this.resetFormulario();
    },
    resetFormulario() {
      this.titulo = '';
      this.descripcion = '';
      this.imagen = 'default.webp';
      this.director = '';
      this.genero = [];
      this.estreno = '';
      this.id = null;
      this.editando = false;
      this.errores = [];
    },
  },
};
</script>

<style scoped>
h2 {
  color: white;
  font-weight: bold;
}

.contenedor {
  background-color: black;
  padding: 1.5rem;
  border-radius: 10px;
  color: white;
}

.texto-error, .cuidado {
  color: red;
}

@media (max-width: 601px) { 
  .contenedor {
    width: 90%;
  }
}
</style>
