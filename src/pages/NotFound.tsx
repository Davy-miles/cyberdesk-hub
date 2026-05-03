/**
 * ============================================================================
 * 404 — qualquer URL que não existe nas rotas do App.tsx
 * ============================================================================
 * Em App.tsx a rota path="*" aponta para este componente.
 *
 * Para mudar textos/botões: edite o JSX abaixo.
 * console.warn só roda em desenvolvimento (import.meta.env.DEV).
 * ============================================================================
 */
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Terminal } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.warn("[404]", location.pathname);
    }
  }, [location.pathname]);

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center px-4 bg-background overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: `
            linear-gradient(hsl(280 95% 60% / 0.15) 1px, transparent 1px),
            linear-gradient(90deg, hsl(280 95% 60% / 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "48px 48px",
        }}
      />

      <div className="relative text-center max-w-md space-y-6 animate-fade-in-up">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-primary/40 bg-card/80 shadow-neon">
          <Terminal className="h-8 w-8 text-primary" aria-hidden />
        </div>

        <div>
          <p className="font-mono text-xs text-muted-foreground tracking-[0.3em] mb-2">
            ERR_NOT_FOUND
          </p>
          <h1 className="font-display text-5xl sm:text-6xl font-black text-gradient-cyber text-glow mb-2">
            404
          </h1>
          <p className="text-muted-foreground">
            Essa rota não existe neste servidor.
          </p>
        </div>

        <Button
          asChild
          className="bg-gradient-cyber hover:shadow-neon-strong font-mono transition-smooth"
        >
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Voltar ao início
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
