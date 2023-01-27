const Member = require('../models/member');
const FileService = require('../services/FileService');
const ValidationError = require('../errors/ValidationError');
const OtherServerError = require('../errors/OtherServerError');
const ForbiddenError = require('../errors/ForbiddenError');


module.exports.createNewMember = (req, res, next) => {
  const owner = req.user._id;
  Member.create({...req.body, owner})
    .then((member) => {
      FileService.createFile({owner: req.user, path:`${member._id}`})
      res.status(201).send(member)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Переданы некорректные данные при создании карточки: ${err.message}`));
      } else {
        next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
      }
    })
}

module.exports.getMyMembers = (req, res, next) => {
  const owner = req.user._id;
  Member
    .find({ owner })
    .populate('yearsOfLifeStart')
    .populate('yearsOfLifeEnd')
    .populate('photo')
    .then((members) => {
      res.status(200).send(members)
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Переданы некорректные данные при создании карточки: ${err.message}`));
      } else {
        next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
      }
    })
}

module.exports.deleteMember = (req, res, next) => {
  Member
    .findById(req.params._id)
    .then((card) => {
      if (card.owner._id = req.user._id) {
        Member.findByIdAndRemove(req.params._id)
          .then((member) => {
            
            res.status(200).send({message: `Удалена карточка ${member._id}`})
          })

      } else {
        next(new ForbiddenError('Отсутствуют права на удаление карточки'))
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(`Переданы некорректные данные при создании карточки: ${err.message}`));
      } else {
        next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
      }
    })
}
