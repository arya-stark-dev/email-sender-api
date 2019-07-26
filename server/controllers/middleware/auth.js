import jwt      from 'jsonwebtoken';
import db from '../../models';

require('dotenv').config({ silent: true });
/**
 * checkApiToken checks if request token is valid
 *
 * @param {Object} req the request object
 * @param {Object} res the response object
 * @param {Function} next the callback function
 *
 * @returns {Object} validity response
 */
const checkApiToken = (req, res, next) => {
  const token = req.headers['x-access-token'];

  if (!token) {
    return res.status(403).send({
      status: 'fail',
      message: 'No token provided.'
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, async (err, decoded) => {
    if (err) {
      return res.status(401).json({
        status: 'fail',
        message: 'Failed to authenticate token.'
      });
    }

    try {
      const id = decoded.id;
  
      const user = await db.User.findByPk(id);
  
      if (!user) {
        return res.status(404).json({
          status: 'fail',
          message: 'This user does not exist anymore.'
        });
      }
    } catch (error) {
      console.log({error});
      return res.status(500).json({ message: 'An error occured while authenticating user. Try again' })
    }


    req.decoded = decoded;
    next();
  });
};

export default {
  checkApiToken,
};