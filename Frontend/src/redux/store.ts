import { configureStore } from "@reduxjs/toolkit";
import { AppState } from "./app-state";
import { sourcesSlice } from "./sources-slice";


export const store = configureStore<AppState>({
    reducer: {
        sources: sourcesSlice.reducer

    }
})