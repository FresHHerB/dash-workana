import { useState, useEffect } from 'react';
import type { ProjetoFreela } from '../types';
import { fetchProjetos } from '../lib/supabase';
import { parseRelativeTime } from '../utils/dateUtils';

export const useProjetos = () => {
  const [projetos, setProjetos] = useState<ProjetoFreela[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    const loadProjetos = async () => {
      try {
        const data = await fetchProjetos();
        setProjetos(data);
        setError(null);
      } catch (err) {
        setError('Erro ao carregar projetos');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadProjetos();
  }, []);

  const updateData = async () => {
    setUpdating(true);
    try {
      const webhookUrl = import.meta.env.VITE_WEBHOOK_URL;
      
      if (!webhookUrl || webhookUrl.trim() === '') {
        console.warn('Webhook URL não configurada, carregando apenas dados do Supabase');
        // Se não há webhook, apenas recarrega os dados do Supabase
        const data = await fetchProjetos();
        setProjetos(data);
        setError(null);
        return;
      }

      try {
        // Dispara o webhook para atualizar os dados no backend
        const response = await fetch(webhookUrl.trim(), {
          method: 'GET',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'text/plain, application/json',
          },
        });

        if (response.ok) {
          const result = await response.text();
          if (result === 'sucess' || result.includes('success')) {
            // Aguarda um pouco para garantir que o backend terminou de processar
            await new Promise(resolve => setTimeout(resolve, 2000));
            
            // Recarrega os dados do Supabase
            const data = await fetchProjetos();
            setProjetos(data);
            setError(null);
          } else {
            console.warn('Resposta do webhook:', result);
            // Mesmo com resposta inesperada, tenta recarregar os dados
            await new Promise(resolve => setTimeout(resolve, 2000));
            const data = await fetchProjetos();
            setProjetos(data);
            setError(null);
          }
        } else {
          throw new Error(`Erro na requisição do webhook: ${response.status} ${response.statusText}`);
        }
      } catch (webhookError) {
        console.warn('Erro no webhook, tentando carregar dados do Supabase diretamente:', webhookError);
        
        // Se o webhook falhar, ainda tenta recarregar os dados do Supabase
        const data = await fetchProjetos();
        setProjetos(data);
        setError(null);
      }
    } catch (err) {
      console.error('Erro geral na atualização:', err);
      setError('Erro ao atualizar dados');
    } finally {
      setUpdating(false);
    }
  };
  const projetosPorTemperatura = [...projetos].sort((a, b) => (b.temperatura || 0) - (a.temperatura || 0));
  
  const projetosPorPropostas = [...projetos].sort((a, b) => {
    const numA = parseInt(a.num_propostas || '0');
    const numB = parseInt(b.num_propostas || '0');
    return numA - numB;
  });

  const projetosPorRecencia = [...projetos].sort((a, b) => {
    const dateA = parseRelativeTime(a.published_at || '');
    const dateB = parseRelativeTime(b.published_at || '');
    return dateB.getTime() - dateA.getTime();
  });

  return {
    projetos,
    projetosPorTemperatura,
    projetosPorPropostas,
    projetosPorRecencia,
    loading,
    error,
    updating,
    updateData
  };
};