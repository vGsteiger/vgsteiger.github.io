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
    <section id="blog" className="py-20 px-4 md:px-8 relative z-10" aria-labelledby="blog-heading">
      <h2 id="blog-heading" className="text-4xl md:text-5xl font-bold text-center mb-4 text-white">Blog</h2>
      <p className="text-xl text-center mb-12 text-gray-400 max-w-3xl mx-auto">Thoughts on technology, systems, and research</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {articles.map((article) => (
          <div key={article.slug} className="group bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-300 border border-gray-700/50">
            <div className="p-6 flex flex-col h-full">
              <div className="mb-3">
                <span className="text-gray-400 text-sm">{article.date}</span>
              </div>
              <h3 className="text-2xl font-bold mb-3 text-white group-hover:text-yellow-400 transition-colors leading-tight">{article.title}</h3>
              <p className="text-gray-300 mb-6 leading-relaxed flex-grow">{article.description}</p>
              <Link
                to={`/blog/${article.slug}`}
                className="inline-flex items-center justify-center px-4 py-2 bg-yellow-500/10 border border-yellow-500/50 text-yellow-400 rounded-lg hover:bg-yellow-500/20 hover:border-yellow-400 transition-all duration-300 font-medium">
                Read More →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
