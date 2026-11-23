import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { CATEGORIES, CATEGORY_META, itemStats } from "../../data/items";
import { useApp } from "../../state/AppState";
import ItemCard from "../components/ItemCard";
import ItemDetail from "../components/ItemDetail";

const SORTS = [
  { value: "recent", label: "Most Recent" },
  { value: "least", label: "Least Recent" },
  { value: "most", label: "Worn Most Often" },
  { value: "least-worn", label: "Worn Least Often" },
  { value: "az", label: "A-Z" },
];

const FILTERS = ["all", ...CATEGORIES];

export default function Closet() {
  const { items } = useApp();
  const navigate = useNavigate();
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("recent");
  const [query, setQuery] = useState("");
  const [selectedId, setSelectedId] = useState(null);

  const visible = useMemo(() => {
    const filtered = items.filter((item) => {
      const matchesCategory = category === "all" || item.category === category;
      const haystack = `${item.name} ${item.brand || ""} ${item.color}`.toLowerCase();
      return matchesCategory && haystack.includes(query.trim().toLowerCase());
    });

    const withStats = filtered.map((item) => ({ item, stats: itemStats(item) }));
    const never = 99999;

    withStats.sort((a, b) => {
      switch (sort) {
        case "least":
          return (b.stats.daysSinceLastWorn ?? never) - (a.stats.daysSinceLastWorn ?? never);
        case "most":
          return b.stats.wearCount - a.stats.wearCount;
        case "least-worn":
          return a.stats.wearCount - b.stats.wearCount;
        case "az":
          return a.item.name.localeCompare(b.item.name);
        case "recent":
        default:
          return (a.stats.daysSinceLastWorn ?? never) - (b.stats.daysSinceLastWorn ?? never);
      }
    });
    return withStats.map(({ item }) => item);
  }, [items, category, sort, query]);

  const selected = items.find((item) => item.id === selectedId) || null;

  return (
    <div className="screen">
      <header className="closet-head">
        <div>
          <span className="page-eyebrow">your wardrobe</span>
          <h1>closet</h1>
        </div>
        <span className="count-pill">{items.length} items</span>
      </header>

      <div className="closet-search">
        <Icon name="search" size={17} />
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="search your closet"
          aria-label="Search your closet"
        />
      </div>

      <div className="closet-filters">
        <div className="chip-scroll" role="tablist" aria-label="Filter by category">
          {FILTERS.map((value) => {
            const meta = CATEGORY_META[value];
            return (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={category === value}
                className={`chip ${category === value ? "chip-active" : ""}`}
                onClick={() => setCategory(value)}
              >
                <Icon name={meta.icon} size={15} />
                {value}
              </button>
            );
          })}
        </div>
        <label className="sort-select">
          <span className="sr-only">Sort items</span>
          <Icon name="filter" size={16} />
          <select value={sort} onChange={(event) => setSort(event.target.value)}>
            {SORTS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </label>
      </div>

      {visible.length === 0 ? (
        <div className="empty-state">
          <Icon name="tshirt" size={52} />
          <h2>no items in this category</h2>
          <p>add items to your closet to start tracking your wardrobe</p>
          <button type="button" className="btn btn-primary" onClick={() => navigate("/app/add")}>
            pin first item
          </button>
        </div>
      ) : (
        <>
          <p className="closet-count">
            showing {visible.length} of {items.length}
          </p>
          <div className="item-grid">
            {visible.map((item) => (
              <ItemCard key={item.id} item={item} onClick={() => setSelectedId(item.id)} />
            ))}
          </div>
        </>
      )}

      {selected && <ItemDetail item={selected} onClose={() => setSelectedId(null)} />}
    </div>
  );
}
