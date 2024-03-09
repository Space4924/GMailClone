import express, { urlencoded } from 'express';
import Connection from './db.js'
import route from './routes/route.js';
import cors from 'cors';
import path from 'path';

const __dirname=path.resolve();
const app=express();
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json({extended:true}));
app.use('/',route);

app.use(express.static(path.join(__dirname,'./client/build')));
app.get('*',(req,resp)=>{
    resp.sendFile(path.join(__dirname,'./client/build/index.html'),(err)=>{
        resp.status(500).send(err);
    })
})
const PORT=process.env.PORT || 8000;
Connection();
app.listen(PORT,()=>{
    console.log(`Server is Running at ${PORT}`)
})
