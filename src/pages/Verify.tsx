/**
 * ============================================================================
 * /verify — tela “Verificar com Discord”
 * ============================================================================
 * O que acontece quando clica no botão:
 *   1) O navegador chama a Edge Function do Supabase: discord-auth-start
 *   2) Ela devolve uma URL oficial do Discord (OAuth)
 *   3) Redirecionamos com window.location.href para lá
 *   4) Depois do login, o Discord chama OUTRA função (discord-callback) que
 *      adiciona o usuário ao servidor e redireciona para /verify/success
 *
 * Precisa no .env (na raiz do projeto):
 *   VITE_SUPABASE_URL=https://xxxx.supabase.co
 *
 * Sem essa variável, mostramos erro amigável (não quebra a página).
 *
 * Para mudar textos da lista de passos: edite o array dentro do .map abaixo.
 * ============================================================================
 */
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Shield,
  MessageSquare,
  ArrowRight,
  Lock,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import MatrixRain from "@/components/MatrixRain";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const FUNCTIONS_URL = supabaseUrl
  ? `${supabaseUrl.replace(/\/$/, "")}/functions/v1`
  : "";

const Verify = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleVerify = async () => {
    if (!FUNCTIONS_URL) {
      setError(
        "Configure VITE_SUPABASE_URL no .env para usar a verificação Discord."
      );
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const returnTo = "/verify/success";
      const res = await fetch(
        `${FUNCTIONS_URL}/discord-auth-start?return_to=${encodeURIComponent(returnTo)}`
      );
      if (!res.ok) throw new Error("Falha ao iniciar autenticação");
      const data = (await res.json()) as { url?: string };
      if (!data.url) throw new Error("Resposta inválida do servidor");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro inesperado");
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <MatrixRain />

      <div className="absolute inset-0 bg-gradient-cyber opacity-10 blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-lg p-6 sm:p-10 rounded-2xl border border-primary/40 bg-card/80 backdrop-blur-md shadow-neon">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-cyber blur-xl opacity-60" />
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-cyber flex items-center justify-center shadow-neon-strong animate-pulse-glow">
              <Shield className="w-8 h-8 sm:w-10 sm:h-10 text-primary-foreground" />
            </div>
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black text-center mb-2">
          VERIFICAÇÃO <span className="text-gradient-cyber">REQUERIDA</span>
        </h1>
        <p className="text-center text-muted-foreground text-sm sm:text-base mb-8">
          Para acessar o servidor{" "}
          <span className="text-primary font-semibold">Cyber World</span>,
          autentique-se com sua conta Discord.
        </p>

        <div className="space-y-3 mb-8">
          {[
            "Você será redirecionado para o Discord",
            "Vamos pedir permissão básica (nome de usuário)",
            "Você será adicionado automaticamente ao servidor",
          ].map((step, i) => (
            <div key={i} className="flex items-start gap-3 text-sm">
              <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" />
              <span className="text-foreground/90">{step}</span>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-destructive/10 border border-destructive/40 text-sm text-destructive font-mono">
            ⚠ {error}
          </div>
        )}

        <Button
          onClick={handleVerify}
          disabled={loading}
          size="lg"
          className="w-full bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono text-base group"
        >
          {loading ? (
            <>
              <Loader2 className="mr-2 w-5 h-5 animate-spin" />
              CONECTANDO...
            </>
          ) : (
            <>
              <MessageSquare className="mr-2 w-5 h-5" />
              VERIFICAR COM DISCORD
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
            </>
          )}
        </Button>

        <div className="mt-6 flex items-center justify-center gap-2 text-xs text-muted-foreground font-mono">
          <Lock className="w-3 h-3" />
          <span>Conexão segura · Não armazenamos sua senha</span>
        </div>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-xs font-mono text-muted-foreground hover:text-primary transition-smooth"
          >
            ← voltar para a home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Verify;
