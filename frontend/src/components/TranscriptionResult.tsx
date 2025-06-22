import React from 'react';
import type { Transcription } from '../types/types';

interface TranscriptionResultProps {
  transcription: Transcription | null;
  isLoading: boolean;
  error: string | null;
}

const TranscriptionResult: React.FC<TranscriptionResultProps> = ({ transcription, isLoading, error }) => {
  if (isLoading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 animate-pulse">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-3">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-5/6"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-500" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-red-800">Error</h3>
            <div className="mt-2 text-sm text-red-700">
              <p>{error}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!transcription) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6 text-center">
        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">No transcription yet</h3>
        <p className="mt-1 text-sm text-gray-500">Upload an audio file to get started.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h2 className="text-xl font-bold text-gray-800">Transcription Result</h2>
          <div className="flex items-center mt-1 text-sm text-gray-600">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mr-2">
              {transcription.language}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
              {transcription.model_size}
            </span>
          </div>
        </div>
        <button
          onClick={() => navigator.clipboard.writeText(transcription.transcription)}
          className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
        >
          <svg className="-ml-0.5 mr-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
            <path d="M8 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" />
            <path d="M6 3a2 2 0 00-2 2v11a2 2 0 002 2h8a2 2 0 002-2V5a2 2 0 00-2-2 3 3 0 01-3 3H9a3 3 0 01-3-3z" />
          </svg>
          Copy
        </button>
      </div>

      <div className="prose max-w-none">
        <p className="whitespace-pre-wrap">{transcription.transcription}</p>
      </div>

      {transcription.segments && transcription.segments.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Segments</h3>
          <div className="space-y-2">
            {transcription.segments.map((segment) => (
              <div key={segment.id} className="p-3 bg-gray-50 rounded-lg">
                <div className="flex justify-between text-sm text-gray-500 mb-1">
                  <span>{segment.start.toFixed(2)}s</span>
                  <span>{segment.end.toFixed(2)}s</span>
                </div>
                <p className="text-gray-800">{segment.text}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TranscriptionResult;