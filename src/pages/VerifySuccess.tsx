/* ============================================================
   📚 AULA: Página de Sucesso (/verify/success)
   ------------------------------------------------------------
   O usuário cai aqui depois que o Discord autenticou e o bot
   adicionou ele ao servidor. A URL traz ?u=NomeDoUsuario.
   ============================================================ */

import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle2, MessageSquare, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import MatrixRain from "@/components/MatrixRain";

const VerifySuccess = () => {
  // Hook do react-router para ler query params da URL
  const [params] = useSearchParams();
  const username = params.get("u") ?? "hacker";

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <MatrixRain />
      <div className="absolute inset-0 bg-gradient-cyber opacity-10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-lg p-6 sm:p-10 rounded-2xl border border-accent/40 bg-card/80 backdrop-blur-md shadow-neon text-center">
        {/* Ícone de sucesso */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center animate-float">
            <CheckCircle2 className="w-12 h-12 text-accent" strokeWidth={2.5} />
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black mb-3">
          ACESSO <span className="text-gradient-cyber">LIBERADO</span>
        </h1>

        <p className="text-muted-foreground mb-2">
          Bem-vindo ao servidor, <span className="text-primary font-semibold">@{username}</span>!
        </p>
        <p className="text-sm text-muted-foreground mb-8">
          Você já foi adicionado ao <span className="text-foreground font-semibold">Cyber World</span>.
          Abra o Discord e diga oi pra galera. 👾
        </p>

        {/* Bloquinho estilo terminal */}
        <div className="font-mono text-sm bg-background/80 border border-border rounded-lg p-4 mb-8 text-left">
          <div><span className="text-muted-foreground">$</span> <span className="text-accent">whoami</span></div>
          <div><span className="text-primary">{username}</span> <span className="text-muted-foreground">// verificado ✓</span></div>
          <div><span className="text-muted-foreground">$</span> <span className="text-accent">status</span></div>
          <div><span className="text-primary-glow">ONLINE • acesso total ao servidor</span></div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-gradient-cyber hover:shadow-neon-strong font-mono">
            <a href="discord://" target="_blank" rel="noopener noreferrer">
              <MessageSquare className="mr-2 w-4 h-4" />
              ABRIR DISCORD
            </a>
          </Button>
          <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-mono">
            <Link to="/">
              <Home className="mr-2 w-4 h-4" />
              VOLTAR
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifySuccess;
