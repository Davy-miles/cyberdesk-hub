/* ============================================================
   COMPONENTE: TerminalWindow
   Simula uma janela de terminal/CMD para dar vibe hacker.
   Mostra comandos sendo "digitados" linha por linha.
   ============================================================ */
import { useEffect, useState } from "react";

// Linhas que serão exibidas como se fossem digitadas
const lines = [
  { prompt: "$", text: "ssh dev@cyberdesk.io", color: "text-accent" },
  { prompt: ">", text: "Conectando ao servidor seguro...", color: "text-muted-foreground" },
  { prompt: ">", text: "Autenticação concluída ✓", color: "text-primary" },
  { prompt: "$", text: "join --community --role=dev", color: "text-accent" },
  { prompt: ">", text: "Bem-vindo, hacker. Acesso liberado.", color: "text-primary-glow" },
];

const TerminalWindow = () => {
  // Estado: quantas linhas já foram "digitadas"
  const [visibleLines, setVisibleLines] = useState(0);

  useEffect(() => {
    // A cada 800ms revela mais uma linha
    const interval = setInterval(() => {
      setVisibleLines((prev) => {
        if (prev >= lines.length) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
    }, 800);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="rounded-lg overflow-hidden border border-primary/30 shadow-neon bg-card/80 backdrop-blur-sm">
      {/* Barra de título do terminal (com bolinhas estilo macOS) */}
      <div className="flex items-center gap-2 px-4 py-3 bg-muted/50 border-b border-border">
        <div className="w-3 h-3 rounded-full bg-destructive" />
        <div className="w-3 h-3 rounded-full bg-secondary" />
        <div className="w-3 h-3 rounded-full bg-primary" />
        <span className="ml-2 text-xs text-muted-foreground font-mono">
          cyberdesk@terminal ~ /home/dev
        </span>
      </div>

      {/* Área das linhas de comando */}
      <div className="p-6 font-mono text-sm space-y-2 min-h-[220px]">
        {lines.slice(0, visibleLines).map((line, i) => (
          <div key={i} className="flex gap-2">
            <span className="text-primary font-bold">{line.prompt}</span>
            <span className={line.color}>{line.text}</span>
          </div>
        ))}
        {/* Cursor piscando no final */}
        {visibleLines < lines.length && (
          <span className="inline-block w-2 h-4 bg-primary animate-blink" />
        )}
      </div>
    </div>
  );
};

export default TerminalWindow;
