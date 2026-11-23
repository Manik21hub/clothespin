import Icon from "../../components/Icon";
import { formatLongDate, formatPoints, relativeTime } from "../../lib/format";
import { useApp } from "../../state/AppState";
import Sheet from "./Sheet";

const REWARD_ICONS = {
  coupon: "ticket",
  discount: "percent",
  free_shipping: "box",
  exclusive_access: "star",
};

const ACTIVITY_ICONS = {
  donation: "heart",
  wear_rare_item: "tshirt",
  weekly_streak: "calendar",
  first_item: "star",
  milestone: "trophy",
};

export default function RewardsModal({ open, onClose }) {
  const { points, rewards, nextReward, pointsToNextReward, history, redeemReward } = useApp();

  return (
    <Sheet open={open} onClose={onClose} title="rewards" className="sheet-rewards">
      <div className="rewards-head">
        <span className="rewards-star">
          <Icon name="star" size={38} />
        </span>
        <strong className="rewards-total">{formatPoints(points)}</strong>
        <span className="rewards-total-label">Total Points</span>
        {nextReward && (
          <div className="next-reward">
            <span>Next Reward</span>
            <strong>{pointsToNextReward} points to go!</strong>
            <div className="progress">
              <span
                style={{
                  width: `${Math.min(100, Math.round((points / nextReward.pointsRequired) * 100))}%`,
                }}
              />
            </div>
          </div>
        )}
      </div>

      <h3 className="sheet-section-title">available rewards</h3>
      <ul className="reward-cards">
        {rewards.map((reward) => {
          const unlocked = reward.unlocked;
          return (
            <li key={reward.id} className={`reward-card ${unlocked ? "reward-unlocked" : ""}`}>
              <span className="reward-card-icon">
                <Icon name={REWARD_ICONS[reward.type] || "gift"} size={19} />
              </span>
              <div className="reward-card-copy">
                <strong>{reward.title}</strong>
                <p>{reward.description}</p>
                <span className="reward-shop">{reward.shopName}</span>
                <span className="reward-valid">valid until {formatLongDate(reward.validUntil)}</span>
              </div>
              <div className="reward-card-side">
                {unlocked ? (
                  reward.redeemed ? (
                    <span className="reward-state done">
                      <Icon name="checkCircle" size={16} /> used
                    </span>
                  ) : (
                    <button
                      type="button"
                      className="reward-claim"
                      onClick={() => redeemReward(reward)}
                    >
                      claim
                    </button>
                  )
                ) : (
                  <>
                    <strong>{reward.pointsRequired} pts</strong>
                    <span className="reward-state locked">locked</span>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {history.length > 0 && (
        <>
          <h3 className="sheet-section-title">recent activity</h3>
          <ul className="activity-list">
            {history.slice(0, 10).map((activity) => (
              <li key={activity.id}>
                <span className={`activity-icon activity-${activity.type}`}>
                  <Icon name={ACTIVITY_ICONS[activity.type] || "sparkles"} size={15} />
                </span>
                <div>
                  <span>{activity.description}</span>
                  {activity.itemName && <em>{activity.itemName}</em>}
                  <small>{relativeTime(activity.timestamp)}</small>
                </div>
                <strong>+{activity.points}</strong>
              </li>
            ))}
          </ul>
        </>
      )}
    </Sheet>
  );
}
