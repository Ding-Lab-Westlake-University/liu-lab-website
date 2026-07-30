import Link from "next/link";
import { site } from "@/data/site";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="max-w-[1400px] mx-auto px-8 py-14 grid grid-cols-1 md:grid-cols-3 gap-10">
        <div>
          <p className="text-[18px] font-[700] mb-2" style={{ fontFamily: 'var(--font-heading)' }}>
            {site.name}
          </p>
          <p className="text-[14px] muted leading-relaxed">{site.fullName}</p>
        </div>

        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-3">Navigation</p>
          <ul className="flex flex-col gap-2">
            {[
              { href: "/research", label: "Research" },
              { href: "/publications", label: "Publications" },
              { href: "/team", label: "Team" },
              { href: "/news", label: "News" },
              { href: "/lab-life", label: "Lab Life" },
              { href: "/contact", label: "Contact" },
            ].map(({ href, label }) => (
              <li key={href}>
                <Link href={href} className="text-[14px] hover:underline">
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-[12px] font-semibold uppercase tracking-widest mb-3">Contact</p>
          <a href={`mailto:${site.contact.email}`} className="block mb-3 text-[14px]">
            {site.contact.email}
          </a>
          <p className="text-[14px] whitespace-pre-line leading-relaxed">
            {site.contact.address}
          </p>

          <div className="flex gap-3 mt-4">
            {site.links.github && (
              <a href={site.links.github} target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-8 pb-8 text-center">
        <p className="text-[13px] muted">© {year} {site.name}. All rights reserved.</p>
      </div>
    </footer>
  );
}
