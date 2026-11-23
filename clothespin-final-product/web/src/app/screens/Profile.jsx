import { useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icon from "../../components/Icon";
import { itemStats, sustainabilityScore } from "../../data/items";
import { formatPoints, startOfWeek } from "../../lib/format";
import { compressImage } from "../../lib/image";
import { useApp } from "../../state/AppState";
import RewardsModal from "../components/RewardsModal";

export default function Profile() {
  const {
    items,
    donations,
    points,
    profile,
    nextReward,
    pointsToNextReward,
    updateProfile,
  } = useApp();
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [editing, setEditing] = useState(false);
  const [rewardsOpen, setRewardsOpen] = useState(false);
  const [form, setForm] = useState(profile);

  const stats = useMemo(() => {
    const weekStart = startOfWeek().getTime();
    const wornThisWeek = items.filter((item) =>
      item.wearHistory.some((date) => new Date(`${date}T12:00:00`).getTime() >= weekStart)
    ).length;
    const toDonate = items.filter((item) => {
      const days = itemStats(item).daysSinceLastWorn;
      return days === null || days >= 30;
    }).length;
    return {
      count: items.length,
      wornThisWeek,
      toDonate,
      score: sustainabilityScore(items),
      donations: (donations || []).length,
      topWears: Math.max(0, ...items.map((item) => item.wearHistory.length)),
    };
  }, [items, donations]);

  const achievements = [
    {
      icon: "leaf",
      title: "eco warrior",
      description: `maintained a ${stats.score}% sustainability score`,
      unlocked: stats.score >= 50,
    },
    {
      icon: "heart",
      title: "giving spirit",
      description: "donated items to a local drop-off",
      unlocked: stats.donations >= 1,
    },
    {
      icon: "calendar",
      title: "consistent wardrobe",
      description: `wore ${stats.wornThisWeek} item${stats.wornThisWeek === 1 ? "" : "s"} this week`,
      unlocked: stats.wornThisWeek >= 3,
    },
    {
      icon: "sparkles",
      title: "rotation pro",
      description: `an item has been worn ${stats.topWears} times`,
      unlocked: stats.topWears >= 10,
    },
  ];

  const startEditing = () => {
    setForm(profile);
    setEditing(true);
  };

  const pickPhoto = async (file) => {
    if (!file) return;
    try {
      const photo = await compressImage(file, 400, 0.82);
      setForm((current) => ({ ...current, photo }));
    } catch {
      /* keep the existing photo */
    }
  };

  const save = () => {
    updateProfile(form);
    setEditing(false);
  };

  return (
    <div className="screen profile-screen">
      <div className="profile-topbar">
        <button type="button" className="page-back" onClick={() => navigate("/app")} aria-label="Go back">
          ←
        </button>
        <button type="button" className="btn btn-ghost profile-edit" onClick={startEditing}>
          edit profile
        </button>
      </div>

      <header className="profile-head">
        <button type="button" className="profile-avatar" onClick={startEditing} aria-label="Edit profile photo">
          <img src={profile.photo} alt={profile.name} />
          <span className="profile-avatar-badge">
            <Icon name="camera" size={14} />
          </span>
        </button>
        <h1>{profile.name.toLowerCase()}</h1>
        <p className="profile-handle">{profile.handle}</p>
        <p className="profile-bio">{profile.bio}</p>
        <span className="profile-location">
          <Icon name="pin" size={13} />
          {profile.location}
        </span>
      </header>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="sr-only"
        onChange={(event) => pickPhoto(event.target.files?.[0])}
      />

      <section className="profile-section">
        <h2>your stats</h2>
        <div className="profile-stats">
          {[
            { icon: "tshirt", value: stats.count, label: "items in closet" },
            { icon: "calendar", value: stats.wornThisWeek, label: "worn this week" },
            { icon: "heart", value: stats.toDonate, label: "items to donate" },
            { icon: "leaf", value: `${stats.score}%`, label: "sustainability score" },
          ].map((stat) => (
            <div className="profile-stat" key={stat.label}>
              <Icon name={stat.icon} size={20} />
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="profile-section">
        <h2>points &amp; rewards</h2>
        <div className="profile-points-row">
          <div className="profile-points">
            <Icon name="star" size={22} />
            <strong>{formatPoints(points)}</strong>
            <span>total points</span>
          </div>
          <button type="button" className="profile-redeem" onClick={() => setRewardsOpen(true)}>
            <Icon name="gift" size={22} />
            <strong>redeem</strong>
            <span>
              {nextReward ? `${pointsToNextReward} pts to go` : "all rewards unlocked"}
            </span>
          </button>
        </div>
      </section>

      <section className="profile-section">
        <h2>insights</h2>
        <ul className="achievements">
          {achievements.map((achievement) => (
            <li key={achievement.title} className={achievement.unlocked ? "" : "locked"}>
              <span className="achievement-icon">
                <Icon name={achievement.icon} size={18} />
              </span>
              <div>
                <strong>{achievement.title}</strong>
                <p>{achievement.description}</p>
              </div>
              <Icon name={achievement.unlocked ? "checkCircle" : "lock"} size={18} />
            </li>
          ))}
        </ul>
      </section>

      <p className="profile-footer">
        <Link to="/">back to site</Link>
      </p>

      {editing && (
        <div className="sheet-backdrop" onMouseDown={() => setEditing(false)} role="presentation">
          <section
            className="sheet"
            role="dialog"
            aria-modal="true"
            aria-label="edit profile"
            onMouseDown={(event) => event.stopPropagation()}
          >
            <header className="sheet-head">
              <h2>edit profile</h2>
              <button type="button" className="sheet-close" onClick={() => setEditing(false)} aria-label="Close">
                <Icon name="x" size={18} />
              </button>
            </header>
            <div className="sheet-body">
              <div className="edit-photo">
                <img src={form.photo} alt="" />
                <button type="button" className="btn btn-ghost" onClick={() => fileRef.current?.click()}>
                  <Icon name="camera" size={16} />
                  change photo
                </button>
              </div>
              <label className="edit-field">
                <span>full name</span>
                <input
                  className="text-input"
                  value={form.name}
                  onChange={(event) => setForm({ ...form, name: event.target.value })}
                />
              </label>
              <label className="edit-field">
                <span>username</span>
                <input
                  className="text-input"
                  value={form.handle}
                  onChange={(event) => setForm({ ...form, handle: event.target.value })}
                />
              </label>
              <label className="edit-field">
                <span>bio</span>
                <textarea
                  className="text-input"
                  rows={3}
                  value={form.bio}
                  onChange={(event) => setForm({ ...form, bio: event.target.value })}
                />
              </label>
              <label className="edit-field">
                <span>location</span>
                <input
                  className="text-input"
                  value={form.location}
                  onChange={(event) => setForm({ ...form, location: event.target.value })}
                />
              </label>
              <button
                type="button"
                className="btn btn-primary btn-block"
                disabled={!form.name.trim() || !form.handle.trim()}
                onClick={save}
              >
                Save Changes
              </button>
            </div>
          </section>
        </div>
      )}

      <RewardsModal open={rewardsOpen} onClose={() => setRewardsOpen(false)} />
    </div>
  );
}
