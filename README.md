# Organizador de Ativos Parcel

![npm](https://img.shields.io/npm/v/parcel)
![license](https://img.shields.io/npm/l/parcel)
![GitHub last commit](https://img.shields.io/github/last-commit/parcel-bundler/parcel)
![SASS](https://img.shields.io/badge/SASS-CC6699?logo=sass&logoColor=white)
![Swiper.js](https://img.shields.io/badge/Swiper.js-6332F6?logo=swiper&logoColor=white)
![Font Awesome](https://img.shields.io/badge/Font%20Awesome-339AF0?logo=font-awesome&logoColor=white)

Um projeto Node.js que usa o Parcel bundler com organização automática de ativos. Este projeto organiza automaticamente os ativos construídos em subdiretórios apropriados e atualiza as referências HTML de acordo.

## Funcionalidades

- Agrupa ativos web usando Parcel
- Organiza automaticamente os arquivos construídos em subdiretórios:
  - Arquivos CSS → `styles/<basename>/`
  - Arquivos JavaScript → `scripts/<basename>/`
  - Imagens → `images/`
- Atualiza referências HTML para corresponder às novas localizações dos arquivos
- Suporta compilação SASS
- Lida com mapas de origem
- Modo de desenvolvimento com recarregamento automático
- Temporizador interativo
- Carrossel de imagens responsivo usando Swiper.js
- Interface temática de League of Legends

## Instalação

```bash
npm install
```

## Scripts

- `npm run dev` - Inicia o servidor de desenvolvimento com recarregamento automático
- `npm run build` - Constrói o projeto para produção com organização de ativos
- `npm run clean` - Limpa o diretório dist
- `npm run organize` - Organiza arquivos em subdiretórios
- `npm run update` - Atualiza referências de arquivos HTML

## Estrutura do Projeto

```
project/
├── source/          # Arquivos fonte
│   ├── index.html   # Arquivo HTML principal
│   ├── scripts/     # Arquivos JavaScript
│   │   ├── countdown.js      # Lógica do temporizador
│   │   └── carousel_swiper.js # Configuração do carrossel Swiper
│   ├── styles/      # Arquivos SASS/CSS
│   └── images/      # Ativos de imagem
├── dist/           # Arquivos construídos (organizados)
│   ├── images/     # Arquivos de imagem
│   ├── styles/     # Arquivos CSS
│   └── scripts/    # Arquivos JavaScript
└── node_modules/   # Dependências
```

## Componentes

### Estrutura HTML
- **Cabeçalho**: Menu de navegação com logotipo do League of Legends e menu responsivo
- **Seção Hero**: Temporizador para o evento Star Guardian
- **Carrossel**: Cartões de campeões interativos com integração Swiper.js
- **Rodapé**: Links de redes sociais e informações de direitos autorais

### Arquivos JavaScript

#### countdown.js
- Implementa a funcionalidade do temporizador
- Calcula o tempo restante até o evento (6 de julho de 2025)
- Atualiza a exibição do temporizador em tempo real
- Lida com a formatação e exibição do temporizador

#### carousel_swiper.js
- Configura o carrossel Swiper.js
- Implementa pontos de interrupção responsivos
- Lida com setas de navegação e paginação
- Suporta gestos de toque/deslize

## Dependências Externas

### Desenvolvimento
- `parcel` - Agrupador de aplicativos web
- `sass` - Compilador SASS
- `fs-extra` - Operações aprimoradas do sistema de arquivos
- `rimraf` - `rm -rf` multiplataforma
- `@parcel/transformer-sass` - Transformador SASS para Parcel

### Frontend
- `Swiper.js` - Slider de toque móvel moderno
- `Font Awesome` - Biblioteca de ícones

## Informações Adicionais

Os componentes de imagens do site foram extraídos do site da Riot Games (https://www.leagueoflegends.com/en-us/) para o desenvolvimento da página web. O site foi desenvolvido unicamente para fins de estudo e prática do Frontend, sem outras intenções.

## Licença

ISC