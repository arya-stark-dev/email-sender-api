
import store from '../store/index';

export default (to, from, next) => {
  const accessToken = store.getters.getUserToken;
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!accessToken) {
      next({
        path: '/login',
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.authPage)) {
    if (accessToken) {
      next({
        path: '/',
      });
    } else {
      next();
    }
  } else {
    next();
  }
};
