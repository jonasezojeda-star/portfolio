import { ExternalLink, Github } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ecommerceImg from "@/assets/projects/ecommerce-api.jpg";
import microservicesImg from "@/assets/projects/microservices-analytics.jpg";
import oauthImg from "@/assets/projects/oauth-system.jpg";
import graphqlImg from "@/assets/projects/graphql-cms.jpg";

const Projects = () => {
  const projects = [
    {
      title: "API RESTful E-commerce",
      description: "Sistema backend completo para plataforma de comercio electrónico con autenticación, pagos y gestión de inventario.",
      tech: ["Node.js", "Express", "PostgreSQL", "Redis"],
      github: "https://github.com",
      demo: "https://example.com",
      image: ecommerceImg,
    },
    {
      title: "Microservicios de Analytics",
      description: "Arquitectura de microservicios para procesamiento de datos en tiempo real con alta escalabilidad.",
      tech: ["Python", "FastAPI", "MongoDB", "RabbitMQ"],
      github: "https://github.com",
      demo: "https://example.com",
      image: microservicesImg,
    },
    {
      title: "Sistema de Autenticación OAuth",
      description: "Servicio de autenticación centralizado con OAuth 2.0, JWT y autenticación multifactor.",
      tech: ["Java", "Spring Boot", "MySQL", "Docker"],
      github: "https://github.com",
      demo: "https://example.com",
      image: oauthImg,
    },
    {
      title: "API GraphQL CMS",
      description: "Sistema de gestión de contenidos con API GraphQL, caché inteligente y optimización de consultas.",
      tech: ["Node.js", "GraphQL", "PostgreSQL", "AWS"],
      github: "https://github.com",
      demo: "https://example.com",
      image: graphqlImg,
    },
  ];

  return (
    <section id="projects" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Proyectos <span className="gradient-text">Destacados</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Algunos de los proyectos backend en los que he trabajado
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((project, index) => (
          <Card
            key={index}
            className="overflow-hidden card-hover border-border bg-card group"
          >
            <div className="relative aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
            </div>
            <div className="p-6 flex flex-col">
              <h3 className="text-2xl font-semibold mb-3 group-hover:text-accent transition-colors">
                {project.title}
              </h3>
              <p className="text-muted-foreground mb-4 flex-grow">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech, techIndex) => (
                  <span
                    key={techIndex}
                    className="tech-badge text-xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 border-accent text-accent hover:bg-accent hover:text-accent-foreground"
                  asChild
                >
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Github className="h-4 w-4" />
                    Código
                  </a>
                </Button>
                <Button
                  size="sm"
                  className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
                  asChild
                >
                  <a href={project.demo} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4" />
                    Demo
                  </a>
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Projects;
