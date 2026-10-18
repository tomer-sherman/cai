import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./sources-list.css";
import { SourceModel } from "../../../models/source-model";
import { AppState } from "../../../redux/app-state";
import { notify } from "../../../utils/notify";
import { sourceService } from "../../../services/source-service";
import { SourceCard } from "../source-card/source-card";
import { AddSourceForm } from "../add-source-form/add-source-form";
import { Spinner } from "../../shared-area/spinner/spinner";

// Slide up/down time in ms, matches --duration-base in index.css:
const collapseDuration = 200;

export function SourcesList() {

    // Read sources from the store, so every add/remove dispatch re-renders the list:
    const sources = useSelector<AppState, SourceModel[]>(state => state.sources);
    const [loading, setLoading] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);
    const [removingIds, setRemovingIds] = useState<string[]>([]); // Rows currently sliding up.


    useEffect(() => {
        setLoading(true);
        sourceService.getAllSources() // Fills the store, useSelector picks it up.
            .catch(err => notify.error(err.message))
            .finally(() => setLoading(false));
    }, [])

    async function handleDelete(sourceId: string) {

        // Slide the row up first, then remove it (removing it from the store unmounts it):
        setRemovingIds(ids => [...ids, sourceId]);

        try {
            await new Promise(resolve => setTimeout(resolve, collapseDuration));
            await sourceService.removeSource(sourceId);
            notify.success("Source deleted")
        }
        catch (err: any) {
            notify.error(err.message);
        }
        finally {
            // On failure the row slides back down:
            setRemovingIds(ids => ids.filter(id => id !== sourceId));
        }

    }

    function handleAdd() {
        clicked ? setClicked(false) : setClicked(true)
    }

    return (
        <div className="SourcesList">

            {/* .collapsible slides open/closed; inert = closed (also blocks clicks and focus): */}
            {sources.map(s =>
                <div key={s._id} className="source-row collapsible" inert={removingIds.includes(s._id)}>
                    <div>
                        <SourceCard source={s} deleteBtn={handleDelete} />
                    </div>
                </div>
            )}

            <button onClick={handleAdd} aria-expanded={clicked}>Add Source</button>

            {/* Always mounted, so it can slide closed too: */}
            <div className="add-form collapsible" inert={!clicked}>
                <div>
                    <AddSourceForm />
                </div>
            </div>

            {loading && <Spinner />}

        </div>
    );
}
