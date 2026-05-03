/**
 * ============================================================================
 * TerminalWindow — bloco visual que simula um terminal
 * ============================================================================
 * Usado só na HOME, ao lado do texto do hero.
 *
 * Para mudar as “linhas” que aparecem: edite o array `lines` abaixo.
 * Cada item tem:
 *   prompt → texto à esquerda (ex: "$" ou ">")
 *   text   → mensagem
 *   color  → classe Tailwind de cor (text-accent, text-primary, etc.)
 *
 * LINE_MS = tempo entre cada linha nova (milissegundos).
 * ============================================================================
 */
import { useEffect, useState } from "react";

const lines = [
  { prompt: "$", text: "ssh dev@cyberworld.io", color: "text-accent" },
  {
    prompt: ">",
    text: "Conectando ao servidor seguro...",
    color: "text-muted-foreground",
  },
  { prompt: ">", text: "Autenticação concluída ✓", color: "text-primary" },
  { prompt: "$", text: "join --community --role=dev", color: "text-accent" },
  {
    prompt: ">",
    text: "Bem-vindo, hacker. Acesso liberado.",
    color: "text-primary-glow",
  },
];

/** Intervalo entre aparecer uma linha e a próxima. */
const LINE_MS = 780;

const TerminalWindow = () => {
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    let n = 0;
    const id = window.setInterval(() => {
      n += 1;
      setVisibleLines(n);
      if (n >= lines.length) window.clearInterval(id);
    }, LINE_MS);
    return () => window.clearInterval(id);
  }, []);

  return (
    <div className="rounded-lg overflow-hidden border border-primary/30 shadow-neon bg-card/80 backdrop-blur-sm animate-terminal-entrance">
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-destructive" />
        <div className="w-3 h-3 rounded-full bg-secondary" />
        <div className="w-3 h-3 rounded-full bg-primary" />
        <span className="ml-2 text-xs text-muted-foreground font-mono">
          cyberworld@terminal ~ /home/dev
        </span>
      </div>

      <div className="p-6 font-mono text-sm space-y-2 min-h-[220px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex gap-2 animate-fade-in">
            <span className="text-primary font-bold">{line.prompt}</span>
            <span className={line.color}>{line.text}</span>
          </div>
        ))}
        {visibleLines < lines.length && (
          <span className="inline-block w-2 h-4 bg-primary animate-blink" />
        )}
      </div>
    </div>
  );
};

export default TerminalWindow;
