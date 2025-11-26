import { Calendar, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { blogPosts } from "@/data/blogPosts";

const Blog = () => {

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section id="blog" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Blog & <span className="gradient-text">Artículos</span>
        </h2>
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
          Comparto conocimientos y experiencias sobre desarrollo backend
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        {blogPosts.map((post, index) => (
          <Link to={`/blog/${post.slug}`} key={index}>
            <Card className="overflow-hidden card-hover border-border bg-card group h-full">

            <div className="relative aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-card/90 to-transparent" />
              <div className="absolute top-4 right-4 px-3 py-1 bg-accent/90 text-accent-foreground text-xs font-medium rounded-full">
                {post.category}
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="text-xl font-bold mb-3 group-hover:text-accent transition-colors">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground mb-4 line-clamp-2">
                {post.excerpt}
              </p>
              
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{formatDate(post.date)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime}</span>
                </div>
              </div>
              
              <div className="flex items-center gap-2 text-accent group-hover:gap-3 transition-all">
                <span className="font-medium">Leer más</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
            </Card>
          </Link>
        ))}
      </div>

      <div className="text-center mt-12">
        <Link to="/blog">
          <Button
            size="lg"
            variant="outline"
            className="border-accent text-accent hover:bg-accent hover:text-accent-foreground"
          >
            Ver todos los artículos
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default Blog;
