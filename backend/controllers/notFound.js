const errors = require('../utils/constants');
const NotFoundError = require('../utils/error/NotFoundError');

module.exports.checkWay = (req, res, next) => {
  next(new NotFoundError(errors.NOT_FOUND));
};
