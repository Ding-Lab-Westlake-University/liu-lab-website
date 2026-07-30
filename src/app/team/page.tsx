import type { Metadata } from "next";
import FadeInWhenVisible from "@/components/FadeInWhenVisible";
import TeamCard from "@/components/TeamCard";
import { pi, currentMembers, alumni } from "@/data/team";

export const metadata: Metadata = {
  title: "Team",
};

const roleSections = [
  { title: "Postdoc", keywords: ["postdoc", "postdoctoral"] },
  { title: "RA", keywords: ["ra"] },
  { title: "Administrative", keywords: ["administrative", "admin"] },
  { title: "PHD", keywords: ["phd", "ph.d"] },
  { title: "Undergraduate", keywords: ["undergraduate"] },
  { title: "Visiting", keywords: ["visiting"] },
];

function roleMatches(role: string, keywords: string[]) {
  const lower = role.toLowerCase();
  return keywords.some((keyword) => {
    if (keyword === "ra") return /\bra\b/i.test(role);
    return lower.includes(keyword);
  });
}

export default function TeamPage() {
  const groupedCurrentMembers = roleSections
    .map((section) => ({
      ...section,
      members: currentMembers.filter((member) =>
        roleMatches(member.role, section.keywords),
      ),
    }))
    .filter((section) => section.members.length > 0);

  return (
    <div className="pt-28 pb-32">
      {/* Page header */}
      <section className="max-w-[1400px] mx-auto px-8 mb-20 section-compact">
        <FadeInWhenVisible>
          <h1 className="text-[clamp(2.5rem,6vw,5rem)] font-extrabold tracking-[-0.03em] text-[var(--heading)] leading-tight">
            Team
          </h1>
          <p className="mt-4 text-[16px] font-light text-[var(--fg-2)] max-w-lg leading-relaxed">
            A diverse group of researchers united by curiosity and rigour. Hover
            over a card to see research interests.
          </p>
        </FadeInWhenVisible>
      </section>

      {/* PI */}
      <section className="max-w-[1400px] mx-auto px-8 mb-20 section-compact">
        <FadeInWhenVisible>
          <h2 className="text-[13px] font-semibold text-[var(--fg-2)] uppercase tracking-widest mb-10">
            Principal Investigator
          </h2>
        </FadeInWhenVisible>

        <FadeInWhenVisible delay={0.05}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
            <TeamCard member={pi} large />
            <div className="max-w-lg text-center sm:text-left">
              {pi.email && (
                <a
                  href={`mailto:${pi.email}`}
                  className="mt-3 inline-block text-[14px] text-[var(--fg-2)] hover:text-[var(--fg)] transition-colors duration-200"
                >
                  {pi.email}
                </a>
              )}
              {pi.interests && (
                <p className="mt-3 text-[15px] text-[var(--fg-2)] font-light leading-relaxed">
                  {pi.interests}
                </p>
              )}
            </div>
          </div>
        </FadeInWhenVisible>
      </section>

      {/* Current members */}
      {groupedCurrentMembers.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-8 mb-20 section-compact">
          <FadeInWhenVisible>
            <h2 className="text-[13px] font-semibold text-[var(--fg-2)] uppercase tracking-widest mb-10">
              Current Members
            </h2>
          </FadeInWhenVisible>

          {groupedCurrentMembers.map((section, sectionIdx) => (
            <div
              key={section.title}
              className={sectionIdx === groupedCurrentMembers.length - 1 ? "" : "mb-14"}
            >
              <FadeInWhenVisible delay={sectionIdx * 0.03}>
                <h3 className="text-[18px] font-semibold text-[var(--fg)] tracking-tight mb-7">
                  {section.title}
                </h3>
              </FadeInWhenVisible>

              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
                {section.members.map((member, i) => (
                  <FadeInWhenVisible key={member.name} delay={i * 0.05}>
                    <TeamCard member={member} />
                  </FadeInWhenVisible>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      {/* Alumni */}
      {alumni.length > 0 && (
        <section className="max-w-[1400px] mx-auto px-8 section-compact">
          <FadeInWhenVisible>
            <h2 className="text-[13px] font-semibold text-[var(--fg-2)] uppercase tracking-widest mb-10">
              Alumni
            </h2>
          </FadeInWhenVisible>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-x-8 gap-y-12">
            {alumni.map((member, i) => (
              <FadeInWhenVisible key={i} delay={i * 0.05}>
                <TeamCard member={member} />
              </FadeInWhenVisible>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
