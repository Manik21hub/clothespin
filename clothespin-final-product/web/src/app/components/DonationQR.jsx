import { useMemo, useState } from "react";
import Icon from "../../components/Icon";
import { useApp } from "../../state/AppState";
import Sheet from "./Sheet";

const LOCATIONS = [
  "Goodwill",
  "Salvation Army",
  "Local Thrift Store",
  "Community Donation Center",
  "Red Cross",
  "Habitat for Humanity",
];

export default function DonationQR({ open, onClose }) {
  const { logDonation } = useApp();
  const [count, setCount] = useState(1);
  const [location, setLocation] = useState(LOCATIONS[0]);

  const payload = useMemo(
    () => `clothespin:donation:${count}:${location}:${Math.floor(Date.now() / 1000)}`,
    [count, location]
  );
  const donationId = payload.slice(-8);

  const complete = () => {
    logDonation(count, location);
    onClose();
    setCount(1);
  };

  return (
    <Sheet open={open} onClose={onClose} title="make donation" className="sheet-qr">
      <div className="qr-head">
        <Icon name="qr" size={40} />
        <h3>Donation QR Code</h3>
        <p>Show this QR code to the donation center staff</p>
      </div>

      <div className="qr-box">
        <div className="qr-art" aria-hidden="true">
          <Icon name="qr" size={110} strokeWidth={1.1} />
        </div>
        <span>QR Code</span>
        <em>Donation ID: {donationId}</em>
      </div>

      <h4 className="qr-label">Number of Items</h4>
      <div className="stepper">
        <button
          type="button"
          onClick={() => setCount((value) => Math.max(1, value - 1))}
          disabled={count <= 1}
          aria-label="Remove one item"
        >
          <Icon name="minusCircle" size={26} />
        </button>
        <strong>{count}</strong>
        <button type="button" onClick={() => setCount((value) => value + 1)} aria-label="Add one item">
          <Icon name="plusCircle" size={26} />
        </button>
      </div>

      <h4 className="qr-label">Donation Location</h4>
      <label className="select-wrap">
        <span className="sr-only">Donation location</span>
        <select value={location} onChange={(event) => setLocation(event.target.value)}>
          {LOCATIONS.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <Icon name="chevronDown" size={16} />
      </label>

      <button type="button" className="btn btn-primary btn-block qr-complete" onClick={complete}>
        <Icon name="checkCircle" size={18} />
        Complete Donation
      </button>
      <button type="button" className="qr-cancel" onClick={onClose}>
        Cancel
      </button>
      <p className="qr-note">
        You&apos;ll earn {count * 50} points for this drop-off.
      </p>
    </Sheet>
  );
}
