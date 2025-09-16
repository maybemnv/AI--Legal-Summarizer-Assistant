import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  // Simple markdown-to-JSX parser for structured legal summaries
  const parseMarkdown = (text: string): JSX.Element[] => {
    const lines = text.split('\n');
    const elements: JSX.Element[] = [];
    let currentList: string[] = [];
    let key = 0;

    const flushList = () => {
      if (currentList.length > 0) {
        elements.push(
          <ul key={`list-${key++}`} className="list-disc ml-6 space-y-2 mb-4">
            {currentList.map((item, idx) => (
              <li key={idx} className="text-gray-700 dark:text-gray-300">
                {item}
              </li>
            ))}
          </ul>
        );
        currentList = [];
      }
    };

    for (const line of lines) {
      const trimmed = line.trim();
      
      if (!trimmed) {
        flushList();
        continue;
      }

      // Headers
      if (trimmed.startsWith('# ')) {
        flushList();
        const headerText = trimmed.substring(2);
        elements.push(
          <h1 key={`h1-${key++}`} className="text-2xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
            {headerText}
          </h1>
        );
      } else if (trimmed.startsWith('## ')) {
        flushList();
        const headerText = trimmed.substring(3);
        elements.push(
          <h2 key={`h2-${key++}`} className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-3 mt-6">
            {headerText}
          </h2>
        );
      } else if (trimmed.startsWith('### ')) {
        flushList();
        const headerText = trimmed.substring(4);
        elements.push(
          <h3 key={`h3-${key++}`} className="text-lg font-medium text-gray-700 dark:text-gray-300 mb-2 mt-4">
            {headerText}
          </h3>
        );
      }
      // List items
      else if (trimmed.startsWith('- ')) {
        const listItem = trimmed.substring(2);
        currentList.push(listItem);
      }
      // Bold text
      else if (trimmed.includes('**')) {
        flushList();
        const parts = trimmed.split('**');
        const rendered = parts.map((part, idx) => 
          idx % 2 === 1 ? <strong key={idx} className="font-semibold">{part}</strong> : part
        );
        elements.push(
          <p key={`p-${key++}`} className="text-gray-700 dark:text-gray-300 mb-3">
            {rendered}
          </p>
        );
      }
      // Regular paragraph
      else {
        flushList();
        elements.push(
          <p key={`p-${key++}`} className="text-gray-700 dark:text-gray-300 mb-3">
            {trimmed}
          </p>
        );
      }
    }

    flushList();
    return elements;
  };

  return (
    <div className={`prose prose-gray dark:prose-invert max-w-none ${className}`}>
      {parseMarkdown(content)}
    </div>
  );
};