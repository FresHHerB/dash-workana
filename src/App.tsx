import React, { useState } from 'react';
import { BarChart3, RefreshCw } from 'lucide-react';
import type { ProjetoFreela } from './types';
import { useProjetos } from './hooks/useProjetos';
import { ProjectGrid } from './components/ProjectGrid';
import { ProjectModal } from './components/ProjectModal';
import { ContactedToggle, type FilterState } from './components/ContactedToggle';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';

function App() {
  const { 
    projetosPorTemperatura, 
    projetosPorPropostas, 
    projetosPorRecencia,
    loading, 
    error,
    updating,
    updateData
  } = useProjetos();
  
  const [selectedProject, setSelectedProject] = useState<ProjetoFreela | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filterState, setFilterState] = useState<FilterState>('all');

  const handleViewDetails = (projeto: ProjetoFreela) => {
    setSelectedProject(projeto);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  const handleToggleContactado = (projeto: ProjetoFreela) => {
    console.log(`Toggling contactado status for project: ${projeto.nome_projeto}`, !projeto.contactado);
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="min-h-screen bg-[#111111] text-white font-sans">
      {/* Header */}
      <header className="bg-[#1E1E1E] border-b border-gray-800/50 px-6 py-4 shadow-[0_2px_6px_rgba(0,0,0,0.25)]">
        <div className="max-w-full mx-auto">
          <div className="flex items-center gap-3">
            {/* Logo e título */}
            <div className="p-2 bg-[#8B5CF6] rounded-lg shadow-md">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">
                Dashboard Freelancer
              </h1>
              <p className="text-[#A1A1AA] text-sm font-medium">
                Análise comparativa de propostas por temperatura, competição e recência
              </p>
            </div>

            {/* Controles */}
            <div className="ml-auto flex items-center gap-4">
              <button
                onClick={updateData}
                disabled={updating}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                  updating 
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed' 
                    : 'bg-[#8B5CF6] hover:bg-[#7C3AED] text-white shadow-[0_0_8px_rgba(139,92,246,0.3)] hover:shadow-[0_0_12px_rgba(139,92,246,0.4)]'
                }`}
              >
                <RefreshCw className={`w-4 h-4 ${updating ? 'animate-spin' : ''}`} />
                {updating ? 'Atualizando...' : 'Atualizar Dados'}
              </button>
              
              <ContactedToggle 
                filterState={filterState} 
                onFilterChange={setFilterState} 
              />
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Grid */}
      <main className="p-4 pt-6">
        <div className="max-w-full mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-140px)]">
            {/* Coluna 1: Por Temperatura */}
            <ProjectGrid
              title="🔥 Mais Quentes"
              subtitle={`Por temperatura decrescente • ${projetosPorTemperatura.length} projetos`}
              projetos={projetosPorTemperatura}
              onViewDetails={handleViewDetails}
              bgColor="bg-gradient-to-b from-red-900/20 to-gray-800"
              filterState={filterState}
            />

            {/* Coluna 2: Por Número de Propostas */}
            <ProjectGrid
              title="🎯 Menor Competição"
              subtitle={`Por propostas crescente • ${projetosPorPropostas.length} projetos`}
              projetos={projetosPorPropostas}
              onViewDetails={handleViewDetails}
              bgColor="bg-gradient-to-b from-blue-900/20 to-gray-800"
              filterState={filterState}
            />

            {/* Coluna 3: Por Recência */}
            <ProjectGrid
              title="⏰ Mais Recentes"
              subtitle={`Por data decrescente • ${projetosPorRecencia.length} projetos`}
              projetos={projetosPorRecencia}
              onViewDetails={handleViewDetails}
              bgColor="bg-gradient-to-b from-green-900/20 to-gray-800"
              filterState={filterState}
            />
          </div>
        </div>
      </main>

      {/* Modal */}
      {selectedProject && (
        <ProjectModal
          projeto={selectedProject}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
      )}
    </div>
  );
}

export default App;