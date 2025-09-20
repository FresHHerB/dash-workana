import React from 'react';

export const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="mt-4 text-center">
          <p className="text-white text-lg font-semibold">
            Carregando projetos...
          </p>
          <p className="text-gray-400 text-sm mt-2">
            Analisando propostas freelancer
          </p>
        </div>
      </div>
    </div>
  );
};