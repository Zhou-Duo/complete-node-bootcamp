const dotenv = require('dotenv');
const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  // .connect(Process.env.DATABASE_LOCAL)
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    userFindAndModify: false,
  })
  .then(() => {
    console.log('Connected to MongoDB');
  });

// READ JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf8')
);

// IMPORT DATA INTO DATABASE
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
};

// DELETE ALL DATA FROM COLLECTION
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data successfully deleted!');
    process.exit(0);
  } catch (err) {
    console.log(err);
    process.exit(0);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
