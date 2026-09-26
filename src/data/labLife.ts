import fs from "fs";
import path from "path";

export interface LabPhoto {
  src: string;
  alt: string;
}

export interface LabEventConfig {
  id: string;
  date: string;
  sortDate: string;
  theme: string;
  caption: string;
  prefix: string;
}

export interface LabEvent extends LabEventConfig {
  photos: LabPhoto[];
  coverPhoto: LabPhoto;
}

const labEventConfigs: LabEventConfig[] = [
  {
    id: "2026-09-10",
    date: "2026-09-10",
    sortDate: "2026-09-10",
    theme: "Teacher's Day 2026",
    caption: "Celebrating Teacher's Day together at Westlake University.",
    prefix: "20260910-teachers-day-",
  },
  {
    id: "2026-08-07-zhang-lab-gathering",
    date: "August 2026",
    sortDate: "2026-08-07",
    theme: "Beginning of Autumn Gathering with Zhang Lab",
    caption: "A joint beginning-of-autumn gathering with Zhang Lab.",
    prefix: "202608-zhang-lab-",
  },
  {
    id: "2026-summer-program",
    date: "July 16-22, 2026",
    sortDate: "2026-07-22",
    theme: "International Summer Program",
    caption:
      "Our lab hosted the Biology Track for international high school students during the Westlake University Summer Program.",
    prefix: "202607-summer-program-",
  },
  {
    id: "2026-02-15",
    date: "2026-02-15",
    sortDate: "2026-02-15",
    theme: "New Lab, New Year",
    caption: "Celebrating the opening of our new lab and the Lunar New Year.",
    prefix: "02152026-",
  },
  {
    id: "2025-09-10",
    date: "2025-09-10",
    sortDate: "2025-09-10",
    theme: "Our First Teacher's Day",
    caption: "Celebrating our lab's first Teacher's Day.",
    prefix: "202509第一次教师节-",
  },
  {
    id: "2025-11-01",
    date: "2025-11-01",
    sortDate: "2025-11-01",
    theme: "Our First Autumn Outing",
    caption: "Our first autumn outing as a lab.",
    prefix: "202511第一次秋游-",
  },
  {
    id: "2026-04-01",
    date: "2026-04-01",
    sortDate: "2026-04-01",
    theme: "Our First Spring Outing",
    caption: "Our first spring outing as a lab.",
    prefix: "202604第一次春游-",
  },
];

function getAllPhotoPrefixes(): string[] {
  const dirs = [
    { dir: path.join(process.cwd(), "public/lab-life"), url: "/lab-life/" },
    { dir: path.join(process.cwd(), "public/images/lab-life"), url: "/images/lab-life/" },
  ];
  const exts = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

  const prefixes = new Set<string>();
  dirs.forEach(({ dir }) => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach((file) => {
      if (!exts.includes(path.extname(file).toLowerCase())) return;
      const match = file.match(/^(.+?-)\d+\.[^.]+$/);
      if (match) prefixes.add(match[1]);
    });
  });

  return [...prefixes].sort();
}

function parseDateFromPrefix(prefix: string): { id: string; date: string } | null {
  const sanitized = prefix.replace(/-+$/, "");
  const mmddyyyyMatch = sanitized.match(/^(\d{2})(\d{2})(\d{4})$/);
  if (mmddyyyyMatch) {
    const [, month, day, year] = mmddyyyyMatch;
    return {
      id: `${year}-${month}-${day}`,
      date: `${year}-${Number(month)}-${Number(day)}`,
    };
  }

  const yyyymmddMatch = sanitized.match(/^(\d{4})(\d{2})(\d{2})$/);
  if (yyyymmddMatch) {
    const [, year, month, day] = yyyymmddMatch;
    return {
      id: `${year}-${month}-${day}`,
      date: `${year}-${Number(month)}-${Number(day)}`,
    };
  }

  return null;
}

function buildConfigFromPrefix(prefix: string): LabEventConfig {
  const parsed = parseDateFromPrefix(prefix);
  if (parsed) {
    return {
      id: parsed.id,
      date: parsed.date,
      sortDate: parsed.id,
      theme: "Lab Life",
      caption: `A collection of lab life photos from ${parsed.date}.`,
      prefix,
    };
  }

  const fallbackId = prefix.replace(/[^a-zA-Z0-9]+/g, "-").replace(/-+$/, "");
  return {
    id: fallbackId,
    date: fallbackId,
    sortDate: "0000-01-01",
    theme: "Lab Life",
    caption: "A collection of lab life photos.",
    prefix,
  };
}

function getPhotosByPrefix(prefix: string): LabPhoto[] {
  const dirs = [
    { dir: path.join(process.cwd(), "public/lab-life"), url: "/lab-life/" },
    { dir: path.join(process.cwd(), "public/images/lab-life"), url: "/images/lab-life/" },
  ];
  const exts = [".jpg", ".jpeg", ".png", ".webp", ".avif"];

  const found: { file: string; url: string }[] = [];
  dirs.forEach(({ dir, url }) => {
    if (!fs.existsSync(dir)) return;
    fs.readdirSync(dir).forEach((file) => {
      if (!file.startsWith(prefix)) return;
      if (!exts.includes(path.extname(file).toLowerCase())) return;
      found.push({ file, url });
    });
  });

  found.sort((a, b) => {
    const aNum = Number(a.file.replace(prefix, "").replace(/\.[^.]+$/, ""));
    const bNum = Number(b.file.replace(prefix, "").replace(/\.[^.]+$/, ""));
    if (Number.isNaN(aNum) || Number.isNaN(bNum)) return a.file.localeCompare(b.file);
    return aNum - bNum;
  });

  // Deduplicate files by filename (in case the same filename exists in multiple
  // public folders). Keep the first occurrence (dirs are ordered with
  // `public/lab-life` first so it takes precedence).
  const uniqueByFile = Array.from(new Map(found.map((f) => [f.file, f])).values());

  return uniqueByFile.map(({ file, url }) => ({
    src: `${url}${file}`,
    alt: file.replace(/\.[^.]+$/, "").replace(/[-_]/g, " "),
  }));
}

export function getLabEvents(): LabEvent[] {
  const explicitPrefixes = labEventConfigs.map((config) => config.prefix);
  const inferredConfigs = getAllPhotoPrefixes()
    .filter((prefix) => !explicitPrefixes.includes(prefix))
    .map(buildConfigFromPrefix);

  const allConfigs = [...labEventConfigs, ...inferredConfigs];

  return allConfigs
    .map((config) => {
      const photos = getPhotosByPrefix(config.prefix);
      if (photos.length === 0) return null;
      return {
        ...config,
        photos,
        coverPhoto: photos[0],
      };
    })
    .filter((event): event is LabEvent => event !== null)
    .sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}

export function getLabEventById(eventId: string): LabEvent | undefined {
  return getLabEvents().find((event) => event.id === eventId);
}
