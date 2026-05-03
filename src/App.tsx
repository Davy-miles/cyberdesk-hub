/**
 * ============================================================================
 * App.tsx — “roteador” e invólucro de toda a aplicação
 * ============================================================================
 * Aqui a gente declara as URLs (rotas) e o que cada uma mostra.
 *
 * Mapa mental:
 *   /                 → HomePage (landing)      — arquivo: pages/HomePage.tsx
 *   /verify           → tela do botão Discord  — pages/VerifyPage.tsx
 *   /verify/success   → depois do login OK     — pages/VerifySuccessPage.tsx
 *   /verify/error     → se o Discord falhar     — pages/VerifyErrorPage.tsx
 *   qualquer outra    → 404                      — pages/NotFoundPage.tsx
 *
 * lazy(() => import(...)) = a página só é baixada quando o usuário acessa
 * (deixa o primeiro carregamento da home mais leve).
 *
 * QueryClient = cache de dados (usado se você buscar API com React Query).
 * Toaster / Sonner = notificações “toast” (mensagens no canto da tela).
 * ============================================================================
 */
import { lazy, Suspense, useEffect, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BootLoader from "@/components/BootLoaderScreen";

const HomePage = lazy(() => import("./pages/HomePage.tsx"));
const VerifyPage = lazy(() => import("./pages/VerifyPage.tsx"));
const VerifySuccessPage = lazy(() => import("./pages/VerifySuccessPage.tsx"));
const VerifyErrorPage = lazy(() => import("./pages/VerifyErrorPage.tsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.tsx"));

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

const App = () => {
  const [booting, setBooting] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setBooting(false), 1800);
    return () => window.clearTimeout(id);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={200}>
        <Toaster />
        <Sonner />
        {booting && <BootLoader />}
        <BrowserRouter basename="/cyberdesk-hub">
          <Suspense fallback={<RouteFallback />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/verify" element={<VerifyPage />} />
              <Route path="/verify/success" element={<VerifySuccessPage />} />
              <Route path="/verify/error" element={<VerifyErrorPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
