/**
 * ============================================================================
 * MatrixRain — fundo animado (efeito “chuva de código”)
 * ============================================================================
 * É um <canvas> em tela cheia, atrás de tudo (z-index negativo).
 *
 * Onde aparece: Index, Verify, páginas de verificação (importado em cada uma).
 *
 * Performance (já otimizado aqui):
 *   · requestAnimationFrame em vez de setInterval fixo
 *   · pausa quando a aba está em segundo plano
 *   · limite de colunas no canvas
 *
 * Se quiser DESLIGAR o efeito numa página: remova <MatrixRain /> do JSX
 * daquela página. Para mudar cores: altere os hsl(...) dentro de draw().
 * ============================================================================
 */
import { useEffect, useRef } from "react";

const CHARS =
  "アァカサタナハマヤラワ0123456789ABCDEF<>{}[]/\\";
const BASE_FONT = 14;
const MIN_INTERVAL_MS = 45;
const MAX_COLUMNS = 96;

const MatrixRain = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef(0);
  const lastDrawRef = useRef(0);
  const dropsRef = useRef<number[]>([]);
  const hiddenRef = useRef(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columns = Math.min(
        Math.floor(w / BASE_FONT),
        MAX_COLUMNS
      );
      const prev = dropsRef.current;
      dropsRef.current = Array.from({ length: columns }, (_, i) =>
        i < prev.length ? prev[i]! : 1
      );
    };

    const onVisibility = () => {
      hiddenRef.current = document.visibilityState === "hidden";
    };

    resize();
    window.addEventListener("resize", resize);
    document.addEventListener("visibilitychange", onVisibility);

    const draw = (time: number) => {
      rafRef.current = requestAnimationFrame(draw);

      if (hiddenRef.current) return;
      if (time - lastDrawRef.current < MIN_INTERVAL_MS) return;
      lastDrawRef.current = time;

      const drops = dropsRef.current;
      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.fillStyle = "hsla(232, 40%, 6%, 0.1)";
      ctx.fillRect(0, 0, w, h);

      ctx.fillStyle = "hsl(224, 98%, 70%)";
      ctx.font = `${BASE_FONT}px JetBrains Mono, monospace`;

      for (let i = 0; i < drops.length; i++) {
        const text = CHARS[Math.floor(Math.random() * CHARS.length)];
        ctx.fillText(text, i * BASE_FONT, drops[i] * BASE_FONT);

        if (
          drops[i] * BASE_FONT > h &&
          Math.random() > 0.975
        ) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-30 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
