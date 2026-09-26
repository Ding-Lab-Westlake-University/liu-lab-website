import Image from "next/image";
import type { PreschoolMember } from "@/data/team";

interface PreschoolCardProps {
  member: PreschoolMember;
}

export default function PreschoolCard({ member }: PreschoolCardProps) {
  return (
    <div className="flex flex-col items-center text-center">
      <div
        className="relative w-36 h-36 overflow-hidden rounded-2xl shadow-sm"
      >
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover transition-transform duration-500 hover:scale-105"
          sizes="144px"
        />
      </div>

      <p
        className="mt-3 text-[16px] font-[600] text-[var(--color-text)] tracking-tight"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {member.name}
      </p>
    </div>
  );
}
