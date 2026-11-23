import Icon from "../../components/Icon";
import { CATEGORY_META, STATUS_META, imageFor, itemStats } from "../../data/items";
import { lastWornText } from "../../lib/format";

export default function ItemCard({ item, onClick }) {
  const stats = itemStats(item);
  const status = STATUS_META[stats.status];
  const meta = CATEGORY_META[item.category] || CATEGORY_META.tops;

  return (
    <button type="button" className="item-card" onClick={onClick}>
      <span className="item-card-image">
        {imageFor(item) ? (
          <img src={imageFor(item)} alt={item.name} loading="lazy" />
        ) : (
          <span className="item-fallback">
            <Icon name={meta.icon} size={26} />
            {item.color}
          </span>
        )}
      </span>
      <span className="item-card-name">{item.name}</span>
      <span className="item-card-meta">
        <i className="status-dot" style={{ background: status.color }} />
        <span>
          <span className="item-card-last">{lastWornText(stats.daysSinceLastWorn)}</span>
          <span className="item-card-wears">
            Worn {stats.wearCount} {stats.wearCount === 1 ? "time" : "times"}
          </span>
        </span>
      </span>
    </button>
  );
}
