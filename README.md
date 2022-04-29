# Viki Scraper

Get the show information from the [Viki](https://www.viki.com/) website.

## Usage

```js
import { getInfo } from 'viki-scraper';

getInfo({
  url: 'https://www.viki.com/tv/38405c-shting-stars',
  language: 'es',
}).then(console.log);
/*
{
    title: string;
    originalTitle: string;
    image: string;
    year: string;
    rating: string;
    episodes: string;
    genres: string[];
    cast: string[];
    synopsis: string;
}
*/
```
