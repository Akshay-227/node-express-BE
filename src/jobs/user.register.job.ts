import axios from 'axios';
import { Queue, Worker, QueueScheduler } from 'bullmq';
import { User } from '../models/user.model';
import { config } from 'dotenv';

config({
  path: './.env',
});

const BATCH_SIZE = parseInt(process.env.BATCH_SIZE!, 10); // Set your desired batch size

const fetchDataAndStoreBatch = async (batchId: number, data: any[]) => {
  try {
    const startIdx = (batchId - 1) * BATCH_SIZE;
    const endIdx = startIdx + BATCH_SIZE;
    const batchData = data.slice(startIdx, endIdx);

    // Map fetched data to match the User schema
    const userData = batchData.map((randomUser) => ({
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

  } catch (error:any) {
    throw error;
  }
};

const fetchAndStoreDataRecursively = async (startBatch: number) => {
  try {
    // Fetch data from the Random User Generator API
    const response = await axios.get(process.env.API_URL!);

    const randomUserData = response.data.results;

    // Calculate the number of batches
    const totalBatches = Math.ceil(1000 / BATCH_SIZE);

    // Enqueue the data fetching and storing jobs for each batch
    for (let i = startBatch; i <= totalBatches; i++) {
      await queue.add('fetchDataJob', { batchId: i, data: randomUserData });
    }
  } catch (error:any) {
    throw error;
  }
};

const queueName = 'fetchDataQueue';
const queue = new Queue(queueName);
const scheduler = new QueueScheduler(queueName);

const worker = new Worker(queueName, async (job) => {
  const batchId = job.data.batchId;
  const data = job.data.data;
  await fetchDataAndStoreBatch(batchId, data);
});

const startDataFetchingJob = async () => {
  try {
    // Start the recursive data fetching and storing process from batch 1
    await fetchAndStoreDataRecursively(1);

  } catch (error:any) {
  }
};

export { startDataFetchingJob };
