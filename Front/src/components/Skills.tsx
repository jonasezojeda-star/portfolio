import { Code2, Database, Server, Cloud, Lock, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";

const Skills = () => {
  const skillCategories = [
    {
      icon: <Server className="h-8 w-8" />,
      title: "Backend Development",
      skills: ["Node.js", "Python", "Java", "PHP", "Ruby"],
    },
    {
      icon: <Database className="h-8 w-8" />,
      title: "Databases",
      skills: ["PostgreSQL", "MongoDB", "MySQL", "Redis", "Firebase"],
    },
    {
      icon: <Cloud className="h-8 w-8" />,
      title: "Cloud & DevOps",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD", "Terraform"],
    },
    {
      icon: <Code2 className="h-8 w-8" />,
      title: "APIs & Frameworks",
      skills: ["Express", "Django", "FastAPI", "GraphQL", "REST"],
    },
    {
      icon: <Lock className="h-8 w-8" />,
      title: "Security",
      skills: ["OAuth", "JWT", "SSL/TLS", "Encryption", "OWASP"],
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Performance",
      skills: ["Caching", "Load Balancing", "CDN", "Optimization", "Monitoring"],
    },
  ];

  return (
    <section id="skills" className="section-container bg-secondary/30">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Skills & <span className="gradient-text">Tecnologías</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Herramientas y tecnologías que domino para construir soluciones backend robustas
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {skillCategories.map((category, index) => (
          <Card
            key={index}
            className="p-6 card-hover border-border bg-card"
          >
            <div className="flex flex-col gap-4">
              <div className="text-accent">{category.icon}</div>
              <h3 className="text-xl font-semibold">{category.title}</h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="tech-badge text-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Skills;
