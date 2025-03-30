import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [metadata, setMetadata] = useState<{ title: string; date: string } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const files = import.meta.glob('/src/blog-posts/*.tex', { query: '?raw', import: 'default' });
        const filePath = `/src/blog-posts/${slug}.tex`;

        if (files[filePath]) {
          const fileContent = (await files[filePath]()) as string; // Explicitly cast as string
          const titleMatch = fileContent.match(/\\title\{(.+?)\}/);
          const dateMatch = fileContent.match(/\\date\{(.+?)\}/);

          setContent(fileContent);
          setMetadata({
            title: titleMatch ? titleMatch[1] : 'Untitled',
            date: dateMatch ? dateMatch[1] : 'Unknown Date',
          });
        } else {
          setContent('Error: Blog post not found.');
        }
      } catch {
        setContent('Error loading blog post.');
      }
    };

    fetchPost();
  }, [slug]);

  if (!metadata) {
    return <div className="text-center text-white">Loading...</div>;
  }

  const renderLatex = (latex: string) => {
    try {
      return { __html: katex.renderToString(latex, { throwOnError: false }) };
    } catch {
      return { __html: 'Error rendering LaTeX.' };
    }
  };

  return (
    <div className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-8 px-8 py-3 border-2 rounded-lg text-lg font-semibold transition-colors bg-transparent border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700"
      >
        Back to Home
      </button>
      <article className="prose prose-invert lg:prose-xl">
        {/* Title and Date */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">{metadata.title}</h1>
          <p className="text-gray-400 text-sm">{metadata.date}</p>
        </header>

        {/* Content */}
        <div className="space-y-6">
          {content.split('\n').map((line, index) => {
            if (line.startsWith('\\[') && line.endsWith('\\]')) {
              // Block LaTeX
              return (
                <div
                  key={index}
                  className="my-4 text-center"
                  dangerouslySetInnerHTML={renderLatex(line.slice(2, -2))}
                />
              );
            } else if (line.includes('$')) {
              // Inline LaTeX
              const parts = line.split('$');
              return (
                <p key={index} className="leading-relaxed">
                  {parts.map((part, i) =>
                    i % 2 === 1 ? (
                      <span
                        key={i}
                        className="text-blue-400"
                        dangerouslySetInnerHTML={renderLatex(part)}
                      />
                    ) : (
                      part
                    )
                  )}
                </p>
              );
            } else {
              // Regular Text
              return <p key={index} className="leading-relaxed">{line}</p>;
            }
          })}
        </div>
      </article>
    </div>
  );
};
