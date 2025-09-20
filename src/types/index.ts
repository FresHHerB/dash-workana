export interface ProjetoFreela {
  id: string;
  nome_projeto: string;
  link: string;
  published_at: string;
  num_propostas: string;
  budget: string;
  pais: string;
  descricao: string;
  skills: string[];
  temperatura: number;
  avaliacao: string;
  contactado: boolean;
}

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}