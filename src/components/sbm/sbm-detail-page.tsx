"use client";

import Link from "next/link";
import { Globe } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { TaskPostCard } from "@/components/shared/task-post-card";
import { RichContent } from "@/components/shared/rich-content";
import { SchemaJsonLd } from "@/components/seo/schema-jsonld";
import type { SitePost } from "@/lib/site-connector";
import { TaskKey } from "@/lib/site-config";

type PostContent = {
  category?: string;
  location?: string;
  address?: string;
  website?: string;
  phone?: string;
  email?: string;
  description?: string;
  body?: string;
  excerpt?: string;
  author?: string;
  highlights?: string[];
  logo?: string;
  images?: string[];
  latitude?: number | string;
  longitude?: number | string;
  companyName?: string;
  brandName?: string;
  name?: string;
  strategy?: string;
  followingCount?: number;
  followersCount?: number;
  watchlistCount?: number;
};

interface SbmDetailPageProps {
  task: TaskKey;
  taskConfig?: { label?: string; route?: string };
  post: SitePost;
  content: PostContent;
  category: string;
  descriptionHtml: string;
  location?: string;
  related: SitePost[];
  schemaPayload: any;
}

export function SbmDetailPage({
  task,
  taskConfig,
  post,
  content,
  category,
  descriptionHtml,
  location,
  related,
  schemaPayload,
}: SbmDetailPageProps) {
  // Helper function to build post URLs
  const buildPostUrl = (taskKey: TaskKey, slug: string) => {
    const route = taskConfig?.route || `/${taskKey}`;
    return `${route}/${slug}`;
  };

  return (
    <>
      <SchemaJsonLd data={schemaPayload} />

      {/* Back Link */}
      <Link
        href={taskConfig?.route || "/"}
        className="mb-6 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
      >
        ← Back to {taskConfig?.label || "posts"}
      </Link>

      {/* Main Card Container */}
      <div className="space-y-6">
        {/* Header Card - Inspired by reference layout */}
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-gray-800 to-gray-900 text-white shadow-lg">
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-bold leading-tight sm:text-3xl">
              {post.title} | {content.companyName || content.brandName || content.name || "Professor"}
            </h1>
          </div>
        </section>

        {/* Description Card */}
        <section className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm">
          <div className="p-6 sm:p-8">
            <div className="space-y-4">
              <RichContent html={descriptionHtml} className="text-base leading-relaxed text-foreground" />
              
              {content.website && (
                <div className="pt-4">
                  <a
                    href={content.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    <Globe className="mr-2 h-4 w-4" />
                    {content.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>

        
        {/* Related Content Card */}
        {related.length ? (
          <section className="overflow-hidden rounded-2xl border border-border/60 bg-white shadow-sm">
            <div className="p-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-foreground">More in {category}</h2>
                {taskConfig?.route ? (
                  <Link href={taskConfig.route} className="text-sm text-muted-foreground hover:text-foreground">
                    View all
                  </Link>
                ) : null}
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => (
                  <TaskPostCard key={item.id} post={item} href={buildPostUrl(task, item.slug)} taskKey={task} compact />
                ))}
              </div>
            </div>
          </section>
        ) : null}
      </div>
    </>
  );
}
