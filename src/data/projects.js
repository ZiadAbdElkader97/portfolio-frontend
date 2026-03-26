import alosheshaImg from "../assets/images/aloshesha.png";
import joyaImg from "../assets/images/joya.png";
import kontainarImg from "../assets/images/kontainar.png";
import luqmanImg from "../assets/images/luqman.png";
import tasabImg from "../assets/images/tasab.png";
import zistiloForexImg from "../assets/images/zistilo-forex-app.jpg";
import zistiloPortfolioImg from "../assets/images/zistilo-portfolio.jpg";

export const projects = [
  {
    id: "tasab",
    slug: "tasab",
    title: "TASAB",
    shortTitle: "TASAB",
    descKey: "projectDescTasab",
    locationKey: "projectLocEgypt",
    live: "https://encouraging-ivory-badger.192-250-229-149.cpanel.site/",
    icon: "school",
    tags: ["Education", "LMS", "Arabic"],
    coverImage: tasabImg,
    gradient: { angle: 125, stops: ["#0c1929", "#134e6f", "#0A7EA4", "#13DEB9"] },
  },
  {
    id: "kontainar",
    slug: "kontainar",
    title: "KONTAINAR",
    shortTitle: "KONTAINAR",
    descKey: "projectDescKontainar",
    locationKey: "projectLocSaudiArabia",
    live: "https://kontainar.com/",
    icon: "shopping",
    tags: ["E‑commerce", "Store", "Arabic"],
    coverImage: kontainarImg,
    gradient: { angle: 132, stops: ["#0f1419", "#1e2a3a", "#4570EA", "#49BEFF"] },
  },
  {
    id: "aloshesha",
    slug: "aloshesha",
    title: "Aloshesha",
    shortTitle: "Aloshesha",
    descKey: "projectDescAloshesha",
    locationKey: "projectLocSaudiArabia",
    live: "https://aloshesha.com/",
    icon: "store",
    tags: ["Retail", "Vape", "Saudi Arabia"],
    coverImage: alosheshaImg,
    gradient: { angle: 118, stops: ["#120a18", "#2d1b3d", "#6b21a8", "#c4b5fd"] },
  },
  {
    id: "joya",
    slug: "joya",
    title: "Joya Real Estate",
    shortTitle: "Joya",
    descKey: "projectDescJoya",
    locationKey: "projectLocEgypt",
    live: "https://joya-realestate.com/",
    icon: "realestate",
    tags: ["Real Estate", "Marketing", "Red Sea"],
    coverImage: joyaImg,
    gradient: { angle: 138, stops: ["#1a1208", "#4a3728", "#b8956a", "#e8dcc8"] },
  },
  {
    id: "luqman",
    slug: "luqman",
    title: "LUQMAN",
    shortTitle: "LUQMAN",
    descKey: "projectDescLuqman",
    locationKey: "projectLocJordan",
    live: "https://qa.luqmanai.tailnet/app/",
    icon: "web",
    tags: ["Web", "Jordan", "Arabic"],
    coverImage: luqmanImg,
    gradient: { angle: 122, stops: ["#0c1a1f", "#134854", "#0f766e", "#2dd4bf"] },
  },
  {
    id: "zistilo",
    slug: "zistilo",
    title: "Zistilo Portfolio",
    shortTitle: "Zistilo",
    descKey: "projectDescZistiloPortfolio",
    locationKey: "projectLocGermany",
    live: "https://zistilo-group-app.vercel.app/",
    icon: "web",
    tags: ["React", "Motion", "Brand"],
    coverImage: zistiloPortfolioImg,
    gradient: { angle: 120, stops: ["#0d1117", "#253662", "#5D87FF", "#539BFF"] },
  },
  {
    id: "forex",
    slug: "forex",
    title: "Zistilo Forex App",
    shortTitle: "Forex",
    descKey: "projectDescForex",
    locationKey: "projectLocGermany",
    live: "https://zistilo-forex-app.vercel.app/",
    icon: "trending",
    tags: ["React", "Charts", "Real-time"],
    coverImage: zistiloForexImg,
    gradient: { angle: 128, stops: ["#0a1628", "#1e3a5f", "#5D87FF", "#49BEFF"] },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug) ?? null;
}
