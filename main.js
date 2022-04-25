import { parseHTML } from "linkedom";

const getEpisodeId = (url) => {
  return url.match(/tv\/(\w+)/)[1];
};

const fetchSynopsis = async ({ url, language }) => {
  const id = getEpisodeId(url);
  const response = await fetch(
    `https://api.viki.io/v4/containers/${id}/descriptions/${language}.json?html=true&app=100000a`
  );
  const json = await response.json();
  return parseHTML(`
    <!doctype html>
    <html lang="en">
    <head>
        <title>Hello SSR</title>
    </head>
    <body>
        ${json.description.viki[language]}
    </body>
    </html>
  `).document.body.textContent;
};

const getInfo = async ({ url, language = "en" }) => {
  const response = await fetch(url, {
    headers: {
      "content-language": language,
      "accept-language": language,
    },
  });
  const html = await response.text();

  const { document } = parseHTML(html);

  const title = document.querySelector("h1");
  const originalTitle =
    document.querySelector("h1").parentElement.nextElementSibling;

  const image = document
    .querySelector("main img")
    .getAttribute("src")
    .split("?")[0];

  const [year, rating, episodes] = Array.from(
    document.querySelector("h1").parentElement.nextElementSibling
      .nextElementSibling.children
  ).map((el) => el.textContent);

  const [genres, cast] = Array.from(
    document.querySelector("h1").parentElement.parentElement.nextElementSibling
      .children
  )
    .map((el) => {
      const childs = Array.from(el.querySelectorAll("span"));
      return childs.map((el) => el.textContent.split(","));
    })
    .flat();

  const synopsis = await fetchSynopsis({ url, language });

  return {
    title: title.textContent,
    originalTitle: originalTitle.textContent,
    image,
    year: year.replace(/\D/g, ""),
    rating: rating.replace(/\D/g, ""),
    episodes: episodes.replace(/\D/g, ""),
    genres,
    cast,
    synopsis,
  };
};

export { getInfo };
