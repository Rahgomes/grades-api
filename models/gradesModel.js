import { db } from '../models/index.js';

const gradesSchema = db.mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    subject: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    value: {
        type: Number,
        required: true,
    },
    lastModified: {
        type: Date,
        default: Date.now
    }
});

const Grades = db.mongoose.model('grade', gradesSchema, 'grade');

export default Grades;
