"use client";

// Tradução
import Link from "next/link";
import { useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";

import { useAppContext } from "@/src/app/AppContext";
import React, { useEffect, useState } from "react";
import { countWords } from "../../Hisotry/Components/SingleHistoryItem";

function RemainingWords() {
  const t = useTranslations("Plans");
  const t1 = useTranslations("Home");

  const {
    mainMenuItemsObject: { setMainMenuItems },
    contentGeneratedObject: { contentGenerated },
    fakeUser,
    setFakeUser,
  } = useAppContext();

  const challengeText = t1("ai_generated_content");
  const progressText = `${fakeUser.cumulativeWords} / ${
    !fakeUser.isPro ? "1000" : "100,000"
  } words generated`;
  const upgradeButtonText = t("upgrade_to_pro");

  // Barra de progresso
  function progressBarCalculation() {
    const divider = !fakeUser.isPro ? 1000 : 100000;
    const results = (fakeUser.cumulativeWords / divider) * 100;

    if (results >= 100) {
      return 100;
    }
    return results;
  }

  //update the cumulative total words state when the user generates content
  //based on the content generated state
  useEffect(() => {
    // We get the count of words by using the count words function
    const wordCountContentGenerated = countWords(contentGenerated);
    //increment the state
    setFakeUser((prevUser) => {
      return {
        ...prevUser,
        cumulativeWords: prevUser.cumulativeWords + wordCountContentGenerated,
      };
    });
  }, [contentGenerated]);

  return (
    <div
      className={`   p-[18px] rounded-lg shadow-md mt-24 mx-2   bg-gradient-to-r from-purple-600 to-purple-800`}
    >
      <h3 className="text-[15px] font-semibold mb-2 text-white ">
        {challengeText}
      </h3>
      <div className="w-full bg-gray-300 rounded-full h-1.5 mt-5 mb-2">
        <div
          className="bg-white h-1.5 rounded-full"
          style={{ width: `${progressBarCalculation()}%` }}
        ></div>
      </div>
      <p className="text-[10px] text-white mb-5">{progressText}</p>
      {!fakeUser.isPro && (
        <button
          onClick={() => {
            setMainMenuItems((prevArray) =>
              prevArray.map((singleItem) => ({
                ...singleItem,
                isSelected: singleItem.label === "Subscriptions" ? true : false,
              })),
            );
          }}
          className="w-full text-[10px] bg-white text-purple-600 py-2 px-4 rounded-md hover:bg-slate-100 transition duration-300"
        >
          {upgradeButtonText}
        </button>
      )}
    </div>
  );
}

export default RemainingWords;
