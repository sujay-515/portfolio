import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import siteConfig from './site.config.js';

function seoPlugin() {
  return {
    name: 'seo-metadata-plugin',
    transformIndexHtml(html) {
      const tags = [];

      const addTag = (tagDef, testRegex) => {
        if (!testRegex.test(html)) {
          tags.push(tagDef);
        }
      };

      // Document title
      addTag(
        {
          tag: 'title',
          children: siteConfig.title,
          injectTo: 'head',
        },
        /<title[^>]*>/i
      );

      // Meta description
      addTag(
        {
          tag: 'meta',
          attrs: { name: 'description', content: siteConfig.description },
          injectTo: 'head',
        },
        /<meta[^>]+name=["']description["']/i
      );

      // Canonical link
      addTag(
        {
          tag: 'link',
          attrs: { rel: 'canonical', href: siteConfig.siteUrl },
          injectTo: 'head',
        },
        /<link[^>]+rel=["']canonical["']/i
      );

      // Open Graph
      addTag(
        {
          tag: 'meta',
          attrs: { property: 'og:title', content: siteConfig.title },
          injectTo: 'head',
        },
        /<meta[^>]+property=["']og:title["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: { property: 'og:description', content: siteConfig.description },
          injectTo: 'head',
        },
        /<meta[^>]+property=["']og:description["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: { property: 'og:type', content: 'website' },
          injectTo: 'head',
        },
        /<meta[^>]+property=["']og:type["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: { property: 'og:url', content: siteConfig.siteUrl },
          injectTo: 'head',
        },
        /<meta[^>]+property=["']og:url["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: { property: 'og:site_name', content: siteConfig.name },
          injectTo: 'head',
        },
        /<meta[^>]+property=["']og:site_name["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: { property: 'og:locale', content: siteConfig.locale },
          injectTo: 'head',
        },
        /<meta[^>]+property=["']og:locale["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: {
            property: 'og:image',
            content: `${siteConfig.siteUrl}${siteConfig.ogImage}`,
          },
          injectTo: 'head',
        },
        /<meta[^>]+property=["']og:image["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:width',
            content: String(siteConfig.ogImageWidth),
          },
          injectTo: 'head',
        },
        /<meta[^>]+property=["']og:image:width["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: {
            property: 'og:image:height',
            content: String(siteConfig.ogImageHeight),
          },
          injectTo: 'head',
        },
        /<meta[^>]+property=["']og:image:height["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: { property: 'og:image:alt', content: siteConfig.ogImageAlt },
          injectTo: 'head',
        },
        /<meta[^>]+property=["']og:image:alt["']/i
      );

      // Twitter Card
      addTag(
        {
          tag: 'meta',
          attrs: { name: 'twitter:card', content: 'summary_large_image' },
          injectTo: 'head',
        },
        /<meta[^>]+name=["']twitter:card["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: { name: 'twitter:title', content: siteConfig.title },
          injectTo: 'head',
        },
        /<meta[^>]+name=["']twitter:title["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:description',
            content: siteConfig.description,
          },
          injectTo: 'head',
        },
        /<meta[^>]+name=["']twitter:description["']/i
      );
      addTag(
        {
          tag: 'meta',
          attrs: {
            name: 'twitter:image',
            content: `${siteConfig.siteUrl}${siteConfig.ogImage}`,
          },
          injectTo: 'head',
        },
        /<meta[^>]+name=["']twitter:image["']/i
      );

      // Theme Color
      addTag(
        {
          tag: 'meta',
          attrs: { name: 'theme-color', content: siteConfig.themeColor },
          injectTo: 'head',
        },
        /<meta[^>]+name=["']theme-color["']/i
      );

      // Robots
      addTag(
        {
          tag: 'meta',
          attrs: { name: 'robots', content: 'index, follow' },
          injectTo: 'head',
        },
        /<meta[^>]+name=["']robots["']/i
      );

      // Google site verification (only if non-empty)
      if (siteConfig.googleSiteVerification) {
        addTag(
          {
            tag: 'meta',
            attrs: {
              name: 'google-site-verification',
              content: siteConfig.googleSiteVerification,
            },
            injectTo: 'head',
          },
          /<meta[^>]+name=["']google-site-verification["']/i
        );
      }

      // JSON-LD structured data
      const jsonLd = {
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': 'Person',
            name: siteConfig.name,
            url: siteConfig.siteUrl,
            jobTitle: siteConfig.jobTitle,
            description: siteConfig.description,
            sameAs: Object.values(siteConfig.socialLinks),
          },
          {
            '@type': 'WebSite',
            name: siteConfig.name,
            url: siteConfig.siteUrl,
            description: siteConfig.description,
          },
        ],
      };

      addTag(
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(jsonLd),
          injectTo: 'head',
        },
        /<script[^>]+type=["']application\/ld\+json["']/i
      );

      return tags;
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain; charset=utf-8');
          res.end(
            `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.siteUrl}/sitemap.xml\n`
          );
          return;
        }
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml; charset=utf-8');
          res.end(
            `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteConfig.siteUrl}</loc>\n  </url>\n</urlset>\n`
          );
          return;
        }
        next();
      });
    },
    generateBundle() {
      const robotsTxt = `User-agent: *\nAllow: /\n\nSitemap: ${siteConfig.siteUrl}/sitemap.xml\n`;
      const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n  <url>\n    <loc>${siteConfig.siteUrl}</loc>\n  </url>\n</urlset>\n`;

      this.emitFile({
        type: 'asset',
        fileName: 'robots.txt',
        source: robotsTxt,
      });

      this.emitFile({
        type: 'asset',
        fileName: 'sitemap.xml',
        source: sitemapXml,
      });
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoPlugin()],
});
