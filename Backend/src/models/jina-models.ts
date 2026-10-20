
export type JinaHeadlineResponse = {
    data: {
        content: string,
        links: Headlines[]
    }
}

export type Headlines = [
    title: string,
    url: string
]

export type Article = {
  url: string;
  markdown: string;
};

export type JinaArticleResponse = {
    data: {
        title: string,
        url: string,
        content: string,
        publishedTime?: string
    }
}