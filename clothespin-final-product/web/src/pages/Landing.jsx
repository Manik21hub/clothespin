import { Link } from "react-router-dom";
import Icon from "../components/Icon";
import { REWARDS } from "../data/rewards";

const NAV = [
  { href: "#why", label: "why" },
  { href: "#features", label: "features" },
  { href: "#how", label: "how it works" },
  { href: "#rewards", label: "rewards" },
];

const FEATURES = [
  {
    icon: "camera",
    title: "Pin it in seconds",
    body: "Snap a photo of any piece and it lands in your digital wardrobe, tagged and ready to style.",
  },
  {
    icon: "clock",
    title: "Track every wear",
    body: "One tap logs the day. See what you actually reach for and what just hangs there.",
  },
  {
    icon: "bulb",
    title: "Gentle nudges",
    body: "Reminders surface the pieces you haven’t worn in a while, so nothing gets forgotten.",
  },
  {
    icon: "sparkles",
    title: "Outfit ideas",
    body: "Mix-and-match suggestions built from the clothes you already own — no shopping required.",
  },
  {
    icon: "pin",
    title: "Thrift nearby",
    body: "Find thrift shops and donation pop-ups around you, then log the drop-off in a tap.",
  },
  {
    icon: "star",
    title: "Get rewarded",
    body: "Earn points for re-wearing and donating, then trade them for discounts at partner shops.",
  },
];

const STEPS = [
  {
    n: "01",
    title: "Pin your closet",
    body: "Photograph what you own. Clothespin builds your wardrobe and keeps it organised by category.",
  },
  {
    n: "02",
    title: "Wear, log, repeat",
    body: "Tap to log a wear. Your insights show cost-per-wear, streaks, and the pieces gathering dust.",
  },
  {
    n: "03",
    title: "Spin it forward",
    body: "Donate what you don’t wear, earn points, and unlock discounts at circular fashion partners.",
  },
];

const IMPACT = [
  { value: "100B+", label: "garments produced every year" },
  { value: "92M", label: "tonnes of textile waste annually" },
  { value: "<1%", label: "of clothing is recycled into new clothes" },
];

const ITEM_CARDS = [
  { id: "img_001", label: "worn 19×", className: "polaroid-a" },
  { id: "img_006", label: "47 wears", className: "polaroid-b" },
  { id: "img_004", label: "due for a re-wear", className: "polaroid-c" },
  { id: "img_017", label: "rarely worn", className: "polaroid-d" },
];

