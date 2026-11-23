const DAY = 24 * 60 * 60 * 1000;

const iso = (date) => {
  const d = new Date(date);
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${d.getFullYear()}-${month}-${day}`;
};

const daysAgo = (days) => iso(Date.now() - days * DAY);
const monthsAgo = (months) => {
  const d = new Date();
  d.setMonth(d.getMonth() - months);
  return iso(d);
};

const wear = (...days) => days.map(daysAgo);

export const CATEGORIES = ["tops", "bottoms", "dresses", "shoes", "accessories"];

export const CATEGORY_META = {
  all: { label: "All", icon: "grid" },
  tops: { label: "Tops", icon: "tshirt" },
  bottoms: { label: "Bottoms", icon: "walk" },
  dresses: { label: "Dresses", icon: "dress" },
  shoes: { label: "Shoes", icon: "shoe" },
  accessories: { label: "Accessories", icon: "bag" },
};

export const SEED_ITEMS = [
  {
    id: "img_001",
    name: "baggy cargo pants",
    category: "bottoms",
    brand: "abercrombie",
    color: "brown",
    size: "M",
    dateBought: monthsAgo(8),
    notes: "perfect for streetwear",
    wearHistory: wear(1, 7, 10, 14, 18, 22, 25, 28, 32, 35, 38, 42, 45, 48, 52, 55, 58, 62, 65),
  },
  {
    id: "img_006",
    name: "brown cross-body bag",
    category: "accessories",
    brand: "goodwill",
    color: "brown",
    size: "one size",
    dateBought: monthsAgo(12),
    notes: "classic purse, perfect for everyday use",
    wearHistory: wear(2, 4, 6, 8, 11, 13, 15, 17, 19, 21, 24, 26, 29, 31, 33, 36, 38, 40, 43, 45, 47, 50, 52, 55, 57, 60, 62, 67, 70, 102, 104, 106, 108, 121, 129, 138, 147, 150, 152, 162, 202, 208, 212, 224, 258, 267, 270),
  },
  {
    id: "img_007",
    name: "brown cargo skirt",
    category: "bottoms",
    brand: "old navy",
    color: "brown",
    size: "S",
    dateBought: monthsAgo(3),
    notes: "versatile mini skirt, great for work or casual",
    wearHistory: wear(2, 6, 9, 12, 15, 24, 27, 30, 33, 36, 39, 42, 45, 48, 51, 54, 57, 60),
  },
  {
    id: "img_010",
    name: "flare jeans",
    category: "bottoms",
    brand: "express",
    color: "blue",
    size: "28",
    dateBought: monthsAgo(10),
    notes: "vintage inspired, perfect fit, can wear to work",
    wearHistory: wear(8, 11, 14, 17, 20, 23, 26, 29, 32, 35, 38, 41, 102, 105, 108, 111, 114, 117, 120, 123, 126, 129, 132, 135, 138, 141, 144, 147, 150, 153, 156, 159),
  },
  {
    id: "img_013",
    name: "wide leg blue jeans",
    category: "bottoms",
    brand: "levi's",
    color: "medium wash",
    size: "6",
    dateBought: monthsAgo(9),
    notes: "straight leg, everyday staple",
    wearHistory: wear(4, 7, 10, 13, 16, 19, 22, 25, 28, 31, 34, 37, 46, 49, 52, 55, 58, 100, 103, 106, 109, 112, 115, 118, 121, 124, 127, 130, 133, 136, 145, 148, 151, 154, 157),
  },
  {
    id: "img_002",
    name: "black moto boots",
    category: "shoes",
    brand: "everlane",
    color: "black",
    size: "10",
    dateBought: monthsAgo(8),
    notes: "great for going out",
    wearHistory: wear(3, 8, 15, 25, 35, 45, 60, 75, 90, 120, 150, 180),
  },
  {
    id: "img_003",
    name: "black striped miniskirt",
    category: "bottoms",
    brand: "zara",
    color: "black",
    size: "S",
    dateBought: monthsAgo(2),
    notes: "investment piece, timeless style",
    wearHistory: wear(3, 5, 12, 16, 20, 30, 45),
  },
  {
    id: "img_004",
    name: "blue cardigan",
    category: "tops",
    brand: "madewell",
    color: "navy blue",
    size: "M",
    dateBought: monthsAgo(10),
    notes: "cozy and warm, layer for cold weather",
    wearHistory: wear(100, 120, 150, 153, 145, 160, 180, 210),
  },
  {
    id: "img_008",
    name: "brown striped sweater",
    category: "tops",
    brand: "h&m",
    color: "brown",
    size: "M",
    dateBought: monthsAgo(9),
    notes: "cashmere blend, cozy knit sweater, perfect for layering",
    wearHistory: wear(90, 110, 135, 158, 160, 172, 185, 190),
  },
  {
    id: "img_011",
    name: "flowy purple top",
    category: "tops",
    brand: "free people",
    color: "purple",
    size: "S",
    dateBought: monthsAgo(4),
    notes: "bohemian style, great for summer",
    wearHistory: wear(15, 25, 40, 55, 58, 69),
  },
  {
    id: "img_014",
    name: "purple patterned sweater",
    category: "tops",
    brand: "vintage",
    color: "purple",
    size: "M",
    dateBought: monthsAgo(7),
    notes: "soft and cozy winter essential",
    wearHistory: wear(85, 105, 126, 130, 155, 180, 192, 205, 232),
  },
  {
    id: "img_015",
    name: "red purse",
    category: "accessories",
    brand: "kate spade",
    color: "red",
    size: "one size",
    dateBought: monthsAgo(5),
    notes: "perfect pop of color, great for special occasions",
    wearHistory: wear(7, 16, 25, 38, 52, 68, 85, 105, 125, 150, 175, 200),
  },
  {
    id: "img_017",
    name: "shiny dress",
    category: "dresses",
    brand: "asos",
    color: "silver blue",
    size: "S",
    dateBought: monthsAgo(3),
    notes: "perfect for parties and events",
    wearHistory: wear(30, 62, 65),
  },
  {
    id: "img_018",
    name: "white button down long sleeve",
    category: "tops",
    brand: "everlane",
    color: "white",
    size: "S",
    dateBought: monthsAgo(6),
    notes: "clean and elegaant, good for work or date night",
    wearHistory: wear(45, 60, 100, 125, 150, 158, 174, 210),
  },
  {
    id: "img_019",
    name: "white and gold flower dress",
    category: "dresses",
    brand: "pacsun",
    color: "white",
    size: "S",
    dateBought: monthsAgo(5),
    notes: "worn for graduation, summer dress, perfect for warm weather",
    wearHistory: wear(200, 230),
  },
  {
    id: "img_012",
    name: "ripped jean shorts",
    category: "bottoms",
    brand: "hollister",
    color: "medium wash",
    size: "27",
    dateBought: monthsAgo(3),
    notes: "summer essential, a bit short",
    wearHistory: wear(45, 80, 150, 165, 182, 190),
  },
  {
    id: "img_016",
    name: "red tank top",
    category: "tops",
    brand: "express",
    color: "red",
    size: "M",
    dateBought: monthsAgo(2),
    notes: "semi professional, great for work outfits",
    wearHistory: wear(16, 35, 60, 170, 185, 208),
  },
  {
    id: "img_005",
    name: "blue flower dress",
    category: "dresses",
    brand: "forever 21",
    color: "blue",
    size: "4",
    dateBought: monthsAgo(8),
    notes: "perfect for summer weddings, parties, etc.",
    wearHistory: wear(15, 45, 90, 150, 220),
  },
  {
    id: "img_009",
    name: "colorful jacket",
    category: "tops",
    brand: "vintage",
    color: "multicolor",
    size: "M",
    dateBought: monthsAgo(2),
    notes: "statement piece, great for layering",
    wearHistory: [],
  },
];

export const imageFor = (item) =>
  item.customImage || `/images/${item.id}.webp`;

export const daysSince = (isoDate) => {
  if (!isoDate) return null;
  const then = new Date(`${isoDate}T12:00:00`);
  return Math.max(0, Math.floor((Date.now() - then.getTime()) / DAY));
};

export const itemStats = (item) => {
  const sorted = [...item.wearHistory].sort().reverse();
  const lastWorn = sorted[0] || null;
  const days = daysSince(lastWorn);
  let status = "never";
  if (days !== null) {
    if (days <= 14) status = "recent";
    else if (days <= 30) status = "moderate";
    else status = "rare";
  }
  return {
    wearCount: item.wearHistory.length,
    lastWorn,
    daysSinceLastWorn: days,
    status,
  };
};

export const STATUS_META = {
  recent: { label: "Recently worn", color: "#3f7d3f", bg: "#e6f2e0" },
  moderate: { label: "Moderately worn", color: "#b26a00", bg: "#fdf0da" },
  rare: { label: "Rarely worn", color: "#b23b3b", bg: "#fbe6e2" },
  never: { label: "Never worn", color: "#7a7a7a", bg: "#efefe9" },
};

export const SUSTAINABLE_BRANDS = new Set([
  "goodwill",
  "levi's",
  "everlane",
  "madewell",
  "vintage",
  "kate spade",
]);

export const brandBreakdown = (items) => {
  const map = new Map();
  for (const item of items) {
    const brand = (item.brand || "unbranded").toLowerCase();
    const entry = map.get(brand) || {
      brand,
      wears: 0,
      sustainable: SUSTAINABLE_BRANDS.has(brand),
    };
    entry.wears += item.wearHistory.length;
    map.set(brand, entry);
  }
  return [...map.values()].sort((a, b) => b.wears - a.wears);
};

export const sustainabilityScore = (items) => {
  const brands = brandBreakdown(items);
  const total = brands.reduce((sum, entry) => sum + entry.wears, 0) || 1;
  const good = brands
    .filter((entry) => entry.sustainable)
    .reduce((sum, entry) => sum + entry.wears, 0);
  return Math.round((good / total) * 100);
};

