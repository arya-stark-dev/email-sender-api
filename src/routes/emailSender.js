import EmailController from '../controllers/api/EmailController';
import AuthMiddleware  from '../controllers/middleware/auth';

const UserRoute = (router) => {
  router
    .route('/email/send')
    .post(AuthMiddleware.checkApiToken, EmailController.sendEmail);
}

export default UserRoute;
