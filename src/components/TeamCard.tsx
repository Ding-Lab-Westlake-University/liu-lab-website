import Image from "next/image";
import type { Member } from "@/data/team";

interface TeamCardProps {
  member: Member;
  large?: boolean; // used for the PI card
}

/** Returns initials from full name (max 2 chars) */
function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export default function TeamCard({ member, large = false }: TeamCardProps) {
  return (
    <div className={`group team-card relative flex flex-col items-center text-center ${large ? 'lg:col-span-2' : ''}`}>
      <div className={`${large ? 'w-52' : 'w-full'} relative`}>
        <div className={`team-photo-wrap ${large ? 'w-52 h-52' : 'w-full'}`}>
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="team-photo"
              sizes={large ? '208px' : '160px'}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-[var(--color-surface)]">
              <span className={`font-semibold text-[var(--color-muted)] ${large ? 'text-4xl' : 'text-2xl'}`}>
                {getInitials(member.name)}
              </span>
            </div>
          )}

          <div className="team-overlay">
            <p className="text-sm leading-snug max-w-[80%]">{member.interests}</p>
          </div>
        </div>
      </div>

      <p className={`mt-3 font-[600] text-[var(--color-text)] tracking-tight ${large ? 'text-[19px]' : 'text-[16px]'}`} style={{ fontFamily: 'var(--font-heading)' }}>
        {member.website ? (
          <a href={member.website} target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-2">
            {member.name}
          </a>
        ) : (
          member.name
        )}
      </p>

      <p className={`text-[var(--color-muted)] ${large ? 'text-[15px] mt-1' : 'text-[13px] mt-0.5'}`}>
        {member.role}
      </p>
    </div>
  );
}
