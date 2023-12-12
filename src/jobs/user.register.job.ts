import axios from 'axios';
import cron from 'node-cron';
import { User } from '../models/user.model';
const fetchDataAndStore = async () => {
    try {
      // Fetch data from the Random User Generator API
      const response = await axios.get(process.env.API_URL!);
      const randomUserData = response.data.results;
  
      // Map fetched data to match the User schema
      const userData = randomUserData.map((randomUser: any) => ({
        id: randomUser.login.uuid,
        gender: randomUser.gender,
        name: `${randomUser.name.title} ${randomUser.name.first} ${randomUser.name.last}`,
        address: {
          city: randomUser.location.city,
          state: randomUser.location.state,
          country: randomUser.location.country,
          street: `${randomUser.location.street.number} ${randomUser.location.street.name}`,
        },
        email: randomUser.email,
        age: randomUser.dob.age.toString(),
        picture: randomUser.picture.large,
      }));
  
      // Store data in MongoDB
      await User.insertMany(userData);
  
      console.log('Data stored successfully!');
    } catch (error: any) {
      console.error('Error fetching and storing data:', error.message);
      throw error;
    }
  };
  

const startDataFetchingJob = () => {
  try {
    // Run the data fetching job immediately
    fetchDataAndStore();

    // Schedule the data fetching job using node-cron to run every 2 hours
    const jobSchedule = '0 */2 * * *'; // Run every 2 hours, adjust as needed
    cron.schedule(jobSchedule, fetchDataAndStore);

    console.log('Data fetching job scheduled!');
  } catch (error:any) {
    console.error('Error scheduling data fetching job:', error.message);
  }
};

export { fetchDataAndStore, startDataFetchingJob };
