import { useEffect, useState } from "react";
import Icon from "../../components/Icon";
import { CATEGORY_META, STATUS_META, imageFor, itemStats } from "../../data/items";
import { daysSince, formatMonthYear, formatShortDate, lastWornText } from "../../lib/format";
import { useApp } from "../../state/AppState";
import Sheet from "./Sheet";

export default function ItemDetail({ item, onClose }) {
  const { recordWear, deleteItem } = useApp();
  const [confirming, setConfirming] = useState(false);

  useEffect(() => {
    setConfirming(false);
  }, [item?.id]);

  if (!item) return null;

  const stats = itemStats(item);
  const status = STATUS_META[stats.status];
  const meta = CATEGORY_META[item.category] || CATEGORY_META.tops;
  const recent = [...item.wearHistory].sort().reverse().slice(0, 10);

  return (
    <Sheet open onClose={onClose} title="item details" className="sheet-item">
      <div className="detail">
        <div className="detail-image">
          {imageFor(item) ? (
            <img src={imageFor(item)} alt={item.name} />
          ) : (
            <span className="item-fallback">
              <Icon name={meta.icon} size={46} />
              {item.color}
            </span>
          )}
        </div>

        <h3 className="detail-name">{item.name}</h3>

        <div className="detail-card detail-meta">
          <div>
            <span className="detail-label">Category:</span>
            <strong>{item.category.charAt(0).toUpperCase() + item.category.slice(1)}</strong>
          </div>
          <div>
            <span className="detail-label">Got:</span>
            <strong>{formatMonthYear(item.dateBought)}</strong>
          </div>
        </div>

        <div className="detail-card">
          <h4>Wear History</h4>
          <div className="detail-chips">
            <div className="detail-chip" style={{ background: `${status.color}14` }}>
              <span className="detail-label">Last worn</span>
              <span className="chip-value">
                <i className="status-dot" style={{ background: status.color }} />
                {lastWornText(stats.daysSinceLastWorn, { prefix: false })}
              </span>
            </div>
            <div className="detail-chip" style={{ background: "rgba(220,161,93,0.14)" }}>
              <span className="detail-label">Fits made</span>
              <span className="chip-value">{stats.wearCount}</span>
            </div>
          </div>

          {recent.length > 0 ? (
            <>
              <span className="detail-sub">Recent wears</span>
              <div className="wear-strip">
                {recent.map((date, index) => (
                  <div className="wear-tile" key={`${date}-${index}`}>
                    <span className="wear-tile-art">
                      <Icon name={meta.icon} size={20} />
                    </span>
                    <span>{formatShortDate(date)}</span>
                    <em>
                      {daysSince(date) === 0 ? "today" : `${daysSince(date)} days ago`}
                    </em>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <p className="detail-empty">
              No wears logged yet. Wear it once and it starts counting.
            </p>
          )}
        </div>

        <div className="detail-card">
          <h4>Details</h4>
          <dl className="detail-rows">
            <div>
              <dt>Brand:</dt>
              <dd>{item.brand || "—"}</dd>
            </div>
            <div>
              <dt>Color:</dt>
              <dd>{item.color || "—"}</dd>
            </div>
            <div>
              <dt>Size:</dt>
              <dd>{item.size || "—"}</dd>
            </div>
            <div>
              <dt>Notes:</dt>
              <dd>{item.notes || "—"}</dd>
            </div>
          </dl>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-block"
          onClick={() => recordWear(item.id)}
        >
          <Icon name="checkCircle" size={17} />
          wear today
        </button>

        {confirming ? (
          <div className="delete-confirm">
            <p>Are you sure you want to delete this item? This action cannot be undone.</p>
            <div>
              <button type="button" className="btn btn-ghost" onClick={() => setConfirming(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  deleteItem(item.id);
                  onClose();
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ) : (
          <button type="button" className="btn btn-danger-ghost btn-block" onClick={() => setConfirming(true)}>
            <Icon name="trash" size={16} />
            delete item
          </button>
        )}
      </div>
    </Sheet>
  );
}
