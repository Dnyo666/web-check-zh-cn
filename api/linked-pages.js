import * as cheerio from 'cheerio';
import axios from 'axios';

export default async function handler(req, res) {
  try {
    const { url } = req.query;
    if (!url) {
      return res.status(400).json({ error: '缺少 URL 参数' });
    }

    const response = await axios.get(url);
    const $ = cheerio.load(response.data);
    
    const links = [];
    $('a').each((i, link) => {
      const href = $(link).attr('href');
      if (href && !href.startsWith('#') && !href.startsWith('javascript:')) {
        links.push(href);
      }
    });

    return res.status(200).json({ links: Array.from(new Set(links)) });
  } catch (error) {
    console.error('Error fetching linked pages:', error);
    return res.status(500).json({ error: '获取链接页面时出错' });
  }
}
