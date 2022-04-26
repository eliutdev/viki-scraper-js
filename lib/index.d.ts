declare type Options = {
    url: string;
    language?: string;
};
export declare const getInfo: ({ url, language }: Options) => Promise<{
    title: string | null;
    originalTitle: string | null;
    image: string;
    year: string | null;
    rating: string | null;
    episodes: string | null;
    genres: string[] | undefined;
    cast: string[] | undefined;
    synopsis: string | null;
}>;
export {};
