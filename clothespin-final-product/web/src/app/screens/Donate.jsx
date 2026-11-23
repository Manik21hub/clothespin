import { useMemo, useState } from "react";
import Icon from "../../components/Icon";
import {
  LOCATION_TYPES,
  LOCATION_TYPE_ORDER,
  centersWithDistance,
  mapPosition,
} from "../../data/donationCenters";
import { formatLongDate, formatPoints } from "../../lib/format";
import { useApp } from "../../state/AppState";
import DonationQR from "../components/DonationQR";
import RewardsModal from "../components/RewardsModal";

const TABS = [
  { key: "locations", label: "locations" },
  { key: "mine", label: "my donations" },
  { key: "impact", label: "impact" },
];

const IMPACT_CARDS = [
  {
    icon: "leaf",
    title: "carbon footprint reduction",
    body: "Each clothing item donated instead of thrown away saves approximately 27kg of CO₂ emissions.",
    value: (items) => `${(items * 27).toLocaleString()} kg CO₂ saved`,
  },
  {
    icon: "droplet",
    title: "water conservation",
    body: "Donating clothes reduces demand for new clothing production, saving thousands of litres of water per item.",
    value: (items) => `${(items * 2700).toLocaleString()} L saved`,
  },
  {
    icon: "trash",
    title: "waste reduction",
    body: "Keep clothing out of landfill, where synthetic materials can take hundreds of years to decompose.",
    value: (items) => `${items} items diverted`,
  },
];

const SOCIAL_CARDS = [
  {
    icon: "users",
    title: "community support",
    body: "Your donations help provide affordable clothing options for families in need.",
    value: (items) => `${Math.ceil(items / 2)} families helped`,
  },
  {
    icon: "briefcase",
    title: "job creation",
    body: "Donation centres and thrift stores create employment opportunities in your community.",
    value: (items) => `${Math.max(1, Math.ceil(items / 3))} jobs supported`,
  },
];

