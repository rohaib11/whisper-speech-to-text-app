import { useState } from 'react';
import axios from 'axios';
import type { Transcription, HistoryItem, ModelSize } from '../types/types';

const API_URL = 'http://localhost:8000';

export const useTranscription = () => {
  const [transcription, setTranscription] = useState<Transcription | null>(null);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const transcribeAudio = async (file: File, language?: string, modelSize: ModelSize = 'base') => {
    setIsLoading(true);
    setError(null);
    
    try {
      const formData = new FormData();
      formData.append('file', file);
      
      const response = await axios.post(`${API_URL}/transcribe/`, formData, {
        params: { language, model_size: modelSize },
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      
      setTranscription(response.data);
      fetchHistory();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to transcribe audio');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const response = await axios.get(`${API_URL}/history/`);
      setHistory(response.data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    }
  };

  return {
    transcription,
    history,
    isLoading,
    error,
    transcribeAudio,
    fetchHistory
  };
};