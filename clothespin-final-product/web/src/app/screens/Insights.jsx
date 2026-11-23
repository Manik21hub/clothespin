import { useMemo, useState } from "react";
import Icon from "../../components/Icon";
import { CATEGORY_META, brandBreakdown, itemStats, sustainabilityScore } from "../../data/items";
import { formatPoints } from "../../lib/format";
import { useApp } from "../../state/AppState";
import RewardsModal from "../components/RewardsModal";

const CATEGORY_COLORS = {
  tops: "#5f6c37",
  bottoms: "#273617",
  dresses: "#dca15d",
  shoes: "#bc6c25",
  accessories: "#93a06a",
};

export default function Insights() {
  const { items, donations, points, nextReward, pointsToNextReward } = useApp();
  const [rewardsOpen, setRewardsOpen] = useState(false);

  const stats = useMemo(() => {
    const total = items.length;
    const categories = Object.keys(CATEGORY_META)
      .filter((key) => key !== "all")
      .map((key) => ({
        key,
        label: CATEGORY_META[key].label,
        count: items.filter((item) => item.category === key).length,
      }))
      .filter((entry) => entry.count > 0);
    const categoryTotal = categories.reduce((sum, entry) => sum + entry.count, 0) || 1;

    let stops = [];
    let cursor = 0;
    for (const entry of categories) {
      const start = cursor;
      cursor += (entry.count / categoryTotal) * 100;
      stops.push(`${CATEGORY_COLORS[entry.key]} ${start}% ${cursor}%`);
    }

    const brands = brandBreakdown(items);
    const score = sustainabilityScore(items);

    const never = items.filter((item) => item.wearHistory.length === 0).length;
    const underThree = items.filter((item) => item.wearHistory.length < 3).length;
    const stale = items.filter((item) => {
      const days = itemStats(item).daysSinceLastWorn;
      return days === null || days >= 30;
    }).length;

    const donatedItems = (donations || []).reduce((sum, record) => sum + record.itemCount, 0);

    return {
      total,
      categories: categories.map((entry) => ({
        ...entry,
        pct: Math.round((entry.count / categoryTotal) * 100),
      })),
      gradient: stops.length
        ? `conic-gradient(${stops.join(", ")})`
        : "conic-gradient(rgba(95, 108, 55, 0.16) 0% 100%)",
      brands,
      maxBrand: Math.max(1, ...brands.map((entry) => entry.wears)),
      score,
      never,
      underThree,
      stale,
      donatedItems,
      co2: donatedItems * 27,
      water: donatedItems * 2700,
    };
  }, [items, donations]);

  const scoreLabel =
    stats.score >= 70 ? "very" : stats.score >= 50 ? "moderately" : "not very";
  const scoreCopy =
    stats.score >= 70
      ? "Great job! You're mostly wearing sustainable brands."
      : stats.score >= 50
      ? "Good progress! Try to wear more sustainable brands."
      : "Consider donating fast fashion items and buying sustainable alternatives.";

  const circumference = 2 * Math.PI * 42;

  return (
    <div className="screen">
      <header className="page-head">
        <div className="page-head-row">
          <div className="page-head-copy">
            <span className="page-eyebrow">what your wardrobe says</span>
            <h1>insights</h1>
          </div>
        </div>
      </header>

      <section className="insight-section">
        <h2>clothing type distribution</h2>
        <div className="card insight-card pie-card">
          <div className="pie" style={{ background: stats.gradient }} role="img" aria-label="Clothing type distribution">
            <div className="pie-center">
              <strong>{stats.total}</strong>
              <span>total items</span>
            </div>
          </div>
          <ul className="legend">
            {stats.categories.map((entry) => (
              <li key={entry.key}>
                <i style={{ background: CATEGORY_COLORS[entry.key] }} />
                <span>{entry.label}</span>
                <strong>{entry.pct}%</strong>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="insight-section">
        <h2>sustainability score</h2>
        <div className="card insight-card score-card">
          <div className="score-ring">
            <svg viewBox="0 0 100 100" width="104" height="104" aria-hidden="true">
              <circle cx="50" cy="50" r="42" fill="none" stroke="rgba(95,108,55,0.2)" strokeWidth="8" />
              <circle
                cx="50"
                cy="50"
                r="42"
                fill="none"
                stroke="#5f6c37"
                strokeWidth="8"
                strokeLinecap="round"
                strokeDasharray={`${(stats.score / 100) * circumference} ${circumference}`}
                transform="rotate(-90 50 50)"
              />
            </svg>
            <div>
              <strong>{stats.score}%</strong>
              <span>sustainable</span>
            </div>
          </div>
          <div className="score-copy">
            <strong>Your wardrobe is {scoreLabel} sustainable</strong>
            <p>{scoreCopy}</p>
          </div>
        </div>
      </section>

      <section className="insight-section">
        <h2>donation opportunities</h2>
        <div className="card insight-card donate-ops">
          {[
            { title: "Items worn < 3 times", sub: "Ready to donate", value: stats.underThree },
            { title: "Items not worn in 30+ days", sub: "Consider donating", value: stats.stale },
            { title: "Items never worn", sub: "Donate immediately", value: stats.never },
          ].map((row) => (
            <div className="donate-op" key={row.title}>
              <div>
                <strong>{row.title}</strong>
                <span>{row.sub}</span>
              </div>
              <em>{row.value}</em>
            </div>
          ))}
        </div>
      </section>

      <section className="insight-section">
        <h2>environmental impact</h2>
        <div className="impact-tiles">
          <div className="impact-tile tile-sage">
            <strong>{stats.co2.toLocaleString()} kg</strong>
            <span>CO₂ Saved</span>
          </div>
          <div className="impact-tile tile-forest">
            <strong>{stats.water.toLocaleString()} L</strong>
            <span>Water Saved</span>
          </div>
          <div className="impact-tile tile-brown">
            <strong>{stats.donatedItems} items</strong>
            <span>Waste Diverted</span>
          </div>
        </div>
      </section>

      <section className="insight-section">
        <h2>brand sustainability</h2>
        <div className="card insight-card brand-card">
          <ul className="brand-list">
            {stats.brands.slice(0, 10).map((brand) => (
              <li key={brand.brand}>
                <span className="brand-name">
                  {brand.brand}
                  <Icon
                    name={brand.sustainable ? "leaf" : "alert"}
                    size={13}
                    className={brand.sustainable ? "brand-good" : "brand-bad"}
                  />
                </span>
                <span className="brand-track">
                  <span
                    className={`brand-bar ${brand.sustainable ? "bar-good" : "bar-bad"}`}
                    style={{ width: `${(brand.wears / stats.maxBrand) * 100}%` }}
                  />
                </span>
                <strong>{brand.wears}</strong>
              </li>
            ))}
          </ul>
          <div className="brand-legend">
            <span>
              <Icon name="leaf" size={13} /> Sustainable
            </span>
            <span>
              <Icon name="alert" size={13} /> Fast Fashion
            </span>
          </div>
        </div>
      </section>

      <section className="insight-section">
        <h2>points &amp; rewards</h2>
        <button type="button" className="points-teaser" onClick={() => setRewardsOpen(true)}>
          <span className="points-teaser-icon">
            <Icon name="star" size={22} />
          </span>
          <div>
            <strong>{formatPoints(points)} points</strong>
            <span>
              {nextReward
                ? `${pointsToNextReward} points to ${nextReward.title.toLowerCase()}`
                : "every reward unlocked — go treat yourself"}
            </span>
          </div>
          <Icon name="chevronRight" size={18} />
        </button>
      </section>

      <RewardsModal open={rewardsOpen} onClose={() => setRewardsOpen(false)} />
    </div>
  );
}
