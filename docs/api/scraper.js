import { getInfo } from 'viki-scraper';

const handler = async (req, res) => {
  const { url } = req.body;
  const info = await getInfo({ url });
  res.json(info);
};

export default handler;
