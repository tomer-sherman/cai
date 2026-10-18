import axios from "axios";

import { appConfig } from "../utils/app-config";
import { SourceModel } from "../models/source-model";
import { store } from "../redux/store";
import { sourcesSlice } from "../redux/sources-slice";

class SourceService {

    public async getAllSources(): Promise<SourceModel[]> {

        if (store.getState().sources.length > 0) return store.getState().sources;

        const response = await axios.get<SourceModel[]>(appConfig.sourcesUrl);
        const sources = response.data;

        const action = sourcesSlice.actions.initSources(sources);
        store.dispatch(action);

        return sources;

    }

    public async addSource(source: SourceModel): Promise<SourceModel> {

        const response = await axios.post<SourceModel>(appConfig.sourcesUrl, source);
        const dbSource = response.data;

        const action = sourcesSlice.actions.addSource(dbSource);
        store.dispatch(action);

        return dbSource;

    }

    public async removeSource(_id: string): Promise<void> {

        await axios.delete(appConfig.sourcesUrl + _id);

        const action = sourcesSlice.actions.removeSource(_id);
        store.dispatch(action);


    }

}

export const sourceService = new SourceService();
