/**
 * ============================================================================
 * BackgroundAudio — reprodução de música de fundo (tech/cyberpunk)
 * ============================================================================
 * Reproduz áudio discretamente em loop com controle de volume.
 * O usuário pode mutar via localStorage (preferência persistida).
 *
 * Para usar:
 *   <BackgroundAudio src="/path/to/music.mp3" />
 *
 * Nota: Navegadores modernos exigem interação do usuário antes de
 * reproduzir áudio automaticamente, então a música inicia quando há
 * um evento de click (clique em qualquer lugar da página).
 * ============================================================================
 */
import { useEffect, useRef, useState } from "react";
import { Volume2, VolumeX } from "lucide-react";

interface BackgroundAudioProps {
  src?: string;
  volume?: number;
  /** Se true, tenta iniciar automaticamente (requer user interaction) */
  autoPlay?: boolean;
}

const BackgroundAudio = ({
  src,
  volume = 0.2,
  autoPlay = true,
}: BackgroundAudioProps) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isMuted, setIsMuted] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("bg-audio-muted") === "true";
  });

  useEffect(() => {
    if (!audioRef.current || !src) return;

    const audio = audioRef.current;
    audio.volume = isMuted ? 0 : volume;

    const attemptPlay = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Falha ao reproduzir (comum em navegadores sem interação)
        });
      }
    };

    // Tenta reproduzir se autoPlay está ativado
    if (autoPlay) {
      attemptPlay();
    }

    // Listener para início de interação do usuário
    const handleUserInteraction = () => {
      attemptPlay();
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };

    window.addEventListener("click", handleUserInteraction, { once: true });
    window.addEventListener("keydown", handleUserInteraction, { once: true });
    window.addEventListener("touchstart", handleUserInteraction, { once: true });

    return () => {
      window.removeEventListener("click", handleUserInteraction);
      window.removeEventListener("keydown", handleUserInteraction);
      window.removeEventListener("touchstart", handleUserInteraction);
    };
  }, [src, isMuted, volume, autoPlay]);

  const toggleMute = () => {
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    localStorage.setItem("bg-audio-muted", String(newMuted));
    if (audioRef.current) {
      audioRef.current.volume = newMuted ? 0 : volume;
    }
  };

  if (!src) return null;

  return (
    <>
      <audio
        ref={audioRef}
        src={src}
        loop
        preload="none"
        crossOrigin="anonymous"
        aria-label="Música de fundo cyberpunk"
      />

      {/* Botão de toggle de áudio (canto inferior direito) */}
      <button
        onClick={toggleMute}
        className="fixed bottom-4 right-4 z-40 flex items-center justify-center w-10 h-10 rounded-full bg-card border border-primary/40 shadow-neon hover:shadow-neon-strong transition-smooth text-primary hover:text-primary-glow"
        aria-label={isMuted ? "Ativar música de fundo" : "Desativar música de fundo"}
        title={isMuted ? "Clique para ativar música" : "Clique para desativar música"}
      >
        {isMuted ? (
          <VolumeX className="w-5 h-5" />
        ) : (
          <Volume2 className="w-5 h-5 animate-pulse" />
        )}
      </button>
    </>
  );
};

export default BackgroundAudio;
