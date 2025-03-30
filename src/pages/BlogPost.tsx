import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import katex from 'katex';
import 'katex/dist/katex.min.css';

export const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [content, setContent] = useState<string>('');
  const [metadata, setMetadata] = useState<{ title: string; date: string; description: string } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const files = import.meta.glob('/src/blog-posts/*.tex', { query: '?raw', import: 'default' });
        const filePath = `/src/blog-posts/${slug}.tex`;

        if (files[filePath]) {
          const fileContent = (await files[filePath]()) as string; // Explicitly cast as string

          // Extract metadata
          const titleMatch = fileContent.match(/\\title\{(.+?)\}/);
          const dateMatch = fileContent.match(/\\date\{(.+?)\}/);
          const descriptionMatch = fileContent.match(/\\description\{(.+?)\}/);

          setMetadata({
            title: titleMatch ? titleMatch[1] : 'Untitled',
            date: dateMatch ? dateMatch[1] : 'Unknown Date',
            description: descriptionMatch ? descriptionMatch[1] : '',
          });

          // Remove metadata and \section* commands from content
          const cleanedContent = fileContent
            .replace(/\\title\{(.+?)\}/, '')
            .replace(/\\date\{(.+?)\}/, '')
            .replace(/\\description\{(.+?)\}/, '')
            .replace(/\\section\*?\{(.+?)\}/g, '') // Remove \section* commands
            .trim();

          setContent(cleanedContent);
        } else {
          setContent('Error: Blog post not found.');
        }
      } catch {
        setContent('Error loading blog post.');
      }
    };

    fetchPost();
  }, [slug]);

  const renderLatex = (latex: string, displayMode: boolean) => {
    try {
      return {
        __html: katex.renderToString(latex, {
          throwOnError: false,
          displayMode,
        }),
      };
    } catch (error) {
      console.error('Error rendering LaTeX:', error);
      return { __html: `<span style="color: red;">Error rendering LaTeX: ${latex}</span>` };
    }
  };

  const parseContent = (content: string) => {
    const lines = content.split('\n');
    return lines.map((line, index) => {
      if (line.startsWith('\\[') && line.endsWith('\\]')) {
        // Block LaTeX
        return (
          <div
            key={index}
            className="my-4 text-center"
            dangerouslySetInnerHTML={renderLatex(line.slice(2, -2), true)}
          />
        );
      } else if (line.includes('$')) {
        // Inline LaTeX
        const parts = line.split(/(\$.*?\$)/); // Split by inline LaTeX
        return (
          <p key={index} className="leading-relaxed">
            {parts.map((part, i) =>
              part.startsWith('$') && part.endsWith('$') ? (
                <span
                  key={i}
                  className="text-blue-400"
                  dangerouslySetInnerHTML={renderLatex(part.slice(1, -1), false)}
                />
              ) : (
                part
              )
            )}
          </p>
        );
      } else if (line.includes('\\includegraphics')) {
        // Handle LaTeX image commands
        const match = line.match(/\\includegraphics\[.*?\]\{(.+?)\}/);
        if (match) {
          const imageUrl = match[1].startsWith('http')
            ? match[1] // Absolute URL
            : `/images/${match[1]}`; // Relative path
          return (
            <div key={index} className="my-4 text-center">
              <img src={imageUrl} alt="Blog Post Illustration" className="mx-auto max-w-full h-auto" />
            </div>
          );
        }
      }
      // Regular Text
      return <p key={index} className="leading-relaxed">{line}</p>;
    });
  };

  if (!metadata) {
    return <div className="text-center text-white">Loading...</div>;
  }

  return (
    <div className="py-20 px-4 md:px-8 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/')}
        className="mb-8 px-8 py-3 border-2 rounded-lg text-lg font-semibold transition-colors bg-transparent border-blue-600 text-blue-600 hover:border-blue-700 hover:text-blue-700"
      >
        Back to Home
      </button>
      <article className="prose prose-invert lg:prose-xl">
        {/* Title, Date, and Description */}
        <header className="mb-8">
          <h1 className="text-4xl font-bold text-white">{metadata.title}</h1>
          <p className="text-gray-400 text-sm">{metadata.date}</p>
          <p className="text-gray-300 text-base">{metadata.description}</p>
        </header>

        {/* Content */}
        <div className="space-y-6">{parseContent(content)}</div>
      </article>
    </div>
  );
};
