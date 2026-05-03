/**
 * ============================================================================
 * PÁGINA INICIAL (home) — src/pages/HomePage.tsx
 * ============================================================================
 * É a landing: menu fixo, hero, números, cards de features, CTA, rodapé.
 *
 * ┌─ ONDE MEXER (checklist para iniciante) ─────────────────────────────────┐
 * │                                                                         │
 * │  A) LOGO + FAVICON                                                      │
 * │     · Coloque sua imagem em:  public/logo.svg   ou   public/logo.png   │
 * │     · Ajuste a constante LOGO_SRC abaixo se usar outro nome de arquivo. │
 * │     · O favicon da aba é o mesmo arquivo (veja index.html, <link icon>).  │
 * │                                                                         │
 * │  B) NOME DO SERVIDOR (texto no menu e títulos)                          │
 * │     · Edite SERVER_NAME e, se quiser, o <span> do menu (linha do Link).  │
 * │                                                                         │
 * │  C) LINK DO CONVITE DISCORD                                             │
 * │     · DISCORD_INVITE — usado nos botões do rodapé.                      │
 * │                                                                         │
 * │  D) LISTA DE “FEATURES” (cards)                                         │
 * │     · Array `features` — cada item = um card.                            │
 * │     · `icon:` vem de lucide-react (importe o ícone no topo se trocar).  │
 * │                                                                         │
 * │  E) NÚMEROS DO BANNER (stats)                                           │
 * │     · Array `stats` — value + label.                                    │
 * │                                                                         │
 * │  F) IMAGEM DE FUNDO DO HERO                                             │
 * │     · Arquivo: src/assets/hero-cyberpunk.jpg (substitua a imagem).     │
 * │                                                                         │
 * │  G) CORES E FONTE DO SITE TODO                                          │
 * │     · src/index.css  (variáveis --primary, --accent, etc.)              │
 * │     · tailwind.config.ts  (nomes de animação, fontes)                    │
 * │                                                                         │
 * └─────────────────────────────────────────────────────────────────────────┘
 */

import { Button } from "@/components/ui/button";
import {
  Activity,
  Bot,
  Code2,
  Shield,
  Terminal,
  Users,
  Zap,
  BookOpen,
  Bug,
  Cpu,
  MessageSquare,
  Github,
  ArrowRight,
  Lock,
  CheckCircle2,
  Hash,
  Radio,
  Menu,
} from "lucide-react";
import { Link } from "react-router-dom";
import MatrixRain from "@/components/MatrixRainBackground";
import FeatureCard from "@/components/FeatureCard";
import TerminalWindow from "@/components/TerminalPreview";
import BackgroundAudio from "@/components/BackgroundAudio";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useReveal } from "@/hooks/useReveal";
import { useDiscordStats } from "@/hooks/useDiscordStats";
import heroBg from "@/assets/hero-cyberpunk.jpg";

// ─── Configuração rápida (edite aqui) ───────────────────────────────────────

/** Texto curto do servidor (aparece no título grande e no rodapé). */
const SERVER_NAME = "CYBER WORLD";

/**
 * Arquivo na pasta public/ — ícone do menu, rodapé e favicon (via index.html).
 * Exemplos: "/logo.svg"  |  "/logo.png"  |  "/minha-marca.webp"
 * Para usar a logo do servidor (Cyber world.jpeg), use: "/server-logo.jpg"
 */
const LOGO_SRC = "/server-logo.jpg";

/**
 * Cards da seção “features”.
 * title / description = textos exibidos.
 * icon = componente de ícone importado de "lucide-react" (deve estar no import acima).
 */
