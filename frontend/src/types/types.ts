export interface Transcription {
  id: string;
  filename: string;
  transcription: string;
  language: string;
  segments: {
    id: number;
    start: number;
    end: number;
    text: string;
  }[];
  model_size: string;
}

export interface HistoryItem {
  id: string;
  filename: string;
  timestamp: string;
  language: string;
  text: string;
  model_size: string;
}

export type ModelSize = 'tiny' | 'base' | 'small' | 'medium' | 'large';