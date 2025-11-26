import { useParams, Link } from "react-router-dom";
import { Calendar, Clock, ArrowLeft, Tag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogPostBySlug } from "@/data/blogPosts";
import NotFound from "./NotFound";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <NotFound />;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <article className="section-container pt-32">
        <div className="max-w-4xl mx-auto">
          {/* Back button */}
          <Link to="/#blog">
            <Button variant="ghost" className="mb-8 gap-2 hover:bg-accent/10">
              <ArrowLeft className="h-4 w-4" />
              Volver al blog
            </Button>
          </Link>

          {/* Header */}
          <header className="mb-12">
            <Badge className="mb-4 bg-accent/10 text-accent hover:bg-accent/20 border-accent/20">
              {post.category}
            </Badge>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              {post.title}
            </h1>
            
            <p className="text-xl text-muted-foreground mb-6">
              {post.excerpt}
            </p>
            
            <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground pb-6 border-b border-border">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} de lectura</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-foreground">{post.author}</span>
              </div>
            </div>
          </header>

          {/* Featured image */}
          <div className="relative aspect-video mb-12 rounded-lg overflow-hidden">
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="prose prose-lg prose-slate dark:prose-invert max-w-none mb-12">
            {post.content.split('\n').map((paragraph, index) => {
              // Handle headers
              if (paragraph.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-3xl font-bold mt-8 mb-4">
                    {paragraph.substring(2)}
                  </h1>
                );
              }
              if (paragraph.startsWith('## ')) {
                return (
                  <h2 key={index} className="text-2xl font-bold mt-8 mb-4">
                    {paragraph.substring(3)}
                  </h2>
                );
              }
              if (paragraph.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-xl font-bold mt-6 mb-3">
                    {paragraph.substring(4)}
                  </h3>
                );
              }
              
              // Handle code blocks
              if (paragraph.startsWith('```')) {
                const endIndex = post.content.indexOf('```', post.content.indexOf(paragraph) + 3);
                if (endIndex !== -1) {
                  const codeContent = post.content.substring(
                    post.content.indexOf(paragraph) + paragraph.length + 1,
                    endIndex
                  );
                  return (
                    <pre key={index} className="bg-muted p-4 rounded-lg overflow-x-auto my-4">
                      <code className="text-sm">{codeContent}</code>
                    </pre>
                  );
                }
              }
              
              // Handle bullet points
              if (paragraph.trim().startsWith('- ')) {
                return (
                  <li key={index} className="ml-6 mb-2">
                    {paragraph.substring(2)}
                  </li>
                );
              }
              
              // Handle regular paragraphs
              if (paragraph.trim()) {
                return (
                  <p key={index} className="mb-4 leading-relaxed">
                    {paragraph}
                  </p>
                );
              }
              
              return null;
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-12 pb-12 border-b border-border">
            <Tag className="h-4 w-4 text-muted-foreground mr-2" />
            {post.tags.map((tag) => (
              <Badge
                key={tag}
                variant="outline"
                className="hover:bg-accent/10 hover:border-accent transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
          </div>

          {/* CTA */}
          <div className="text-center py-12 bg-gradient-primary rounded-lg">
            <h3 className="text-2xl font-bold mb-4">
              ¿Te gustó este artículo?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Descubre más contenido sobre desarrollo backend, arquitectura y mejores prácticas
            </p>
            <Link to="/#blog">
              <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground">
                Ver más artículos
              </Button>
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </div>
  );
};

export default BlogPost;
