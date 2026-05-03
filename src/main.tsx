/**
 * ============================================================================
 * ENTRADA DO REACT (main.tsx)
 * ============================================================================
 * O fluxo é:
 *   1) O Vite lê index.html, que carrega este arquivo.
 *   2) createRoot() “conecta” o React à <div id="root"> do index.html.
 *   3) .render(<App />) desenha o componente raiz (ver App.tsx).
 *   4) import "./index.css" aplica estilos globais (cores, fontes) a tudo.
 *
 * Em geral você NÃO precisa mudar nada aqui, exceto se renomear App.tsx.
 * ============================================================================
 */
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

createRoot(document.getElementById("root")!).render(<App />);
