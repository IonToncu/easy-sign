import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistrationView from '../views/RegistrationView.vue'
import UserProfileView from '../views/UserProfileView.vue'
import FolderView from '../views/FolderView.vue'
import AdminHomeView from '../views/AdminHomeView.vue'
import NotaryHomeViewVue from '@/views/NotaryHomeView.vue'
import SharedFolderViewVue from '@/views/SharedFolderView.vue'

const routes = [
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    meta: {
      requiresAuth: true // This route requires authentication
    }
  },
  {
    path: '/shared/:id',
    name: 'shared',
    component: SharedFolderViewVue,
  },
  {
    path: '/admin',
    name: 'admin',
    component: AdminHomeView,
    meta: {
      requiresAdmin: true // This route requires authentication
    }
  },
  {
    path: '/notary',
    name: 'notary',
    component: NotaryHomeViewVue,
    meta: {
      requiresAuth: true // This route requires authentication
    }
  },
  {
    path: '/',
    name: 'home2',
    component: HomeView,
    meta: {
      requiresAuth: true // This route requires authentication
    }
  },
  {
    path: '/profile',
    name: 'profile',
    component: UserProfileView
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/register',
    name: 'register',
    component: RegistrationView
  },
  { 
    path: '/folder/:id',
    name: 'folder',
    component: FolderView,
    props: route => ({
      id: route.params.id,
      isPublic: route.query.isPublic || false
    }),
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated')
  const isAdmin = (localStorage.getItem('role') === 'ADMIN' )
  if (to.path === '/login' && isAuthenticated) {
    next('/home');
  } else if (to.matched.some(route => route.meta.requiresAuth) && !isAuthenticated) {
    next('/login');
  } else if (to.matched.some(route => route.meta.requiresAdmin) && !isAdmin) {
    console.log("not admin")
    next('/login');
  }else {
    next();
  }

});

export default router
