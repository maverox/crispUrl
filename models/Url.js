const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const urlSchema = new Schema({
    shortId: {
        type: String,
        required: true,
        unique: true
    },
    redirectedUrl: {
        type: String,
        required: true,
        unique: true
    },
    visitHistory: [
        { timestamp: { type: Date, default: Date.now } }
    ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

},
    { timestamps: true });

    const Url = mongoose.model('Url', urlSchema);

    module.exports = Url;