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
                  className="article-equation"
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
    return <div className="loading">Loading index…</div>;
  }

  return (
    <div className="article-page">
      <button
        onClick={() => navigate('/')}
        className="article-back"
      >
        ← Back to index
      </button>
      <article className="article-prose">
        {/* Title, Date, and Description */}
        <header>
          <p className="article-date">Research note / {metadata.date}</p>
          <h1>{metadata.title}</h1>
          <p className="article-description">{metadata.description}</p>
        </header>

        {/* Content */}
        <div className="article-body">{parseContent(content)}</div>
      </article>
    </div>
  );
};
