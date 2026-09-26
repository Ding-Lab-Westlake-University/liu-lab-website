import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import { getLabEventById, getLabEvents } from "@/data/labLife";

export async function generateStaticParams() {
  return getLabEvents().map((event) => ({ eventId: event.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ eventId: string }>;
}): Promise<Metadata> {
  const { eventId } = await params;
  const event = getLabEventById(eventId);
  if (!event) return {};
  return {
    title: `Lab Life · ${event.date}`,
    description: event.caption,
  };
}

export default async function LabLifeEventPage({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = await params;
  const event = getLabEventById(eventId);
  if (!event) notFound();

  return (
    <div className="pt-28 pb-32">
      <section className="max-w-[1400px] mx-auto px-8 mb-12">
        <FadeInWhenVisible>
          <Link
            href="/lab-life"
            className="inline-block text-[15px] text-[var(--fg-2)] hover:text-[var(--fg)] transition-colors duration-200 mb-8"
          >
            ← Back to Lab Life
          </Link>
          <h1 className="text-[clamp(2.2rem,5.4vw,3.9rem)] font-extrabold tracking-[-0.03em] text-[var(--heading)] leading-tight">
            {event.theme}
          </h1>
          <time className="mt-4 block text-[14px] text-[var(--fg-2)]">
            {event.date}
          </time>
          <p className="mt-4 text-[19px] text-[var(--fg)] whitespace-pre-line leading-relaxed max-w-4xl">
            {event.caption}
          </p>
        </FadeInWhenVisible>
      </section>

      <section className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {event.photos.map((photo, i) => (
            <FadeInWhenVisible key={photo.src} delay={i * 0.03}>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-[var(--bg-off)]">
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </FadeInWhenVisible>
          ))}
        </div>
      </section>
    </div>
  );
}
