import { ClientError } from "../models/client-error";
import { ISummeryModel, SummeryModel } from "../models/summery-model";

class SummeryService {

    public async saveSummery(summery: ISummeryModel): Promise<ISummeryModel> {

        await ClientError.validateDocument(summery)

        const dbSummery = await summery.save();

        return dbSummery;

    }

    public async getAllSummeries(): Promise<ISummeryModel[]> {

        const dbSummery = SummeryModel.find().exec();
        return dbSummery;
    }

}

export const summeryService = new SummeryService();