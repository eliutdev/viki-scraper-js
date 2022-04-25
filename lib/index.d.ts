declare type Options = {
    url: string;
    language?: string;
};
export declare const getInfo: ({ url, language }: Options) => Promise<{
    title: string | null;
    originalTitle: string | null;
    image: string;
    year: string;
    rating: string;
    episodes: string;
    genres: string[];
    cast: string[];
    synopsis: string | null;
}>;
export {};
