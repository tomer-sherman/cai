import express, { Request, Response, Router } from "express";
import { sourceService } from "../services/source-service";
import { SourceModel } from "../models/source-model";
import { StatusCode } from "../models/enums";
import { aiSerive } from "../services/ai-service";
import { summeryService } from "../services/summery-service";

// Contains routes, without logic.
class SummeryController {

    // Create a router object which can listen on routes:
    public router: Router = express.Router();

    // Constructor - register routes:
    public constructor() {

        this.router.get("/api/summeries", this.getAllSummeries)

    }


    private async getAllSummeries(request: Request, response: Response): Promise<void> {

        const summeries = await summeryService.getAllSummeries();
        response.json(summeries);
    }





}

export const summeryController = new SummeryController();
