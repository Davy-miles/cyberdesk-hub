import { Cpu, Sparkles } from "lucide-react";

const BootLoader = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background">
      <div className="relative text-center px-6">
        <div className="absolute -inset-16 bg-gradient-cyber opacity-20 blur-3xl" />
        <div className="relative mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl border border-primary/40 bg-card/80 shadow-neon animate-pulse-glow">
          <Cpu className="h-10 w-10 text-primary" />
        </div>
        <h2 className="font-display text-3xl font-black tracking-wider text-gradient-cyber">
          CYBER WORLD
        </h2>
        <p className="mt-2 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
          boot sequence
        </p>
        <div className="mt-6 h-1.5 w-64 overflow-hidden rounded-full bg-muted/70">
          <div className="h-full w-full origin-left animate-loader-bar bg-gradient-cyber" />
        </div>
        <div className="mt-4 flex items-center justify-center gap-2 font-mono text-xs text-accent">
          <Sparkles className="h-3.5 w-3.5" />
          carregando ambiente seguro
        </div>
      </div>
    </div>
  );
};

export default BootLoader;
