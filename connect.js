const mongoose = require('mongoose');

async function connectDB (URI) {
    return await mongoose.connect(URI);
}

module.exports = {connectDB};