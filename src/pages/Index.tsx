/* ============================================================
   PÁGINA: Index (página inicial do CyberDesk)
   Estrutura:
     1. Background com Matrix Rain + imagem hero
     2. Navbar fixa no topo
     3. Hero principal (título + CTA + terminal)
     4. Seção de stats (números)
     5. Seção de features (cards com tudo que o servidor oferece)
     6. Seção CTA final (convite Discord)
     7. Footer
   ============================================================ */

import { Button } from "@/components/ui/button";
import {
  Code2, Shield, Terminal, Users, Zap, BookOpen,
  Bug, Cpu, MessageSquare, Github, ArrowRight, Lock
} from "lucide-react"; // ícones bonitinhos
import MatrixRain from "@/components/MatrixRain";
import FeatureCard from "@/components/FeatureCard";
import TerminalWindow from "@/components/TerminalWindow";
// Importa a imagem como módulo (Vite resolve o caminho)
import heroBg from "@/assets/hero-cyberpunk.jpg";

// === LINK DO DISCORD ===
// Troque aqui pelo convite real do seu servidor
const DISCORD_INVITE = "https://discord.gg/cyberdesk";

// === Lista de features (fácil de editar/adicionar mais) ===
const features = [
  {
    icon: Code2,
    title: "Canais por Stack",
    description: "Salas dedicadas para JavaScript, Python, Rust, Go, C++ e muito mais. Tira dúvida com quem manja.",
  },
  {
    icon: Shield,
    title: "CyberSecurity",
    description: "CTFs, pentest, blue team, red team. A galera da segurança ofensiva e defensiva tá toda aqui.",
  },
  {
    icon: Terminal,
    title: "DevOps & Cloud",
    description: "Docker, Kubernetes, AWS, Linux. Compartilhe scripts, configs e suas dicas de terminal.",
  },
  {
    icon: Bug,
    title: "Bug Bounty",
    description: "Discussão de CVEs, write-ups, técnicas de exploração e oportunidades em programas de bounty.",
  },
  {
    icon: Cpu,
    title: "AI & Machine Learning",
    description: "LLMs, prompt engineering, modelos open-source e projetos colaborativos de IA.",
  },
  {
    icon: BookOpen,
    title: "Estudos & Mentoria",
    description: "Trilhas de aprendizado, indicação de cursos, code reviews e roadmaps para iniciantes.",
  },
  {
    icon: Users,
    title: "Networking Real",
    description: "Conheça desenvolvedores do Brasil inteiro. Vagas, freelas e parcerias rolam direto.",
  },
  {
    icon: MessageSquare,
    title: "Eventos & Lives",
    description: "Workshops semanais, hackathons, code battles e palestras com profissionais do mercado.",
  },
];

// === Estatísticas exibidas em destaque ===
const stats = [
  { value: "5K+",  label: "Membros Ativos" },
  { value: "40+",  label: "Canais Temáticos" },
  { value: "24/7", label: "Comunidade Online" },
  { value: "100%", label: "Gratuito" },
];

