import express from 'express';
import mongoose from 'mongoose';
import { config as configDotenv } from 'dotenv'; 

configDotenv(); 

const dbconnect = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error connecting to the database');
        console.error(error.message);
    }
}

export default dbconnect;