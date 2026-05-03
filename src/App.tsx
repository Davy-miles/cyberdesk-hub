/* ============================================================
   📚 AULA: App.tsx — raiz da aplicação
   ------------------------------------------------------------
   Aqui montamos:
     - QueryClient (cache de requisições)
     - TooltipProvider (para tooltips bonitinhos do shadcn)
     - Toaster (notificações)
     - BrowserRouter (sistema de rotas/URLs)
   Cada <Route> abaixo é uma URL do site.
   ============================================================ */

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import Verify from "./pages/Verify.tsx";
import VerifySuccess from "./pages/VerifySuccess.tsx";
import VerifyError from "./pages/VerifyError.tsx";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Página inicial */}
          <Route path="/" element={<Index />} />

          {/* Fluxo de verificação Discord */}
          <Route path="/verify" element={<Verify />} />
          <Route path="/verify/success" element={<VerifySuccess />} />
          <Route path="/verify/error" element={<VerifyError />} />

          {/* SEMPRE deixar o catch-all "*" por último */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
