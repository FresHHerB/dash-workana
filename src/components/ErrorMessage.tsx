import React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorMessageProps {
  message: string;
  onRetry?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900">
      <div className="text-center bg-gray-800 rounded-xl p-8 border border-gray-700 max-w-md">
        <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
        
        <h2 className="text-xl font-bold text-white mb-2">
          Erro ao carregar dados
        </h2>
        
        <p className="text-gray-400 mb-6">
          {message}
        </p>
        
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4 mb-6">
          <p className="text-yellow-300 text-sm">
            <strong>Configuração necessária:</strong> Clique no botão "Connect to Supabase" 
            no canto superior direito para configurar a conexão com o banco de dados.
          </p>
        </div>

        {onRetry && (
          <button
            onClick={onRetry}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors mx-auto"
          >
            <RefreshCw className="w-4 h-4" />
            Tentar novamente
          </button>
        )}
      </div>
    </div>
  );
};