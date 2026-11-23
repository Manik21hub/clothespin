import { useEffect, useRef, useState } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import Splash from "./Splash";
import TabBar from "./TabBar";
import Toast from "./Toast";
import Home from "./screens/Home";
import Closet from "./screens/Closet";
import AddItem from "./screens/AddItem";
import Insights from "./screens/Insights";
import Donate from "./screens/Donate";
import Profile from "./screens/Profile";

export default function AppShell() {
  const location = useLocation();
  const scrollRef = useRef(null);
  const [showSplash, setShowSplash] = useState(
    () => !sessionStorage.getItem("clothespin.splashSeen")
  );

  useEffect(() => {
    if (!showSplash) return;
    const timer = setTimeout(() => {
      sessionStorage.setItem("clothespin.splashSeen", "1");
      setShowSplash(false);
    }, 2600);
    return () => clearTimeout(timer);
  }, [showSplash]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 });
  }, [location.pathname]);

  return (
    <div className="app-page">
      <div className="app-frame">
        <div className="app-scroll" ref={scrollRef}>
          <Routes>
            <Route index element={<Home />} />
            <Route path="closet" element={<Closet />} />
            <Route path="add" element={<AddItem />} />
            <Route path="insights" element={<Insights />} />
            <Route path="donate" element={<Donate />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<Navigate to="/app" replace />} />
          </Routes>
        </div>
        <TabBar />
        <Toast />
      </div>
      {showSplash && <Splash />}
    </div>
  );
}
