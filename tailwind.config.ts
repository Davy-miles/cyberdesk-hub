/* ============================================================
   ARQUIVO: tailwind.config.ts
   Configuração do Tailwind CSS.
   Aqui registramos as cores, fontes e animações que usamos
   nas classes utilitárias (ex.: bg-primary, animate-float).
   ============================================================ */
import type { Config } from "tailwindcss";

export default {
  // Modo dark via classe (não usado, o site já é dark-only)
  darkMode: ["class"],
  // Arquivos onde o Tailwind procura classes para gerar CSS
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: { "2xl": "1400px" },
    },
    extend: {
      // === FONTES ===
      fontFamily: {
        display: ['Orbitron', 'sans-serif'], // Para títulos futuristas
        mono: ['JetBrains Mono', 'monospace'], // Para texto estilo código
      },
      // === CORES (todas mapeadas para variáveis HSL do index.css) ===
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          glow: "hsl(var(--primary-glow))", // Variação para brilhos
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      // === GRADIENTES customizados (usar com bg-gradient-*) ===
      backgroundImage: {
        'gradient-primary': 'var(--gradient-primary)',
        'gradient-cyber': 'var(--gradient-cyber)',
        'gradient-dark': 'var(--gradient-dark)',
      },
      // === SOMBRAS neon (usar com shadow-neon, etc.) ===
      boxShadow: {
        'neon': 'var(--shadow-neon)',
        'neon-strong': 'var(--shadow-neon-strong)',
        'cyber': 'var(--shadow-cyber)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      // === KEYFRAMES (definidas também no index.css algumas) ===
      keyframes: {
        "accordion-down": { from: { height: "0" }, to: { height: "var(--radix-accordion-content-height)" } },
        "accordion-up":   { from: { height: "var(--radix-accordion-content-height)" }, to: { height: "0" } },
        "pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 20px hsl(280 95% 60% / 0.5)" },
          "50%":      { boxShadow: "0 0 40px hsl(280 95% 60% / 0.9), 0 0 60px hsl(285 100% 70% / 0.6)" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%":      { transform: "translateY(-10px)" },
        },
        "blink": {
          "0%, 50%":   { opacity: "1" },
          "51%, 100%": { opacity: "0" },
        },
      },
      // === ANIMAÇÕES (atalhos das keyframes acima) ===
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "pulse-glow":     "pulse-glow 2s ease-in-out infinite",
        "float":          "float 3s ease-in-out infinite",
        "blink":          "blink 1s step-end infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
