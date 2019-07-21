import db from '../../models';

const userAttributes = [
  'first_name',
  'last_name',
  'email',
  'phone'
];

const signup = async (req, res) => {
  try {
    const newUser = await db.User.create({
      first_name: req.body.first_name,
      last_name: req.body.first_name,
      email: req.body.email,
      password: req.body.password
    });

    const user = [true, newUser.generateToken()];

    
    return res.status(201).json({ data: { token: user[1] } });
  } catch (error) {
    if (error.name === 'SequelizeValidationError'
      || error.name === 'SequelizeUniqueConstraintError'
    ) {
      return res.status(400).json({ errors: formatErrorMessage(error) });
    }
    return res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const user = await db.User.findOne({ where: { email: req.body.email } })
    if (!user) {
      return res.status(404).json({ message: 'No user found' })
    }

    const authenticated = user.authenticatePassword(req.body.password);

    if (!authenticated[0]) {
      return res.status(401).json({
        status: 'fail',
        message: 'Authentication failed! Wrong password.'
      });
    }
    
    return res.status(200).json({
      status: 'success',
      data: { token: authenticated[1] }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

const formatErrorMessage = (error) => {
  return error.errors.reduce((acc, current, index) => {
    if (index < error.errors.length - 1) {
      acc += `${current.message}, `;
      return acc;
    }
    acc += `${current.message}.`;
    return acc;
  }, '');
};

export default {
  signup,
  login,
};
