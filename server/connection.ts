import mongoose from 'mongoose';
const mongoURL = 'mongodb://mongo:27017/yy';

const mongoConnectWithRetry = (delayInMilliseconds, callback) => {
  mongoose.connect(
    mongoURL,
    {
      useNewUrlParser: true
    },
    (err, connection) => {
      if (err) {
        console.error(`Error connecting to MongoDB: ${err}`);
        setTimeout(() => mongoConnectWithRetry(delayInMilliseconds, callback), delayInMilliseconds);
      } else {
        console.log('connected succesfully to mongodb');
        callback(connection);
      }
    }
  );
};

export default mongoConnectWithRetry;
