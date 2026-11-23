const inMonths = (months) => {
  const d = new Date();
  d.setMonth(d.getMonth() + months);
  return d.toISOString().slice(0, 10);
};

export const REWARDS = [
  {
    id: "vintage-10",
    title: "10% Off Vintage Finds",
    description: "Get 10% off your next purchase at Vintage Revival",
    pointsRequired: 100,
    type: "discount",
    shopName: "Vintage Revival",
    discount: "10% OFF",
    validUntil: inMonths(1),
  },
  {
    id: "thrift-shipping",
    title: "Free Shipping",
    description: "Free shipping on orders over $25 at Thrift Treasure",
    pointsRequired: 200,
    type: "free_shipping",
    shopName: "Thrift Treasure",
    discount: "FREE SHIPPING",
    validUntil: inMonths(2),
  },
  {
    id: "eco-5",
    title: "$5 Off Next Purchase",
    description: "Save $5 on your next purchase at EcoStyle Boutique",
    pointsRequired: 350,
    type: "coupon",
    shopName: "EcoStyle Boutique",
    discount: "$5 OFF",
    validUntil: inMonths(1),
  },
  {
    id: "retro-early",
    title: "Early Access Sale",
    description: "Get early access to the monthly sale at Retro Threads",
    pointsRequired: 500,
    type: "exclusive_access",
    shopName: "Retro Threads",
    discount: "EARLY ACCESS",
    validUntil: inMonths(3),
  },
  {
    id: "sustainable-15",
    title: "15% Off Everything",
    description: "15% off everything in store at Sustainable Style",
    pointsRequired: 750,
    type: "discount",
    shopName: "Sustainable Style",
    discount: "15% OFF",
    validUntil: inMonths(2),
  },
  {
    id: "green-20",
    title: "$20 Off Large Purchase",
    description: "Save $20 on purchases over $100 at Green Fashion Co",
    pointsRequired: 1000,
    type: "coupon",
    shopName: "Green Fashion Co",
    discount: "$20 OFF",
    validUntil: inMonths(2),
  },
  {
    id: "circular-vip",
    title: "VIP Shopping Experience",
    description: "Private shopping appointment at The Circular Closet",
    pointsRequired: 1500,
    type: "exclusive_access",
    shopName: "The Circular Closet",
    discount: "VIP EXPERIENCE",
    validUntil: inMonths(6),
  },
  {
    id: "luxe-25",
    title: "25% Off Premium Items",
    description: "25% off premium vintage and designer items at Luxe Thrift",
    pointsRequired: 2000,
    type: "discount",
    shopName: "Luxe Thrift",
    discount: "25% OFF",
    validUntil: inMonths(3),
  },
];

export const REWARD_ICONS = {
  coupon: "ticket",
  discount: "percent",
  free_shipping: "box",
  exclusive_access: "star",
};

export const POINT_VALUES = {
  donation: 50,
  rareItemWear: 10,
  weeklyStreak: 25,
  firstItem: 100,
  milestone: 200,
};

export const MILESTONES = [100, 250, 500, 1000, 1500, 2000];
