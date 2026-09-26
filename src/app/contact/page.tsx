import type { Metadata } from "next";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import { site } from "@/data/site";

export const metadata: Metadata = {
  title: "Contact",
};

export default function ContactPage() {
  return (
    <div className="pt-28 pb-32">
      {/* Page header */}
      <section className="max-w-[1400px] mx-auto px-8 mb-20">
        <FadeInWhenVisible>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-[-0.03em] text-[var(--heading)] leading-tight">
            Contact
          </h1>
          <p className="mt-4 text-[15px] font-light text-[var(--fg-2)] max-w-md leading-relaxed">
            We welcome enquiries from prospective students, collaborators, and
            members of the press.
          </p>
        </FadeInWhenVisible>
      </section>

      {/* Contact info + address */}
      <section className="max-w-[1400px] mx-auto px-8 mb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <FadeInWhenVisible>
            <div>
              <h2 className="text-[12px] font-semibold text-[var(--fg-2)] uppercase tracking-widest mb-6">
                Get in Touch
              </h2>
              <a
                href={`mailto:${site.contact.email}`}
                className="text-[clamp(1.1rem,2.5vw,1.5rem)] font-semibold text-[var(--fg)] hover:text-[var(--heading)] underline underline-offset-4 decoration-[var(--border)] hover:decoration-[var(--fg)] transition-all duration-200 tracking-tight"
              >
                {site.contact.email}
              </a>
              <p className="mt-8 text-[14px] text-[var(--fg-2)] font-light whitespace-pre-line leading-[1.8]">
                {site.contact.address}
              </p>
            </div>
          </FadeInWhenVisible>

          {/* Map placeholder or embed */}
          <FadeInWhenVisible delay={0.08}>
            <div>
              <h2 className="text-[12px] font-semibold text-[var(--fg-2)] uppercase tracking-widest mb-6">
                Location
              </h2>
              {site.contact.mapEmbedUrl ? (
                <iframe
                  src={site.contact.mapEmbedUrl}
                  className="w-full aspect-video rounded-2xl border border-[var(--border)]"
                  loading="lazy"
                  title="Lab location map"
                  style={{ filter: "grayscale(100%)" }}
                />
              ) : (
                <div className="w-full aspect-video rounded-2xl bg-[var(--bg-off)] flex items-center justify-center">
                  <p className="text-[13px] text-[var(--fg-2)]">
                    Add a Google Maps embed URL to{" "}
                    <code className="font-mono text-[12px] bg-[var(--border)] px-1.5 py-0.5 rounded">
                      src/data/site.ts
                    </code>
                  </p>
                </div>
              )}
            </div>
          </FadeInWhenVisible>
        </div>
      </section>

      {/* Media and outreach */}
      <section
        id="media"
        className="max-w-[1400px] mx-auto px-8 mb-24 scroll-mt-20"
      >
        <FadeInWhenVisible>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.025em] text-[var(--fg)] mb-3">
            Media &amp; Outreach
          </h2>
          <p className="text-[15px] font-light text-[var(--fg-2)] max-w-lg mb-12 leading-relaxed">
            Follow the lab and listen to conversations featuring members of our
            team.
          </p>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-6">
          <FadeInWhenVisible>
            <a
              href={site.media.xiaohongshu.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group block p-8 bg-[var(--bg-off)] rounded-2xl h-full"
            >
              <p className="text-[12px] font-semibold text-[var(--fg-2)] uppercase tracking-widest mb-4">
                Xiaohongshu
              </p>
              <h3 className="text-[24px] font-semibold text-[var(--fg)] tracking-tight group-hover:underline underline-offset-4">
                {site.media.xiaohongshu.name}
              </h3>
              <p className="mt-3 text-[14px] text-[var(--fg-2)] font-light">
                View the account ↗
              </p>
            </a>
          </FadeInWhenVisible>

          <div className="grid grid-cols-1 gap-3">
            {site.media.podcasts.map((episode, i) => (
              <FadeInWhenVisible key={episode.url} delay={i * 0.05}>
                <a
                  href={episode.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 bg-[var(--bg-off)] rounded-2xl"
                >
                  <p className="text-[12px] font-semibold text-[var(--fg-2)] uppercase tracking-widest mb-2">
                    Podcast · {episode.show}
                  </p>
                  <h3 className="text-[15px] font-semibold text-[var(--fg)] leading-relaxed group-hover:underline underline-offset-4">
                    {episode.title} ↗
                  </h3>
                </a>
              </FadeInWhenVisible>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section
        id="openings"
        className="max-w-[1400px] mx-auto px-8 scroll-mt-20"
      >
        <FadeInWhenVisible>
          <h2 className="text-[clamp(1.8rem,4vw,3rem)] font-bold tracking-[-0.025em] text-[var(--fg)] mb-3">
            Open Positions
          </h2>
          <p className="text-[15px] font-light text-[var(--fg-2)] max-w-lg mb-12 leading-relaxed">
            We are actively recruiting motivated individuals at all levels.
            Please send your CV and a brief statement of research interest to{" "}
            <a
              href={`mailto:${site.contact.email}`}
              className="text-[var(--fg)] underline underline-offset-2 decoration-[var(--border)] hover:decoration-[var(--fg)] transition-all"
            >
              {site.contact.email}
            </a>
            .
          </p>
        </FadeInWhenVisible>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {site.openPositions.map((pos, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.07}>
              <div className="p-8 bg-[var(--bg-off)] rounded-2xl h-full">
                <h3 className="text-[16px] font-semibold text-[var(--fg)] tracking-tight mb-3">
                  {pos.title}
                </h3>
                <p className="text-[14px] text-[var(--fg-2)] font-light leading-relaxed">
                  {pos.description}
                </p>
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>
    </div>
  );
}
