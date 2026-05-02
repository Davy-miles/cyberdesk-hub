/* ============================================================
   COMPONENTE: MatrixRain
   Cria o efeito de "chuva de código" estilo Matrix no fundo.
   Usa um <canvas> HTML5 desenhando caracteres aleatórios em roxo.
   ============================================================ */
import { useEffect, useRef } from "react";

const MatrixRain = () => {
  // useRef = referência direta ao elemento canvas no DOM
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // se ainda não montou, sai
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Ajusta o tamanho do canvas para preencher a janela inteira
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // Caracteres que vão "cair" (mistura katakana + números + símbolos)
    const chars = "アァカサタナハマヤラワ0123456789ABCDEF<>{}[]/\\";
    const fontSize = 14;
    // Cada coluna terá uma "gota" caindo
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    // Função que desenha um frame da animação
    const draw = () => {
      // Camada semi-transparente preta para criar o efeito de rastro
      ctx.fillStyle = "hsla(270, 30%, 4%, 0.08)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Cor roxa neon nos caracteres
      ctx.fillStyle = "hsl(280, 95%, 60%)";
      ctx.font = `${fontSize}px JetBrains Mono`;

      // Desenha um caractere em cada coluna
      for (let i = 0; i < drops.length; i++) {
        const text = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        // Quando passa do final da tela, reseta (com chance aleatória)
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }
    };

    // Roda a animação a cada 50ms
    const interval = setInterval(draw, 50);

    // Limpeza quando o componente é desmontado
    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", resize);
    };
  }, []);

  // pointer-events-none = não bloqueia cliques no que está em cima
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 opacity-30 pointer-events-none"
      aria-hidden="true"
    />
  );
};

export default MatrixRain;
