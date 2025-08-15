import React from "react";
import { Post } from "@/data";

export default function PostCard({
  title,
  content,
  author,
  subreddit,
  upvotes,
  comments,
  timeAgo
}: Post): React.JSX.Element {
  return (
    <article className="border border-gray-200 rounded-lg p-4 bg-white shadow-lg hover:shadow-xl transition-shadow" role="article">
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-1" role="group" aria-label="Röstningssektion">
          <button 
            className="text-gray-400 hover:text-orange-500 p-1 rounded focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2" 
            aria-label={`Rösta upp. Just nu ${upvotes} röster`}
            aria-pressed="false"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M3.293 9.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L11 5.414V17a1 1 0 11-2 0V5.414L4.707 9.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
            </svg>
          </button>
          <span className="text-sm font-medium text-gray-900" aria-live="polite">{upvotes}</span>
          <button 
            className="text-gray-400 hover:text-blue-500 p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2" 
            aria-label={`Rösta ner. Just nu ${upvotes} röster`}
            aria-pressed="false"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M16.707 10.293a1 1 0 010 1.414l-6 6a1 1 0 01-1.414 0l-6-6a1 1 0 111.414-1.414L9 14.586V3a1 1 0 012 0v11.586l4.293-4.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        <div className="flex-1">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span className="font-medium text-gray-900">r/{subreddit}</span>
            <span aria-hidden="true">•</span>
            <span>Postat av u/{author}</span>
            <span aria-hidden="true">•</span>
            <time dateTime="2024-01-01">{timeAgo}</time>
          </div>

          <h3 className="text-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent mb-2 hover:from-blue-700 hover:to-blue-900 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded transition-all duration-200">{title}</h3>
          <p className="text-gray-700 mb-4">{content}</p>

          <div className="flex items-center gap-4 text-sm text-gray-500" role="group" aria-label="Inläggsåtgärder">
            <button 
              className="flex items-center gap-1 hover:text-gray-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label={`${comments} kommentarer. Klicka för att visa kommentarer`}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              <span>{comments} kommentarer</span>
            </button>
            <button 
              className="flex items-center gap-1 hover:text-gray-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label="Dela detta inlägg"
            >
              <span>Dela</span>
            </button>
            <button 
              className="flex items-center gap-1 hover:text-gray-700 p-1 rounded focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors duration-200"
              aria-label="Spara detta inlägg"
            >
              <span>Spara</span>
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}
