export interface NewsResult {
  article_id: string; // ID único do artigo
  title: string; // Título do artigo
  link: string; // Link para o artigo completo
  keywords: string[]; // Palavras-chave associadas ao artigo
  creator: string | null; // Criador do artigo (pode ser nulo)
  video_url: string | null; // URL de vídeo associado (pode ser nulo)
  description: string; // Descrição ou resumo do artigo
  content: string; // Conteúdo completo do artigo (ou mensagem de plano)
  pubDate: string; // Data de publicação
  pubDateTZ: string; // Fuso horário da data de publicação
  image_url: string; // URL da imagem associada ao artigo
  source_id: string; // ID da fonte do artigo
  source_priority: number; // Prioridade da fonte
  source_name: string; // Nome da fonte
  source_url: string; // URL da fonte
  source_icon: string; // URL do ícone da fonte
  language: string; // Idioma do artigo
  country: string[]; // Países associados ao artigo
  category: string[]; // Categorias associadas ao artigo
  ai_tag?: string; // Tag gerada por IA (opcional)
  sentiment?: string; // Sentimento gerado por IA (opcional)
  sentiment_stats?: string; // Estatísticas de sentimento (opcional)
  ai_region?: string; // Região gerada por IA (opcional)
  ai_org?: string; // Organização gerada por IA (opcional)
  duplicate: boolean; // Indica se o artigo é duplicado
}

export interface NewsResponse {
  nextPage: string; // Identificador da próxima página
  results: NewsResult[]; // Lista de resultados de notícias
  status: "success" | "error"; // Status da resposta
  totalResults: number; // Total de resultados disponíveis
}

export interface SavedNews extends NewsResult {
  savedAt: string;
}
export interface FavoritesStore {
  savedNews: SavedNews[];
  addToFavorites: (news: NewsResult) => void;
  removeFromFavorites: (articleId: string) => void;
  isFavorite: (articleId: string) => boolean;
}
