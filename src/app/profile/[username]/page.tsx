import Link from "next/link";
import { notFound } from "next/navigation";
import { Footer } from "@/components/shared/footer";
import { NavbarShell } from "@/components/shared/navbar-shell";
import { ContentImage } from "@/components/shared/content-image";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import { ProfileHeaderClient } from "@/components/profile/profile-header-client";
import { buildPostUrl } from "@/lib/task-data";
import { buildPostMetadata, buildTaskMetadata } from "@/lib/seo";
import { fetchTaskPostBySlug, fetchTaskPosts } from "@/lib/task-data";
import { SITE_CONFIG } from "@/lib/site-config";
import { MapPin, Globe, MessageSquare, Heart, Bookmark } from "lucide-react";

export const revalidate = 3;

const escapeHtml = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const sanitizeRichHtml = (html: string) =>
  html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<iframe[^>]*>[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[^>]*>[\s\S]*?<\/object>/gi, "")
    .replace(/\son[a-z]+\s*=\s*(['"]).*?\1/gi, "")
    .replace(/\shref\s*=\s*(['"])javascript:.*?\1/gi, ' href="#"');

const formatRichHtml = (raw?: string | null, fallback = "Profile details will appear here once available.") => {
  const source = typeof raw === "string" ? raw.trim() : "";
  if (!source) return `<p>${escapeHtml(fallback)}</p>`;
  if (/<[a-z][\s\S]*>/i.test(source)) return sanitizeRichHtml(source);
  return source
    .split(/\n{2,}/)
    .map((paragraph) => `<p>${escapeHtml(paragraph.replace(/\n/g, " ").trim())}</p>`)
    .join("");
};

export async function generateStaticParams() {
  const posts = await fetchTaskPosts("profile", 50);
  if (!posts.length) {
    return [{ username: "placeholder" }];
  }
  return posts.map((post) => ({ username: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  try {
    const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
    return post ? await buildPostMetadata("profile", post) : await buildTaskMetadata("profile");
  } catch (error) {
    console.warn("Profile metadata lookup failed", error);
    return await buildTaskMetadata("profile");
  }
}

export default async function ProfileDetailPage({ params }: { params: Promise<{ username: string }> }) {
  const resolvedParams = await params;
  const post = await fetchTaskPostBySlug("profile", resolvedParams.username);
  if (!post) {
    notFound();
  }
  const content = (post.content || {}) as Record<string, any>;
  const logoUrl = typeof content.logo === "string" ? content.logo : undefined;
  const brandName =
    (content.brandName as string | undefined) ||
    (content.companyName as string | undefined) ||
    (content.name as string | undefined) ||
    post.title;
  const website = content.website as string | undefined;
  const domain = website ? website.replace(/^https?:\/\//, "").replace(/\/.*$/, "") : undefined;
  const description =
    (content.description as string | undefined) ||
    post.summary ||
    "Profile details will appear here once available.";
  const descriptionHtml = formatRichHtml(description);
  const suggestedArticles = await fetchTaskPosts("article", 6);
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, "");
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Profiles",
        item: `${baseUrl}/profile`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: brandName,
        item: `${baseUrl}/profile/${post.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-background">
      <NavbarShell />
      <main className="mx-auto w-full max-w-4xl px-4 pb-16 pt-6 sm:px-6 lg:px-8">
        <SchemaJsonLd data={breadcrumbData} />

        {/* Profile Header Card */}
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm">
          {/* Top Section: Logo, Name, Company, Follow Button */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
              {/* Logo */}
              <div className="flex-shrink-0">
                <div className="relative h-24 w-24 overflow-hidden rounded-xl border border-border/70 bg-white shadow-sm sm:h-28 sm:w-28">
                  {logoUrl ? (
                    <ContentImage
                      src={logoUrl}
                      alt={post.title}
                      fill
                      className="object-contain p-2"
                      sizes="112px"
                      intrinsicWidth={112}
                      intrinsicHeight={112}
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-3xl font-semibold text-muted-foreground">
                      {post.title.slice(0, 1).toUpperCase()}
                    </div>
                  )}
                </div>
              </div>

              {/* Name, Company, Follow/Share Buttons */}
              <ProfileHeaderClient
                brandName={brandName}
                companyName={content.companyName || content.name}
                descriptionHtml={descriptionHtml}
              />
            </div>
          </div>

          {/* Strategy Badge */}
          <div className="border-t border-border/60 px-6 py-3 sm:px-8">
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Strategy:</span>
              <Badge variant="secondary" className="text-xs font-medium">
                {content.strategy || content.category || "Professional"}
              </Badge>
            </div>
          </div>

          {/* Info Row: Location, Website */}
          <div className="border-t border-border/60 px-6 py-4 sm:px-8">
            <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
              {content.location || content.address ? (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{content.location || content.address}</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>United States</span>
                </div>
              )}
              {website ? (
                <div className="flex items-center gap-2">
                  <Globe className="h-4 w-4" />
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="max-w-[200px] truncate text-foreground hover:underline"
                  >
                    {website}
                  </a>
                </div>
              ) : null}
            </div>
          </div>

          {/* Stats Row */}
          <div className="border-t border-border/60 px-6 py-4 sm:px-8">
            <div className="flex items-center gap-6 text-sm">
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">{content.followingCount || 0}</span>
                <span className="text-muted-foreground">Following</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-semibold text-foreground">{content.followersCount || 0}</span>
                <span className="text-muted-foreground">Followers</span>
              </div>
            </div>
          </div>
        </section>

        {/* Tabs Section */}
        <section className="mt-6">
          <Tabs defaultValue="posts" className="w-full">
            <TabsList className="w-full justify-start rounded-none border-b border-border/60 bg-transparent p-0">
              <TabsTrigger
                value="posts"
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Posts
              </TabsTrigger>
              <TabsTrigger
                value="replies"
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Posts & Replies
              </TabsTrigger>
              <TabsTrigger
                value="liked"
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Heart className="mr-2 h-4 w-4" />
                Liked
              </TabsTrigger>
              <TabsTrigger
                value="watchlist"
                className="rounded-none border-b-2 border-transparent px-4 py-3 text-sm font-medium data-[state=active]:border-foreground data-[state=active]:bg-transparent data-[state=active]:shadow-none"
              >
                <Bookmark className="mr-2 h-4 w-4" />
                {content.watchlistCount || 0} Watchlist
              </TabsTrigger>
            </TabsList>

            <TabsContent value="posts" className="mt-6">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mt-4 text-muted-foreground">No messages</p>
              </div>
            </TabsContent>

            <TabsContent value="replies" className="mt-6">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mt-4 text-muted-foreground">No posts or replies</p>
              </div>
            </TabsContent>

            <TabsContent value="liked" className="mt-6">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4">
                  <Heart className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mt-4 text-muted-foreground">No liked posts</p>
              </div>
            </TabsContent>

            <TabsContent value="watchlist" className="mt-6">
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <div className="rounded-full bg-muted p-4">
                  <Bookmark className="h-8 w-8 text-muted-foreground" />
                </div>
                <p className="mt-4 text-muted-foreground">No items in watchlist</p>
              </div>
            </TabsContent>
          </Tabs>
        </section>

        {/* Suggested Articles */}
        {suggestedArticles.length ? (
          <section className="mt-12">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Suggested articles</h2>
              <Link href="/articles" className="text-sm font-medium text-primary hover:underline">
                View all
              </Link>
            </div>
            <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {suggestedArticles.slice(0, 3).map((article) => (
                <TaskPostCard
                  key={article.id}
                  post={article}
                  href={buildPostUrl("article", article.slug)}
                  compact
                />
              ))}
            </div>
          </section>
        ) : null}
      </main>
      <Footer />
    </div>
  );
}
