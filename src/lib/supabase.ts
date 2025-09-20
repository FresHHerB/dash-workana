import { createClient } from '@supabase/supabase-js';
import type { ProjetoFreela } from '../types';

// Configurações do Supabase via variáveis de ambiente
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const fetchProjetos = async (): Promise<ProjetoFreela[]> => {
  const { data, error } = await supabase
    .from('projetos_freela')
    .select('*');
  
  if (error) {
    console.error('Erro ao buscar projetos:', error);
    return [];
  }
  
  return data || [];
};