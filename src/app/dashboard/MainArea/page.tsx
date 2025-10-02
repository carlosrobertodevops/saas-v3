"use client";

// Tradução
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";
import LocaleSwitcher from "@/src/components/LocaleSwitcher";

import React from "react";
import MainHeader from "../MainHeader";
import { useAppContext } from "@/src/app/AppContext";
import DashStats from "@/src/components/DashStats";
import Chart from "@/src/components/Chart";
import ChartContainer from "@/src/components/Chart";
import AllHistoryList from "@/src/components/AllHistoryList";

function MainArea() {
  const {
    isDarkModeObject: { isDarkMode },
    stretchSideBarObject: { stretchSideBar },
  } = useAppContext();
  return (
    <div className={`w-full ${!isDarkMode ? "bg-slate-50" : "bg-slate-700"}`}>
      {/* SoftLayer to open when the side bar is stretched in mobile view screen */}
      {stretchSideBar && (
        <div className="fixed w-full h-full bg-black opacity-25 z-50"></div>
      )}
      <MainHeader />
      <DashStats />
      <ChartContainer />
      <AllHistoryList />
    </div>
  );
}

export default MainArea;
