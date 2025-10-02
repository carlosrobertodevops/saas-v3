import React from "react";

import MainHeader from "../MainHeader";
import TemplateSubHeader from "@/src/components/TemplatesSubHeader";
import TemplateList from "@/src/components/TemplatesList";
import { useAppContext } from "@/src/app/AppContext";

function AllTemplatesPage() {
  const {
    isDarkModeObject: { isDarkMode },
  } = useAppContext();
  return (
    <div
      className={`w-full h-screen flex-1 overflow-y-auto  ${
        !isDarkMode ? "bg-slate-50" : "bg-slate-700"
      }`}
    >
      <MainHeader />
      <TemplateSubHeader />
      <TemplateList />
    </div>
  );
}

export default AllTemplatesPage;
