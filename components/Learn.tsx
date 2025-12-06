import React, { useState } from 'react';
import { LEARN_SECTIONS } from '../constants';
import { Button } from './Button';
import { Flag, User, MapPin, ChevronDown, CheckCircle, XCircle, AlertTriangle, MessageSquare } from 'lucide-react';

interface LearnProps {
  onBack: () => void;
}

export const Learn: React.FC<LearnProps> = ({ onBack }) => {
  const [activeSection, setActiveSection] = useState<string | null>('start');

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Flag': return <Flag className="w-6 h-6" />;
      case 'User': return <User className="w-6 h-6" />;
      case 'MapPin': return <MapPin className="w-6 h-6" />;
      case 'AlertTriangle': return <AlertTriangle className="w-6 h-6" />;
      case 'MessageSquare': return <MessageSquare className="w-6 h-6" />;
      default: return <Flag className="w-6 h-6" />;
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl md:text-4xl font-display font-bold text-brand-dark">Rules of the Road</h1>
        <Button onClick={onBack} variant="outline" size="sm">Back</Button>
      </div>
      
      <p className="text-slate-600 mb-8 text-lg">Click a card below to learn when to use capital letters!</p>

      <div className="space-y-4">
        {LEARN_SECTIONS.map((section) => (
          <div 
            key={section.id} 
            className={`bg-white rounded-2xl shadow-sm border-2 overflow-hidden transition-all duration-300 ${activeSection === section.id ? 'border-brand ring-4 ring-brand/10' : 'border-slate-100 hover:border-brand-light'}`}
          >
            <button 
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className="w-full flex items-center justify-between p-6 text-left"
            >
              <div className="flex items-center gap-4">
                <div className={`p-3 rounded-full ${activeSection === section.id ? 'bg-brand text-white' : 'bg-slate-100 text-slate-500'}`}>
                  {getIcon(section.icon)}
                </div>
                <h3 className="text-xl md:text-2xl font-bold text-slate-800">{section.title}</h3>
              </div>
              <ChevronDown className={`w-6 h-6 text-slate-400 transition-transform duration-300 ${activeSection === section.id ? 'rotate-180' : ''}`} />
            </button>

            <div className={`transition-all duration-300 ease-in-out overflow-hidden ${activeSection === section.id ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 border-t border-slate-50">
                <p className="text-lg text-slate-600 leading-relaxed my-4">{section.content}</p>
                
                <div className="bg-slate-50 rounded-xl p-4 md:p-6 space-y-4">
                  <h4 className="font-bold text-slate-400 uppercase tracking-wider text-sm">Examples</h4>
                  {section.examples.map((ex, idx) => (
                    <div key={idx} className="flex flex-col md:flex-row gap-4 items-start md:items-center bg-white p-4 rounded-lg shadow-sm">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-2 text-accent-red line-through decoration-2 opacity-60">
                          <XCircle size={16} />
                          <span className="font-mono text-lg">{ex.incorrect}</span>
                        </div>
                        <div className="flex items-center gap-2 text-accent-green font-bold">
                          <CheckCircle size={20} />
                          <span className="font-mono text-xl">{ex.correct}</span>
                        </div>
                      </div>
                      <div className="md:w-1/3 text-sm text-slate-500 italic bg-brand-light/10 p-2 rounded border border-brand-light/20">
                        💡 {ex.explanation}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};