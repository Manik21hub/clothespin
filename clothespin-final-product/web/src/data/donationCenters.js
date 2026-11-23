export const LOCATION_TYPES = {
  donationCenter: {
    label: "donation centers",
    icon: "heart",
    color: "#273617",
    accepts: ["Clothing", "Shoes", "Accessories", "Household Items", "Books"],
  },
  thriftStore: {
    label: "thrift stores",
    icon: "bag",
    color: "#5f6c37",
    accepts: ["Vintage Clothing", "Designer Items", "Accessories", "Books"],
  },
  popUp: {
    label: "pop-ups & markets",
    icon: "calendar",
    color: "#b9813c",
    accepts: ["Vintage", "Handmade", "Local Designer", "Unique Items"],
  },
  consignment: {
    label: "consignment",
    icon: "star",
    color: "#bc6c25",
    accepts: ["Designer Items", "Vintage Clothing", "Shoes", "Handbags"],
  },
  clothingSwap: {
    label: "clothing swaps",
    icon: "recycle",
    color: "#b9813c",
    accepts: ["Clothing Exchange", "Accessories", "Shoes", "Jewelry"],
  },
  repairShop: {
    label: "repair & alteration",
    icon: "scissors",
    color: "#bc6c25",
    accepts: ["Alterations", "Repairs", "Custom Work", "Dry Cleaning"],
  },
};

export const LOCATION_TYPE_ORDER = Object.keys(LOCATION_TYPES);

export const DONATION_CENTERS = [
  {
    id: "goodwill-sf",
    name: "Goodwill San Francisco",
    address: "123 Market St, San Francisco, CA",
    hours: "Mon-Sat: 9AM-8PM · Sun: 10AM-7PM",
    accepts: ["Clothing", "Shoes", "Accessories", "Household Items"],
    type: "donationCenter",
    lat: 37.7849,
    lng: -122.4094,
  },
  {
    id: "salvation-army",
    name: "Salvation Army Family Store",
    address: "456 Mission St, San Francisco, CA",
    hours: "Mon-Fri: 8AM-6PM · Sat: 9AM-5PM",
    accepts: ["Clothing", "Household Items", "Furniture"],
    type: "donationCenter",
    lat: 37.7649,
    lng: -122.4294,
  },
  {
    id: "buffalo-exchange",
    name: "Buffalo Exchange",
    address: "789 Valencia St, San Francisco, CA",
    hours: "Mon-Sun: 10AM-8PM",
    accepts: ["Vintage Clothing", "Designer Items", "Accessories"],
    type: "consignment",
    lat: 37.7549,
    lng: -122.4394,
  },
  {
    id: "crossroads",
    name: "Crossroads Trading",
    address: "1901 Fillmore St, San Francisco, CA",
    hours: "Mon-Sat: 11AM-8PM · Sun: 12PM-7PM",
    accepts: ["Designer Clothing", "Vintage Items", "Shoes"],
    type: "consignment",
    lat: 37.7849,
    lng: -122.4324,
  },
  {
    id: "community-thrift",
    name: "Community Thrift",
    address: "623 Valencia St, San Francisco, CA",
    hours: "Mon-Sun: 10AM-7PM",
    accepts: ["Clothing", "Books", "Household Items"],
    type: "thriftStore",
    lat: 37.7609,
    lng: -122.4214,
  },
  {
    id: "sf-flea",
    name: "SF Flea Market",
    address: "100 Alemany Blvd, San Francisco, CA",
    hours: "Sat-Sun: 6AM-3PM",
    accepts: ["Vintage Clothing", "Antiques", "Collectibles"],
    type: "popUp",
    lat: 37.7209,
    lng: -122.4214,
  },
  {
    id: "mission-market",
    name: "Mission Community Market",
    address: "22nd St & Bartlett, San Francisco, CA",
    hours: "Thurs: 4PM-8PM",
    accepts: ["Local Designer", "Handmade Items", "Vintage"],
    type: "popUp",
    lat: 37.7549,
    lng: -122.4194,
  },
  {
    id: "sf-swap",
    name: "SF Clothing Swap",
    address: "Various locations — check website",
    hours: "Monthly events",
    accepts: ["Clothing Exchange", "Accessories", "Shoes"],
    type: "clothingSwap",
    lat: 37.7749,
    lng: -122.4194,
  },
  {
    id: "mission-tailoring",
    name: "Mission Tailoring",
    address: "2981 Mission St, San Francisco, CA",
    hours: "Mon-Fri: 9AM-6PM · Sat: 10AM-4PM",
    accepts: ["Alterations", "Repairs", "Custom Work"],
    type: "repairShop",
    lat: 37.7509,
    lng: -122.4194,
  },
  {
    id: "sewing-studio",
    name: "Sewing Studio SF",
    address: "1847 Union St, San Francisco, CA",
    hours: "Mon-Sat: 10AM-7PM",
    accepts: ["Clothing Repair", "Alterations", "Classes"],
    type: "repairShop",
    lat: 37.7949,
    lng: -122.4294,
  },
  {
    id: "out-of-the-closet",
    name: "Out of the Closet",
    address: "321 Castro St, San Francisco, CA",
    hours: "Mon-Sun: 9AM-9PM",
    accepts: ["Clothing", "Accessories", "Books", "Electronics"],
    type: "thriftStore",
    lat: 37.7609,
    lng: -122.435,
  },
  {
    id: "wasteland",
    name: "Wasteland",
    address: "1660 Haight St, San Francisco, CA",
    hours: "Mon-Sun: 11AM-8PM",
    accepts: ["Vintage Designer", "Streetwear", "Accessories"],
    type: "thriftStore",
    lat: 37.7699,
    lng: -122.4469,
  },
];

const BASE = { lat: 37.7749, lng: -122.4194 };

const toRad = (value) => (value * Math.PI) / 180;

export const haversineMiles = (a, b) => {
  const R = 3958.8;
  const dLat = toRad(b.lat - a.lat);
  const dLng = toRad(b.lng - a.lng);
  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
};

export const formatDistance = (miles) => {
  if (miles < 0.62) return `${Math.round(miles * 1609)} m`;
  return `${miles.toFixed(1)} mi`;
};

export const centersWithDistance = (base = BASE) =>
  DONATION_CENTERS.map((center) => {
    const miles = haversineMiles(base, { lat: center.lat, lng: center.lng });
    return {
      ...center,
      miles,
      distance: center.type === "clothingSwap" ? "Event-based" : formatDistance(miles),
    };
  }).sort((a, b) => a.miles - b.miles);

export const mapPosition = (center, base = BASE) => {
  const latSpan = 0.09;
  const lngSpan = 0.09;
  const x = 50 + ((center.lng - base.lng) / lngSpan) * 50;
  const y = 50 - ((center.lat - base.lat) / latSpan) * 50;
  return {
    left: `${Math.min(92, Math.max(8, x))}%`,
    top: `${Math.min(88, Math.max(10, y))}%`,
  };
};
