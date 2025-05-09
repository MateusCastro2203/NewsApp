/**
 * Representa uma mensagem individual no chat
 */
export interface ChatMessage {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

/**
 * Resposta da API de chat
 */
export interface ChatResponse {
  response: string;
  conversation_id: string;
}

/**
 * Representa uma conversa completa
 */
export interface ChatConversation {
  id: string;
  articleId: string;
  articleTitle: string;
  articleLink: string;
  messages: ChatMessage[];
  createdAt: Date;
  updatedAt: Date;
}

/**
 * Estado global do chat
 */
export interface ChatState {
  currentConversationId?: string;
  conversations: Record<string, ChatConversation>;
  isLoading: boolean;
  error?: string;
}

/**
 * Props para o componente ChatBot
 */
export interface ChatBotProps {
  articleId: string;
  articleTitle: string;
  articleContent: string;
  articleLink: string;
  onClose: () => void;
}

/**
 * Props para o componente de mensagem individual
 */
export interface MessageProps {
  text: string;
  isUser: boolean;
  timestamp: Date;
  theme: "dark" | "light";
}

/**
 * Props para o componente de lista de mensagens
 */
export interface MessagesListProps {
  messages: ChatMessage[];
  theme: "dark" | "light";
}

/**
 * Props para o componente InputBar
 */
export interface InputBarProps {
  value: string;
  onChange: (text: string) => void;
  onSend: () => void;
  isLoading: boolean;
  theme: "dark" | "light";
}
