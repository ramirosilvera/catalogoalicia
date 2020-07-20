const mongoose = require('mongoose');
const { Schema } = mongoose;
const path = require('path');

const ImageSchema = new Schema({
    title: { type: String },
    description: { type: String },
    contact: { type: String, default: "1168337522" },
    filename: { type: String },
    usersviews: { type: Array},
    views: { type: Number, default: 0 },
    userslikes:{ type: Array },
    likes: { type: Number, default: 0 },
    timestamp: { type: Date, default: Date.now }
});

ImageSchema.virtual('uniqueId')
    .get(function() {
        return this.filename.replace(path.extname(this.filename), '')
    });

module.exports = mongoose.model('image', ImageSchema);



