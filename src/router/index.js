import { createRouter, createWebHistory } from 'vue-router'
//importamos las vistas
import VistaInicio from '../views/VistaInicio.vue'
import VistaDetallePelicula from '../views/VistaDetallePelicula.vue'
import VistaAgregarPelicula from '../views/VistaAgregarPelicula.vue'
import VistaError from '../views/VistaError.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  //creamos las rutas
  routes: [
    {
      path: '/',
      name: 'home',
      component: VistaInicio
    },
    {
      path: '/agregar',
      name: 'agregar',
      component: VistaAgregarPelicula
    },
    {
      path: '/pelicula/:id',
      name: 'pelicula',
      component: VistaDetallePelicula,
      props: true
    },
    //vista 404
    {
      path: '/:catchAll(.*)',
      name: 'VistaError',
      component: VistaError,
    }
  ]
})

export default router