export default function Landing() {
  return (
    <div className="landing">
      <header className="nav">
        <div className="wrap nav-inner">
          <Link to="/" className="nav-brand" aria-label="Clothespin home">
            <img src="/images/wordmark_dark.png" alt="Clothespin" />
          </Link>
          <nav className="nav-links" aria-label="Main">
            {NAV.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
          </nav>
          <Link className="btn btn-primary nav-cta" to="/app">
            open the app
            <Icon name="arrowRight" size={16} />
          </Link>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <span className="eyebrow">
                <Icon name="leaf" size={15} /> circular fashion
              </span>
              <h1>
                pin your style.
                <br />
                <span className="hero-accent">spin it forward.</span>
              </h1>
              <p className="hero-lede">
                Clothespin turns your closet into a living wardrobe. Photograph your
                clothes, track what you actually wear, and get rewarded for re-wearing
                and donating instead of buying new.
              </p>
              <div className="hero-actions">
                <Link className="btn btn-primary" to="/app">
                  try the web app
                  <Icon name="arrowRight" size={16} />
                </Link>
              </div>
              <div className="hero-note">
                <span className="avatar-stack" aria-hidden="true">
                  {["img_006", "img_008", "img_011"].map((id) => (
                    <img key={id} src={`/images/${id}.webp`} alt="" />
                  ))}
                </span>
                Free, no account needed.
              </div>
            </div>

            <div className="hero-visual" aria-hidden="true">
              <div className="hero-blob" />
              {ITEM_CARDS.map((card, index) => (
                <figure key={card.id} className={`polaroid ${card.className}`}>
                  <img src={`/images/${card.id}.webp`} alt="" loading={index === 0 ? "eager" : "lazy"} />
                  <figcaption>{card.label}</figcaption>
                </figure>
              ))}
              <div className="float-card points-float">
                <span className="float-icon">
                  <Icon name="star" size={18} />
                </span>
                <div>
                  <strong>+50 points</strong>
                  <span>donation logged</span>
                </div>
              </div>
              <div className="float-card streak-float">
                <span className="float-icon warm">
                  <Icon name="flame" size={18} />
                </span>
                <div>
                  <strong>6 day streak</strong>
                  <span>keep it spinning</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="ticker" aria-hidden="true">
          <div className="ticker-track">
            {[0, 1].map((copy) => (
              <div className="ticker-group" key={copy}>
                {["pin", "track", "re-wear", "donate", "earn", "repeat"].map((word) => (
                  <span key={word}>
                    {word}
                    <i>✳</i>
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>

        <section id="why" className="section why">
          <div className="wrap why-grid">
            <div>
              <span className="eyebrow">the problem</span>
              <h2>We wear 20% of our closet. The rest just waits.</h2>
              <p className="section-lede">
                Fast fashion made new clothes cheap and disposable. The most sustainable
                outfit is the one already hanging in your wardrobe — it just needs a
                little attention.
              </p>
              <Link to="/app/closet" className="text-link">
                see it in action <Icon name="arrowRight" size={16} />
              </Link>
            </div>
            <div className="impact-grid">
              {IMPACT.map((stat) => (
                <div className="impact-card" key={stat.value}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="features" className="section features">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">what’s inside</span>
              <h2>Everything you need to love what you own.</h2>
            </div>
            <div className="feature-grid">
              {FEATURES.map((feature) => (
                <article className="feature-card" key={feature.title}>
                  <span className="feature-icon">
                    <Icon name={feature.icon} size={22} />
                  </span>
                  <h3>{feature.title}</h3>
                  <p>{feature.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="how" className="section how">
          <div className="wrap">
            <div className="section-head">
              <span className="eyebrow">how it works</span>
              <h2>Three steps to a closet that works harder.</h2>
            </div>
            <div className="step-grid">
              {STEPS.map((step) => (
                <article className="step-card" key={step.n}>
                  <span className="step-number">{step.n}</span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
            <div className="how-cta">
              <Link className="btn btn-dark" to="/app/add">
                add your first piece
                <Icon name="plusCircle" size={17} />
              </Link>
            </div>
          </div>
        </section>

        <section id="rewards" className="section rewards">
          <div className="wrap rewards-grid">
            <div className="rewards-copy">
              <span className="eyebrow">points that mean something</span>
              <h2>Wear more. Waste less. Earn rewards.</h2>
              <p className="section-lede">
                Every re-wear of a forgotten piece is +10 points. Every donation is +50.
                Points turn into real discounts at thrift stores and circular fashion
                partners.
              </p>
              <ul className="reward-list">
                {REWARDS.slice(0, 3).map((reward) => (
                  <li key={reward.id}>
                    <span className="reward-icon">
                      <Icon name={reward.type === "free_shipping" ? "box" : reward.type === "coupon" ? "ticket" : "percent"} size={17} />
                    </span>
                    <span>
                      <strong>{reward.title}</strong>
                      <em>
                        {reward.pointsRequired} pts · {reward.shopName}
                      </em>
                    </span>
                  </li>
                ))}
              </ul>
              <Link to="/app/insights" className="text-link">
                browse all rewards <Icon name="arrowRight" size={16} />
              </Link>
            </div>
            <div className="rewards-visual" aria-hidden="true">
              <div className="points-card">
                <div className="points-card-top">
                  <span>clothespin points</span>
                  <img src="/images/pin_sage.png" alt="" />
                </div>
                <strong>340</strong>
                <div className="progress">
                  <span style={{ width: "68%" }} />
                </div>
                <div className="points-card-foot">
                  <span>next reward: 500 pts</span>
                  <span>68%</span>
                </div>
              </div>
              <div className="reward-pop">
                <span className="reward-pop-icon">
                  <Icon name="ticket" size={20} />
                </span>
                <div>
                  <strong>10% off unlocked</strong>
                  <span>Vintage Revival</span>
                </div>
                <span className="reward-code">SPIN10</span>
              </div>
            </div>
          </div>
        </section>

        <section className="cta-banner">
          <div className="wrap cta-inner">
            <div>
              <h2>Your closet is already full of new outfits.</h2>
              <p>Open the app and find them.</p>
            </div>
            <Link className="btn btn-light" to="/app">
              open clothespin
              <Icon name="arrowRight" size={17} />
            </Link>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="wrap footer-inner">
          <img src="/images/wordmark_white.png" alt="Clothespin" className="footer-logo" />
          <p>pin your style. spin it forward.</p>
          <span>© {new Date().getFullYear()} Clothespin</span>
        </div>
      </footer>
    </div>
  );
}
