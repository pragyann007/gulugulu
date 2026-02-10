import { crawlQuee } from "../quee/quee";

export const addToCrawlQuee = async (siteId:string)=>{
    await crawlQuee.add("crawl-job",{siteId});
    console.log('crawl job added for siteId:',siteId);
    
}