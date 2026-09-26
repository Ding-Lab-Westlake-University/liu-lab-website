export type Author = { name: string; labMember?: boolean };

export type Publication = {
  year: number;
  title: string;
  authors: Author[];
  venue: string;
  /** Optional path under `/public` for the publication title page or header image */
  titleImage?: string;
  pdfUrl?: string;
  codeUrl?: string;
  doiUrl?: string;
};

export const publications: Publication[] = [
  // ── 2026 ──────────────────────────────────────────────────
  {
    year: 2026,
    title:
      "In Vivo Calcium Imaging with a Miniaturized Microscope in the Hypothalamus for Understanding Social Behaviors in Mice",
    authors: [
      { name: "Yu Yuki DAI", labMember: true },
      { name: "Chenxin WEI", labMember: true },
      { name: "Yibo YUAN", labMember: true },
      { name: "Mohammed Mostafizur RAHMAN" },
      { name: "Ding LIU", labMember: true },
    ],
    venue: "Journal of Visualized Experiments (JoVE).",
    doiUrl:
      "https://www.jove.com/t/70401/in-vivo-calcium-imaging-with-miniaturized-microscope-hypothalamus-for",
    titleImage: "/images/publications/jove-2026.png",
  },

  // ── 2025 ──────────────────────────────────────────────────
  {
    year: 2025,
    title:
      "A hypothalamic circuit underlying the dynamic control of social homeostasis.",
    authors: [
      { name: "D Liu", labMember: true },
      { name: "M Rahman" },
      { name: "A Johnson" },
      { name: "R Amo" },
      { name: "I Tsutsui-Kimura" },
      { name: "ZA Sullivan" },
    ],
    venue: "Nature 640 (8060), 1000–1010.",
    pdfUrl: "",
    doiUrl: "https://www.nature.com/articles/s41586-025-08617-8",
    titleImage: "/images/publications/nature-2025.png",
  },

  // ── 2022 ──────────────────────────────────────────────────
  {
    year: 2022,
    title:
      "A preoptic neuronal population controls fever and appetite during sickness.",
    authors: [
      { name: "JA Osterhout" },
      { name: "V Kapoor" },
      { name: "SW Eichhorn" },
      { name: "E Vaughn" },
      { name: "JD Moore" },
      { name: "D Liu", labMember: true },
      { name: "D Lee" },
    ],
    venue: "Nature 606 (7916), 937–944.",
    pdfUrl: "",
    doiUrl: "https://doi.org/10.1038/s41586-022-04793-z",
    titleImage: "/images/publications/nature-2022.png",
  },

  // ── 2014 ──────────────────────────────────────────────────
  {
    year: 2014,
    title:
      "Medial prefrontal activity during delay period contributes to learning of a working memory task.",
    authors: [
      { name: "D Liu", labMember: true },
      { name: "X Gu" },
      { name: "J Zhu" },
      { name: "X Zhang" },
      { name: "Z Han" },
      { name: "W Yan" },
      { name: "Q Cheng" },
      { name: "J Hao" },
      { name: "H Fan" },
    ],
    venue: "Science 346 (6208), 458–463.",
    pdfUrl: "",
    doiUrl: "https://doi.org/10.1126/science.1256573",
    titleImage: "/images/publications/science-2014.png",
  },
];
