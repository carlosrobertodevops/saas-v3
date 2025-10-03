"use client";

// Traduções
import { useTranslations } from "next-intl";

// SideBar
import React, { useEffect, useRef, useState } from "react";
import Logo from "@/src/components/Logo";
import MainSection from "@/src/components/MainSection";
import OthersSection from "@/src/components/OthersSection";
import RemainingWords from "@/src/components/RemainingWords";
import { useAppContext } from "@/src/app/AppContext";

function SideBar() {
  //Variables
  const {
    isDarkModeObject: { isDarkMode },
    isSideBarHiddenObject: { isSideBarHidden, setIsSideBarHidden },
    windowWidthObject: { windowWidth, setWindowWidth },
    stretchSideBarObject: { stretchSideBar, setStretchSideBar },
  } = useAppContext();

  let hideSideBarClass;
  const menuRef = useRef<HTMLDivElement>(null);

  // If the window size is less than 995
  if (windowWidth <= 995) {
    //if the use click on the menu bar icon to stretch the side bar
    if (stretchSideBar) {
      //Use fixed position and block to show the side bar
      hideSideBarClass = "block fixed z-[90] shadow-md";
      //Set the side bar hidden to false to view all the elements in the side bar
      setIsSideBarHidden(false);
    } else {
      //Otherwise don't show the side bar at all
      hideSideBarClass = "hidden";
    }
  } else {
    // Este bloco tratará do caso em que o tamanho da janela for maior que 995
    // Queremos que a barra lateral retorne ao seu estado anterior, quando estava oculta,
    // E estou usando o armazenamento local para isso
    const getIsSideBarHidden = localStorage.getItem("isSideBarHidden");
    if (getIsSideBarHidden !== null) {
      setIsSideBarHidden(JSON.parse(getIsSideBarHidden));
    }
  }

  // Este useEffect manipula a lógica de fechar a barra lateral quando o usuário clica fora dela
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setStretchSideBar(false);
      }
    }

    if (stretchSideBar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [stretchSideBar]);

  //Jsx
  return (
    <div>
      <div
        ref={menuRef}
        className={`  ${isSideBarHidden ? "w-[120px]" : "w-[274px]"} ${
          isDarkMode ? "bg-slate-800" : "bg-white"
        } ${hideSideBarClass} h-screen px-5  py-7  border-slate-200   transition-all  `}
      >
        {/* Branding Section */}
        <Logo />
        {/* Main Section */}
        <MainSection />
        {/* Tools Section */}
        <OthersSection />
        {/* Remaining words card */}
        {!isSideBarHidden && <RemainingWords />}
      </div>
    </div>
  );
}

export default SideBar;
