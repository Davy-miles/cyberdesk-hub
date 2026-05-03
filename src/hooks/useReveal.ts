/* ============================================================
   📚 AULA: Hook useReveal
   ------------------------------------------------------------
   Esse hook detecta quando um elemento ENTRA na tela durante o
   scroll e adiciona uma classe pra disparar uma animação.

   Como funciona em 3 passos:
     1) Cria uma "ref" que conecta no elemento HTML (<div ref={ref}/>)
     2) Usa IntersectionObserver (API nativa do navegador) que
        observa se o elemento está visível na viewport.
     3) Quando aparece, marcamos `visible = true` e o componente
        adiciona uma classe CSS que dispara a animação.

   USO:
     const { ref, visible } = useReveal();
     <div ref={ref} className={visible ? "animate-fade-in-up" : "opacity-0"} />
   ============================================================ */
import { useEffect, useRef, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  // threshold = quanto do elemento precisa estar visível (0 a 1)
  threshold = 0.15
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    // Acessibilidade: se o usuário pediu pra reduzir movimento,
    // já mostramos tudo direto (sem animação).
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    // Cria o observer que dispara quando o elemento aparece
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target); // só anima uma vez
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}
