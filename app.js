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
   // res.write('');
    //res.send('<p>home page</p>');//status codes are default, content type too
    //res.sendFile('./views/index.html',{root:__dirname});//cuz express sees the absolute path not the relative one
    // const blogs = [
    //     {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //     {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    //   ];
    // res.render('index',{title:'Home',blogs});//uses index.ejs

    res.redirect('/blogs')
    
});

app.get('/about',(req,res)=>{
     //res.send('<p>about page</p>');//status codes are default, content type too
    //res.sendFile('./views/about.html',{root:__dirname});
    
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

    //we set status code here, because it does not know its an error, unlike normal(OK) or redirect status codes i.e 200s or 300s
    //if finds a match with get, implements,else use//use for every single request,get comes in the way,uses get else use
    //it should be at the end or else only use operates instead of everything else (get)
});


 