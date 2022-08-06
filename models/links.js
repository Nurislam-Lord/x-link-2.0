const mongoose = require('mongoose')
const Schema = mongoose.Schema

const xlinkSchema = new Schema({
    link: {
        type: String,
        require: true
    }
}, { timestamps: true})

const Xlink = mongoose.model('Xlink',xlinkSchema)
module.exports = Xlink