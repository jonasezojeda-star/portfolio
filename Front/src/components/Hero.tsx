import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
      <div className="absolute inset-0 bg-gradient-primary opacity-5"></div>
      
      <div className="section-container text-center relative z-10">
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-8 duration-1000">
          <div className="inline-block">
            <span className="text-accent text-lg font-mono">Hola, soy</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
            Jonas Ojeda
          </h1>
          
          <h2 className="text-3xl md:text-4xl font-semibold gradient-text">
            Desarrollador Web Backend
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Especializado en crear arquitecturas robustas y escalables. 
            Construyo APIs eficientes y sistemas backend que impulsan experiencias digitales excepcionales.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center pt-6">
            <Button 
              onClick={() => scrollToSection("projects")}
              size="lg"
              className="bg-accent text-accent-foreground hover:bg-accent/90 shadow-glow"
            >
              Ver Proyectos
            </Button>
            <Button 
              onClick={() => scrollToSection("contact")}
              size="lg"
              variant="outline"
              className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
            >
              Contactar
            </Button>
          </div>

          <div className="flex gap-6 justify-center pt-8">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Github className="h-6 w-6" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Linkedin className="h-6 w-6" />
            </a>
            <a 
              href="mailto:jonas@example.com"
              className="text-muted-foreground hover:text-accent transition-colors"
            >
              <Mail className="h-6 w-6" />
            </a>
          </div>
        </div>

        <button
          onClick={() => scrollToSection("skills")}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce"
        >
          <ArrowDown className="h-6 w-6 text-accent" />
        </button>
      </div>
    </section>
  );
};

export default Hero;
