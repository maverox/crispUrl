const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

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
    role: {
        type: String,
        default: 'user',
        required: true,
    },
    generatedUrls: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Url',
            
        }
    ]
}, { timestamps: true });
userSchema.pre('save', async function(next) {
    const saltRounds = 10;
    if (!this.isModified('password')) return next();
    const hashedPassword = await bcrypt.hash(this.password, saltRounds);
    this.password = hashedPassword;
})
const User = model('User', userSchema);

module.exports = User;
