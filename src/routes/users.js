import UserController from '../controllers/api/UserController';

const UserRoute = (router) => {
  router
    .route('/create-profile')
    .post(UserController.signup);

  router
    .route('/login')
    .post(UserController.login);
}

export default UserRoute;
