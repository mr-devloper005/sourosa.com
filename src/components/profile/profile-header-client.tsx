"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Share2, Check } from "lucide-react";

interface ProfileHeaderClientProps {
  brandName: string;
  companyName?: string;
  descriptionHtml: string;
}

export function ProfileHeaderClient({ brandName, companyName, descriptionHtml }: ProfileHeaderClientProps) {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    const url = window.location.href;
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy URL:", err);
    }
  };

  return (
    <div className="flex-1">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground sm:text-3xl">{brandName}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{companyName || "Company Inc"}</p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full border-border px-4 font-medium hover:bg-muted"
            onClick={handleShare}
          >
            {copied ? (
              <>
                <Check className="mr-1.5 h-4 w-4" />
                Copied
              </>
            ) : (
              <>
                <Share2 className="mr-1.5 h-4 w-4" />
                Share
              </>
            )}
          </Button>
          <Link href="/login">
            <Button
              variant="outline"
              size="sm"
              className="rounded-full border-border px-6 font-medium hover:bg-muted"
            >
              Follow
            </Button>
          </Link>
        </div>
      </div>

      {/* Description */}
      <article
        className="article-content prose prose-slate mt-4 max-w-2xl text-sm leading-relaxed text-foreground prose-p:my-2 prose-a:text-primary prose-a:underline"
        dangerouslySetInnerHTML={{ __html: descriptionHtml }}
      />
    </div>
  );
}
