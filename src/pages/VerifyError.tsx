/**
 * ============================================================================
 * /verify/error — algo falhou no fluxo Discord (callback)
 * ============================================================================
 * A URL traz ?reason=codigo — ex: token_exchange, join_failed.
 *
 * O objeto REASONS abaixo traduz cada código para uma mensagem em português.
 * Para adicionar um motivo novo: inclua a chave que o backend envia e o texto.
 *
 * ?status= pode trazer código HTTP (opcional) para debug.
 * ============================================================================
 */
import { useSearchParams, Link } from "react-router-dom";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import MatrixRain from "@/components/MatrixRain";

/** Mapa código (backend) → mensagem humana. Estenda se criar novos erros. */
const REASONS: Record<string, string> = {
  missing_code: "Código de autorização não foi recebido do Discord.",
  token_exchange: "Falha ao trocar o código pelo token de acesso.",
  user_fetch: "Não conseguimos ler seus dados do Discord.",
  join_failed: "Não foi possível te adicionar ao servidor. O bot pode estar sem permissão.",
  server_error: "Erro interno no servidor. Tente novamente mais tarde.",
};

const VerifyError = () => {
  const [params] = useSearchParams();
  const reason = params.get("reason") ?? "server_error";
  const status = params.get("status");
  const message = REASONS[reason] ?? "Erro desconhecido.";

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 overflow-hidden">
      <MatrixRain />

      <div className="relative w-full max-w-lg p-6 sm:p-10 rounded-2xl border border-destructive/40 bg-card/80 backdrop-blur-md shadow-neon text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-destructive/20 flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-destructive" />
          </div>
        </div>

        <h1 className="font-display text-2xl sm:text-3xl md:text-4xl font-black mb-3">
          ACESSO <span className="text-destructive">NEGADO</span>
        </h1>

        <p className="text-muted-foreground mb-2">{message}</p>
        {status && (
          <p className="text-xs font-mono text-muted-foreground mb-6">
            código HTTP: {status}
          </p>
        )}

        <div className="font-mono text-sm bg-background/80 border border-border rounded-lg p-4 mb-8 text-left">
          <span className="text-destructive">ERROR:</span>{" "}
          <span className="text-muted-foreground">{reason}</span>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button asChild className="bg-gradient-cyber hover:shadow-neon-strong font-mono">
            <Link to="/verify">
              <RotateCcw className="mr-2 w-4 h-4" />
              TENTAR NOVAMENTE
            </Link>
          </Button>
          <Button asChild variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 font-mono">
            <Link to="/">VOLTAR</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default VerifyError;
