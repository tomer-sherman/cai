
import { ClientError } from "../models/client-error";
import { ISourceModel, SourceModel } from "../models/source-model";
import { StatusCode } from "../models/enums";
import mongoose from "mongoose";

class SourceService {

    public async addSource(source: ISourceModel): Promise<ISourceModel> {

        await ClientError.validateDocument(source);
        if (await this.isSoucesMaxed()) throw new ClientError(StatusCode.UnprocessableContent, "You cannot exceed 5 sources.");
        if (await this.isUrlTaken(source.url)) throw new ClientError(StatusCode.Conflict, "This source is in use already")

        const dbSource = source.save();

        return dbSource;
    }

    public async getAllSources(): Promise<ISourceModel[]> {

        const sources = await SourceModel.find().exec();
        return sources;
    }

    public async deleteSouce(_id: string): Promise<void> {

        if (!mongoose.isValidObjectId) throw new ClientError(StatusCode.BadRequest, "Invalid id to delete, bro check your params.");


        const source = await SourceModel.findByIdAndDelete(_id).exec();
        if (!source) throw new ClientError(StatusCode.NotFound, "This source does not exist.");

        console.log(`Source ${_id} deleted.`)
    }


    private async isSoucesMaxed(): Promise<boolean> {

        const count = await SourceModel.countDocuments().exec();
        if (count >= 5) return true;
        return false

    }

    private async isUrlTaken(url: string): Promise<boolean> {

        const currentSource = await SourceModel.findOne({ url }).exec();
        if (currentSource) return true;
        return false

    }

    public async getUrlsArr(): Promise<string[]> {
        const sources = await this.getAllSources();

        const urls = sources.map(s => s.url);
        console.log(urls)

        return urls;

    }




}

export const sourceService = new SourceService();