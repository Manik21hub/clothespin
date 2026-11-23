import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Splash() {
  const [leaving, setLeaving] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLeaving(true), 2100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`splash ${leaving ? "splash-leaving" : ""}`} role="status" aria-live="polite">
      <div className="splash-inner">
        <div className="splash-logo">
          <img src="/images/wordmark_white.png" alt="Clothespin" />
        </div>
        <p className="splash-tagline">pin your style. spin it forward.</p>
      </div>
      <div className="splash-foot">
        <span className="spinner" aria-hidden="true" />
        <span>loading...</span>
        <Link to="/" className="splash-skip">
          back to site
        </Link>
      </div>
    </div>
  );
}
