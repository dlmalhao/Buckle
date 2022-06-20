import Vue from 'vue'
import VueRouter from 'vue-router'
import paginaInicial from '../views/paginaInicial.vue'
import anuncios from '../views/Anuncios.vue'
import anuncioEspecifico from '../views/anuncioEspecifico.vue'
import login from '../views/login.vue'
import registo from '../views/registo.vue'
import gestaoUtilizadores from '../views/adminUsers.vue'
import gestaoAnuncios from '../views/adminAds.vue'
import gestaoProjetos from '../views/adminProjects.vue'
import store from '../store/index.js'
import perfil from '../views/perfil2.vue'
import sobre from '../views/sobre.vue'
import projetos from '../views/projetos.vue'
import AE from '../views/AE.vue'
import projetoEspecifico from '../views/projetoEspecifico.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'PaginaInicial',
    component: paginaInicial,
  },
  {
    path: '/anuncios',
    name: 'Anuncios',
    component: anuncios
  },
  {
    path: '/projetos',
    name: 'Projetos',
    component: projetos
  },
  {
    path: '/anuncios/:id',
    name: 'anuncioEspecifico',
    component: anuncioEspecifico
  },
  {
    path: '/projetos/:id',
    name: 'projetoEspecifico',
    component: projetoEspecifico
  },
  {
    path: '/login',
    name: 'Login',
    component: login,
    meta: {
      onlyWithoutAuth: true,
    }
  },
  {
    path: '/registo',
    name: 'Registo',
    component: registo,
    meta: {
      onlyWithoutAuth: true,
    }
  },
  {
    path: '/perfil/:id',
    name: 'perfil',
    component: perfil,
    meta: {
      requiresAuth: true,
    }
  },
  {
    path: '/admin/utilizadores',
    name: 'Gestão de utilizadores',
    component: gestaoUtilizadores,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
  },
  {
    path: '/admin/anuncios',
    name: 'Gestão de anuncios',
    component: gestaoAnuncios,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
  },
  {
    path: '/admin/projetos',
    name: 'Gestão de projetos',
    component: gestaoProjetos,
    meta: {
      requiresAuth: true,
      requiresAdmin: true
    },
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: sobre
  },
  {
    path: '/associacao_estudantes',
    name: 'AE',
    component: AE,
    meta: {
      requiresAuth: true,
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior () {
    return { x: 0, y: 0 }
  }
})



router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !store.getters.getLoggedUser) {
    next({ name: "Login" });
  } 
  else if (to.meta.onlyWithoutAuth && store.getters.getLoggedUser) {
    next({ name: "PaginaInicial" });
  }
  else if (to.meta.requiresAuth && to.meta.requiresAdmin && store.getters.getLoggedUser) {
    if(store.getters.getLoggedUser.role == 'user') {
      next({name: 'PaginaInicial'})
    }
    else{
      next()
    }
  }
  else {
    next();
  }
});

export default router
