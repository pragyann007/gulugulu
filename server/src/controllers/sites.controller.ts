import axios from "axios";
import Site from "../models/sites.model";
import { postsitesService } from "../services/sitesService";
import { asynHandler } from "../utils/asynHandler";
import { Request, Response } from "express";
import { url } from "node:inspector";
import { addToCrawlQuee } from "../bullmq/producer/producer";
import { crawlSite } from "../services/crawlSite";

export const postSites = asynHandler(async(req:Request,res:Response)=>{

    const {url,ownerId} = req.body;

    if(!url || !ownerId){
        return res.status(400).json({message:"url and ownerId are required"})
    }

    const site = await postsitesService(url,ownerId);




    const verifyTag = `<meta name="gulugulu-verification" content="${site.verificationToken}">`

    res.status(201).json({message:"Add this tag to verify your ownership",site,verifyTag})
    


})

export const verifySite = asynHandler(async(req: Request, res: Response) => {
    const {siteId} = req.params;
    
    const site = await Site.findById(siteId);
    
    if(!site){
        return res.status(404).json({message:"Site not found"})
    }

    try {
        const siteHtml = await axios.get(site.url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            },
            maxRedirects: 5,
            timeout: 15000,
            maxContentLength: Infinity,  // Don't truncate response
            maxBodyLength: Infinity
        });

        const htmlContent = siteHtml.data;
        const verificationToken = site.verificationToken;

        // More flexible check - look for the meta tag pattern
        const metaTagExists = 
            htmlContent.includes(verificationToken) ||
            htmlContent.includes(`name="gulugulu-verification" content="${verificationToken}"`) ||
            htmlContent.includes(`name='gulugulu-verification' content='${verificationToken}'`) || 
            htmlContent.includes(verificationToken); // Escape token for regex
        
   
        
        if(metaTagExists) {
            site.verified = true;
            await site.save();
         

            return res.status(200).json({message:"Site verified successfully", site});
        }

        return res.status(400).json({
            message:"Verification failed. Meta tag not found.",
            debug: {
                tokenSearched: verificationToken,
                htmlLength: htmlContent.length,
                firstChars: htmlContent.substring(0, 1500)
            }
        });
        
    } catch (error: any) {
        console.error('Verification error:', error);
        return res.status(500).json({
            message: "Error fetching site",
            error: error.message,
       
        });
    }
});

export const getMySites = asynHandler(async(req:Request,res:Response)=>{
    const {ownerId} = req.params;

    if(!ownerId){
        return res.status(400).json({message:"ownerId is required"})
    }

    const sites = await Site.find({ownerId});

    res.status(200).json({sites})
})


export const crawlSiteController = asynHandler(async(req:Request,res:Response)=>{
    const {siteId} = req.params;

    if(!siteId){
        return res.status(400).json({message:"siteId is required"})
    }


   
    if(Array.isArray(siteId)){
        return res.status(400).json({message:"siteId must be a string"})
    }

    await addToCrawlQuee(siteId);

  


  
    res.status(200).json({message:"Site added to crawl queue"})

})