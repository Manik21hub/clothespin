const DAY = 24 * 60 * 60 * 1000;

export const daysSince = (isoDate) => {
  if (!isoDate) return null;
  const then = new Date(`${isoDate}T12:00:00`);
  return Math.max(0, Math.floor((Date.now() - then.getTime()) / DAY));
};

export const lastWornText = (days, { prefix = true } = {}) => {
  const start = prefix ? "Worn " : "";
  if (days === null || days === undefined) return prefix ? "Never worn" : "Never worn";
  if (days <= 0) return `${start}today`;
  if (days === 1) return `${start}yesterday`;
  if (days < 7) return `${start}${days} days ago`;
  if (days < 30) {
    const weeks = Math.floor(days / 7);
    return `${start}${weeks} week${weeks === 1 ? "" : "s"} ago`;
  }
  const months = Math.floor(days / 30);
  return `${start}${months} month${months === 1 ? "" : "s"} ago`;
};

export const relativeTime = (isoDate) => {
  const then = new Date(isoDate).getTime();
  const diff = Date.now() - then;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d ago`;
  const weeks = Math.floor(days / 7);
  if (weeks < 5) return `${weeks}w ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
};

export const formatMonthYear = (isoDate) => {
  if (!isoDate) return "—";
  const date = new Date(`${isoDate.slice(0, 10)}T12:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", year: "numeric" });
};

export const formatShortDate = (isoDate) => {
  if (!isoDate) return "—";
  const date = new Date(`${isoDate.slice(0, 10)}T12:00:00`);
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
};

export const formatLongDate = (isoDate) => {
  if (!isoDate) return "—";
  return new Date(isoDate).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

export const formatPoints = (value) => value.toLocaleString("en-US");

export const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

export const startOfWeek = () => {
  const d = new Date();
  const day = (d.getDay() + 6) % 7;
  d.setHours(0, 0, 0, 0);
  d.setDate(d.getDate() - day);
  return d;
};
