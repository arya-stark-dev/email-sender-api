import Vue from 'vue';
import Router from 'vue-router';

import meta from './meta.json';
import authGuard from './auth-guard';

Vue.use(Router);

function loadView(view) {
  return () => import(`../views/${view}.vue`);
}

function route(path, name, view) {
  return {
    path,
    name,
    meta: meta[path],
    component: loadView(view),
    beforeEnter: authGuard,
  };
}

export default new Router({
  routes: [
    { path: '/', redirect: '/public' },
    route('/public', 'homepage', 'Home'),
    route('/public/create-access', 'create-access', 'SignUpView'),
    route('/public/login', 'login-page', 'SignInView'),
    route('/404', 'not-found', 'NotFoundView'),
    { path: '*', redirect: '/404' },
  ],
  mode: 'history',
  base: process.env.BASE_URL,
});
