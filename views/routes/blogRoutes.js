const express=require('express');
//const Blog=require('../models/blog');//double dot to come out of our folder i.e routes here
const blogController=require('../controllers/blogController');
const router=express.Router();






router.get('/',blogController.blog_index);

router.post('/',blogController.blog_create_post);

router.get('/create',blogController.blog_create_get); //this .get whole part was beneath everything till now and blogs/create doesn't work becuz it was considering /create also as a /:id and was searching like that since :/id whole thing was above /create thing, so it was finding a blog by id called create

router.get('/:id',blogController.blog_details);//if we put id,itll take iterally, so :id gives route parameter

router.delete('/:id',blogController.blog_delete);




module.exports=router;
