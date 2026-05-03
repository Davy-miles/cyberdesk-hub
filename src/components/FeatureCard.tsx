/* ============================================================
   COMPONENTE: FeatureCard
   Card reutilizável para mostrar uma "feature" do servidor.
   Recebe: ícone, título, descrição e um delay opcional pra
   escalonar a animação de entrada.
   ============================================================ */
import { LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Atraso (ms) da animação de entrada — útil pra efeito cascata */
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  // Hook que detecta quando o card aparece na tela
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      // style inline só pra aplicar o delay dinâmico (cascata)
      style={{ animationDelay: visible ? `${delay}ms` : undefined }}
      className={[
        "group relative p-6 rounded-lg bg-card border border-border overflow-hidden",
        "hover-lift hover:border-primary hover:shadow-neon",
        // Estado inicial vs animação quando visível
        visible ? "animate-fade-in-up" : "reveal-hidden",
      ].join(" ")}
    >
      {/* Linha gradiente decorativa no topo (aparece no hover) */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-cyber opacity-0 group-hover:opacity-100 transition-spring" />

      {/* Glow sutil que aparece no hover (atrás do conteúdo) */}
      <div className="absolute -inset-px rounded-lg bg-gradient-cyber opacity-0 group-hover:opacity-10 blur-xl transition-spring -z-10" />

      {/* Caixinha do ícone com brilho */}
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-spring">
        <Icon className="w-6 h-6 text-primary group-hover:text-primary-glow transition-spring" />
      </div>

      <h3 className="font-display text-lg font-bold mb-2 text-foreground">
        {title}
      </h3>

      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
