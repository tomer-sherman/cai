import { useForm } from "react-hook-form";
import "./add-source-form.css";
import { SourceModel } from "../../../models/source-model";
import { sourceValidation } from "../../../models/source-validation";
import { sourceService } from "../../../services/source-service";
import { notify } from "../../../utils/notify";

export function AddSourceForm() {

    const { register, handleSubmit, formState: { errors } } = useForm<SourceModel>();

    async function send(source: SourceModel) {

        sourceService.addSource(source)
            .catch(err => notify.error(err.message));

    }

    return (
        <div className="AddSourceForm">


            <form onSubmit={handleSubmit(send)}>
                <label>Name: </label>
                <input {...register("name", sourceValidation.name)} ></input>
                {errors.name?.message && <p className="errors" > {errors.name.message} </p>}

                <label>Url: </label>
                <input {...register("url", sourceValidation.url)}></input>
                {errors.url?.message && <p className="errors" > {errors.url.message} </p>}

                <button>Add </button>
            </form>

        </div>
    );
}
