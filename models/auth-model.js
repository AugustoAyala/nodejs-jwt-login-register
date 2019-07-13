const mongoose = require('mongoose');
const schema = mongoose.Schema;
mongoose.set('useCreateIndex', true);

const userSchema = new schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    }
},{
    timestamps: true
});

module.exports = mongoose.model('user',userSchema);

