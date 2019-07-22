import Sequelize from 'sequelize';

import bcrypt from 'bcrypt-nodejs';
import jwt    from 'jsonwebtoken';

class User extends Sequelize.Model {
  static init(sequelize, DataTypes) {
    return super.init(
      {
        first_name: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value) {
            this.setDataValue('first_name', value ? value.trim() : value);
          }
        },
        last_name: {
          type: DataTypes.STRING,
          allowNull: false,
          set(value) {
            this.setDataValue('last_name', value ? value.trim() : value);
          }
        },
        email: {
          type: DataTypes.STRING,
          validate: {
            isEmail: true
          },
          unique: {
            args: true,
            msg: 'Oops. There is an existing employee with this email address.',
          },
          allowNull: false,
          set(value) {
            this.setDataValue('email', value ? value.trim() : value);
          }
        },
        password: {
          type: DataTypes.STRING,
          validate: {
            isPassword(value) {
              const salt = bcrypt.genSaltSync(10);
              const hash = bcrypt.hashSync(value, salt);
              this.setDataValue('password', hash);
            }
          },
          allowNull: false,
          set(value) {
            this.setDataValue('password', value ? value.trim() : value);
          }
        }
      },
      { sequelize }
    )
  }

  /**
   * generate a jwt token
   * @method
   * @returns {String} jwt token
   */
  generateToken() {
    const user = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
    };
    return jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: 86400
    });
  }

  /**
   * Compare plain password to user's hashed password
   * @method
   * @param {String} password takes a password string
   * @returns {Array} array containing validation and api token
   */
  authenticatePassword(password) {
    const auth = bcrypt.compareSync(password, this.password);
    if (auth) {
      return [true, this.generateToken()];
    }
    return [false, null];
  }
};

export default User;
