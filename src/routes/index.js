import EmailSenderRoute from './emailSender';
import UserRoute from './users';

const routes = (router) => {
  EmailSenderRoute(router);
  UserRoute(router);
};

export default routes;
