const Blog=require('../models/blog');//double dot to come out of our folder i.e routes here





const blog_index =(req,res)=>{
    Blog.find().sort({createdAt:-1})//-1 descending order,newest at top of the page
    .then((result)=>{
        res.render('blogs/index',{title:'All Blogs',blogs: result})
    })
    .catch((err)=>{
        console.log(err);
    });
}

const blog_details=(req,res)=>{
    const id=req.params.id;
    console.log(id);
    Blog.findById(id)
        .then(result=>{//result here is the blog
            res.render('blogs/details',{blog: result, title:'Blog Details'})
        })
        .catch((err)=>{
            res.status(404).render('404',{title:'Blog not found'});
        });
}

const blog_create_get=(req,res)=>{
    res.render('blogs/create',{title:'Create a new blog'});
}

const blog_create_post=(req,res)=>{
    console.log(req.body);
    const blog=new Blog(req.body);

    blog.save()
        .then((result)=>{
            res.redirect('/blogs');
        })
        .catch((err)=>{
            console.log(err);
        });
}

const blog_delete=(req,res)=>{
    const id=req.params.id;//access the route parameter

    Blog.findByIdAndDelete(id)
        .then(result=>{
            res.json({redirect: '/blogs'})
        })
        .catch((err)=>{
            console.log(err);
        });
}

module.exports={
    blog_index,
    blog_details,
    blog_create_get,
    blog_create_post,
    blog_delete
}






