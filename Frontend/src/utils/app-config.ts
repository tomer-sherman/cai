class AppConfig {

    // Backend base url:
    public readonly baseUrl = "http://localhost:4000/api/";

    // Sources:
    public readonly sourcesUrl = this.baseUrl + "sources/"; // GET all, POST add, DELETE sourcesUrl + _id
}

export const appConfig = new AppConfig();
