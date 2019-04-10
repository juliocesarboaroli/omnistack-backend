const Box = require('../models/Box');
const File = require('../models/File');

class FileController {
    async store(req, res) {
        // Criar arquivo
        const box = await Box.findById(req.params.id);

        const file = await File.create({
            title: req.file.originalname,
            path: req.file.key
        });

        box.files.push(file);
        await box.save();

        // Enviando dados do arquivo para todos os usuário conectados no socket. EX: App mobile e web receberão os dados
        req.io.sockets.in(box._id).emit('file', file);

        return res.json(file);
    }
}

module.exports = new FileController();