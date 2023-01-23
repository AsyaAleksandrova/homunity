const fs = require('fs');
const mv = require('mv');
const File = require('../models/file');
const { FILE_PATH } = process.env;

module.exports.uploadFile = (req, res, next) => {
  const file = req.files.file;
  path = `${FILE_PATH}/${req.user._id}/${req.params.parent}/${file.name}`
  console.log(path)
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
      res.status(200).send(file)
    })

    .catch((err) =>{
      next(new OtherServerError(`Что-то пошло не так: ${err.message}`));
    })
}
