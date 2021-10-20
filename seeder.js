const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load env vars
dotenv.config({ path: './config/config.env'})

// load models
const Bootcamp = require('./models/Bootcamp');
const Course = require('./models/Course');

//COnnect to DB
mongoose.connect(process.env.MONGO_URI);

// Read JSON files
const bootcamps = JSON.parse(fs.readFileSync(`${__dirname}/_data/bootcamps.json`, 'utf-8'));

const courses = JSON.parse(fs.readFileSync(`${__dirname}/_data/courses.json`, 'utf-8'));

// Import into DB
const importData = async ()=> {
    try {
        await Bootcamp.create(bootcamps);
        await Course.create(courses);
        console.log('Data Imported...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

// Delete data
const deleteData = async ()=> {
    try {
        await Bootcamp.deleteMany();
        await Course.deleteMany();
        console.log('Data Destroyed...');
        process.exit();
    } catch (err) {
        console.error(err);
    }
}

if(process.argv[2] === '-i') {
    importData();
} else if (process.argv[2] === '-d') {
    deleteData();
}