const Index = () => {
  return (
    /* Container raiz: relativo para conter elementos absolutos */
    <div className="relative min-h-screen overflow-x-hidden">
      {/* === BACKGROUND com chuva de código === */}
      <MatrixRain />

      {/* ==========================================================
          NAVBAR FIXA NO TOPO
          ========================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <nav className="container mx-auto flex items-center justify-between py-4">
          {/* Logo (texto estilizado) */}
          <a href="#" className="flex items-center gap-2 group">
            <div className="w-9 h-9 rounded-md bg-gradient-cyber flex items-center justify-center shadow-neon group-hover:animate-pulse-glow">
              <Terminal className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-black text-xl tracking-wider">
              CYBER<span className="text-gradient-cyber">DESK</span>
            </span>
          </a>

          {/* Links de navegação (escondidos no mobile) */}
          <div className="hidden md:flex items-center gap-8 text-sm font-mono">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">./features</a>
            <a href="#stats" className="text-muted-foreground hover:text-primary transition-smooth">./community</a>
            <a href="#join" className="text-muted-foreground hover:text-primary transition-smooth">./join</a>
          </div>

          {/* Botão CTA do header */}
          <Button
            asChild
            size="sm"
            className="bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono"
          >
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
              Entrar <ArrowRight className="ml-1 w-4 h-4" />
            </a>
          </Button>
        </nav>
      </header>

      {/* ==========================================================
          HERO — primeira coisa que o usuário vê
          ========================================================== */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Imagem de fundo com overlay escuro */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt="Hacker em ambiente cyberpunk com código em tela"
            className="w-full h-full object-cover opacity-30"
            width={1920}
            height={1080}
          />
          {/* Overlay para escurecer a imagem e melhorar legibilidade */}
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="container mx-auto grid lg:grid-cols-2 gap-12 items-center">
          {/* Coluna esquerda: textos + CTA */}
          <div className="space-y-8">
            {/* Tag pequena no topo (estilo terminal) */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-xs font-mono text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              SISTEMA ONLINE • COMUNIDADE ATIVA
            </div>

            {/* Título principal (H1 — importante para SEO) */}
            <h1 className="font-display text-5xl md:text-7xl font-black leading-tight">
              <span className="block text-foreground">Bem-vindo ao</span>
              <span className="block text-gradient-cyber text-glow">CYBERDESK</span>
            </h1>

            {/* Subtítulo */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-xl leading-relaxed">
              O servidor Discord definitivo para{" "}
              <span className="text-primary font-semibold">desenvolvedores</span>,{" "}
              <span className="text-secondary font-semibold">hackers éticos</span> e{" "}
              <span className="text-accent font-semibold">profissionais de cybersec</span>.
              Compile conhecimento. Debugue carreiras. Execute conexões.
            </p>

            {/* Botões de ação */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                size="lg"
                className="bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono text-base group"
              >
                <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                  <MessageSquare className="mr-2 w-5 h-5" />
                  ENTRAR NO DISCORD
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-smooth font-mono text-base"
              >
                <a href="#features">
                  <Code2 className="mr-2 w-5 h-5" />
                  VER FEATURES
                </a>
              </Button>
            </div>
          </div>

          {/* Coluna direita: terminal animado */}
          <div className="relative">
            {/* Glow decorativo atrás do terminal */}
            <div className="absolute -inset-4 bg-gradient-cyber opacity-20 blur-3xl -z-10" />
            <TerminalWindow />
          </div>
        </div>
      </section>

      {/* ==========================================================
          STATS — números de impacto
          ========================================================== */}
      <section id="stats" className="py-16 border-y border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="font-display text-4xl md:text-5xl font-black text-gradient-cyber group-hover:text-glow transition-smooth">
                {stat.value}
              </div>
              <div className="mt-2 text-sm font-mono text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================
          FEATURES — o que tem dentro do servidor
          ========================================================== */}
      <section id="features" className="py-24">
        <div className="container mx-auto">
          {/* Cabeçalho da seção */}
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="inline-block px-3 py-1 rounded-full border border-accent/40 bg-accent/5 text-xs font-mono text-accent mb-4">
              {"// FEATURES"}
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-black mb-4">
              Tudo que um <span className="text-gradient-cyber">dev</span> precisa
            </h2>
            <p className="text-muted-foreground">
              Mais de 40 canais organizados por tema, comunidade ativa 24/7 e zero
              toxicidade. Esse é o nosso compromisso.
            </p>
          </div>

          {/* Grid de cards (responsivo: 1 col mobile, 2 tablet, 4 desktop) */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================
          CTA FINAL — convite para entrar no Discord
          ========================================================== */}
      <section id="join" className="py-24 relative overflow-hidden">
        {/* Glow decorativo */}
        <div className="absolute inset-0 bg-gradient-cyber opacity-10 blur-3xl" />

        <div className="container mx-auto relative">
          <div className="max-w-3xl mx-auto text-center p-10 md:p-14 rounded-2xl border border-primary/40 bg-card/50 backdrop-blur-md shadow-neon">
            {/* Ícone de cadeado animado */}
            <div className="inline-flex w-16 h-16 rounded-full bg-gradient-cyber items-center justify-center mb-6 shadow-neon-strong animate-float">
              <Lock className="w-8 h-8 text-primary-foreground" />
            </div>

            <h2 className="font-display text-3xl md:text-5xl font-black mb-4">
              Pronto para fazer <span className="text-gradient-cyber">login</span>?
            </h2>
            <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
              Bora trocar uma ideia, compartilhar projetos, aprender e crescer junto.
              É 100% gratuito e a comunidade tá te esperando.
            </p>

            {/* Bloco "comando" estilo terminal */}
            <div className="font-mono text-sm bg-background/80 border border-border rounded-lg p-4 mb-8 text-left">
              <span className="text-muted-foreground">$ </span>
              <span className="text-accent">curl -X JOIN </span>
              <span className="text-primary">cyberdesk.gg</span>
              <span className="animate-blink text-primary">_</span>
            </div>

            {/* Botão grande de entrada */}
            <Button
              asChild
              size="lg"
              className="bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono text-lg px-8 py-6 group"
            >
              <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer">
                <Zap className="mr-2 w-5 h-5" />
                EXECUTAR ./join.sh
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* ==========================================================
          FOOTER
          ========================================================== */}
      <footer className="border-t border-border py-8 backdrop-blur-sm bg-background/70">
        <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-sm font-mono text-muted-foreground">
          <div className="flex items-center gap-2">
            <Terminal className="w-4 h-4 text-primary" />
            <span>© {new Date().getFullYear()} CYBERDESK • Built by devs, for devs</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={DISCORD_INVITE} className="hover:text-primary transition-smooth flex items-center gap-1">
              <MessageSquare className="w-4 h-4" /> Discord
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-smooth flex items-center gap-1">
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
