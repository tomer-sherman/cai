import { Article, Headlines } from "../models/jina-models";
import { promptHolder } from "../utils/pompt-holder";
import { gptService } from "./gpt-service";
import { jinaService } from "./jina-service";

class AiService {

    public async getAiSummery(links: string[]): Promise<string> {

        // Activate jina to fetch the urlArr
        const jinaHeadlinesResponse = await jinaService.getHeadlinesAndUrls(links);
        const jinaLinksArr = jinaHeadlinesResponse.data.links;

        // Filter the junk
        const datedHeadlines = jinaLinksArr.filter(([title, url]) => title.trim() && /\/\d{4}\/\d{2}\/\d{2}\//.test(url))
            .map(([title, url]) => ({ title: title.trim(), url }));

        // Create a string to send as a user prompt.
        const headlinesListString = datedHeadlines.map((headline, index) => `${index}. ${headline.title}`).join("\n");
        console.log(headlinesListString);
        console.log("-------------------------------------------")

        // Activate decideArticles pass the url's too the argument return the url arr that worth clicking on
        const picks = await this.decideArticles(headlinesListString);
        console.log(picks)
        console.log("-------------------------------------------")

        const pickedUrls = picks.map(pick => datedHeadlines[pick].url);
        console.log(pickedUrls);
        console.log("-------------------------------------------")

        //Activate jina to fetch specific url summeries to feed the ai return an JinaSummeryArr // Use the url that were extracted to the argument
        const articles = await jinaService.readArticles(pickedUrls);
        console.log(articles);
        console.log("-------------------------------------------")

        // Send the article array's to the last ai for summery, 
        const summery = await this.aiSummery(articles);


        //return the summery
        console.log(summery);

        return summery;
    }

    private async decideArticles(jinaHeadlinesString: string): Promise<number[]> {

        const userPrompt = promptHolder.pickArticlesUserPrompt(jinaHeadlinesString, 5)
        const picks = await gptService.getCompletion(promptHolder.pickArticlesSystemPrompt, userPrompt, "gpt-4o-mini");
        const numberedPicks = JSON.parse(picks) as number[]

        return numberedPicks;
    }

    private async aiSummery(jinaArticleResponse: Article[]): Promise<string> {

        const userPrompt = promptHolder.buildSummarizeUserPrompt(jinaArticleResponse);
        const summery = await gptService.getCompletion(promptHolder.summarizeSystemPrompt, userPrompt, "gpt-5");

        return summery;

    }




}

export const aiSerive = new AiService();
