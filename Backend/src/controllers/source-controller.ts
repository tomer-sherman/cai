import express, { Request, Response, Router } from "express";
import { sourceService } from "../services/source-service";
import { SourceModel } from "../models/source-model";
import { StatusCode } from "../models/enums";

// Contains routes, without logic.
class SourcesController {

    // Create a router object which can listen on routes:
    public router: Router = express.Router();

    // Constructor - register routes:
    public constructor() {

        this.router.post("/api/sources", this.addSource);
        this.router.get("/api/sources", this.getAllSources);
        this.router.delete("/api/sources/:_id", this.deleteSource);

    }


    private async addSource(request: Request, response: Response): Promise<void> {

        const source = new SourceModel(request.body);
        const dbSource = await sourceService.addSource(source)
        response.status(StatusCode.Created).json(dbSource);
    }

    private async getAllSources(request: Request, response: Response): Promise<void> {

        const dbSources = await sourceService.getAllSources();
        response.json(dbSources);
    }

    private async deleteSource(request: Request, response: Response): Promise<void> {

        const _id = request.params._id.toString();
        await sourceService.deleteSouce(_id);
        response.status(StatusCode.NoContent).json();
    }



}

export const sourcesController = new SourcesController();
