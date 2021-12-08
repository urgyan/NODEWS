const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({

    user: {
        type: mongoose.Schema.ObjectId
    },
//    this defines the object id of thr liked object
    likeable : {

        type : mongoose.Schema.ObjectId,

        require: true,

        refPath: 'omModel'
    },
//  this field is used for defining th type of liked obj since this is a dynamic reference
    onModel : {

        type: String,
        required: true,
        enum: ['Post','Comment'] 
    }
}, {

    timestamps: true

});

const Like = mongoose.model('Like', likeSchema);

module.exports = Like;