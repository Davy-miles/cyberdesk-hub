/**
 * ============================================================================
 * App.tsx — “roteador” e invólucro de toda a aplicação
 * ============================================================================
 * Aqui a gente declara as URLs (rotas) e o que cada uma mostra.
 *
 * Mapa mental:
 *   /                 → Index (landing)        — arquivo: pages/Index.tsx
 *   /verify           → tela do botão Discord  — pages/Verify.tsx
 *   /verify/success   → depois do login OK     — pages/VerifySuccess.tsx
 *   /verify/error     → se o Discord falhar     — pages/VerifyError.tsx
 *   qualquer outra    → 404                      — pages/NotFound.tsx
 *
 * lazy(() => import(...)) = a página só é baixada quando o usuário acessa
 * (deixa o primeiro carregamento da home mais leve).
 *
 * QueryClient = cache de dados (usado se você buscar API com React Query).
 * Toaster / Sonner = notificações “toast” (mensagens no canto da tela).
 * ============================================================================
 */
import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const Index = lazy(() => import("./pages/Index.tsx"));
const Verify = lazy(() => import("./pages/Verify.tsx"));
const VerifySuccess = lazy(() => import("./pages/VerifySuccess.tsx"));
const VerifyError = lazy(() => import("./pages/VerifyError.tsx"));
const NotFound = lazy(() => import("./pages/NotFound.tsx"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

/** Tela simples enquanto uma rota lazy ainda está carregando. */
function RouteFallback() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
      <div
        className="h-10 w-10 rounded-full border-2 border-primary border-t-transparent animate-spin motion-reduce:animate-none"
        aria-hidden
      />
      <p className="font-mono text-xs text-muted-foreground tracking-wider">
        loading...
      </p>
    </div>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider delayDuration={200}>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/verify" element={<Verify />} />
            <Route path="/verify/success" element={<VerifySuccess />} />
            <Route path="/verify/error" element={<VerifyError />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
