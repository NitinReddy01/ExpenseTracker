const express=require('express');
const app=express();
const cors=require('cors');
const connectToDb=require('./config/DbConnect');
const corsConfig=require('./config/corsConfig');
const dotenv=require('dotenv');
const verifyJWT=require('./middleware/verifyJWT');
const cookieParser=require('cookie-parser');
const allowCredentials = require('./middleware/allowCredentials');

dotenv.config();
connectToDb();

app.use(express.json());
app.use(allowCredentials);
app.use(cors(corsConfig));
app.use(cookieParser());

app.use('/login',require('./routes/login'));
app.use('/register',require('./routes/register'));
app.use('/logout',require('./routes/logout'));
app.use('/refreshToken',require('./routes/refreshToken'));

app.use(verifyJWT);
app.get('/',(req,res)=>{
    // console.log(req);
    res.send('hello');
})

app.listen(process.env.PORT,()=>{
    console.log(`Server is running on ${process.env.PORT}`);
})
