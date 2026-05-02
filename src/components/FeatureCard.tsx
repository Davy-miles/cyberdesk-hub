/* ============================================================
   COMPONENTE: FeatureCard
   Card reutilizável para mostrar uma "feature" do servidor.
   Recebe: ícone, título e descrição via props.
   ============================================================ */
import { LucideIcon } from "lucide-react";

// Definição dos tipos das props (TypeScript ajuda a evitar erros)
interface FeatureCardProps {
  icon: LucideIcon;       // Componente de ícone do lucide-react
  title: string;          // Título do card
  description: string;    // Texto descritivo
}

const FeatureCard = ({ icon: Icon, title, description }: FeatureCardProps) => {
  return (
    /* group = permite estilizar filhos quando o pai sofre hover */
    <div className="group relative p-6 rounded-lg bg-card border border-border hover:border-primary transition-smooth hover:shadow-neon overflow-hidden">
      {/* Linha gradiente decorativa no topo (aparece no hover) */}
      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-cyber opacity-0 group-hover:opacity-100 transition-smooth" />

      {/* Caixinha do ícone com brilho */}
      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-smooth">
        <Icon className="w-6 h-6 text-primary group-hover:text-primary-glow transition-smooth" />
      </div>

      {/* Título usando a fonte futurista */}
      <h3 className="font-display text-lg font-bold mb-2 text-foreground">
        {title}
      </h3>

      {/* Descrição em cor mais discreta */}
      <p className="text-sm text-muted-foreground leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default FeatureCard;
