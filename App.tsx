import React, { useState } from 'react';
import { Game } from './components/Game';
import { Learn } from './components/Learn';
import { Button } from './components/Button';
import { GameMode } from './types';
import { Play, BookOpen, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  const [mode, setMode] = useState<GameMode>('menu');

  const renderContent = () => {
    switch (mode) {
      case 'play':
        return <Game onBack={() => setMode('menu')} />;
      case 'learn':
        return <Learn onBack={() => setMode('menu')} />;
      case 'menu':
      default:
        return (
          <div className="min-h-screen flex flex-col items-center justify-center p-4 text-center bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
            
            <div className="bg-white/90 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border-4 border-white max-w-lg w-full animate-pop">
              <div className="flex justify-center mb-6">
                <div className="bg-brand p-4 rounded-2xl rotate-3 shadow-lg">
                  <Sparkles className="w-12 h-12 text-accent-yellow" />
                </div>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-display font-bold text-brand-dark mb-2">
                Capital<br/><span className="text-brand">Crusaders</span>
              </h1>
              <p className="text-lg text-slate-600 mb-10">
                Master your capital letters with this fun British grammar game!
              </p>

              <div className="flex flex-col gap-4">
                <Button 
                  onClick={() => setMode('play')} 
                  size="lg" 
                  className="w-full flex items-center justify-center gap-3 shadow-brand/30 shadow-xl"
                >
                  <Play fill="currentColor" /> Play Game
                </Button>
                
                <Button 
                  onClick={() => setMode('learn')} 
                  variant="secondary" 
                  size="lg"
                  className="w-full flex items-center justify-center gap-3"
                >
                  <BookOpen /> Learn Rules
                </Button>
              </div>
            </div>
            
            <footer className="mt-8 text-slate-500 text-sm font-medium">
              KS1/KS2 Grammar Practice • Made for Pupils
            </footer>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {renderContent()}
    </div>
  );
};

export default App;