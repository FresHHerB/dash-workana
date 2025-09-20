import React from 'react';
import type { ProjetoFreela } from '../types';
import { ProjectCard } from './ProjectCard';
import type { FilterState } from './ContactedToggle';

interface ProjectGridProps {
  title: string;
  subtitle: string;
  projetos: ProjetoFreela[];
  onViewDetails: (projeto: ProjetoFreela) => void;
  onToggleContactado?: (projeto: ProjetoFreela) => void;
  bgColor: string;
  filterState: FilterState;
}

export const ProjectGrid: React.FC<ProjectGridProps> = ({ 
  title, 
  subtitle, 
  projetos, 
  onViewDetails,
  onToggleContactado,
  bgColor,
  filterState
}) => {
  const filteredProjetos = projetos.filter(projeto => {
    switch (filterState) {
      case 'contacted': return projeto.contactado;
      case 'not-contacted': return !projeto.contactado;
      case 'all': return true;
    }
  });

  return (
    <div className="flex-1 min-h-0">
      <div className={`bg-[#1A1A1A] rounded-xl p-4 h-full shadow-[0_2px_12px_rgba(0,0,0,0.3)] border border-gray-800/30 
                      backdrop-blur-sm relative overflow-hidden`}>
        {/* Gradiente sutil de fundo */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.01] via-transparent to-black/[0.02] pointer-events-none rounded-xl"></div>
        
        <div className="relative z-10">
          {/* Header da coluna */}
          <div className="mb-4">
            <h2 className="text-lg font-bold text-white mb-1">{title}</h2>
            <div className="flex items-center justify-between">
              <p className="text-[#A1A1AA] text-xs font-medium tracking-wide">
                {subtitle.replace(/\d+ projetos/, `${filteredProjetos.length} projetos`)}
              </p>
              {title.includes('Quentes') && (
                <div className="flex items-center gap-3 text-xs">
                  <span className="px-2 py-1 rounded-lg bg-[#3B82F6]/15 text-[#3B82F6] text-[10px] font-medium">0-25</span>
                  <span className="px-2 py-1 rounded-lg bg-[#06B6D4]/15 text-[#06B6D4] text-[10px] font-medium">26-45</span>
                  <span className="px-2 py-1 rounded-lg bg-[#EAB308]/15 text-[#EAB308] text-[10px] font-medium">46-60</span>
                  <span className="px-2 py-1 rounded-lg bg-[#F97316]/15 text-[#F97316] text-[10px] font-medium">61-75</span>
                  <span className="px-2 py-1 rounded-lg bg-[#EF4444]/15 text-[#EF4444] text-[10px] font-medium">76-85</span>
                  <span className="px-2 py-1 rounded-lg bg-[#A855F7]/15 text-[#A855F7] text-[10px] font-medium">86-100</span>
                </div>
              )}
            </div>
          </div>

          {/* Lista de projetos */}
          <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-200px)] pr-2 scrollbar-thin scrollbar-track-[#111111] scrollbar-thumb-[#333333] hover:scrollbar-thumb-[#444444]">
            {filteredProjetos.map((projeto, index) => (
              <ProjectCard
                key={projeto.id}
                projeto={projeto}
                onViewDetails={onViewDetails}
                isVisible={true}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};