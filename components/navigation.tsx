"use client";
import { useState } from "react";

import Sidebar from "@/components/sidebar";
import Header from "@/components/header";

export default function Navigation({ profile }: { profile: Profile }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="relative z-1">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <Header
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        profile={profile}
      />
    </div>
  );
}
