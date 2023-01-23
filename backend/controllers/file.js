const fs = require('fs');
const mv = require('mv');
const File = require('../models/file');
const Member = require('../models/member');
const User = require('../models/user');
const { FILE_PATH } = process.env;

module.exports.uploadFile = (req, res, next) => {
  const file = req.files.file;
  path = `${FILE_PATH}/${req.user._id}/${req.params.parent}/${file.name}`
  file.mv(path);
  File
    .create({
      name: file.name,
      type: file.name.split('.').pop(),
      size: file.size,
      path,
      owner: req.user._id,
      parent: req.params.parent
    })
    .then((file) => {
      if (req.params.parent !== 'avatar') {
        Member
          .findByIdAndUpdate(
            req.params.parent,
            { $set: { photo: file } },
            { new: true })
          .then((member) => {
              res.status(200).send(member)
          })
      } else {
        User
          .findByIdAndUpdate(
            req.user._id,
            { $set: { avatar: file } },
            { new: true })
          .then((user) => {
            res.status(200).send(user)
        })
      }
    })

    .catch((err) =>{
      next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
    })
}
