import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { SEED_ITEMS, itemStats } from "../data/items";
import { MILESTONES, POINT_VALUES, REWARDS } from "../data/rewards";

const STORAGE_KEY = "clothespin.state.v1";

const DEFAULT_PROFILE = {
  name: "Krystal Montgomery",
  handle: "@krystal",
  bio: "Sustainability nerd, thrift hunter, and chronic outfit repeater.",
  location: "Cambridge, MA",
  photo: "/images/profile.webp",
};

const todayIso = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(
    d.getDate()
  ).padStart(2, "0")}`;
};

const loadState = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed || !Array.isArray(parsed.items)) return null;
    return parsed;
  } catch {
    return null;
  }
};

const seedDate = () => {
  const d = new Date(Date.now() - 12 * 24 * 60 * 60 * 1000);
  return d.toISOString();
};

const initialState = () => ({
  items: SEED_ITEMS,
  points: 100,
  history: [
    {
      id: "seed-donation",
      type: "donation",
      points: 100,
      description: "Donated 2 items to Goodwill San Francisco",
      timestamp: seedDate(),
      itemName: null,
    },
  ],
  donations: [
    {
      id: "seed-donation-record",
      date: seedDate(),
      location: "Goodwill San Francisco",
      itemCount: 2,
    },
  ],
  milestonesAwarded: [100],
  redeemed: [],
  profile: DEFAULT_PROFILE,
});

const AppStateContext = createContext(null);

export function AppStateProvider({ children }) {
  const saved = useRef(loadState());
  const [state, setState] = useState(() => ({ ...initialState(), ...(saved.current || {}) }));
  const [toast, setToast] = useState(null);
  const toastTimer = useRef(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      /* storage full or unavailable - the app still works in memory */
    }
  }, [state]);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const notify = useCallback((message, icon = "sparkles") => {
    setToast({ message, icon, id: Date.now() });
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(null), 3200);
  }, []);

  const awardPoints = useCallback((entry, baseState) => {
    let points = baseState.points + entry.points;
    let history = [entry, ...baseState.history].slice(0, 50);
    const milestonesAwarded = [...baseState.milestonesAwarded];

    for (const milestone of MILESTONES) {
      if (points >= milestone && !milestonesAwarded.includes(milestone)) {
        milestonesAwarded.push(milestone);
        points += POINT_VALUES.milestone;
        history = [
          {
            id: `milestone-${milestone}-${Date.now()}`,
            type: "milestone",
            points: POINT_VALUES.milestone,
            description: `Reached ${milestone} points milestone!`,
            timestamp: new Date().toISOString(),
            itemName: null,
          },
          ...history,
        ].slice(0, 50);
      }
    }

    return { points, history, milestonesAwarded };
  }, []);

  const addPoints = useCallback(
    (type, points, description, itemName = null) => {
      const entry = {
        id: `activity-${Date.now()}-${Math.random().toString(16).slice(2)}`,
        type,
        points,
        description,
        timestamp: new Date().toISOString(),
        itemName,
      };
      setState((prev) => ({ ...prev, ...awardPoints(entry, prev) }));
      notify(`+${points} points · ${description}`, "star");
    },
    [awardPoints, notify]
  );

  const addItem = useCallback(
    (item) => {
      const newItem = {
        ...item,
        id: item.id || `item_${Date.now()}`,
        wearHistory: item.wearHistory || [],
        dateBought: item.dateBought || todayIso(),
      };
      setState((prev) => {
        let next = { ...prev, items: [newItem, ...prev.items] };
        if (prev.items.length === 0) {
          const entry = {
            id: `activity-${Date.now()}`,
            type: "first_item",
            points: POINT_VALUES.firstItem,
            description: "Added your first item to closet",
            timestamp: new Date().toISOString(),
            itemName: newItem.name,
          };
          next = { ...next, ...awardPoints(entry, next) };
        }
        return next;
      });
      notify(`${newItem.name} pinned to your closet`, "check");
      return newItem;
    },
    [awardPoints, notify]
  );

  const deleteItem = useCallback(
    (id) => {
      setState((prev) => ({ ...prev, items: prev.items.filter((item) => item.id !== id) }));
      notify("Item removed from your closet", "trash");
    },
    [notify]
  );

  const recordWear = useCallback(
    (id) => {
      setState((prev) => {
        const item = prev.items.find((entry) => entry.id === id);
        if (!item) return prev;
        const before = itemStats(item).status;
        const updated = {
          ...item,
          wearHistory: [...item.wearHistory, todayIso()],
        };
        let next = {
          ...prev,
          items: prev.items.map((entry) => (entry.id === id ? updated : entry)),
        };
        if (before === "rare" || before === "never") {
          const entry = {
            id: `activity-${Date.now()}`,
            type: "wear_rare_item",
            points: POINT_VALUES.rareItemWear,
            description: "Wore rarely used item",
            timestamp: new Date().toISOString(),
            itemName: item.name,
          };
          next = { ...next, ...awardPoints(entry, next) };
        }
        return next;
      });
      const item = state.items.find((entry) => entry.id === id);
      const wasRare = item && ["rare", "never"].includes(itemStats(item).status);
      notify(
        wasRare
          ? `+${POINT_VALUES.rareItemWear} points · you re-wore ${item.name}`
          : `Logged a wear for ${item?.name || "your item"}`,
        wasRare ? "star" : "check"
      );
    },
    [awardPoints, notify, state.items]
  );

  const logDonation = useCallback(
    (count, location) => {
      const points = POINT_VALUES.donation * count;
      const entry = {
        id: `activity-${Date.now()}`,
        type: "donation",
        points,
        description: `Donated ${count} item${count === 1 ? "" : "s"} to ${location}`,
        timestamp: new Date().toISOString(),
        itemName: null,
      };
      const record = {
        id: `donation-${Date.now()}`,
        date: new Date().toISOString(),
        location,
        itemCount: count,
      };
      setState((prev) => {
        const next = {
          ...prev,
          donations: [record, ...(prev.donations || [])],
        };
        return { ...next, ...awardPoints(entry, next) };
      });
      notify(`+${points} points · donation logged at ${location}`, "heart");
    },
    [awardPoints, notify]
  );

  const updateProfile = useCallback(
    (profile) => {
      setState((prev) => ({ ...prev, profile: { ...prev.profile, ...profile } }));
      notify("Profile updated", "check");
    },
    [notify]
  );

  const redeemReward = useCallback(
    (reward) => {
      setState((prev) => {
        if (prev.redeemed.includes(reward.id) || prev.points < reward.pointsRequired) {
          return prev;
        }
        return { ...prev, redeemed: [...prev.redeemed, reward.id] };
      });
      notify(`${reward.title} unlocked — check your rewards`, "ticket");
    },
    [notify]
  );

  const resetDemo = useCallback(() => {
    setState(initialState());
    notify("Demo data reset", "recycle");
  }, [notify]);

  const rewards = useMemo(
    () =>
      REWARDS.map((reward) => ({
        ...reward,
        unlocked: state.points >= reward.pointsRequired,
        redeemed: state.redeemed.includes(reward.id),
      })),
    [state.points, state.redeemed]
  );

  const nextReward = useMemo(
    () => rewards.find((reward) => !reward.unlocked) || null,
    [rewards]
  );

  const value = useMemo(
    () => ({
      ...state,
      rewards,
      nextReward,
      pointsToNextReward: nextReward
        ? Math.max(0, nextReward.pointsRequired - state.points)
        : 0,
      addItem,
      deleteItem,
      recordWear,
      logDonation,
      addPoints,
      updateProfile,
      redeemReward,
      resetDemo,
      notify,
      toast,
      dismissToast: () => setToast(null),
    }),
    [
      state,
      rewards,
      nextReward,
      addItem,
      deleteItem,
      recordWear,
      logDonation,
      addPoints,
      updateProfile,
      redeemReward,
      resetDemo,
      notify,
      toast,
    ]
  );

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export const useApp = () => {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error("useApp must be used inside AppStateProvider");
  return ctx;
};
