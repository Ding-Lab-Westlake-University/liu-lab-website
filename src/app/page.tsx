import fs from "fs";
import path from "path";
import Link from "next/link";
import Image from "next/image";
import matter from "gray-matter";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import { site } from "@/data/site";
import { pi, currentMembers } from "@/data/team";

type NewsItem = { slug: string; title: string; date: string; excerpt: string };

function getLatestNews(n = 2): NewsItem[] {
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
  return items
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, n);
}

function formatDate(dateStr: string) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function HomePage() {
  const latestNews = getLatestNews(2);
  const teamPreview = [pi, ...currentMembers.slice(0, 3)];

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────── */}
      <section className="hero">
        <div className="neural-canvas" aria-hidden>
          {/* simple decorative dots positioned absolutely */}
          <span className="neural-dot" style={{ left: '12%', top: '20%', animationDelay: '0s' }} />
          <span className="neural-dot" style={{ left: '28%', top: '40%', animationDelay: '0.6s' }} />
          <span className="neural-dot" style={{ left: '48%', top: '18%', animationDelay: '1.2s' }} />
          <span className="neural-dot" style={{ left: '68%', top: '36%', animationDelay: '0.3s' }} />
          <span className="neural-dot" style={{ left: '82%', top: '60%', animationDelay: '0.9s' }} />
        </div>

        <div className="hero-inner">
          <h1 className="hero-title">
            Unveiling the <span style={{ color: 'var(--color-accent)' }}>Social Brain.</span>
          </h1>
          <p className="hero-sub">{site.fullName}</p>

          <div className="hero-ctas">
            <a href="/research" className="btn btn-primary hero-accent">Explore Research</a>
            <a href="/team" className="btn btn-outline hero-secondary">Meet the Team</a>
          </div>

          <div className="mt-8">
            <a href="#about" className="muted">Scroll down ↓</a>
          </div>
        </div>
      </section>

      {/* ── ABOUT + RESEARCH (merged) ──────────────────────────── */}
      <section className="border-t border-[var(--border)] py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <FadeInWhenVisible>
            <h2 className="text-[clamp(1.8rem,4vw,2.8rem)] font-bold tracking-[-0.025em] text-[var(--heading)] mb-6">
              {site.aboutHeading}
            </h2>
            <p className="text-[clamp(1rem,1.8vw,1.2rem)] font-light text-[var(--fg-2)] leading-[1.75] tracking-tight max-w-3xl">
              {site.description}
            </p>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.1}>
            <div className="mt-10">
              <Link
                href="/research"
                className="inline-flex items-center justify-center h-11 px-7 rounded-full border border-[var(--fg)] text-[var(--fg)] text-[14px] font-medium tracking-tight hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-200"
              >
                Explore Research Directions
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── TEAM PREVIEW ─────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <FadeInWhenVisible>
            <p className="text-[12px] font-semibold text-[var(--fg-2)] uppercase tracking-widest mb-4">
              Our Team
            </p>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-[var(--heading)] mb-12">
              The People Behind the Science
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8 mb-12">
            {teamPreview.map((member, i) => (
              <FadeInWhenVisible key={member.name} delay={i * 0.07}>
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="w-20 h-20 rounded-full bg-[var(--bg-off)] border border-[var(--border)] flex items-center justify-center overflow-hidden">
                    {member.photo ? (
                      <Image
                        src={member.photo}
                        alt={member.name}
                        width={80}
                        height={80}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-[22px] font-bold text-[var(--fg-2)]">
                        {member.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div>
                    <p className="text-[13px] font-semibold text-[var(--fg)] leading-tight">
                      {member.name}
                    </p>
                    <p className="text-[12px] text-[var(--fg-2)] mt-0.5 leading-snug">
                      {member.role.split(",")[0]}
                    </p>
                  </div>
                </div>
              </FadeInWhenVisible>
            ))}
          </div>

          <FadeInWhenVisible delay={0.1}>
            <Link
              href="/team"
              className="inline-flex items-center justify-center h-11 px-7 rounded-full border border-[var(--fg)] text-[var(--fg)] text-[14px] font-medium tracking-tight hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-200"
            >
              Meet the Full Team
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── NEWS PREVIEW ─────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <FadeInWhenVisible>
            <p className="text-[12px] font-semibold text-[var(--fg-2)] uppercase tracking-widest mb-4">
              Latest News
            </p>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-[var(--heading)] mb-12">
              What&apos;s Happening in the Lab
            </h2>
          </FadeInWhenVisible>

          <div className="flex flex-col gap-5 mb-12">
            {latestNews.map((item, i) => (
              <FadeInWhenVisible key={item.slug} delay={i * 0.08}>
                <Link
                  href={`/news/${item.slug}`}
                  className="block p-8 rounded-2xl border border-[var(--border)] bg-[var(--bg-off)] hover:border-[var(--fg)] transition-colors duration-200 group"
                >
                  <p className="text-[12px] text-[var(--fg-2)] mb-2">
                    {formatDate(item.date)}
                  </p>
                  <h3 className="text-[18px] font-semibold text-[var(--heading)] group-hover:text-[var(--fg)] transition-colors mb-2 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[var(--fg-2)] leading-relaxed">
                    {item.excerpt}
                  </p>
                </Link>
              </FadeInWhenVisible>
            ))}
          </div>

          <FadeInWhenVisible delay={0.1}>
            <Link
              href="/news"
              className="inline-flex items-center justify-center h-11 px-7 rounded-full border border-[var(--fg)] text-[var(--fg)] text-[14px] font-medium tracking-tight hover:bg-[var(--fg)] hover:text-[var(--bg)] transition-colors duration-200"
            >
              All News
            </Link>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* ── CONTACT MINI ─────────────────────────────────────────── */}
      <section className="border-t border-[var(--border)] py-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <FadeInWhenVisible>
            <h2 className="text-[clamp(1.6rem,3.5vw,2.5rem)] font-bold tracking-[-0.02em] text-[var(--heading)] mb-10">
              Get in Touch
            </h2>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.08}>
            <div className="flex flex-col sm:flex-row gap-10">
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-widest text-[var(--fg-2)] mb-2">
                  Email
                </p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="text-[16px] text-[var(--fg)] hover:text-[var(--heading)] transition-colors"
                >
                  {site.contact.email}
                </a>
              </div>
              <div>
                <p className="text-[12px] font-semibold uppercase tracking-widest text-[var(--fg-2)] mb-2">
                  Address
                </p>
                <p className="text-[14px] text-[var(--fg-2)] whitespace-pre-line leading-relaxed">
                  {site.contact.address}
                </p>
              </div>
            </div>
          </FadeInWhenVisible>
          <FadeInWhenVisible delay={0.14}>
            <div className="mt-10 flex gap-4">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center h-11 px-7 rounded-full bg-[var(--fg)] text-white text-[14px] font-medium tracking-tight hover:opacity-85 transition-opacity duration-200"
              >
                Contact Us
              </Link>
            </div>
          </FadeInWhenVisible>
        </div>
      </section>
    </>
  );
}
