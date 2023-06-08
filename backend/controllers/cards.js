const mongoose = require('mongoose');
const Card = require('../models/card');
const BadRequestError = require('../utils/error/BadRequestError');
const NotFoundError = require('../utils/error/NotFoundError');
const AccessError = require('../utils/error/AccessError');
const errors = require('../utils/constants');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => res.status(201).send(card))
    .catch((error) => {
      if (error instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError(errors.BAD_REQUEST));
      } else {
        next(error);
      }
    });
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const cardId = await Card.findOne({ _id: req.params.cardId });
    const cardOwner = req.user._id;
    if (cardId === null) {
      next(new NotFoundError(errors.NOT_FOUND));
    } else if (cardId.owner.valueOf() === cardOwner) {
      const card = await Card.findByIdAndRemove(req.params.cardId);
      res.send(card);
    } else {
      next(new AccessError(errors.ACCESS_DENIED));
    }
  } catch (err) {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(errors.BAD_REQUEST));
    } else {
      next(err);
    }
  }
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError(errors.NOT_FOUND));
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        next(new BadRequestError(errors.BAD_REQUEST));
      } else {
        next(error);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.send(card);
      } else {
        next(new NotFoundError(errors.NOT_FOUND));
      }
    })
    .catch((error) => {
      if (error instanceof mongoose.Error.CastError) {
        next(new BadRequestError(errors.BAD_REQUEST));
      } else {
        next(error);
      }
    });
};
