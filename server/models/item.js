const mongoose = require('mongoose');
//const unique = require('mongoose-unique-validator');

const ItemSchema = new mongoose.Schema({
   title: {
       type: String,
       required: true
   },
   done:{
       type: Boolean,
       required: true
   }
});

//ItemSchema.plugin(unique, {message: "That {PATH} already exists."});

const Item = module.exports = mongoose.model('item', ItemSchema);
