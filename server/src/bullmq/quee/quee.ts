import { Queue } from "bullmq";

export const crawlQuee = new Queue("crawl-queue",{
    connection:{
        host:"localhost",
        port:6379

    }
});
