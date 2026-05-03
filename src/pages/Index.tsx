/* ============================================================
   📚 AULA: Página Inicial (Index.tsx)
   ============================================================
   Este arquivo é a sua "página principal". Pense nele como uma
   apresentação de slides empilhados de cima para baixo:

     1. <header>        → barra fixa no topo (logo + menu)
     2. <section> Hero  → título grande + botões + terminal
     3. <section> Stats → números de impacto
     4. <section> Feat. → grid de cards com features
     5. <section> CTA   → convite final pra entrar no Discord
     6. <footer>        → rodapé com links

   COMO EDITAR:
     - Para mudar o NOME do servidor, edite a constante
       SERVER_NAME logo abaixo.
     - Para trocar o link de convite, edite DISCORD_INVITE.
     - Para adicionar/remover features, edite o array `features`.
     - Para mudar números do servidor, edite o array `stats`.
     - As cores vêm de src/index.css (--primary, --accent, etc.)
   ============================================================ */

import { Button } from "@/components/ui/button";
import {
  Code2, Shield, Terminal, Users, Zap, BookOpen,
  Bug, Cpu, MessageSquare, Github, ArrowRight, Lock, CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import MatrixRain from "@/components/MatrixRain";
import FeatureCard from "@/components/FeatureCard";
import TerminalWindow from "@/components/TerminalWindow";
import heroBg from "@/assets/hero-cyberpunk.jpg";

// ============= CONFIGURAÇÕES (edite aqui) =============
const SERVER_NAME = "CYBER WORLD";
// 👇 Troque pelo link real do convite. Pode deixar como está enquanto não tiver.
const DISCORD_INVITE = "https://discord.gg/cyberworld";

// === Lista de features (cada item vira um card) ===
// Para adicionar: copie um objeto, cole no final e mude os campos.
const features = [
  { icon: Code2,        title: "Canais por Stack",   description: "Salas dedicadas para JavaScript, Python, Rust, Go, C++ e muito mais." },
  { icon: Shield,       title: "CyberSecurity",      description: "CTFs, pentest, blue team, red team. A galera da segurança tá toda aqui." },
  { icon: Terminal,     title: "DevOps & Cloud",     description: "Docker, Kubernetes, AWS, Linux. Compartilhe scripts, configs e dicas." },
  { icon: Bug,          title: "Bug Bounty",         description: "Discussão de CVEs, write-ups e oportunidades em programas de bounty." },
  { icon: Cpu,          title: "AI & Machine Learning", description: "LLMs, prompt engineering e projetos colaborativos de IA." },
  { icon: BookOpen,     title: "Estudos & Mentoria", description: "Trilhas, cursos, code reviews e roadmaps para iniciantes." },
  { icon: Users,        title: "Networking Real",    description: "Devs do Brasil inteiro. Vagas, freelas e parcerias rolam direto." },
  { icon: MessageSquare,title: "Eventos & Lives",    description: "Workshops, hackathons, code battles e palestras com profissionais." },
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
    /* relative + overflow-x-hidden = base segura para elementos absolutos */
    <div className="relative min-h-screen overflow-x-hidden">
      {/* Chuva de código no fundo */}
      <MatrixRain />

      {/* ==========================================================
          1) HEADER FIXO
          - backdrop-blur dá efeito de vidro fosco
          - z-50 garante que fica acima de tudo
          ========================================================== */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <nav className="container mx-auto flex items-center justify-between py-3 sm:py-4 px-4">
          {/* LOGO */}
          <Link to="/" className="flex items-center gap-2 group min-w-0">
            <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-md bg-gradient-cyber flex items-center justify-center shadow-neon group-hover:animate-pulse-glow shrink-0">
              <Terminal className="w-4 h-4 sm:w-5 sm:h-5 text-primary-foreground" />
            </div>
            <span className="font-display font-black text-base sm:text-xl tracking-wider truncate">
              CYBER<span className="text-gradient-cyber">WORLD</span>
            </span>
          </Link>

          {/* LINKS DE NAVEGAÇÃO (escondidos no mobile com `hidden md:flex`) */}
          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-mono">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">./features</a>
            <a href="#stats" className="text-muted-foreground hover:text-primary transition-smooth">./community</a>
            <Link to="/verify" className="text-muted-foreground hover:text-primary transition-smooth">./verify</Link>
          </div>

          {/* BOTÃO DO HEADER → leva para verificação */}
          <Button asChild size="sm" className="bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono shrink-0">
            <Link to="/verify">
              <span className="hidden sm:inline">Entrar</span>
              <span className="sm:hidden">Join</span>
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </nav>
      </header>

      {/* ==========================================================
          2) HERO — primeira coisa que o usuário vê
          - grid muda de 1 coluna (mobile) para 2 (desktop)
          ========================================================== */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        {/* Imagem de fundo + overlay escuro */}
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt="Hacker em ambiente cyberpunk com código em tela"
            className="w-full h-full object-cover opacity-30"
            width={1920}
            height={1080}
            loading="eager"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          {/* === Coluna esquerda: textos + CTA === */}
          <div className="space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Tag pequena estilo terminal */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/5 text-xs font-mono text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              SISTEMA ONLINE • COMUNIDADE ATIVA
            </div>

            {/* Título principal — único <h1> da página (importante para SEO) */}
            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05]">
              <span className="block text-foreground">Bem-vindo ao</span>
              <span className="block text-gradient-cyber text-glow">{SERVER_NAME}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              O servidor Discord definitivo para{" "}
              <span className="text-primary font-semibold">desenvolvedores</span>,{" "}
              <span className="text-secondary font-semibold">hackers éticos</span> e{" "}
              <span className="text-accent font-semibold">profissionais de cybersec</span>.
              Compile conhecimento. Debugue carreiras. Execute conexões.
            </p>

            {/* Botões de ação - empilham no mobile, lado a lado no sm+ */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button asChild size="lg" className="bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono text-base group">
                <Link to="/verify">
                  <Shield className="mr-2 w-5 h-5" />
                  VERIFICAR & ENTRAR
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-smooth font-mono text-base">
                <a href="#features">
                  <Code2 className="mr-2 w-5 h-5" />
                  VER FEATURES
                </a>
              </Button>
            </div>
          </div>

          {/* === Coluna direita: terminal animado === */}
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-cyber opacity-20 blur-3xl -z-10" />
            <TerminalWindow />
          </div>
        </div>
      </section>

      {/* ==========================================================
          3) STATS — números de impacto
          ========================================================== */}
      <section id="stats" className="py-12 sm:py-16 border-y border-border bg-card/30 backdrop-blur-sm">
        <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-gradient-cyber group-hover:text-glow transition-smooth">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ==========================================================
          4) FEATURES — grid responsivo
          ========================================================== */}
      <section id="features" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <div className="inline-block px-3 py-1 rounded-full border border-accent/40 bg-accent/5 text-xs font-mono text-accent mb-4">
              {"// FEATURES"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              Tudo que um <span className="text-gradient-cyber">dev</span> precisa
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Mais de 40 canais organizados por tema, comunidade ativa 24/7 e zero
              toxicidade. Esse é o nosso compromisso.
            </p>
          </div>

          {/* 1 coluna no mobile → 2 no sm → 3 no md → 4 no lg */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f) => (
              <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} />
            ))}
          </div>
        </div>
      </section>

      {/* ==========================================================
          5) CTA FINAL — convite + verificação
          ========================================================== */}
      <section id="join" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber opacity-10 blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center p-6 sm:p-10 md:p-14 rounded-2xl border border-primary/40 bg-card/50 backdrop-blur-md shadow-neon">
            <div className="inline-flex w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-cyber items-center justify-center mb-6 shadow-neon-strong animate-float">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black mb-4">
              Pronto para fazer <span className="text-gradient-cyber">login</span>?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto">
              Antes de entrar, é só passar pela verificação rápida com Discord. É grátis,
              seguro e leva menos de 30 segundos.
            </p>

            {/* Lista de garantias */}
            <ul className="grid sm:grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8 text-left text-xs sm:text-sm">
              {["Sem spam", "Sem senha gravada", "Adição automática"].map((it) => (
                <li key={it} className="flex items-center gap-2 justify-center sm:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-muted-foreground font-mono">{it}</span>
                </li>
              ))}
            </ul>

            {/* Bloco "comando" estilo terminal */}
            <div className="font-mono text-xs sm:text-sm bg-background/80 border border-border rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-left overflow-x-auto">
              <span className="text-muted-foreground">$ </span>
              <span className="text-accent">curl -X JOIN </span>
              <span className="text-primary">cyberworld.gg</span>
              <span className="animate-blink text-primary">_</span>
            </div>

            <Button asChild size="lg" className="bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 group w-full sm:w-auto">
              <Link to="/verify">
                <Zap className="mr-2 w-5 h-5" />
                EXECUTAR ./verify.sh
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ==========================================================
          6) FOOTER
          ========================================================== */}
      <footer className="border-t border-border py-6 sm:py-8 backdrop-blur-sm bg-background/70">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono text-muted-foreground">
          <div className="flex items-center gap-2 text-center md:text-left">
            <Terminal className="w-4 h-4 text-primary" />
            <span>© {new Date().getFullYear()} CYBER WORLD • Built by devs, for devs</span>
          </div>
          <div className="flex items-center gap-4">
            <a href={DISCORD_INVITE} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-smooth flex items-center gap-1">
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
