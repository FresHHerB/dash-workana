import React from 'react';
import { ExternalLink, Users, DollarSign, Clock, MessageCircle } from 'lucide-react';
import type { ProjetoFreela } from '../types';
import { formatBudget, truncateText } from '../utils/dateUtils';

interface ProjectCardProps {
  projeto: ProjetoFreela;
  onViewDetails: (projeto: ProjetoFreela) => void;
  isVisible: boolean;
  index?: number;
  onToggleContactado?: (projeto: ProjetoFreela) => void;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ 
  projeto, 
  onViewDetails, 
  isVisible, 
  index = 0, 
  onToggleContactado 
}) => {
  const openExternalLink = (e: React.MouseEvent) => {
    e.stopPropagation();
    window.open(projeto.link, '_blank');
  };

  const getTemperatureColor = (temperatura: number): string => {
    if (temperatura <= 25) return '#3B82F6'; // Blue
    if (temperatura <= 45) return '#06B6D4'; // Cyan
    if (temperatura <= 60) return '#EAB308'; // Yellow
    if (temperatura <= 75) return '#F97316'; // Orange
    if (temperatura <= 85) return '#EF4444'; // Red
    return '#A855F7'; // Purple
  };

  const getTemperatureLabel = (temperatura: number): string => {
    if (temperatura <= 25) return '❄️ Frio';
    if (temperatura <= 45) return '🌡️ Morno baixo';
    if (temperatura <= 60) return '🔥 Morno';
    if (temperatura <= 75) return '🔥🔥 Entre morno e quente';
    if (temperatura <= 85) return '🔥🔥🔥 Quente';
    return '🚀 On fire';
  };

  const isOnFire = (projeto.temperatura || 0) >= 86;

  return (
    <div 
      className={`bg-[#262626] rounded-xl p-4 flex flex-col gap-2 cursor-pointer 
                  transition-all duration-500 hover:shadow-lg hover:-translate-y-1 border border-gray-700/20
                  ${isOnFire ? 'shadow-[0_0_0_1px_#A855F7,0_4px_16px_rgba(0,0,0,0.4)] border-purple-400/50' : 'shadow-[0_4px_16px_rgba(0,0,0,0.4)]'}
                  hover:shadow-[0_8px_24px_rgba(0,0,0,0.5)] hover:border-gray-600/40 hover:bg-[#2A2A2A]
                  backdrop-blur-sm relative overflow-hidden`}
      onClick={() => onViewDetails(projeto)}
      style={{
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
        transitionDelay: `${index * 50}ms`
      }}
    >
      {/* Gradiente sutil de fundo */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.02] to-transparent pointer-events-none rounded-xl"></div>
      
      <div className="relative z-10 flex flex-col gap-2">
        {/* Header com temperatura e ações */}
        <div className="flex justify-between items-start mb-2">
          <div 
            className="flex items-center gap-2 px-2 py-1 rounded-lg"
            style={{ backgroundColor: `${getTemperatureColor(projeto.temperatura || 0)}15` }}
          >
            <div 
              className="text-lg font-bold"
              style={{ color: getTemperatureColor(projeto.temperatura || 0) }}
            >
              {projeto.temperatura}°
            </div>
            <div 
              className="text-xs font-medium"
              style={{ color: getTemperatureColor(projeto.temperatura || 0) }}
            >
              {getTemperatureLabel(projeto.temperatura || 0).replace(/[🔥❄️🌡️🚀]/g, '').trim()}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Status de contato */}
            {projeto.contactado && (
              <div className="px-2 py-1 rounded-md bg-cyan-500/10 border border-cyan-400/20">
                <span className="text-xs font-medium text-cyan-300 drop-shadow-[0_0_4px_rgba(34,211,238,0.4)]">
                  Em Contato
                </span>
              </div>
            )}
            
            {/* Link externo */}
            <button
              onClick={openExternalLink}
              className="p-1.5 rounded-lg text-[#9CA3AF] hover:text-[#8B5CF6] hover:bg-[#8B5CF6]/10 transition-all duration-200"
              title="Abrir projeto externamente"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Título */}
        <h3 className="text-white font-bold text-base leading-tight mb-1">
          {truncateText(projeto.nome_projeto, 80)}
        </h3>
        
        {/* Descrição */}
        <p className="text-[#A1A1AA] text-sm leading-relaxed mb-4">
          {truncateText(projeto.descricao, 120)}
        </p>

        {/* Métricas */}
        <div className="flex items-end justify-between pt-3 border-t border-gray-700/30">
          <div className="flex items-end gap-4">
            {/* Propostas */}
            <div className="flex items-end gap-2">
              <Users className="w-4 h-4 text-[#3B82F6]" />
              <span className="text-[22px] font-bold text-white leading-none">{projeto.num_propostas}</span>
            </div>
            
            {/* Budget */}
            <div className="flex items-end gap-2">
              <DollarSign className="w-4 h-4 text-[#22C55E]" />
              <span className="text-sm font-semibold text-[#22C55E] leading-none">
                {formatBudget(projeto.budget)}
              </span>
            </div>
            
            {/* Tempo */}
            <div className="flex items-end gap-2">
              <Clock className="w-4 h-4 text-[#F97316]" />
              <span className="text-xs font-medium text-[#A1A1AA] leading-none">{projeto.published_at}</span>
            </div>
            
            {/* Indicador de status */}
            <div className="flex items-end gap-1">
              <div className={`w-2 h-2 rounded-full ${projeto.contactado ? 'bg-green-400' : 'bg-gray-500'}`} />
            </div>
          </div>
          
          {/* Ver detalhes */}
          <button className="text-[13px] font-medium text-[#8B5CF6] hover:text-[#7C3AED] transition-colors duration-200 leading-none">
            Ver detalhes
          </button>
        </div>
      </div>
    </div>
  );
};