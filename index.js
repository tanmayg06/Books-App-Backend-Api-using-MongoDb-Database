import express from 'express';

import dbconnect from './config/database.js';

import books from './routes/books.js';


const app = express();

app.use(express.json());

app.use("/api/v1",books);

dbconnect();


app.listen(3000,()=>{
    console.log("App is Running at the",3000);
})

