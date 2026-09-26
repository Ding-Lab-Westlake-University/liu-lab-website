import fs from "fs";
import path from "path";
import Link from "next/link";
import matter from "gray-matter";
import type { Metadata } from "next";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";

export const metadata: Metadata = {
  title: "News",
};

type NewsItem = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
};

function getAllNews(): NewsItem[] {
  const newsDir = path.join(process.cwd(), "content/news");
  if (!fs.existsSync(newsDir)) return [];

  const files = fs.readdirSync(newsDir).filter((f) => f.endsWith(".mdx"));
  const items = files.map((file) => {
    const raw = fs.readFileSync(path.join(newsDir, file), "utf-8");
    const { data } = matter(raw);
    return {
      slug: file.replace(/\.mdx$/, ""),
      title: data.title ?? "Untitled",
      date: data.date ?? "",
      excerpt: data.excerpt ?? "",
    };
  });

  return items.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}

export default function NewsPage() {
  const items = getAllNews();

  return (
    <div className="pt-28 pb-32">
      {/* Page header */}
      <section className="max-w-[1400px] mx-auto px-8 !py-0 mb-14">
        <FadeInWhenVisible>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-[-0.03em] text-[var(--heading)] leading-tight">
            News
          </h1>
          <p className="mt-4 text-[15px] font-light text-[var(--fg-2)] max-w-md leading-relaxed">
            Updates from the lab — new papers, awards, and announcements.
          </p>
        </FadeInWhenVisible>
      </section>

      {/* News list */}
      <section className="max-w-[1400px] mx-auto px-8 !py-0">
        {items.length === 0 ? (
          <FadeInWhenVisible>
            <p className="text-[15px] text-[var(--color-muted)]">No news posts yet.</p>
          </FadeInWhenVisible>
        ) : (
          <div className="flex flex-col gap-6">
            {items.map((item, i) => (
              <FadeInWhenVisible key={item.slug} delay={i * 0.05}>
                <Link href={`/news/${item.slug}`} className="news-card">
                  <div className="news-date">
                    <div className="text-sm">{new Date(item.date).toLocaleString('en-US', { month: 'short' }).toUpperCase()}</div>
                    <div className="text-2xl mt-1">{new Date(item.date).getDate()}</div>
                  </div>

                  <div>
                    <h3 className="text-[18px] font-semibold text-[var(--color-text)]">{item.title}</h3>
                    {item.excerpt && <p className="mt-2 text-[14px] text-[var(--color-muted)] leading-relaxed">{item.excerpt}</p>}
                  </div>
                </Link>
              </FadeInWhenVisible>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
