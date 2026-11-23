const P = {
  home: (
    <>
      <path d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-4.5v-6h-5v6H5a1 1 0 0 1-1-1z" />
    </>
  ),
  closet: (
    <>
      <rect x="4" y="3.5" width="16" height="17" rx="2" />
      <path d="M12 3.5v17M9 8.5h.01M15 8.5h.01" />
    </>
  ),
  plusCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 8.5v7M8.5 12h7" />
    </>
  ),
  bulb: (
    <>
      <path d="M9 18h6M10 21h4M8.2 14.5a6 6 0 1 1 7.6 0c-.6.5-.8 1.2-.8 2H9c0-.8-.2-1.5-.8-2Z" />
    </>
  ),
  donate: (
    <>
      <path d="M6.5 8.5 12 3l5.5 5.5M6.5 15.5 12 21l5.5-5.5" />
      <path d="M12 3v18" />
      <path d="M3 12h3M18 12h3" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.8 20.5c.6-3.5 3.5-5.6 7.2-5.6s6.6 2.1 7.2 5.6" />
    </>
  ),
  search: (
    <>
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 4 4" />
    </>
  ),
  x: <path d="M6 6l12 12M18 6 6 18" />,
  chevronLeft: <path d="m14.5 5-7 7 7 7" />,
  chevronRight: <path d="m9.5 5 7 7-7 7" />,
  chevronDown: <path d="m5 9.5 7 7 7-7" />,
  check: <path d="m4.5 12.5 5 5 10-11" />,
  heart: (
    <path d="M12 20s-7.5-4.6-7.5-9.4A4.1 4.1 0 0 1 12 7.6a4.1 4.1 0 0 1 7.5 3C19.5 15.4 12 20 12 20Z" />
  ),
  star: (
    <path d="m12 3.5 2.6 5.3 5.9.8-4.3 4.1 1 5.8-5.2-2.8-5.2 2.8 1-5.8L3.5 9.6l5.9-.8Z" />
  ),
  ticket: (
    <>
      <path d="M3.5 8.5A1.5 1.5 0 0 1 5 7h14a1.5 1.5 0 0 1 1.5 1.5v2a2.5 2.5 0 0 0 0 5v2A1.5 1.5 0 0 1 19 19H5a1.5 1.5 0 0 1-1.5-1.5v-2a2.5 2.5 0 0 0 0-5z" />
      <path d="M14 7v10" strokeDasharray="2 2.4" />
    </>
  ),
  percent: (
    <>
      <path d="m6 18 12-12" />
      <circle cx="7.5" cy="7.5" r="2.2" />
      <circle cx="16.5" cy="16.5" r="2.2" />
    </>
  ),
  box: (
    <>
      <path d="M3.5 8 12 3.5 20.5 8v8L12 20.5 3.5 16z" />
      <path d="M3.5 8 12 12.5 20.5 8M12 12.5v8" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v4a5 5 0 0 1-10 0z" />
      <path d="M7 5H4.5v1.5A3.5 3.5 0 0 0 8 10M17 5h2.5v1.5A3.5 3.5 0 0 1 16 10M12 13v4M8.5 21h7M10 17h4" />
    </>
  ),
  calendar: (
    <>
      <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
      <path d="M3.5 10h17M8 3.5v4M16 3.5v4" />
    </>
  ),
  tshirt: (
    <path d="m8 3.5-4.5 2 1.6 4.4 2.4-.9v11h9v-11l2.4.9 1.6-4.4-4.5-2a3.5 3.5 0 0 1-8 0Z" />
  ),
  walk: (
    <>
      <circle cx="13" cy="4.5" r="1.8" />
      <path d="M11 21.5 13.2 15l-2.7-3 .9-4.4 3.1 2.2 2.5 1M10.5 8.1 7.4 10l-1.4 4.2M13.2 15l3 2 .9 4.5" />
    </>
  ),
  dress: (
    <path d="M9.5 3.5h5l-.7 4 3.7 11.2a1.6 1.6 0 0 1-1.5 2.1H8a1.6 1.6 0 0 1-1.5-2.1L10.2 7.5zM10 7.5h4" />
  ),
  shoe: (
    <>
      <path d="M3 16.5h15.5a2.5 2.5 0 0 0 2.5-2.5c0-1.1-.7-1.9-1.8-2.2L14 10.4 10.5 6H8.5l.6 3.2-2.6 1.2L4 8.5z" />
      <path d="M3 16.5v2.2h17.5v-2.2" />
    </>
  ),
  bag: (
    <>
      <path d="M5 8h14l-1 12H6z" />
      <path d="M9 8V6.5a3 3 0 0 1 6 0V8" />
    </>
  ),
  grid: (
    <>
      <rect x="4" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="4" width="6.5" height="6.5" rx="1.5" />
      <rect x="4" y="13.5" width="6.5" height="6.5" rx="1.5" />
      <rect x="13.5" y="13.5" width="6.5" height="6.5" rx="1.5" />
    </>
  ),
  pin: (
    <>
      <path d="M12 21s6-5.4 6-10a6 6 0 1 0-12 0c0 4.6 6 10 6 10Z" />
      <circle cx="12" cy="11" r="2.2" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4c-8 0-13 3-13 8.5A5.5 5.5 0 0 0 12.5 18C18 18 20 12 20 4Z" />
      <path d="M4 21c1-5 4-8 9-10" />
    </>
  ),
  camera: (
    <>
      <path d="M4 8.5h3l1.5-2h7L17 8.5h3v11H4z" />
      <circle cx="12" cy="14" r="3.2" />
    </>
  ),
  trash: (
    <>
      <path d="M4.5 7h15M9.5 7V5h5v2M6.5 7l1 13h9l1-13M10 11v5M14 11v5" />
    </>
  ),
  sparkles: (
    <>
      <path d="M12 3.5 13.6 8 18 9.6 13.6 11 12 15.5 10.4 11 6 9.6 10.4 8Z" />
      <path d="M18.5 15.5l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7ZM5 16l.6 1.4L7 18l-1.4.6L5 20l-.6-1.4L3 18l1.4-.6Z" />
    </>
  ),
  arrowRight: <path d="M4 12h15m-6-6 6 6-6 6" />,
  arrowLeft: <path d="M20 12H5m6 6-6-6 6-6" />,
  clock: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </>
  ),
  flame: (
    <path d="M12 21c3.6 0 6-2.4 6-5.6 0-4.4-4.4-6-4-12.4-3 1.2-5 4-5 6.4 0 1.2.4 2 .4 2.6 0 1-.8 1.6-1.6 1.6-.6 0-1-.2-1.4-.6-.3 1-.4 1.9-.4 2.4C6 18.6 8.4 21 12 21Z" />
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 11v5M12 8h.01" />
    </>
  ),
  filter: <path d="M4 6h16M7 12h10M10 18h4" />,
  upload: (
    <>
      <path d="M12 16V4m-4 4 4-4 4 4" />
      <path d="M4.5 15v4.5h15V15" />
    </>
  ),
  hanger: (
    <>
      <path d="M12 8.5a2.2 2.2 0 1 1 2.2 2.2c-.7 0-1.2.5-1.2 1.2v.6" />
      <path d="M12 12.5 3.8 18a1 1 0 0 0 .6 1.8h15.2a1 1 0 0 0 .6-1.8Z" />
    </>
  ),
  menu: <path d="M4 7h16M4 12h16M4 17h16" />,
  recycle: (
    <>
      <path d="m8.5 5.5 2-3 2 3M10.5 2.5v6" />
      <path d="m17.5 9.5 2.8 1.6-1.4 2.4M20.3 11.1l-5.2 3" />
      <path d="m6.5 14.5-2.8 1.6 1.4 2.4M3.7 16.1l5.2 3" />
      <path d="M9.5 20.5h5M12 17.5v3" />
    </>
  ),
  scissors: (
    <>
      <circle cx="6.5" cy="6.5" r="2.5" />
      <circle cx="6.5" cy="17.5" r="2.5" />
      <path d="M8.6 8.3 20 19M8.6 15.7 20 5" />
    </>
  ),
  gift: (
    <>
      <rect x="3.5" y="8.5" width="17" height="4" rx="1" />
      <path d="M5 12.5V21h14v-8.5M12 8.5V21" />
      <path d="M12 8.5C12 6 10.5 4 8.5 4S6 5.6 6 6.6c0 1.2 1 1.9 2.4 1.9zM12 8.5C12 6 13.5 4 15.5 4S18 5.6 18 6.6c0 1.2-1 1.9-2.4 1.9z" />
    </>
  ),
  lock: (
    <>
      <rect x="4.5" y="10" width="15" height="10.5" rx="2" />
      <path d="M8 10V7.5a4 4 0 0 1 8 0V10M12 14.5v2" />
    </>
  ),
  users: (
    <>
      <circle cx="9" cy="8.5" r="3" />
      <path d="M3 20c.5-3 2.8-4.8 6-4.8s5.5 1.8 6 4.8" />
      <path d="M16 5.8a3 3 0 0 1 0 5.4M17.5 15.5c2 .6 3.2 2.1 3.5 4.5" />
    </>
  ),
  droplet: (
    <path d="M12 3.5S6 10 6 14a6 6 0 0 0 12 0c0-4-6-10.5-6-10.5Z" />
  ),
  alert: (
    <>
      <path d="M12 4 3 20h18Z" />
      <path d="M12 9.5v4.5M12 17h.01" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3" y="7.5" width="18" height="12.5" rx="2" />
      <path d="M8.5 7.5V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v1.5M3 12.5h18" />
    </>
  ),
  map: (
    <>
      <path d="m3.5 6.5 5-2 7 2 5-2v13l-5 2-7-2-5 2z" />
      <path d="M8.5 4.5v13M15.5 6.5v13" />
    </>
  ),
  minusCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M8.5 12h7" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  image: (
    <>
      <rect x="3.5" y="4.5" width="17" height="15" rx="2" />
      <circle cx="9" cy="9.5" r="1.6" />
      <path d="m4.5 17 4.5-4.5 3.5 3.5 3-3 4 4" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="8.5" />
      <path d="m8 12.3 2.7 2.7 5.3-5.6" />
    </>
  ),
  qr: (
    <>
      <rect x="3.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="14.5" y="3.5" width="6" height="6" rx="1" />
      <rect x="3.5" y="14.5" width="6" height="6" rx="1" />
      <path d="M14.5 14.5h2.5v2.5h-2.5zM19 19h1.5v1.5H19zM14.5 20.5h2M20.5 14.5v2" />
    </>
  ),
  settings: (
    <>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 3v2.5M12 18.5V21M3 12h2.5M18.5 12H21M5.6 5.6l1.8 1.8M16.6 16.6l1.8 1.8M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8" />
    </>
  ),
  tag: (
    <>
      <path d="M4 4h7l9 9-7 7-9-9z" />
      <circle cx="8.5" cy="8.5" r="1.2" />
    </>
  ),
  ruler: (
    <>
      <rect x="2.5" y="8.5" width="19" height="7" rx="1.5" transform="rotate(-20 12 12)" />
      <path d="m7 9.5 1 2.5M10 8.5l1 2.5M13 7.5l1 2.5" />
    </>
  ),
  external: (
    <>
      <path d="M14 4h6v6M20 4l-8 8" />
      <path d="M18 14v5.5H4.5V6H10" />
    </>
  ),
  arrowUpRight: <path d="M7 17 17 7M8 7h9v9" />,
};

export default function Icon({ name, size = 20, strokeWidth = 1.8, className = "", ...rest }) {
  const shape = P[name] || P.sparkles;
  return (
    <svg
      className={`icon ${className}`}
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {shape}
    </svg>
  );
}
