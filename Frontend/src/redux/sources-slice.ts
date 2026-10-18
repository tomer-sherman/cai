
import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { SourceModel } from "../models/source-model";



function initSources(_currentState: SourceModel[], action: PayloadAction<SourceModel[]>): SourceModel[] {

    const vacationsToInit = action.payload;
    const newState = vacationsToInit;
    return newState;

}

function addSource(currentState: SourceModel[], action: PayloadAction<SourceModel>): SourceModel[] {

    const vacationToAdd = action.payload;
    const newState = [...currentState, vacationToAdd];
    return newState;

}

function removeSource(currentState: SourceModel[], action: PayloadAction<string>): SourceModel[] {

    const idToDelete = action.payload;
    const state = [...currentState];

    const newState = state.filter(v => v._id !== idToDelete);

    return newState;

};


export const sourcesSlice = createSlice({
    name: "sources-slice",
    initialState: [] as SourceModel[],
    reducers: { initSources, addSource, removeSource }
})