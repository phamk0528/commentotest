
import { useGetAllArticles } from '../../helpers/articles';
export default async (req:any, res:any) => {
    // Fetch data from a CMS.
    const articles = await useGetAllArticles();
  
    const routes = articles.map((article:any) => `/articles/${article.slug}`);
    const localRoutes = ['/', '/videos','/search','/aboutUs','/privacyPolicy','/temOfUse','/contactUs','/subscribe','/subscribe/success'];
  
    const pages = routes.concat(localRoutes);
  
    const urlSet = pages
      .map((page: any) => {
        // Remove none route related parts of filename.
        const path = page
          .replace('pages', '')
          .replace('_content', '')
          .replace(/(.tsx|.ts)/, '')
          .replace('.mdx', '');
        // Remove the word index from route
        const route = path === '/index' ? '' : path;
        // Build url portion of sitemap.xml
        return `<url><loc>https://playitright.tv${route}</loc></url>`;
      })
      .join('');
  
    // Add urlSet to entire sitemap string
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlSet}</urlset>`;
  
    // set response content header to xml
    res.setHeader('Content-Type', 'text/xml');
    // write the sitemap
    res.write(sitemap);
    res.end();
  };