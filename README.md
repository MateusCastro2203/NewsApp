# NewsApp

Um aplicativo de notícias moderno desenvolvido com React Native e Expo, oferecendo uma experiência rica de leitura com suporte a funcionalidades offline.

## 🚀 Funcionalidades

- **Feed de Notícias**

  - Lista de notícias atualizadas
  - Visualização detalhada de cada notícia
  - Suporte a imagens e conteúdo rico

- **Pesquisa e Filtros**

  - Busca por palavras-chave
  - Filtros por categoria
  - Resultados personalizados

- **Favoritos**

  - Salvar notícias favoritas
  - Gerenciamento de lista de favoritos
  - Acesso rápido ao conteúdo salvo

- **Modo Offline**

  - Download de notícias para leitura offline
  - Gerenciamento automático de armazenamento
  - Indicadores de conteúdo disponível offline
  - Sincronização inteligente

- **Compartilhamento**
  - Compartilhar notícias
  - Suporte a múltiplas plataformas

## 🛠 Tecnologias

- React Native
- Expo
- TypeScript
- TailwindCSS (NativeWind)
- Zustand (Gerenciamento de Estado)
- React Navigation
- Expo FileSystem
- NetInfo

## 📱 Screenshots

[Adicionar screenshots do app aqui]

## 🔧 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/NewsApp.git
```

2. Instale as dependências:

```bash
cd NewsApp
npm install
```

3. Crie um development build:

EXPO_PUBLIC_NEWS_API_KEY=sua_chave_api
EXPO_PUBLIC_NEWS_LAST_URL=url_da_api_de_noticias

```bash
npx expo prebuild
```

4. Execute o projeto:

```bash
# iOS
npx expo run:ios

# Android
npx expo run:android
```

## 📄 Estrutura do Projeto

```
src/
├── components/       # Componentes reutilizáveis
│   ├── ChatBot/      # Componentes do assistente IA
│   └── ...           # Outros componentes
├── screens/          # Telas do aplicativo
├── services/         # Serviços e APIs
├── store/            # Gerenciamento de estado
├── hooks/            # Hooks customizados
├── navigation/       # Configuração de navegação
├── contexts/         # Contextos da aplicação (ThemeContext, etc)
├── types/            # Definições de tipos
└── utils/            # Utilitários e helpers
```

## 🔄 Estado do Projeto

### Implementado

- ✅ Feed principal de notícias
- ✅ Sistema de favoritos
- ✅ Pesquisa e filtros
- ✅ Suporte offline básico
- ✅ Navegação entre telas
- ✅ Compartilhamento de notícias

### Em Desenvolvimento

- 🔄 Melhorias no modo offline
- 🔄 Otimizações de performance
- 🔄 Testes automatizados
- 🔄 Analytics e monitoramento

### Planejado

- 📋 Notificações push
- 📋 Temas (dark/light mode)
- 📋 Internacionalização
- 📋 Mais opções de compartilhamento

## 🤝 Contribuindo

Contribuições são sempre bem-vindas! Por favor, leia o guia de contribuição antes de submeter alterações.

## 👥 Autores

- Mateus Castro (@MateusTCastro2203)
