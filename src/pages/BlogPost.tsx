import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User, Tag } from "lucide-react";
import { getPostBySlug, getPublishedPosts } from "@/data/blogData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  // Get related posts (same tags, excluding current)
  const relatedPosts = getPublishedPosts()
    .filter(
      (p) =>
        p.id !== post.id && p.tags.some((tag) => post.tags.includes(tag))
    )
    .slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Article Header */}
      <article>
        <header className="pt-32 pb-8 px-4 bg-gradient-to-b from-primary/5 to-background">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Blog
              </Link>

              <div className="flex flex-wrap gap-2 mb-4">
                {post.tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="capitalize"
                  >
                    <Tag className="w-3 h-3 mr-1" />
                    {tag.replace("-", " ")}
                  </Badge>
                ))}
              </div>

              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
                {post.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </span>
                <span className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {new Date(post.publishedAt).toLocaleDateString("en-IN", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
                <span className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {post.readingTime} min read
                </span>
              </div>
            </ScrollReveal>
          </div>
        </header>

        {/* Featured Image */}
        <div className="px-4 mb-12">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal delay={0.1}>
              <div className="aspect-video rounded-2xl overflow-hidden shadow-xl">
                <img
                  src={post.featuredImage}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pb-16">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal delay={0.2}>
              <div
                className="prose prose-lg dark:prose-invert max-w-none
                  prose-headings:font-display prose-headings:text-foreground
                  prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4
                  prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3
                  prose-p:text-muted-foreground prose-p:leading-relaxed
                  prose-li:text-muted-foreground
                  prose-strong:text-foreground
                  prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                  prose-hr:border-border prose-hr:my-8"
                dangerouslySetInnerHTML={{
                  __html: post.content
                    .replace(/^## /gm, "<h2>")
                    .replace(/^### /gm, "<h3>")
                    .replace(/<h2>/g, "</p><h2>")
                    .replace(/<h3>/g, "</p><h3>")
                    .replace(/<\/h2>/g, "</h2><p>")
                    .replace(/<\/h3>/g, "</h3><p>")
                    .replace(/\n\n/g, "</p><p>")
                    .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
                    .replace(/- (.*?)(?=\n|$)/g, "<li>$1</li>")
                    .replace(/(<li>.*<\/li>)+/g, "<ul>$&</ul>")
                    .replace(/✓/g, "<span class='text-green-600'>✓</span>")
                    .replace(/---/g, "<hr>")
                    .replace(/^\d\. /gm, (match) => `<strong>${match}</strong>`),
                }}
              />
            </ScrollReveal>

            {/* Author Card */}
            <ScrollReveal delay={0.3}>
              <Card className="mt-12 border-primary/20 bg-primary/5">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center">
                      <User className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        Written by
                      </p>
                      <p className="font-display font-semibold text-foreground">
                        {post.author}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {post.authorRole}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </ScrollReveal>

            {/* CTA */}
            <ScrollReveal delay={0.4}>
              <div className="mt-12 p-8 rounded-2xl bg-gradient-to-br from-primary to-primary/80 text-primary-foreground text-center">
                <h3 className="font-display text-2xl font-bold mb-2">
                  Ready to Start Your Recovery?
                </h3>
                <p className="mb-6 opacity-90">
                  Book a consultation with our expert physiotherapists today.
                </p>
                <Link to="/#contact-form">
                  <Button
                    size="lg"
                    variant="secondary"
                    className="font-semibold"
                  >
                    Book Appointment
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </article>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-16 px-4 bg-muted/30">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="font-display text-2xl font-bold text-foreground mb-8 text-center">
                Related Articles
              </h2>
            </ScrollReveal>

            <div className="grid gap-6 md:grid-cols-2">
              {relatedPosts.map((relatedPost, index) => (
                <ScrollReveal key={relatedPost.id} delay={index * 0.1}>
                  <Link to={`/blog/${relatedPost.slug}`}>
                    <Card className="group h-full overflow-hidden hover:shadow-lg transition-all">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={relatedPost.featuredImage}
                          alt={relatedPost.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-display font-semibold text-foreground group-hover:text-primary transition-colors">
                          {relatedPost.title}
                        </h3>
                        <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                          {relatedPost.excerpt}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default BlogPost;
