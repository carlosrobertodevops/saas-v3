// Traduções
import { useTranslations } from "next-intl";

import { useAppContext } from "@/src/app/AppContext";
import { useContentGeneratorForm } from "./LeftSectionContext";
import { useEffect } from "react";

export default function ToneOrStyle() {
  const t = useTranslations("common");
  const {
    toneOrStyleInputObject: { toneOrStyleInput, setToneOrStyleInput },
  } = useContentGeneratorForm();

  const {
    isDarkModeObject: { isDarkMode },
    openContentGeneratorFormObject: { openContentGeneratorForm },
  } = useAppContext();

  return (
    <div className=" flex gap-2 flex-col   ">
      <label
        htmlFor="toneStyle"
        className="text-[14px] font-medium   text-slate-400       "
      >
        Tone/Style:
      </label>
      <select
        value={toneOrStyleInput}
        id="toneStyle"
        className={`border rounded px-2 py-2 text-[13px] ${
          isDarkMode ? "bg-slate-700 text-white" : "bg-white"
        }`}
        onChange={(e) => setToneOrStyleInput(e.target.value)}
      >
        <option value="Catchy">{t("catchy_")}</option>
        <option value="Professional">{t("professional_")}</option>
        <option value="Casual">{t("casual_")}</option>
        <option value="Informative">{t("informative_")}</option>
        {/* Add more tone styles if needed */}
      </select>
    </div>
  );
}
