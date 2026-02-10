import { Router } from "express";
import { crawlSiteController, getMySites, postSites, verifySite } from "../controllers/sites.controller";

export const sitesRouter = Router();

sitesRouter.get("/", (req, res) => {
  res.send("Welcome to the Sites API!");
});


sitesRouter.post("/index",postSites);
sitesRouter.post("/verify/:siteId",verifySite);
sitesRouter.get("/:ownerId",getMySites);
sitesRouter.get("/crawl/:siteId",crawlSiteController)
