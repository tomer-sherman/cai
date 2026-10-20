import axios from "axios";
import { appConfig } from "../utils/app-config";
import { Article, JinaArticleResponse, JinaHeadlineResponse } from "../models/jina-models";


class JinaService {

    public async getHeadlinesAndUrls(urls: string[]): Promise<JinaHeadlineResponse> {

        // A request to jina to get all the Headers with the urls,
        const response = await axios.post<JinaHeadlineResponse>(
            appConfig.jinaUrl,
            { url: urls },
            {
                headers: {
                    Authorization: `Bearer ${appConfig.jinaApiKey}`,
                    Accept: "application/json",
                    "X-With-Links-Summary": "all",
                    "X-Retain-Images": "none",
                },
            }
        )

        const jinaResponse = response.data;


        return jinaResponse;
    }


    public async readArticles(urls: string[]): Promise<Article[]> {
        const results = await Promise.allSettled(
            urls.map((url) => this.fetchArticle(url))
        );

        const articles: Article[] = [];

        for (const result of results) {
            if (result.status === "fulfilled") {
                articles.push(result.value);
            } else {
                console.log("Jina failed to read an article:", result.reason);
            }
        }

        return articles;
    }

    private async fetchArticle(url: string): Promise<Article> {
        const response = await axios.post<JinaArticleResponse>(
            appConfig.jinaUrl,
            { url },
            {
                headers: {
                    Authorization: `Bearer ${appConfig.jinaApiKey}`,
                    Accept: "application/json",
                    "X-Retain-Images": "none",
                    "X-Retain-Links": "text",
                    "X-Remove-Selector": "header, footer, nav",
                },
            }
        );

        const markdown = response.data.data.content.slice(0, 10000);
        return { url, markdown };
    }



}

export const jinaService = new JinaService();