import { createRouter, createWebHistory } from 'vue-router'
//import { users } from '../assets/users'
import store from '../store'
import Home from '../views/Home.vue'
import UserProfile from '../views/UserProfile.vue'
import LogInSignUp from '../views/LogInSignUp.vue'
import Admin from '../views/Admin.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/user/:userId',
    name: 'UserProfile',
    component: UserProfile,
    meta: {
      requiresUser: true
    }
  },
  {
    path: '/loginOrsignup',
    name: 'signup',
    component: LogInSignUp,
    meta: {
      requiresUser: false
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin,
    meta: {
      requiresUser: true,
      requiresAdmin: true
    }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async(to,from,next) => {
  const user = store.state.User.user;
  //const isAdmin = true;
  //const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);
  const requiresUser = to.matched.some(record => record.meta.requiresUser);

  if(!user && requiresUser) next({ name: 'signup'});
    //await store.dispatch('User/setUser', users[0])
  else next();  

  //if(requiresAdmin && !isAdmin) next({ name: 'Home'});
  //else next();
})

export default router
