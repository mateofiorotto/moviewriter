<script>
  export default {
  name: 'App'
}
</script>

<template>
  <!--
  Aca definimos un nav con los router link
  Y mostramos las vistas
  -->
  <div v-cloak>
    <nav id="barra-navegacion" class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container">
        <a id="nav-icono" class="navbar-brand" href="/"></a>
        <h1 class="navbar-brand">MovieWriter</h1>
        <button id="btn-hamburguesa" class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <router-link class="pt-4 pt-lg-0 m-lg-3 nav-link" to="/">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link class="pt-4 pb-4 pb-lg-0 pt-lg-0 m-lg-3 nav-link" to="/agregar">Agregar Películas</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <router-view v-slot="{ Component }" v-cloak>
      <transition mode="out-in"  
            enter-active-class="animate__animated animate__fadeIn"
            leave-active-class="animate__animated animate__fadeOut">
       <component :is="Component" />  
      </transition>
    </router-view> 

  </div>
</template>