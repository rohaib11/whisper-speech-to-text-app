import React, { useState, useRef } from 'react';
import type { ModelSize } from '../types/types';

interface AudioUploadProps {
  onUpload: (file: File, language?: string, modelSize?: ModelSize) => void;
  isLoading: boolean;
}

const AudioUpload: React.FC<AudioUploadProps> = ({ onUpload, isLoading }) => {
  const [file, setFile] = useState<File | null>(null);
  const [language, setLanguage] = useState<string>('');
  const [modelSize, setModelSize] = useState<ModelSize>('base');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file) {
      onUpload(file, language || undefined, modelSize);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Upload Audio</h2>
      
      <div 
        className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 cursor-pointer hover:border-primary-500 transition-colors"
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onClick={() => fileInputRef.current?.click()}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="audio/*"
          className="hidden"
        />
        {file ? (
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-primary-500 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
            </svg>
            <p className="text-gray-700">{file.name}</p>
            <p className="text-sm text-gray-500 mt-1">{(file.size / (1024 * 1024)).toFixed(2)} MB</p>
          </div>
        ) : (
          <div className="flex flex-col items-center">
            <svg className="w-12 h-12 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
            </svg>
            <p className="text-gray-600">Drag & drop an audio file here, or click to select</p>
            <p className="text-sm text-gray-500 mt-1">Supports: MP3, WAV, AAC, etc.</p>
          </div>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="language" className="block text-sm font-medium text-gray-700 mb-1">
              Language (optional)
            </label>
            <input
              type="text"
              id="language"
              placeholder="e.g. en, es, fr"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            />
          </div>
          <div>
            <label htmlFor="modelSize" className="block text-sm font-medium text-gray-700 mb-1">
              Model Size
            </label>
            <select
              id="modelSize"
              value={modelSize}
              onChange={(e) => setModelSize(e.target.value as ModelSize)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            >
              <option value="tiny">Tiny (fastest, lowest quality)</option>
              <option value="base">Base (recommended)</option>
              <option value="small">Small</option>
              <option value="medium">Medium</option>
              <option value="large">Large (slowest, highest quality)</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
          disabled={!file || isLoading}
          className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 ${(!file || isLoading) ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isLoading ? (
            <>
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </>
          ) : (
            'Transcribe Audio'
          )}
        </button>
      </form>
    </div>
  );
};

export default AudioUpload;