const mongoURL = 'mongodb://localhost:27017/yy';
const mongoose = require('mongoose');

const connectDB = function(delayInMilliseconds, callback) {
  mongoose.connect(
    mongoURL,
    {
      useNewUrlParser: true
    },
    (err) => {
      if (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
        setTimeout(
          () => connectDB(delayInMilliseconds, callback),
          delayInMilliseconds
        );
      } else {
        console.log('connected succesfully to mongodb');
        callback();
      }
    }
  );
};

exports.default = connectDB;