export default function Donate() {
  const { points, donations, logDonation } = useApp();
  const [tab, setTab] = useState("locations");
  const [draft, setDraft] = useState("");
  const [applied, setApplied] = useState("");
  const [type, setType] = useState("all");
  const [loading, setLoading] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [qrOpen, setQrOpen] = useState(false);

  const allCenters = useMemo(() => centersWithDistance(), []);

  const visible = useMemo(() => {
    const query = applied.trim().toLowerCase();
    return allCenters.filter((center) => {
      const matchesType = type === "all" || center.type === type;
      const haystack = `${center.name} ${center.address} ${center.accepts.join(" ")}`.toLowerCase();
      return matchesType && (!query || haystack.includes(query));
    });
  }, [allCenters, applied, type]);

  const donatedItems = (donations || []).reduce((sum, record) => sum + record.itemCount, 0);

  const submitSearch = (event) => {
    event.preventDefault();
    setLoading(true);
    setSelectedId(null);
    setTimeout(() => {
      setApplied(draft);
      setLoading(false);
    }, 450);
  };

  const chooseType = (value) => {
    setType(value);
    setSelectedId(null);
  };

  return (
    <div className="screen">
      <header className="page-head">
        <div className="page-head-row">
          <div className="page-head-copy">
            <span className="page-eyebrow">close the loop</span>
            <h1>donate</h1>
          </div>
          <div className="page-actions">
            <button type="button" className="points-pill" onClick={() => setRewardsOpen(true)}>
              <Icon name="star" size={15} />
              {formatPoints(points)}
            </button>
            <button
              type="button"
              className="icon-button"
              onClick={() => setQrOpen(true)}
              aria-label="Open donation QR code"
            >
              <Icon name="qr" size={20} />
            </button>
          </div>
        </div>
      </header>

      <div className="segmented" role="tablist" aria-label="Donation views">
        {TABS.map((entry) => (
          <button
            key={entry.key}
            type="button"
            role="tab"
            aria-selected={tab === entry.key}
            className={tab === entry.key ? "active" : ""}
            onClick={() => setTab(entry.key)}
          >
            {entry.label}
          </button>
        ))}
      </div>

      {tab === "locations" && (
        <div className="donate-panel">
          <form className="search-row" onSubmit={submitSearch}>
            <label className="search-field">
              <Icon name="search" size={17} />
              <input
                value={draft}
                onChange={(event) => setDraft(event.target.value)}
                placeholder="search city, address or shop"
                aria-label="Search donation locations"
              />
            </label>
            <button type="submit" className="btn btn-primary search-submit" disabled={!draft.trim()}>
              search
            </button>
          </form>

          <div className="chip-scroll type-chips">
            <button
              type="button"
              className={`chip ${type === "all" ? "chip-active" : ""}`}
              onClick={() => chooseType("all")}
            >
              <Icon name="grid" size={14} />
              all
            </button>
            {LOCATION_TYPE_ORDER.map((key) => (
              <button
                key={key}
                type="button"
                className={`chip ${type === key ? "chip-active" : ""}`}
                onClick={() => chooseType(key)}
              >
                <Icon name={LOCATION_TYPES[key].icon} size={14} />
                {LOCATION_TYPES[key].label}
              </button>
            ))}
          </div>

          <div className="mini-map" aria-hidden="true">
            <div className="map-grid" />
            <span className="map-you">
              <i />
              you
            </span>
            {allCenters.map((center) => (
              <button
                key={center.id}
                type="button"
                className={`map-pin ${selectedId === center.id ? "map-pin-active" : ""}`}
                tabIndex={-1}
                style={{
                  ...mapPosition(center),
                  "--pin": LOCATION_TYPES[center.type].color,
                }}
                onClick={() => {
                  setSelectedId(center.id);
                  document
                    .getElementById(`center-${center.id}`)
                    ?.scrollIntoView({ behavior: "smooth", block: "center" });
                }}
                aria-label={center.name}
              >
                <Icon name={LOCATION_TYPES[center.type].icon} size={12} />
              </button>
            ))}
            <span className="map-label">san francisco · 12 spots nearby</span>
          </div>

          {loading ? (
            <div className="searching">
              <span className="spinner dark" />
              searching for donation centers...
            </div>
          ) : visible.length === 0 ? (
            <div className="empty-state">
              <Icon name="map" size={46} />
              <h2>no donation centers found</h2>
              <p>try a different city, or clear the search to see everything nearby</p>
              <button
                type="button"
                className="btn btn-ghost"
                onClick={() => {
                  setDraft("");
                  setApplied("");
                  setType("all");
                }}
              >
                clear filters
              </button>
            </div>
          ) : (
            <ul className="location-list">
              {visible.map((center) => {
                const meta = LOCATION_TYPES[center.type];
                return (
                  <li
                    key={center.id}
                    id={`center-${center.id}`}
                    className={`location-card ${selectedId === center.id ? "location-selected" : ""}`}
                  >
                    <div className="location-top">
                      <div>
                        <div className="location-name-row">
                          <strong>{center.name}</strong>
                          <span
                            className="type-badge"
                            style={{ background: `${meta.color}1f`, color: meta.color }}
                          >
                            <Icon name={meta.icon} size={11} />
                            {meta.label.replace(/s$/, "")}
                          </span>
                        </div>
                        <p>{center.address}</p>
                      </div>
                      <span className="location-distance">
                        <Icon name="pin" size={16} />
                        {center.distance}
                      </span>
                    </div>
                    <span className="location-hours">{center.hours}</span>
                    <div className="location-accepts">
                      <span>Accepts:</span>
                      <div>
                        {center.accepts.map((accept) => (
                          <em key={accept}>{accept}</em>
                        ))}
                      </div>
                    </div>
                    <div className="location-actions">
                      <a
                        className="btn btn-dark btn-block"
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          `${center.name} ${center.address}`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Icon name="pin" size={15} />
                        Get Directions
                      </a>
                      <button
                        type="button"
                        className="btn btn-ghost"
                        onClick={() => {
                          setQrOpen(true);
                        }}
                      >
                        log drop-off
                      </button>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}

      {tab === "mine" && (
        <div className="donate-panel">
          <h2 className="panel-title">my impact</h2>
          <div className="donation-tiles">
            <div className="donation-tile tile-sage">
              <strong>{donatedItems}</strong>
              <span>items donated</span>
            </div>
            <div className="donation-tile tile-forest">
              <strong>{(donations || []).length}</strong>
              <span>donations made</span>
            </div>
            <div className="donation-tile tile-brown">
              <strong>{donatedItems * 27}kg</strong>
              <span>CO₂ saved</span>
            </div>
            <div className="donation-tile tile-rust">
              <strong>{(donatedItems * 2.7).toFixed(1)}kL</strong>
              <span>water saved</span>
            </div>
          </div>

          <h2 className="panel-title">donation history</h2>
          {donations && donations.length > 0 ? (
            <ul className="donation-history">
              {donations.map((record) => (
                <li key={record.id}>
                  <span className="donation-history-icon">
                    <Icon name="gift" size={18} />
                  </span>
                  <div>
                    <strong>
                      {record.itemCount} item{record.itemCount === 1 ? "" : "s"} donated
                    </strong>
                    <span>{record.location}</span>
                    <em>{formatLongDate(record.date)}</em>
                  </div>
                  <div className="donation-history-points">
                    <strong>+{record.itemCount * 50}</strong>
                    <span>points</span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="empty-state compact">
              <Icon name="heart" size={40} />
              <h2>no donations yet</h2>
              <p>find a drop-off nearby and log your first donation</p>
              <button type="button" className="btn btn-primary" onClick={() => setQrOpen(true)}>
                log a donation
              </button>
            </div>
          )}

          <button type="button" className="btn btn-primary btn-block" onClick={() => setQrOpen(true)}>
            <Icon name="qr" size={17} />
            log a new donation
          </button>
        </div>
      )}

      {tab === "impact" && (
        <div className="donate-panel">
          <h2 className="panel-title">environmental impact</h2>
          <div className="impact-list">
            {IMPACT_CARDS.map((card) => (
              <article key={card.title} className="impact-row">
                <Icon name={card.icon} size={22} />
                <div>
                  <strong>{card.title}</strong>
                  <p>{card.body}</p>
                  <em>{card.value(donatedItems)}</em>
                </div>
              </article>
            ))}
          </div>

          <h2 className="panel-title">social impact</h2>
          <div className="impact-list">
            {SOCIAL_CARDS.map((card) => (
              <article key={card.title} className="impact-row">
                <Icon name={card.icon} size={22} />
                <div>
                  <strong>{card.title}</strong>
                  <p>{card.body}</p>
                  <em>{card.value(donatedItems)}</em>
                </div>
              </article>
            ))}
          </div>

          <div className="impact-quote">
            <Icon name="leaf" size={18} />
            <p>
              every donation is a small vote for a slower, kinder fashion system.
            </p>
          </div>
        </div>
      )}

      <RewardsModal open={rewardsOpen} onClose={() => setRewardsOpen(false)} />
      <DonationQR open={qrOpen} onClose={() => setQrOpen(false)} />
    </div>
  );
}
