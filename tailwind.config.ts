/**
 * Tailwind CSS — liga classes utilitárias (bg-primary, animate-float) ao projeto.
 *
 * · colors → na maior parte vêm de variáveis CSS em src/index.css (--primary, …).
 * · fontFamily → Orbitron (títulos) e JetBrains Mono (corpo).
 * · extend.keyframes / animation → nomes usados em className="animate-***".
 *
 * Se criar um arquivo novo em src/, o Tailwind já escaneia via `content` abaixo.
 */
import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

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
        // Animações de entrada (reveal on scroll)
        "fade-in-up": {
          "0%":   { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%":   { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "scale-in": {
          "0%":   { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        // Gradiente animado (move o background lentamente)
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":      { backgroundPosition: "100% 50%" },
        },
      },
      // === ANIMAÇÕES (atalhos das keyframes acima) ===
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up":   "accordion-up 0.2s ease-out",
        "pulse-glow":     "pulse-glow 2s ease-in-out infinite",
        "float":          "float 3s ease-in-out infinite",
        "blink":          "blink 1s step-end infinite",
        "fade-in-up":     "fade-in-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
        "fade-in":        "fade-in 0.6s ease-out both",
        "scale-in":       "scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1) both",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
    },
  },
  plugins: [tailwindcssAnimate],
} satisfies Config;
