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
}

export const appConfig = new AppConfig();
