const { Schema, model } = require('mongoose');

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 6,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        minlength: 6,
    },
    generatedUrls: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Url',
            
        }
    ]
}, { timestamps: true });

const User = model('User', userSchema);

module.exports = User;
