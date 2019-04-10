// Para lidar com arquivos

const multer = require('multer'); // Extenal
const path = require('path');
const crypto = require('crypto');

module.exports = {
    dest: path.resolve(__dirname, '..', '..', 'tmp'),
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.resolve(__dirname, '..', '..', 'tmp')); // Função chamada ao determinar a localização do arquivo
        }, 
        filename: (req, file, cb) => {
            // Dar nome único para o arquivo
            crypto.randomBytes(16, (err, hash) => {
                if (err) cb(err);
                file.key = `${hash.toString('hex')}-${file.originalname}`;
                cb(null, file.key);
            });
        }
    })
};