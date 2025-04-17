const express=require('express');
require('dotenv').config();

const PORT=process.env.PORT||8000;
const dbConnect=require('./config/database');
const cors=require('cors');
const app=express();
const userRoute=require('./routes/userRoute');
const messageRoute=require('./routes/messageRoute');


app.use(express.json());
app.use(cors({origin:"http://localhost:3000",credentials:true}))
app.use('/api/v1/user',userRoute);
app.use('/api/v1/message',messageRoute);
dbConnect();


app.listen(PORT,()=>console.log("SERVER Started ",PORT));

