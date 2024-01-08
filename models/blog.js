// const mongoose=require('mongoose');
// const Schema=mongoose.Schema;

// const blogSchema=new Schema({
//     title:{
//         type:String,
//         required:true
//     },
//     snippet:{
//         type:String,
//         required:true
//     },
//     body: {
//         type: String,
//         required: true
//     }
// }, {timestamps: true});

// const Blog=mongoose.model('Blog', blogSchema);
// module.exports= blog;


//IMPPP
//views are where we make our HTML templates that a user will see
//models are how we describe our data structure and we use them to interact with the database



const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  snippet: {
    type: String,
    required: true,
  },
  body: {
    type: String,
    required: true
  },
}, { timestamps: true });

const Blog = mongoose.model('Blog', blogSchema);
module.exports = Blog;