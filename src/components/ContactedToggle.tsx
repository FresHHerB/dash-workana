import React from 'react';
import { MessageCircle, MessageCircleOff, Users } from 'lucide-react';

export type FilterState = 'not-contacted' | 'all' | 'contacted';

interface ContactedToggleProps {
  filterState: FilterState;
  onFilterChange: (state: FilterState) => void;
}

export const ContactedToggle: React.FC<ContactedToggleProps> = ({ 
  filterState, 
  onFilterChange 
}) => {
  const handleFilterChange = (state: FilterState) => {
    onFilterChange(state);
  };

  return (
    <div className="flex items-center bg-[#1A1A1A] rounded-xl p-1 border border-gray-800/30 shadow-[0_2px_8px_rgba(0,0,0,0.2)]">
      <div 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
          filterState === 'not-contacted' 
            ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-[0_0_8px_rgba(139,92,246,0.3)]' 
            : 'text-[#A1A1AA] hover:text-white hover:bg-[#2A2A2A]'
        }`}
        onClick={() => handleFilterChange('not-contacted')}
      >
        <MessageCircleOff className="w-4 h-4" />
        <span className="text-sm font-medium">Não contactados</span>
      </div>
      
      <div 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
          filterState === 'all' 
            ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-[0_0_8px_rgba(139,92,246,0.3)]' 
            : 'text-[#A1A1AA] hover:text-white hover:bg-[#2A2A2A]'
        }`}
        onClick={() => handleFilterChange('all')}
      >
        <Users className="w-4 h-4" />
        <span className="text-sm font-medium">Todos</span>
      </div>
      
      <div 
        className={`flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 cursor-pointer ${
          filterState === 'contacted' 
            ? 'bg-gradient-to-r from-[#8B5CF6] to-[#7C3AED] text-white shadow-[0_0_8px_rgba(139,92,246,0.3)]' 
            : 'text-[#A1A1AA] hover:text-white hover:bg-[#2A2A2A]'
        }`}
        onClick={() => handleFilterChange('contacted')}
      >
        <MessageCircle className="w-4 h-4" />
        <span className="text-sm font-medium">Contactados</span>
      </div>
    </div>
  );
};