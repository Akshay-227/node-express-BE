import { config } from 'dotenv';
import connectDB from './db/index';
import { app } from './app';
import { startDataFetchingJob } from './jobs/user.register.job';

config({
  path: './.env',
});

// Connect to MongoDB
connectDB()
  .then(() => {
    // Start the data fetching job
    startDataFetchingJob();
    app.get('/', (req, res) => {
      res.send('Hey this is my API running 🥳')
    })
    // Start Express server
    app.listen(process.env.PORT || 8000, () => {
      console.log(`Server is running at port: ${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log('MongoDB connection failed !!!', err);
  });
