# 🎵 Configuração de Música de Fundo

## Como adicionar a música cyberpunk de fundo

A página agora suporta música de fundo tech/cyberpunk automática. Para ativar:

### Passo 1: Preparar o arquivo de áudio
1. Coloque seu arquivo de áudio MP3 em `/public/audio/`
2. Nomeie como `cyberpunk-bg.mp3` (ou ajuste o caminho em `src/pages/HomePage.tsx`)

### Passo 2: Formatos recomendados
- **MP3**: Melhor compatibilidade (recomendado)
- **WAV**: Qualidade sem perdas, mas arquivo maior
- **OGG**: Boa compressão, suportado na maioria dos navegadores

### Passo 3: Propriedades sugeridas
- **Bitrate**: 128-192 kbps (MP3)
- **Duração**: 2-10 minutos (para loop suave)
- **Estilo**: Tech, synthwave, industrial, ambient

### Sugestões de trilhas
Procure por músicas similares a **Crystal Castles**:
- Syn Cole - Feel Good
- Perturbator - Artefacts
- Carpenter Brut - Trilogy
- Com Truise - Jetta
- The Midnight - Los Angeles

### Passo 4: Controle de volume

O componente `BackgroundAudio` permite ajustar:

```tsx
<BackgroundAudio 
  src="/audio/cyberpunk-bg.mp3" 
  volume={0.15}           // Volume (0-1, padrão 0.2)
  autoPlay={true}         // Tenta reproduzir automaticamente
/>
```

### Passo 5: Comportamento

- ✅ A música inicia quando o usuário interage com a página (clique, scroll, tecla)
- ✅ Reproduz em loop infinito
- ✅ Botão de mutar/desmutar no canto inferior direito
- ✅ Preferência de mudo é salva em localStorage

### Notas técnicas

- Navegadores modernos **exigem interação do usuário** antes de reproduzir áudio automaticamente (política de autoplay)
- O botão de controle está fixo no canto inferior direito com icone 🔊/🔇
- A música é discretamente reproduzida com volume reduzido (15% por padrão)

### Estrutura de pastas

```
public/
├── logo.svg
├── server-logo.jpg       (← sua logo)
├── favicon.ico
└── audio/
    └── cyberpunk-bg.mp3  (← coloque aqui)
```

---

## 🎨 Animações melhoradas

A página agora inclui:

- **Terminal com entrada cinemática** (`animate-terminal-entrance`)
- **Slide-in with scale** para elementos que entram da lateral
- **Pop-in effect** para componentes que "explodem" na tela
- **Scanline animation** no hero background
- **Colors cycling** no MatrixRain para mais dinamismo

## 📱 Responsividade

Todas as animações respeita a preferência de `prefers-reduced-motion` do sistema operacional do usuário.

---

Pronto! 🚀 Agora a página tem:
✅ Animação de terminal melhorada
✅ Suporte a música de fundo
✅ Logo do servidor integrada
✅ Controle de volume persistente
