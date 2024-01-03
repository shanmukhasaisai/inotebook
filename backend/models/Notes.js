import mongoose from 'mongoose';
const { Schema } = mongoose;

const NotesSchema=new Schema({
  title:{
    type: String,
    requried: true,
  },
  description:{
    type: String,
    requried: true,
  },
  tag:{
    type: String,
    default: "General"
  },
  date:{
    type: Date,
    default: Date.now
  },

})

module.exports=mongoose.model('notes',NotesSchema)