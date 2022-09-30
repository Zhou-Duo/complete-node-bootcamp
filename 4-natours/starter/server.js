const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: './config.env' });
const app = require('./app');

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

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
