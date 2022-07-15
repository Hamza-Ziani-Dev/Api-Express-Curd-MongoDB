const mongoose = require('mongoose');
const studentSchema = mongoose.Schema({
    cin: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    age: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    }
});

module.exports = Student = mongoose.model('Student', studentSchema);