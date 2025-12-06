export interface Sentence {
  id: string;
  correctText: string; // The fully correct version (e.g., "I went to London.")
  difficulty: 'easy' | 'medium' | 'hard' | 'extreme';
}

export type GameMode = 'menu' | 'learn' | 'play';

export interface ScoreState {
  current: number;
  total: number;
  streak: number;
  highScore: number;
}

export interface LearnSection {
  id: string;
  title: string;
  icon: string;
  content: string;
  examples: { correct: string; incorrect: string; explanation: string }[];
}