const express   = require('express'),
    morgan      = require('morgan'),
    bodyParser  = require('body-parser'),
    app         = express(),
    mongoose    = require('mongoose'),
    dotenv      = require('dotenv'),
    productRoutes = require('./routes/product'),
    categoryRoutes = require('./routes/category'),
    authRoutes  = require('./routes/auth')
    ownerRoutes = require('./routes/owner') ,
    reviewRoutes= require('./routes/review')
    cors        = require("cors") ,
    addressRoutes=require('./routes/address'),
    paymentRoutes=require('./routes/payment')

dotenv.config() ;
mongoose.connect(process.env.DATABASEURL ,
    {   useNewUrlParser: true ,
        useUnifiedTopology: true ,
        useCreateIndex: true ,
        useFindAndModify : false
    }, (err) => {
    if(err) {
        console.log(err)
    } else {
        console.log('Connected to the database')
    }
})

// Middlewares
app.use(cors()) ;
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extened : false}));

//required apis
app.use("/api",productRoutes) ;
app.use("/api",categoryRoutes) ;
app.use("/api",ownerRoutes) ;
app.use("/api",authRoutes) ;
app.use("/api",reviewRoutes) ;
app.use("/api",addressRoutes) ;
app.use("/api",paymentRoutes)

app.listen(3000 , (err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log("Listening on PORT" , 3000);
    }
})