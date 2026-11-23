import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { imageFor, itemStats } from "../../data/items";
import { formatPoints, startOfWeek } from "../../lib/format";
import { useApp } from "../../state/AppState";

function HighlightCard({ item, title, message, icon, onClick }) {
  return (
    <article className="highlight">
      <span className="highlight-art">
        {item ? <img src={imageFor(item)} alt="" /> : <Icon name={icon} size={26} />}
      </span>
      <div className="highlight-copy">
        <strong>{title}</strong>
        <p>{message}</p>
      </div>
      <button type="button" className="highlight-action" onClick={onClick} aria-label={title}>
        <Icon name={icon} size={20} />
      </button>
    </article>
  );
}

export default function Home() {
  const { items, profile, points, nextReward, pointsToNextReward } = useApp();
  const navigate = useNavigate();
  const firstName = profile.name.split(" ")[0].toLowerCase();

  const monthStart = Date.now() - 30 * 24 * 60 * 60 * 1000;
  const wearCounts = items.map((item) => ({
    item,
    count: item.wearHistory.filter((date) => new Date(`${date}T12:00:00`).getTime() >= monthStart)
      .length,
  }));
  const top = [...wearCounts].sort((a, b) => b.count - a.count)[0];
  const rotation = top && top.count > 0 ? top : null;

  const stale = items
    .map((item) => ({ item, stats: itemStats(item) }))
    .filter(({ stats }) => stats.daysSinceLastWorn === null || stats.daysSinceLastWorn >= 30)
    .sort((a, b) => (b.stats.daysSinceLastWorn ?? 9999) - (a.stats.daysSinceLastWorn ?? 9999));

  const auditCount = stale.length;
  const donate = stale.find(({ item }) => !rotation || item.id !== rotation.item.id) || stale[0];

  const weekStart = startOfWeek().getTime();
  const wornThisWeek = items.filter((item) =>
    item.wearHistory.some((date) => new Date(`${date}T12:00:00`).getTime() >= weekStart)
  ).length;

  return (
    <div className="screen">
      <header className="home-head">
        <div>
          <span className="page-eyebrow">good to see you</span>
          <h1>hello, {firstName} ✨</h1>
        </div>
        <Link to="/app/profile" className="home-avatar" aria-label="Open profile">
          <img src={profile.photo} alt={profile.name} />
        </Link>
      </header>

      <div className="home-chips">
        <Link to="/app/donate" className="home-chip">
          <Icon name="star" size={15} />
          <strong>{formatPoints(points)}</strong>
          <span>points</span>
        </Link>
        <Link to="/app/insights" className="home-chip">
          <Icon name="calendar" size={15} />
          <strong>{wornThisWeek}</strong>
          <span>worn this week</span>
        </Link>
        <Link to="/app/donate" className="home-chip home-chip-next">
          <span>next reward</span>
          <strong>{nextReward ? `${pointsToNextReward} pts` : "all unlocked"}</strong>
        </Link>
      </div>

      <section className="home-section">
        <h2>catalog my closet</h2>
        <button type="button" className="pin-hero" onClick={() => navigate("/app/add")}>
          <img src="/images/pin_sage.png" alt="" className="pin-hero-art" />
          <span>pin my outfit of the day!</span>
          <Icon name="arrowRight" size={18} />
        </button>
      </section>

      <section className="home-section">
        <h2>track my wardrobe</h2>
        <div className="home-stack">
          <HighlightCard
            item={rotation?.item}
            title="great rotation!"
            message={
              rotation
                ? `you've worn your ${rotation.item.name} ${rotation.count} ${
                    rotation.count === 1 ? "time" : "times"
                  } this month`
                : "log a wear today and your rotation starts here"
            }
            icon="bulb"
            onClick={() => navigate("/app/insights")}
          />
          <HighlightCard
            item={stale[0]?.item}
            title="closet audit needed"
            message={`${auditCount} item${auditCount === 1 ? "" : "s"} haven't been worn in 30+ days`}
            icon="closet"
            onClick={() => navigate("/app/closet")}
          />
          <button type="button" className="home-link" onClick={() => navigate("/app/insights")}>
            <span>view more stats and analytics</span>
            <Icon name="chevronRight" size={16} />
          </button>
        </div>
      </section>

      <section className="home-section">
        <h2>rewear or donate</h2>
        <HighlightCard
          item={donate?.item}
          title="time to donate"
          message={
            donate
              ? `your ${donate.item.name} hasn't been worn in ${
                  donate.stats.daysSinceLastWorn ?? "over 200"
                } days`
              : "nothing to donate yet — your closet is in great shape"
          }
          icon="donate"
          onClick={() => navigate("/app/donate")}
        />
      </section>

      <p className="home-footnote">
        <Icon name="leaf" size={14} /> every re-wear keeps one more piece out of landfill
      </p>
    </div>
  );
}
