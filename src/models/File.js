const mongoose = require('mongoose');

const File = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, {
    timestamps: true, // Para criar createdAt e updatedAt
    toObject: { virtuals: true }, // Carregar o campo virtual - url - quando o file for convertido em objeto
    toJSON: { virtuals: true } // Carregar o campo virtual - url - quando o file for convertido em json - FEITO NO CONTROLLER
});

// Campo virtual == existe somente no backend, no banco não [Transient]
// function não pode ser arrow, pois precisamos acessar o this da nossa instância de file
File.virtual('url').get(function() {
    return `http://localhost:3333/files/${encodeURIComponent(this.path)}`;
});

module.exports = mongoose.model('File', File);