const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../utils/error/UnauthorizedError');
const errors = require('../utils/constants');

const jwtSecret = (process.env.NODE_ENV === 'production' && process.env.JWT_SECRET) || 'super-strong-secret'

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  let payload;
  try {
    if (!authorization || !authorization.startsWith('Bearer ')) {
      throw new UnauthorizedError(errors.UNAUTHORIZED);
    }
    const token = authorization.replace('Bearer ', '');
    payload = jwt.verify(token, jwtSecret);
  } catch (err) {
    next(new UnauthorizedError(errors.UNAUTHORIZED));
  }
  req.user = payload;
  next();
  return null;
};
