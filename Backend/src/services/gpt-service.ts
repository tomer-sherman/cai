import axios from "axios";
import { appConfig } from "../utils/app-config";

class GptService {

    // Sends the prompts and returns the answer
    public async getCompletion(systemPrompt: string, userPrompt: string, model: string): Promise<string> {
        const body = {
            model: model,
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
            //temperature: 0 is not creative at all 1 is very creative.
        };

        const options = {
            headers: {
                authorization: "Bearer " + appConfig.openAiKey
            }
        };

        const response = await axios.post(appConfig.openaiUrl, body, options);
        const completion = response.data.choices[0].message.content;

        return completion;
    }
    

    




}


export const gptService = new GptService();