
import {Worker} from 'bullmq'
import { crawlSite } from '../../services/crawlSite';
export const worker = () => {

  new Worker('crawl-queue', async (job) => {
    const { siteId } = job.data;
    console.log('Processing crawl job for siteId:', siteId);
    try {
      await crawlSite(siteId);
      console.log('Crawl job completed for siteId:', siteId);
    } catch (error) {
      console.error('Error processing crawl job for siteId:', siteId, error);
      throw error; // Let BullMQ handle retries
    }
  }, {
    connection: {
      host: 'localhost',
      port: 6379
    },
    concurrency: 5
  }); 

}