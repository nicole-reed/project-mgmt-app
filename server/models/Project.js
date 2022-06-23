const mongoose = require('mongoose');

// Mongoose schemas have notthing to do with graphql schemas btw

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed'],
    },
    clientId: {
        // The _id mongoose automatically generates is the type we want
        type: mongoose.Schema.Types.ObjectId,
        // ref is the model we want it to relate to
        ref: 'Client',
    }
});

module.exports = mongoose.model('Project', ProjectSchema);