const features = [
  { icon: Code2, title: "Canais por Stack", description: "Salas dedicadas para JavaScript, Python, Rust, Go, C++ e muito mais." },
  { icon: Shield, title: "CyberSecurity", description: "CTFs, pentest, blue team, red team. A galera da segurança tá toda aqui." },
  { icon: Terminal, title: "DevOps & Cloud", description: "Docker, Kubernetes, AWS, Linux. Compartilhe scripts, configs e dicas." },
  { icon: Bug, title: "Bug Bounty", description: "Discussão de CVEs, write-ups e oportunidades em programas de bounty." },
  { icon: Cpu, title: "AI & Machine Learning", description: "LLMs, prompt engineering e projetos colaborativos de IA." },
  { icon: BookOpen, title: "Estudos & Mentoria", description: "Trilhas, cursos, code reviews e roadmaps para iniciantes." },
  { icon: Users, title: "Networking Real", description: "Devs do Brasil inteiro. Vagas, freelas e parcerias rolam direto." },
  { icon: MessageSquare, title: "Eventos & Lives", description: "Workshops, hackathons, code battles e palestras com profissionais." },
];

const HomePage = () => {
  // Animações ao rolar a página — cada bloco tem seu próprio “sensor” de visibilidade
  const heroReveal = useReveal<HTMLDivElement>();
  const statsReveal = useReveal<HTMLDivElement>();
  const featuresHeader = useReveal<HTMLDivElement>();
  const ctaReveal = useReveal<HTMLDivElement>();
  const {
    loading: loadingDiscordStats,
    error: discordStatsError,
    memberCount,
    onlineCount,
    channelCount,
    guildName,
    guildIconUrl,
    inviteUrl,
  } = useDiscordStats();

  const stats = [
    {
      value: loadingDiscordStats ? "..." : memberCount?.toLocaleString("pt-BR") ?? "N/A",
      label: "Membros Reais",
      icon: Users,
    },
    {
      value: loadingDiscordStats ? "..." : onlineCount?.toLocaleString("pt-BR") ?? "N/A",
      label: "Online Agora",
      icon: Activity,
    },
    {
      value: loadingDiscordStats ? "..." : channelCount?.toLocaleString("pt-BR") ?? "N/A",
      label: "Canais Ativos",
      icon: Hash,
    },
    {
      value: loadingDiscordStats ? "..." : "Live",
      label: "Auto Update 60s",
      icon: Radio,
    },
  ];

  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <MatrixRain />
      <BackgroundAudio 
        src="/audio/cyberpunk-bg.mp3" 
        volume={0.15} 
        autoPlay={true}
      />

      {/* Barra superior fixa: logo + links âncora + botão */}
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/70 border-b border-border">
        <nav className="container mx-auto flex items-center justify-between py-3 sm:py-4 px-4">
          <Link to="/" className="flex items-center gap-2 group min-w-0">
            {/* Logo: troque o arquivo em public/ ou LOGO_SRC no topo deste arquivo */}
            <img
              src={LOGO_SRC}
              alt={`${SERVER_NAME} — logo`}
              width={40}
              height={40}
              className="h-9 w-9 sm:h-10 sm:w-10 rounded-md object-cover shadow-neon ring-1 ring-primary/30 shrink-0"
              decoding="async"
            />
            <span className="font-display font-black text-base sm:text-xl tracking-wider truncate">
              CYBER<span className="text-gradient-cyber">WORLD</span>
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-mono">
            <a href="#features" className="text-muted-foreground hover:text-primary transition-smooth">
              ./features
            </a>
            <a href="#stats" className="text-muted-foreground hover:text-primary transition-smooth">
              ./community
            </a>
            <Link to="/verify" className="text-muted-foreground hover:text-primary transition-smooth">
              ./verify
            </Link>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button
                aria-label="Abrir menu"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/70 bg-background/90 text-foreground shadow-sm transition hover:border-primary/80 hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary/50 md:mr-2"
              >
                <Menu className="h-5 w-5" />
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" sideOffset={6} className="mt-2">
              <DropdownMenuItem asChild>
                <Link to="/">Home</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link to="/verify">Verificar</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <a href={inviteUrl} target="_blank" rel="noreferrer">Discord</a>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            asChild
            size="sm"
            className="bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono shrink-0"
          >
            <Link to="/verify">
              <span className="hidden sm:inline">Entrar</span>
              <span className="sm:hidden">Join</span>
              <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </Button>
        </nav>
      </header>

      {/* Hero: imagem de fundo + coluna de texto + terminal fake */}
      <section className="relative pt-28 sm:pt-32 pb-16 sm:pb-20 overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <img
            src={heroBg}
            alt="Hacker em ambiente cyberpunk com código em tela"
            className="w-full h-full object-cover opacity-30"
            width={1920}
            height={1080}
            loading="eager"
            decoding="async"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
        </div>

        <div className="container mx-auto px-4 grid lg:grid-cols-2 gap-10 lg:gap-12 items-center">
          <div
            ref={heroReveal.ref}
            className={`space-y-6 sm:space-y-8 text-center lg:text-left ${heroReveal.visible ? "animate-fade-in-up" : "reveal-hidden"}`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary/40 bg-primary/10 text-xs font-mono text-primary">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              VISUAL REFORMULADO • DADOS REAIS DO DISCORD
            </div>

            <h1 className="font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black leading-[1.05]">
              <span className="block text-foreground">Bem-vindo ao</span>
              <span className="block text-gradient-cyber text-glow">{SERVER_NAME}</span>
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Um hub dark moderno para{" "}
              <span className="text-primary font-semibold">desenvolvedores</span>,{" "}
              <span className="text-secondary font-semibold">hackers éticos</span> e{" "}
              <span className="text-accent font-semibold">profissionais de cybersec</span>, com
              métricas da comunidade em tempo real.
            </p>

            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 justify-center lg:justify-start">
              <Button
                asChild
                size="lg"
                className="bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono text-base group"
              >
                <Link to="/verify">
                  <Shield className="mr-2 w-5 h-5" />
                  VERIFICAR & ENTRAR
                  <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 hover:border-primary transition-smooth font-mono text-base"
              >
                <a href="#stats">
                  <Activity className="mr-2 w-5 h-5" />
                  VER STATUS LIVE
                </a>
              </Button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-cyber opacity-30 blur-3xl -z-10 animate-pulse" />
            <TerminalWindow />
          </div>
        </div>
      </section>

      <section id="stats" className="py-12 sm:py-16 border-y border-border bg-card/30 backdrop-blur-sm">
        <div
          ref={statsReveal.ref}
          className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8"
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{ animationDelay: statsReveal.visible ? `${i * 100}ms` : undefined }}
              className={`text-center group hover-lift ${statsReveal.visible ? "animate-scale-in" : "reveal-hidden"}`}
            >
              <div className="mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-card/70">
                <stat.icon className="h-5 w-5 text-primary" />
              </div>
              <div className="font-display text-3xl sm:text-4xl md:text-5xl font-black text-gradient-cyber group-hover:text-glow transition-spring">
                {stat.value}
              </div>
              <div className="mt-2 text-xs sm:text-sm font-mono text-muted-foreground uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        {discordStatsError && (
          <p className="container mx-auto mt-6 px-4 text-center text-xs font-mono text-muted-foreground">
            Nao foi possivel atualizar tudo em tempo real. Ative o widget do Discord para liberar total de canais.
          </p>
        )}
      </section>

      <section className="py-10 sm:py-12">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl rounded-2xl border border-primary/30 bg-card/60 p-5 shadow-neon backdrop-blur-xl sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <img
                  src={guildIconUrl || LOGO_SRC}
                  alt={`${guildName} icon`}
                  className="h-16 w-16 rounded-2xl border border-primary/30 object-cover shadow-neon"
                  loading="lazy"
                  decoding="async"
                />
                <div>
                  <p className="text-xs font-mono uppercase tracking-[0.2em] text-accent">Discord Bot Feed</p>
                  <h3 className="font-display text-2xl font-black text-gradient-cyber">{guildName}</h3>
                  <p className="text-sm text-muted-foreground">Avatar e dados sincronizados automaticamente</p>
                </div>
              </div>
              <Button asChild className="bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono">
                <a href={inviteUrl} target="_blank" rel="noopener noreferrer">
                  <Bot className="mr-2 h-4 w-4" />
                  ENTRAR NO DISCORD
                </a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="py-16 sm:py-24">
        <div className="container mx-auto px-4">
          <div
            ref={featuresHeader.ref}
            className={`text-center max-w-2xl mx-auto mb-12 sm:mb-16 ${featuresHeader.visible ? "animate-fade-in-up" : "reveal-hidden"}`}
          >
            <div className="inline-block px-3 py-1 rounded-full border border-accent/40 bg-accent/5 text-xs font-mono text-accent mb-4">
              {"// FEATURES"}
            </div>
            <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-4">
              Tudo que um <span className="text-gradient-cyber">dev</span> precisa
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground">
              Mais de 40 canais organizados por tema, comunidade ativa 24/7 e zero toxicidade. Esse é o nosso compromisso.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {features.map((f, i) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.description}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="join" className="py-16 sm:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-cyber opacity-10 blur-3xl" />

        <div className="container mx-auto px-4 relative">
          <div
            ref={ctaReveal.ref}
            className={`max-w-3xl mx-auto text-center p-6 sm:p-10 md:p-14 rounded-2xl border border-primary/40 bg-card/50 backdrop-blur-md shadow-neon ${ctaReveal.visible ? "animate-scale-in" : "reveal-hidden"}`}
          >
            <div className="inline-flex w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-cyber items-center justify-center mb-6 shadow-neon-strong animate-float">
              <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-primary-foreground" />
            </div>

            <h2 className="font-display text-2xl sm:text-3xl md:text-5xl font-black mb-4">
              Pronto para fazer <span className="text-gradient-cyber">login</span>?
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 max-w-xl mx-auto">
              Antes de entrar, é só passar pela verificação rápida com Discord. É grátis, seguro e leva menos de 30 segundos.
            </p>

            <ul className="grid sm:grid-cols-3 gap-2 sm:gap-3 mb-6 sm:mb-8 text-left text-xs sm:text-sm">
              {["Sem spam", "Sem senha gravada", "Adição automática"].map((it) => (
                <li key={it} className="flex items-center gap-2 justify-center sm:justify-start">
                  <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                  <span className="text-muted-foreground font-mono">{it}</span>
                </li>
              ))}
            </ul>

            <div className="font-mono text-xs sm:text-sm bg-background/80 border border-border rounded-lg p-3 sm:p-4 mb-6 sm:mb-8 text-left overflow-x-auto">
              <span className="text-muted-foreground">$ </span>
              <span className="text-accent">curl -X JOIN </span>
              <span className="text-primary">{guildName.toLowerCase().replace(/\s+/g, "")}.gg</span>
              <span className="animate-blink text-primary">_</span>
            </div>

            <Button
              asChild
              size="lg"
              className="bg-gradient-cyber hover:shadow-neon-strong transition-smooth font-mono text-base sm:text-lg px-6 sm:px-8 py-5 sm:py-6 group w-full sm:w-auto"
            >
              <Link to="/verify">
                <Zap className="mr-2 w-5 h-5" />
                EXECUTAR ./verify.sh
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-smooth" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <footer className="border-t border-border py-6 sm:py-8 backdrop-blur-sm bg-background/70">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-mono text-muted-foreground">
          <div className="flex items-center gap-2 text-center md:text-left">
            <img
              src={LOGO_SRC}
              alt=""
              width={16}
              height={16}
              className="h-4 w-4 rounded object-cover opacity-90"
              decoding="async"
              aria-hidden
            />
            <span>
              © {new Date().getFullYear()} {SERVER_NAME} • Built by devs, for devs
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a
              href={inviteUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth flex items-center gap-1"
            >
              <MessageSquare className="w-4 h-4" /> Discord
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-primary transition-smooth flex items-center gap-1"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
