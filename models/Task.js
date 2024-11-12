const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const taskSchema = new Schema ({
    title: {type: String, required},
    status: {type: Boolean},
    category: { type: String},
    date: { type: date,
        default: date.now},
    priority: {type: DataTypes.ENUM("High", "Medium", "Low")}
});

module.exports = mongoose.model('Task', taskSchema);