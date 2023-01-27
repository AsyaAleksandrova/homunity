const { defaultResponseFilter } = require('express-winston');
const fs = require('fs');
const { FILE_PATH } = process.env;

class FileService{

  createFile(file) {
    const filePath = `${FILE_PATH}/${file.owner._id.toString()}/${file.path}`

    return new Promise((resolve, reject) => {
      try {
        if (!fs.existsSync(filePath)) {
          fs.mkdirSync(filePath)
          return resolve({message: 'Папка создана'})
        } else {
          return reject({message: "Папка уже существует"})
        }
        } catch (e) {
          return reject(e)
      }
    })
  }

  deleteFile(path) {
    return new Promise((resolve, reject) => {
      try {
        if (fs.existsSync(path)) {
          
        } else {
          return reject({message: "Папки не существует"})
        }

      } catch (e) {
        return reject(e)
      }
    })
  }
};

module.exports = new FileService;