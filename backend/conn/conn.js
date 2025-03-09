const mongoose = require('mongoose');

const conn=async ()=>{
    try {
        await mongoose.connect(`${process.env.DBURL}`);
        console.log('Connected to Database');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
    }
};

conn();