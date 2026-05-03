/**
 * ============================================================================
 * FeatureCard — um card da grade “features” da home
 * ============================================================================
 * Quem manda no CONTEÚDO (título, texto, ícone) é o array `features` em
 * Index.tsx. Este arquivo só define o VISUAL (borda, hover, animação).
 *
 * Props (vindas do map em Index):
 *   icon        → componente Lucide (ex: Shield, Code2)
 *   title       → título em destaque
 *   description → parágrafo menor
 *   delay       → atraso da animação em ms (efeito cascata)
 *
 * Para mudar textos: edite Index.tsx, não este arquivo.
 * ============================================================================
 */
import { LucideIcon } from "lucide-react";
import { useReveal } from "@/hooks/useReveal";

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  /** Milissegundos para atrasar a animação de entrada (stagger). */
  delay?: number;
}

const FeatureCard = ({ icon: Icon, title, description, delay = 0 }: FeatureCardProps) => {
  const { ref, visible } = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      style={{ animationDelay: visible ? `${delay}ms` : undefined }}
      className={[
        "group relative p-6 rounded-lg bg-card border border-border overflow-hidden",
        "hover-lift hover:border-primary hover:shadow-neon",
        visible ? "animate-fade-in-up" : "reveal-hidden",
      ].join(" ")}
    >
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-cyber opacity-0 group-hover:opacity-100 transition-spring" />

      <div className="absolute -inset-px rounded-lg bg-gradient-cyber opacity-0 group-hover:opacity-10 blur-xl transition-spring -z-10" />

      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-spring">
        <Icon className="w-6 h-6 text-primary group-hover:text-primary-glow transition-spring" />
      </div>

      <h3 className="font-display text-lg font-bold mb-2 text-foreground">{title}</h3>

      <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
