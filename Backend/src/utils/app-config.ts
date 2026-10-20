import dotenv from "dotenv"; // npm install dotenv

// Loads .env values into: process.env object:
dotenv.config({ quiet: true });

class AppConfig {

    public readonly environment = process.env.ENVIRONMENT!;
    public readonly isDevelopment = this.environment === "development";
    public readonly isProduction = this.environment === "production";

    public readonly port = 4000;
    public readonly mongoConnectionString = process.env.MONGO_CONNECTION_STRING!;

    public readonly openAiKey = process.env.OPENAI_API_KEY!;

    //Ngrok url
    public readonly ngrokUrl = process.env.NGROK_URL!;

    //Jina Url
    public readonly jinaUrl = "https://r.jina.ai/"
    public readonly jinaApiKey = process.env.JINA_API_KEY!;


    public readonly openaiUrl = "https://api.openai.com/v1/chat/completions";
}

export const appConfig = new AppConfig();
