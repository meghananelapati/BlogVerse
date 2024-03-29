const express =require('express');

//morgan third party middleware
const morgan=require('morgan');

const mongoose=require('mongoose');
//const Blog=require('./models/blog');
const blogRoutes=require('./routes/blogRoutes');

//expresss app
const app=express();

//connect to mongodb
const dbURI='mongodb+srv://netninjas:Nelapati@nodetuts.rhw6xbi.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
   .then((result)=>app.listen(3000))
   .catch((err)=>console.log(err))
//register view engine  //ejs for dynamic stuff
app.set('view engine','ejs');



//listen for requests

// app.listen(3000);

//middleware and static files
app.use(express.static('public'));//if I create a folder called public in this directory(not in views), it will be available as a static file to the frontend
app.use(express.urlencoded({extended: true}));//option to add in, for accepting form data
app.use(morgan('dev'));//dev or tiny

//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
    const blog=new Blog({
        title: 'new blog-2',
        snippet: 'about my new blog',
        body:'more about my blog'
    });

    blog.save()
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        });
})       

app.get('/all-blogs',(req,res)=>{
    Blog.find()
        .then((result)=>{
            res.send(result);
        })
        .catch((err)=>{
            console.log(err);
        });
})

app.get('/single-blog',(req,res)=>{
    Blog.findById('65776425fd337347a89bc928')
        .then((result)=>{
            res.send(result)
        })
        .catch((err)=>{
            console.log(err);
        });
})

// app.use((req,res,next)=>{//don't forget next here
//     console.log('new request made');
//     console.log('host: ',req.hostname);
//     console.log('path: ',req.path);
//     console.log('method: ',req.method);
//     next();
// });//browser hangs cuz it don't know what to do next without next

// app.use((req,res,next)=>{
//     console.log('in the next middleware');    
//     next();
// });


//routes
app.get('/',(req,res)=>{

    res.redirect('/blogs')
    
});

app.get('/about',(req,res)=>{

    res.render('about',{title:'About'});

 });

//redirects
app.get('/about-us',(req,res)=>{
    res.redirect('/about',{title:'About'});
});

//blog routes
app.use('/blogs',blogRoutes);

//404 page
app.use((req,res)=>{
    //res.status(404).sendFile('./views/404.html',{root:__dirname});
    res.status(404).render('404',{title:'404'});

  
});


 
