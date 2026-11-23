import { NavLink } from "react-router-dom";
import Icon from "../components/Icon";

const TABS = [
  { to: "/app", end: true, icon: "home", label: "home" },
  { to: "/app/closet", icon: "closet", label: "closet" },
  { to: "/app/add", icon: "plusCircle", label: "add item" },
  { to: "/app/insights", icon: "bulb", label: "insights" },
  { to: "/app/donate", icon: "donate", label: "donate" },
];

export default function TabBar() {
  return (
    <nav className="tabbar" aria-label="App sections">
      {TABS.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => `tab ${isActive ? "tab-active" : ""}`}
        >
          <span className="tab-icon">
            <Icon name={tab.icon} size={22} strokeWidth={1.9} />
          </span>
          <span className="tab-label">{tab.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
