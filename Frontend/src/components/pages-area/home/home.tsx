import { SourcesList } from "../../srouces/sources-list/sources-list";
import "./home.css";

export function Home() {
    return (
        <div className="Home">

            <h1>Cai - clarity artificial intelegent, investing research agent</h1>

            <p>Cai is an investing agent ready to help you with your analyzing daily news, using your own personalised evaluation style.</p>
            <p>Fill in your url trusted sources, to get reports based on your evaluation style.</p>
            <p>Load in your evaluation style using a skill like upload, upload an md file</p>

            <SourcesList />

        </div>
    );
}
