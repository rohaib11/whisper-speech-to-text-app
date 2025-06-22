import React, { useEffect } from 'react';
import AudioUpload from './components/AudioUpload';
import TranscriptionResult from './components/TranscriptionResult';
import HistoryList from './components/HistoryList';
import { useTranscription } from './hooks/useTranscription';

const App: React.FC = () => {
  const {
    transcription,
    history,
    isLoading,
    error,
    transcribeAudio,
    fetchHistory
  } = useTranscription();

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-gray-900">
            <span className="text-primary-600">Speech</span> to <span className="text-secondary-600">Text</span> AI
          </h1>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <AudioUpload 
              onUpload={transcribeAudio} 
              isLoading={isLoading} 
            />
            <TranscriptionResult 
              transcription={transcription} 
              isLoading={isLoading} 
              error={error} 
            />
          </div>
          <div className="lg:col-span-1">
            <HistoryList 
              items={history} 
              onSelect={(id) => {
                const selected = history.find(item => item.id === id);
                if (selected) {
                  // In a real app, we would fetch the full transcription from the API
                  // For now, we'll just display the text we have
                  transcribeAudio(new File([], selected.filename || 'audio'), selected.language, selected.model_size as any);
                }
              }} 
            />
          </div>
        </div>
      </main>

      <footer className="bg-white border-t border-gray-200 mt-8">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Powered by OpenAI Whisper • {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;