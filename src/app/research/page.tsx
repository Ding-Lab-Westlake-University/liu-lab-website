"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import HeroCarousel from "@/components/HeroCarousel";
import { researchAreas } from "@/data/research";

export default function ResearchPage() {
  const [openId, setOpenId] = useState<string | null>(
    researchAreas[0]?.id ?? null,
  );

  return (
    <div className="pt-28 pb-32">
      {/* Page header */}
      <section className="relative max-w-[1400px] mx-auto px-8 mb-20">
        {/* Desktop: background carousel on the right half */}
        <div className="hidden lg:block absolute inset-y-0 right-0 w-1/2">
          <HeroCarousel
            slides={[
              { src: "/images/research-1.jpg", alt: "Research image 1" },
              { src: "/images/research-2.jpg", alt: "Research image 2" },
              { src: "/images/research-3.jpg", alt: "Research image 3" },
            ]}
            containerClassName="h-full w-full max-w-none mt-0"
            imageWrapperClassName="h-full rounded-none overflow-hidden"
          />
        </div>

        <FadeInWhenVisible>
          <div className="relative z-10 lg:max-w-[680px]">
            <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-[-0.03em] text-[var(--heading)] leading-tight">
              Research
            </h1>
            <p className="mt-4 text-[16px] font-light text-[var(--fg-2)] max-w-lg leading-relaxed">
              We tackle fundamental open problems and build systems with
              real-world impact. Our work spans the following research directions.
            </p>
          </div>
        </FadeInWhenVisible>

        {/* Mobile: inline carousel under the header */}
        <div className="lg:hidden mt-6">
          <HeroCarousel
            slides={[
              { src: "/images/research-1.jpg", alt: "Research image 1" },
              { src: "/images/research-2.jpg", alt: "Research image 2" },
              { src: "/images/research-3.jpg", alt: "Research image 3" },
            ]}
            containerClassName="max-w-none mt-6"
            imageWrapperClassName="relative aspect-[16/9] rounded-2xl overflow-hidden"
          />
        </div>
      </section>

      {/* Accordion sections */}
      <section className="max-w-[1400px] mx-auto px-8">
        <div className="divide-y divide-[var(--border)]">
          {researchAreas.map((area, idx) => {
            const isOpen = openId === area.id;
            return (
              <FadeInWhenVisible key={area.id} delay={idx * 0.05}>
                <div id={area.id} className="py-2">
                  <button
                    className="w-full flex items-start md:items-center justify-between gap-6 py-6 text-left cursor-pointer group"
                    onClick={() => setOpenId(isOpen ? null : area.id)}
                    aria-expanded={isOpen}
                  >
                    <div className="flex-1">
                      <h2 className="text-[clamp(1.4rem,3vw,2.2rem)] font-bold tracking-[-0.025em] text-[var(--fg)] group-hover:text-[var(--heading)] transition-colors leading-tight">
                        {area.title}
                      </h2>
                      <p className="mt-1.5 text-[14px] text-[var(--fg-2)] font-light leading-relaxed max-w-2xl">
                        {area.summary}
                      </p>
                    </div>
                    {/* Open/close indicator */}
                    <div
                      className={`w-6 h-6 flex-shrink-0 mt-1 relative transition-transform duration-300 ${
                        isOpen ? "rotate-45" : ""
                      }`}
                    >
                      <span className="absolute top-1/2 left-0 w-full h-[1.5px] bg-[var(--fg-2)] -translate-y-1/2" />
                      <span className="absolute left-1/2 top-0 h-full w-[1.5px] bg-[var(--fg-2)] -translate-x-1/2" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{
                          duration: 0.35,
                          ease: [0.25, 0.1, 0.25, 1],
                        }}
                        className="overflow-hidden"
                      >
                        <div className="pb-8 grid grid-cols-1 md:grid-cols-5 gap-8">
                          <p className="text-[15px] text-[var(--fg)] leading-relaxed font-light md:col-span-3">
                            {area.details}
                          </p>
                          {area.image && (
                            <div className="md:col-span-2 relative aspect-video rounded-xl overflow-hidden bg-[var(--bg-off)]">
                              <Image
                                src={area.image}
                                alt={area.title}
                                fill
                                className="object-cover img-grayscale"
                                sizes="(max-width: 768px) 100vw, 40vw"
                              />
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeInWhenVisible>
            );
          })}
        </div>
      </section>
    </div>
  );
}
