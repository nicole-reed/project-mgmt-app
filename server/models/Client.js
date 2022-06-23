const mongoose = require('mongoose');

// Mongoose schemas have notthing to do with graphql schemas btw

const ClientSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    phone: {
        type: String,
    },
});

module.exports = mongoose.model('Client', ClientSchema);