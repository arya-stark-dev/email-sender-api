import EmailController from '../controllers/api/EmailController';

const UserRoute = (router) => {
  router
    .route('/email/send')
    .post(EmailController.sendEmail);
}

export default UserRoute;
