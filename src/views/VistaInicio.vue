<!--Definimos la vista de inicio, con el banner-->
<template>
  <div>
    <div id="banner">
      <header class="container">
        <h2 class="animate__animated animate__zoomIn" style="animation-delay: 0s;">¡Bienvenido/a!</h2>
        <!--algunas animaciones (animate.css)-->
        <p class="mb-5 mt-5 animate__animated animate__zoomIn" style="animation-delay: 0.5s;">Somos MovieWriter</p>
        <p class="mb-5 mt-5 animate__animated animate__zoomIn" style="animation-delay: 1.3s;">Carga tus películas como
          recordatorio para verlas después!</p>
        <p class="animate__animated animate__zoomIn" style="animation-delay: 2s;">Realizado por Mateo Fiorotto y Matias
          Neto</p>
        <router-link :to="`/agregar`">
          <a class="mt-4 animate__animated animate__zoomIn" style="animation-delay: 2.5s;" id="cargar-pelis-btn"
            href="#">Cargar Peliculas</a>
        </router-link>
      </header>
    </div>
    <div class="container mt-5" id="lista-peliculas">
      <h3>Lista de Películas</h3>
      <ListaPeliculas/>
    </div>
  </div>
</template>

<script>
//importamos el comp lista y la mostramos
import ListaPeliculas from '../components/ListaPeliculas.vue';

export default {
  name: "VistaInicio",
  components: {
    ListaPeliculas,
  },
};
</script>

<style scoped>
h2 {
  color: white;
}

h1,
h2,
h3 {
  font-weight: bold;
}


/*BANNER*/
#banner {
  background-image: url("../assets/imgs/fondo.webp");
  background-repeat: no-repeat;
  background-size: cover;
  width: 100%;
  height: 100vh;
  border-bottom: 10px solid white;
}

#banner i {
  padding-left: 0.5em;
  font-size: 1.2em;
}

#banner p {
  font-size: 2.2em;
  color: white;
}

#cargar-pelis-btn {
  padding: 1.5em;
  background-color: #000000;
  color: white;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.2em;
  display: inline-block;
  margin: auto;
  text-transform: uppercase;
  border: 1px solid white;
  border-radius: 2em;
  transition: all ease-in-out 0.25s;
}

#cargar-pelis-btn:hover {
  background-color: white;
  color: black;
}

.cuidado {
  color: red;
}


@media (max-width: 601px) {
  #banner {
    text-align: center;
  }

  #banner h2 {
    font-size: 2em;
  }

  #banner p {
    font-size: 1.75em;
  }
}
</style>