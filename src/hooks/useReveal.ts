/**
 * ============================================================================
 * useReveal — animação quando o usuário rola a página e o bloco entra na tela
 * ============================================================================
 * Como usar em qualquer componente:
 *
 *   const { ref, visible } = useReveal<HTMLDivElement>();
 *   return (
 *     <div ref={ref} className={visible ? "animate-fade-in-up" : "reveal-hidden"}>
 *       ...
 *     </div>
 *   );
 *
 * `ref` deve ir no elemento HTML que você quer observar.
 * Quando ele cruza a viewport, `visible` vira true (uma vez só).
 *
 * Se o usuário tiver “reduzir movimento” no sistema, mostramos direto (sem animação).
 *
 * threshold (opcional): quanto do elemento precisa estar visível (0 a 1).
 * ============================================================================
 */
import { useCallback, useEffect, useState } from "react";

export function useReveal<T extends HTMLElement = HTMLDivElement>(
  threshold = 0.15
) {
  const [visible, setVisible] = useState(false);
  const [node, setNode] = useState<T | null>(null);

  const ref = useCallback((el: T | null) => {
    setNode(el);
  }, []);

  useEffect(() => {
    if (!node) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold, rootMargin: "0px 0px -50px 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [node, threshold]);

  return { ref, visible };
}
