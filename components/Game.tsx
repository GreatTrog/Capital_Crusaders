import React, { useState, useEffect, useCallback } from 'react';
import { SENTENCES } from '../constants';
import { Button } from './Button';
import { Sentence, ScoreState } from '../types';
import { Check, ArrowRight, Trophy, Star, XCircle, AlertCircle, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';

interface GameProps {
  onBack: () => void;
}

const DIFFICULTY_LEVELS: Sentence['difficulty'][] = ['easy', 'medium', 'hard', 'extreme'];

export const Game: React.FC<GameProps> = ({ onBack }) => {
  const [currentSentence, setCurrentSentence] = useState<Sentence | null>(null);
  const [clickedIndices, setClickedIndices] = useState<Set<number>>(new Set());
  const [gameState, setGameState] = useState<'playing' | 'checked'>('playing');
  const [score, setScore] = useState<ScoreState>({ current: 0, total: 0, streak: 0, highScore: 0 });
  const [feedbackMessage, setFeedbackMessage] = useState<string>("");
  const [analysis, setAnalysis] = useState<{ missed: string[], extra: string[] }>({ missed: [], extra: [] });
  
  // Difficulty State
  const [difficultyIndex, setDifficultyIndex] = useState<number>(0);
  const [usedSentenceIds, setUsedSentenceIds] = useState<Set<string>>(new Set());

  const loadNewSentence = useCallback(() => {
    const currentDifficulty = DIFFICULTY_LEVELS[difficultyIndex];
    
    // Filter sentences by difficulty and ensure they haven't been used
    let availableSentences = SENTENCES.filter(s => 
      s.difficulty === currentDifficulty && !usedSentenceIds.has(s.id)
    );

    // If we ran out of sentences for this difficulty, reset used IDs for this level only
    if (availableSentences.length === 0) {
      // Find all IDs that belong to other difficulties to keep them marked as used
      const otherLevelIds = Array.from(usedSentenceIds).filter(id => {
        const s = SENTENCES.find(sent => sent.id === id);
        return s && s.difficulty !== currentDifficulty;
      });
      
      setUsedSentenceIds(new Set(otherLevelIds));
      availableSentences = SENTENCES.filter(s => s.difficulty === currentDifficulty);
    }

    if (availableSentences.length === 0) {
      // Should technically not happen unless CONSTANTS is empty
      return; 
    }

    const random = availableSentences[Math.floor(Math.random() * availableSentences.length)];
    setCurrentSentence(random);
    setUsedSentenceIds(prev => new Set(prev).add(random.id));
    setClickedIndices(new Set());
    setGameState('playing');
    setFeedbackMessage("");
    setAnalysis({ missed: [], extra: [] });
  }, [difficultyIndex, usedSentenceIds]);

  // Initial load
  useEffect(() => {
    if (!currentSentence) {
      loadNewSentence();
    }
  }, [loadNewSentence, currentSentence]);

  // Load High Score
  useEffect(() => {
    const saved = localStorage.getItem('capitalCrusadersScore');
    if (saved) {
      setScore(prev => ({ ...prev, highScore: parseInt(saved, 10) }));
    }
  }, []);

  if (!currentSentence) return <div>Loading...</div>;

  // Split the CORRECT sentence to determine which indices SHOULD be capital
  const correctWords = currentSentence.correctText.split(' ');
  // Create a lowercase version for display
  const displayWords = currentSentence.correctText.toLowerCase().split(' ');

  const capitalIndices = new Set<number>();
  correctWords.forEach((word, index) => {
    // FIX: Remove leading non-alphabetic characters (like quotes) before checking for capitalization
    const cleanWord = word.replace(/^[^a-zA-Z]+/, '');
    if (cleanWord.length > 0 && /^[A-Z]/.test(cleanWord)) {
      capitalIndices.add(index);
    }
  });

  const handleWordClick = (index: number) => {
    if (gameState === 'checked') return;

    const newSet = new Set(clickedIndices);
    if (newSet.has(index)) {
      newSet.delete(index);
    } else {
      newSet.add(index);
    }
    setClickedIndices(newSet);
  };

  const checkAnswer = () => {
    let isCorrect = true;
    const missedArr: string[] = [];
    const extraArr: string[] = [];
    
    // Check missing capitals
    for (const idx of capitalIndices) {
      if (!clickedIndices.has(idx)) {
        isCorrect = false;
        missedArr.push(correctWords[idx]);
      }
    }

    // Check extra clicks
    for (const idx of clickedIndices) {
      if (!capitalIndices.has(idx)) {
        isCorrect = false;
        extraArr.push(displayWords[idx]);
      }
    }

    setAnalysis({ missed: missedArr, extra: extraArr });
    setGameState('checked');

    if (isCorrect) {
      const newStreak = score.streak + 1;
      const newScore = score.current + 1;
      const newHighScore = Math.max(newScore, score.highScore);
      
      // Dynamic Difficulty Logic
      let nextDiffIndex = difficultyIndex;
      let msg = "Brilliant work! 🎉";

      if (newStreak % 3 === 0 && difficultyIndex < DIFFICULTY_LEVELS.length - 1) {
        nextDiffIndex = difficultyIndex + 1;
        msg = "Awesome! Level Up! 🚀";
        confetti({ particleCount: 150, spread: 80, origin: { y: 0.6 } });
      } else {
        setFeedbackMessage("Brilliant work! You found them all! 🎉");
        confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
      }

      setFeedbackMessage(msg);
      setDifficultyIndex(nextDiffIndex);
      
      setScore({
        ...score,
        current: newScore,
        total: score.total + 1,
        streak: newStreak,
        highScore: newHighScore
      });
      localStorage.setItem('capitalCrusadersScore', newHighScore.toString());
    } else {
      setFeedbackMessage("Not quite. Look at the corrections below. 👀");
      
      // Decrease difficulty if wrong and not at lowest level
      if (difficultyIndex > 0) {
        setDifficultyIndex(prev => prev - 1);
      }

      setScore({
        ...score,
        total: score.total + 1,
        streak: 0
      });
    }
  };

  const getWordStyle = (index: number) => {
    const isSelected = clickedIndices.has(index);
    const shouldBeCapital = capitalIndices.has(index);
    const baseStyle = "px-3 py-2 text-xl md:text-3xl font-medium rounded-lg m-1 transition-all border-2 cursor-pointer select-none inline-block";

    if (gameState === 'playing') {
      return isSelected 
        ? `${baseStyle} bg-brand text-white border-brand transform -translate-y-1 shadow-lg` 
        : `${baseStyle} bg-white text-slate-700 border-slate-200 hover:border-brand-light hover:-translate-y-0.5`;
    }

    // Checked State
    if (shouldBeCapital && isSelected) {
      return `${baseStyle} bg-accent-green text-white border-green-600 animate-bounce-short`;
    } else if (shouldBeCapital && !isSelected) {
      return `${baseStyle} bg-accent-yellow text-slate-800 border-yellow-500 border-dashed`; // Missed
    } else if (!shouldBeCapital && isSelected) {
      return `${baseStyle} bg-accent-red text-white border-red-600 animate-shake`; // Wrongly selected
    } else {
      return `${baseStyle} bg-slate-100 text-slate-400 border-transparent opacity-50`;
    }
  };

  // Helper for difficulty color
  const getDifficultyColor = (diff: string) => {
    switch(diff) {
      case 'easy': return 'text-accent-green';
      case 'medium': return 'text-accent-blue';
      case 'hard': return 'text-accent-yellow';
      case 'extreme': return 'text-accent-red';
      default: return 'text-slate-400';
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      {/* Header Bar */}
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl shadow-sm border border-slate-100">
        <Button onClick={onBack} variant="secondary" size="sm" className="!rounded-lg">
          Exit
        </Button>
        <div className="flex gap-4 md:gap-8">
           <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Level</span>
            <span className={`text-xl font-display font-bold capitalize flex items-center gap-1 ${getDifficultyColor(DIFFICULTY_LEVELS[difficultyIndex])}`}>
              {DIFFICULTY_LEVELS[difficultyIndex]}
              {DIFFICULTY_LEVELS[difficultyIndex] === 'extreme' && <Zap size={16} fill="currentColor" />}
            </span>
           </div>
           <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Score</span>
            <span className="text-xl font-display font-bold text-brand">{score.current}</span>
           </div>
           <div className="flex flex-col items-center">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Streak</span>
            <div className="flex items-center gap-1 text-accent-yellow">
              <Star size={18} fill={score.streak > 2 ? "currentColor" : "none"} />
              <span className="text-xl font-display font-bold text-slate-700">{score.streak}</span>
            </div>
           </div>
        </div>
      </div>

      {/* Game Board */}
      <div className="bg-white rounded-3xl shadow-xl p-6 md:p-12 mb-8 relative overflow-hidden">
        <div className={`absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-brand-light via-brand to-brand-dark transition-all duration-500 ${gameState === 'checked' ? 'opacity-50' : 'opacity-100'}`}></div>
        
        <h2 className="text-center text-slate-500 mb-8 font-medium">
          Tap the words that need a <span className="font-bold text-brand">Capital Letter</span>!
        </h2>

        <div className="flex flex-wrap justify-center gap-2 mb-12 min-h-[120px] items-center">
          {displayWords.map((word, index) => (
            <span 
              key={index}
              onClick={() => handleWordClick(index)}
              className={getWordStyle(index)}
            >
              {/* If checked and correct/missed, show correct capitalization, otherwise show as is */}
              {gameState === 'checked' && capitalIndices.has(index) ? correctWords[index] : word}
            </span>
          ))}
        </div>

        {/* Feedback Area */}
        <div className={`text-center mb-8 min-h-[2rem] transition-opacity duration-300 ${gameState === 'checked' ? 'opacity-100' : 'opacity-0'}`}>
          <p className={`text-xl font-display font-bold mb-4 ${feedbackMessage.includes('Not quite') ? 'text-accent-red' : 'text-accent-green'}`}>
            {feedbackMessage}
          </p>
          
          {gameState === 'checked' && (analysis.missed.length > 0 || analysis.extra.length > 0) && (
            <div className="bg-red-50 border-2 border-red-100 rounded-xl p-4 md:p-6 text-left max-w-2xl mx-auto animate-pop shadow-sm">
              <h4 className="font-bold text-slate-500 mb-3 uppercase text-xs tracking-wider">Correct Sentence</h4>
              <p className="text-xl md:text-2xl font-display font-bold text-slate-800 mb-6 bg-white p-4 rounded-xl border border-slate-100 shadow-sm inline-block">
                {currentSentence.correctText}
              </p>
              
              <div className="space-y-3">
                 {analysis.missed.length > 0 && (
                   <div className="flex items-start gap-3 text-red-600 bg-white p-3 rounded-lg border border-red-100">
                     <div className="bg-red-100 p-1.5 rounded-full mt-0.5"><XCircle size={16} /></div>
                     <div>
                       <span className="font-bold block text-xs text-red-400 uppercase tracking-wide">You missed</span>
                       <span className="text-lg font-medium">{analysis.missed.join(", ")}</span>
                     </div>
                   </div>
                 )}
                 
                 {analysis.extra.length > 0 && (
                   <div className="flex items-start gap-3 text-orange-600 bg-white p-3 rounded-lg border border-orange-100">
                     <div className="bg-orange-100 p-1.5 rounded-full mt-0.5"><AlertCircle size={16} /></div>
                     <div>
                       <span className="font-bold block text-xs text-orange-400 uppercase tracking-wide">No need to capitalise</span>
                       <span className="text-lg font-medium">{analysis.extra.join(", ")}</span>
                     </div>
                   </div>
                 )}
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="flex justify-center gap-4">
          {gameState === 'playing' ? (
            <Button onClick={checkAnswer} size="lg" className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2">
              Check Answer <Check size={24} />
            </Button>
          ) : (
            <Button onClick={loadNewSentence} variant="success" size="lg" className="w-full md:w-auto min-w-[200px] flex items-center justify-center gap-2 animate-pop">
              Next Sentence <ArrowRight size={24} />
            </Button>
          )}
        </div>
      </div>
      
      <div className="text-center text-slate-400 text-sm">
         Current Best: {score.highScore} <Trophy size={14} className="inline mb-1 ml-1" />
      </div>
    </div>
  );
};