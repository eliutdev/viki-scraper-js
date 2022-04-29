import { getInfo } from 'viki-scraper';

const handler = async (req, res) => {
  const { url, lang } = req.body;
  const info = await getInfo({ url, lang });
  res.json(info);
};

export default handler;
