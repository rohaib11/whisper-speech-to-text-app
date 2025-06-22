import React from 'react';
import type { HistoryItem } from '../types/types'; // ✅ type-only import

interface HistoryListProps {
  items: HistoryItem[];
  onSelect: (id: string) => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ items, onSelect }) => {
  if (items.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No history yet</h3>
        <p className="mt-1 text-sm text-gray-500">Your transcriptions will appear here.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-4">Recent Transcripts</h2>
      <ul className="divide-y divide-gray-200">
        {items.map((item) => (
          <li key={item.id} className="py-4">
            <button
              onClick={() => onSelect(item.id)}
              className="w-full text-left hover:bg-gray-50 -m-2 p-2 rounded-md"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-primary-600 truncate">{item.filename || 'Untitled'}</p>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                  {item.language}
                </span>
              </div>
              <p className="mt-1 text-sm text-gray-500 line-clamp-2">{item.text}</p>
              <p className="mt-1 text-xs text-gray-400">
                {new Date(item.timestamp).toLocaleString()}
              </p>
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HistoryList;