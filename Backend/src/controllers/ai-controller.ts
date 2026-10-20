import express, { Request, Response, Router } from "express";
import { sourceService } from "../services/source-service";
import { SourceModel } from "../models/source-model";
import { StatusCode } from "../models/enums";
import { aiSerive } from "../services/ai-service";

// Contains routes, without logic.
class AiController {

    // Create a router object which can listen on routes:
    public router: Router = express.Router();

    // Constructor - register routes:
    public constructor() {

        this.router.post("/api/ai/summerize", this.getAiSummery)

    }


    private async getAiSummery(request: Request, response: Response): Promise<void> {

        const urls = await sourceService.getUrlsArr();
        const dbSource = await aiSerive.getAiSummery(urls);
        response.json(dbSource);
    }





}

export const aiController = new AiController();
