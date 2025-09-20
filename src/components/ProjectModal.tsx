import React from 'react';
import { X, ExternalLink, Thermometer, Users, DollarSign, MapPin, Clock, MessageCircle, MessageCircleOff } from 'lucide-react';
import type { ProjetoFreela } from '../types';
import { formatBudget } from '../utils/dateUtils';

interface ProjectModalProps {
  projeto: ProjetoFreela;
  isOpen: boolean;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ projeto, isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const openExternalLink = () => {
    window.open(projeto.link, '_blank');
  };

  const getTemperatureGradient = (temperatura: number): string => {
    if (temperatura <= 25) return 'from-blue-600 to-blue-800';
    if (temperatura <= 45) return 'from-cyan-600 to-cyan-800';
    if (temperatura <= 60) return 'from-yellow-600 to-yellow-800';
    if (temperatura <= 75) return 'from-orange-600 to-orange-800';
    if (temperatura <= 85) return 'from-red-600 to-red-800';
    return 'from-purple-500 to-purple-700';
  };

  const getTemperatureLabel = (temperatura: number): string => {
    if (temperatura <= 25) return '❄️ Frio';
    if (temperatura <= 45) return '🌡️ Morno baixo';
    if (temperatura <= 60) return '🔥 Morno';
    if (temperatura <= 75) return '🔥🔥 Entre morno e quente';
    if (temperatura <= 85) return '🔥🔥🔥 Quente';
    return '🚀 On fire';
  };

  const getTemperatureDescription = (temperatura: number): string => {
    if (temperatura <= 25) return 'Baixa viabilidade';
    if (temperatura <= 45) return 'Viabilidade limitada';
    if (temperatura <= 60) return 'Viabilidade moderada';
    if (temperatura <= 75) return 'Boa viabilidade';
    if (temperatura <= 85) return 'Alta viabilidade';
    return 'Excelente viabilidade';
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-gray-900 rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700">
        <div className="p-6">
          {/* Header */}
          <div className="flex justify-between items-start mb-6">
            <div className="flex-1 mr-4">
              <h2 className="text-2xl font-bold text-white mb-2">
                {projeto.nome_projeto}
              </h2>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {projeto.published_at}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  {projeto.pais}
                </div>
                <div className="flex items-center gap-1">
                  {projeto.contactado ? (
                    <>
                      <MessageCircle className="w-4 h-4 text-green-400" />
                      <span className="text-green-400">Contactado</span>
                    </>
                  ) : (
                    <>
                      <MessageCircleOff className="w-4 h-4 text-gray-500" />
                      <span className="text-gray-500">Não contactado</span>
                    </>
                  )}
                </div>
                <button
                  onClick={openExternalLink}
                  className="flex items-center gap-1 text-blue-400 hover:text-blue-300 transition-colors"
                >
                  <ExternalLink className="w-4 h-4" />
                  Ver projeto
                </button>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-blue-400" />
                <span className="text-sm text-gray-400">Propostas</span>
              </div>
              <div className="text-2xl font-bold text-white">{projeto.num_propostas}</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                <span className="text-sm text-gray-400">Orçamento</span>
              </div>
              <div className="text-xl font-bold text-white">{formatBudget(projeto.budget)}</div>
            </div>
            
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <div className="flex items-center gap-2 mb-2">
                <Thermometer className="w-5 h-5 text-orange-400" />
                <span className="text-sm text-gray-400">Temperatura</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="text-2xl font-bold text-white">{projeto.temperatura}</div>
                <div className="flex flex-col">
                  <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getTemperatureGradient(projeto.temperatura || 0)} text-white`}>
                    {getTemperatureLabel(projeto.temperatura || 0)}
                  </span>
                  <span className="text-xs text-gray-400 mt-1">
                    {getTemperatureDescription(projeto.temperatura || 0)}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Descrição */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-white mb-3">Descrição</h3>
            <p className="text-gray-300 leading-relaxed whitespace-pre-wrap">
              {projeto.descricao}
            </p>
          </div>

          {/* Skills */}
          {projeto.skills && projeto.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-white mb-3">Habilidades Requeridas</h3>
              <div className="flex flex-wrap gap-2">
                {projeto.skills.map((skill, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-800 text-gray-300 rounded-full text-sm border border-gray-600"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Avaliação */}
          {projeto.avaliacao && (
            <div className="bg-gray-800 rounded-lg p-4 border border-gray-700">
              <h3 className="text-lg font-semibold text-white mb-3">Avaliação</h3>
              <p className="text-gray-300 leading-relaxed">
                {projeto.avaliacao}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};