import { SourceModel } from "../../../models/source-model";
import "./source-card.css";

type SourceProp = {
    source: SourceModel;

    deleteBtn: (sourceId: string) => void;
}

export function SourceCard(props: SourceProp) {
    return (
        <div className="SourceCard">
            <p>Name: {props.source.name}</p>
            <p>Url: {props.source.url}</p>

            <button onClick={() => props.deleteBtn(props.source._id)} >Delete</button>

        </div>
    );
}
