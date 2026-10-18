import { RegisterOptions } from "react-hook-form";
import { SourceModel } from "./source-model";

// Front validations for react-hook-form, matching the backend SourceSchema rules.
// Usage: <input {...register("url", sourceValidation.url)} />
class SourceValidation {

    public readonly url: RegisterOptions<SourceModel, "url"> = {
        required: { value: true, message: "Missing url." },
        pattern: { value: /^https?:\/\/\S+$/, message: "Invalid url." }
    };

    public readonly name: RegisterOptions<SourceModel, "name"> = {
        required: { value: true, message: "You must attach a name for the url." },
        validate: (value: string) => value.trim() !== "" || "You must attach a name for the url." // Backend trims, so spaces only = missing.
    };

}

export const sourceValidation = new SourceValidation();
