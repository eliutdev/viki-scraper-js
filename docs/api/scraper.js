import { getInfo } from 'viki-scraper';

const handler = async (req, res) => {
  const { url, lang: language } = req.body;
  const info = await getInfo({ url, language });
  res.json(info);
};

export default handler;
