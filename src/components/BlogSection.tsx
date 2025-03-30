import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

interface BlogArticle {
  slug: string;
  title: string;
  date: string;
  description: string;
}

export const BlogSection: React.FC = () => {
  const [articles, setArticles] = useState<BlogArticle[]>([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const files = import.meta.glob('/src/blog-posts/*.tex', { query: '?raw', import: 'default' });
      const articles: BlogArticle[] = [];

      for (const path in files) {
        const slug = path.split('/').pop()?.replace('.tex', '') || '';
        const fileContent = (await files[path]()) as string;

        // Extract metadata from LaTeX content
        const titleMatch = fileContent.match(/\\title\{(.+?)\}/);
        const dateMatch = fileContent.match(/\\date\{(.+?)\}/);
        const descriptionMatch = fileContent.match(/\\description\{(.+?)\}/);

        articles.push({
          slug,
          title: titleMatch ? titleMatch[1] : 'Untitled',
          date: dateMatch ? dateMatch[1] : 'Unknown Date',
          description: descriptionMatch ? descriptionMatch[1] : 'No description available.',
        });
      }

      // Sort articles by date (newest first)
      articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
      setArticles(articles);
    };

    fetchArticles();
  }, []);

  return (
    <div id="blog" className="py-20 px-4 md:px-8 relative z-10">
      <h2 className="text-4xl font-bold text-center mb-12 text-white">Blog</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {articles.map((article) => (
          <div key={article.slug} className="bg-gray-800 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-transform">
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2 text-white">{article.title}</h3>
              <p className="text-gray-400 text-sm mb-2">{article.date}</p>
              <p className="text-gray-300 mb-4">{article.description}</p>
              <Link to={`/blog/${article.slug}`} className="text-blue-400 hover:text-blue-300">
                Read More
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
