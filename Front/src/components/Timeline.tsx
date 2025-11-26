import { Briefcase, Calendar } from "lucide-react";

const Timeline = () => {
  const experiences = [
    {
      company: "Tech Solutions Inc.",
      position: "Senior Backend Developer",
      startDate: "2022-01",
      endDate: "Presente",
      description: "Liderazgo en el desarrollo de microservicios y arquitectura cloud. Implementación de CI/CD y optimización de rendimiento.",
      achievements: [
        "Reducción del 40% en tiempo de respuesta de APIs",
        "Implementación de arquitectura de microservicios",
        "Mentoría a equipo de 5 desarrolladores junior",
      ],
    },
    {
      company: "Digital Innovations Ltd.",
      position: "Backend Developer",
      startDate: "2020-03",
      endDate: "2021-12",
      description: "Desarrollo de APIs RESTful y GraphQL. Integración de servicios de terceros y optimización de bases de datos.",
      achievements: [
        "Desarrollo de 15+ APIs RESTful",
        "Migración exitosa a arquitectura serverless",
        "Implementación de sistema de caché distribuido",
      ],
    },
    {
      company: "Startup Ventures",
      position: "Junior Backend Developer",
      startDate: "2018-06",
      endDate: "2020-02",
      description: "Desarrollo de funcionalidades backend para plataforma SaaS. Mantenimiento y mejora de código existente.",
      achievements: [
        "Participación en proyecto de refactorización completa",
        "Implementación de testing automatizado",
        "Colaboración en diseño de arquitectura de datos",
      ],
    },
  ];

  // Sort by start date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const formatDate = (dateStr: string) => {
    if (dateStr === "Presente") return dateStr;
    const [year, month] = dateStr.split("-");
    const months = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  return (
    <section id="experience" className="section-container bg-secondary/30">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Experiencia <span className="gradient-text">Profesional</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Mi trayectoria en el desarrollo backend
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border md:left-1/2"></div>

          <div className="space-y-12">
            {sortedExperiences.map((exp, index) => (
              <div
                key={index}
                className={`relative flex flex-col md:flex-row gap-8 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-8 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-accent border-4 border-background z-10"></div>

                {/* Content card */}
                <div className={`flex-1 ${index % 2 === 0 ? "md:text-right" : ""}`}>
                  <div className="ml-16 md:ml-0 card-hover p-6 bg-card border border-border rounded-lg">
                    <div className="flex items-center gap-2 text-accent mb-2">
                      <Calendar className="h-4 w-4" />
                      <span className="text-sm font-medium">
                        {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                      </span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-1">{exp.position}</h3>
                    
                    <div className="flex items-center gap-2 text-muted-foreground mb-4">
                      <Briefcase className="h-4 w-4" />
                      <span className="font-medium">{exp.company}</span>
                    </div>
                    
                    <p className="text-muted-foreground mb-4">{exp.description}</p>
                    
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achIndex) => (
                        <li
                          key={achIndex}
                          className="flex items-start gap-2 text-sm"
                        >
                          <span className="text-accent mt-1">▸</span>
                          <span>{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Spacer for alternating layout */}
                <div className="hidden md:block flex-1"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
