"use client";

// Clerk Auth
import { useUser } from "@clerk/nextjs";

// Tradução
import Link from "next/link";
import { useTranslations } from "next-intl";
import LocaleSwitcher from "@/src/components/LocaleSwitcher";
import NavLink from "@/src/components/NavLink";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import React, {
  createContext,
  useContext,
  useState,
  Dispatch,
  useEffect,
  ReactNode,
} from "react";
import { LuLayoutDashboard } from "react-icons/lu";
import {
  MdHistory,
  MdOutlineViewCarousel,
  MdSubscriptions,
} from "react-icons/md"; // Added Subscription icon
import { TbTemplate } from "react-icons/tb";
import {
  DaysDropDownItem,
  HistoryData,
  MenuItem,
  SingleFilteringItem,
  SingleTemplate,
  StatsDropDownItem,
  User,
} from "@/src/types/AppType";
import { AppType } from "@/src/types/AppType";
import { MdDarkMode, MdSettings, MdLogout } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
// Icons for Dark Mode, Settings, Log Out

import { LuWholeWord } from "react-icons/lu";
import { IoDocumentsOutline } from "react-icons/io5";
import { IoMdTime } from "react-icons/io";
import { BiChart } from "react-icons/bi";
import { RiReplay5Line } from "react-icons/ri";
import { RiReplay15Line } from "react-icons/ri";
import { RiReplay30Line } from "react-icons/ri";

import { templatesArray } from "@/src/LocalData/templates";
import { SingleTemplateExtended } from "./dashboard/Hisotry/AllHistory";
import { newHistoryData } from "@/src/LocalData/mainData";

import { templatesFilteringItemsArray } from "@/src/LocalData/templateFilteringItems";

// Define the default state for the context.
const defaultState = {
  fakeUser: {
    isPro: false,
    cumulativeWords: 0,
    userId: "",
    lastName: "",
    firstName: "",
  },
  setFakeUser: () => {},
  openConfirmationWindowObject: {
    openConfirmationWindow: false,
    setOpenConfirmationWindow: () => {},
  },

  mainMenuItemsObject: {
    mainMenuItems: [],
    setMainMenuItems: () => {},
  },

  secondMenuItemsObject: {
    secondMenuItems: [],
    setSecondMenuItems: () => {},
  },

  isDarkModeObject: {
    isDarkMode: false,
    setIsDarkMode: () => {},
  },

  isSideBarHiddenObject: {
    isSideBarHidden: false,
    setIsSideBarHidden: () => {},
  },

  windowWidthObject: {
    windowWidth: 0,
    setWindowWidth: () => {},
  },

  stretchSideBarObject: {
    stretchSideBar: false,
    setStretchSideBar: () => {},
  },

  statsDropDownItemsObject: {
    statsData: [],
    setStatsData: () => {},
  },

  daysDropDownObject: {
    daysDropDown: [],
    setDaysDropDown: () => {},
  },

  allTemplatesObject: {
    allTemplates: [],
    setAllTemplates: () => {},
  },

  allTemplatesForDropDownObject: {
    templatesForDropDown: [],
    setTemplatesForDropDown: () => {},
  },

  allHistoryDataObject: {
    allHistoryData: [],
    setAllHistoryData: () => {},
  },

  templateFilteringItemsObject: {
    templatesFilteringItems: [],
    setTemplatesFilteringItems: () => {},
  },

  openContentGeneratorFormObject: {
    openContentGeneratorForm: false,
    setOpenContentGeneratorForm: () => {},
  },

  selectedTemplatesObject: {
    selectedTemplate: null,
    setSelectedTemplate: () => {},
  },

  contentGeneratedObject: {
    contentGenerated: "",
    setContentGenerated: () => {},
  },

  selectedHistoryEntryObject: {
    selectedHistoryEntry: null,
    setSelectedHistoryEntry: () => {},
  },

  openPaymentWindowObject: {
    openPaymentWindow: false,
    setOpenPaymentWindow: () => {},
  },
};

// Create a context with the default state. The context will hold values of type AppType.
const AppContext = createContext<AppType>(defaultState);

// Define a provider component for the AppContext. This component
// will wrap its children with the context provider.
export default function AppContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = useTranslations("sidebar");
  const [mainMenuItems, setMainMenuItems] = useState<MenuItem[]>([
    {
      icon: LuLayoutDashboard,
      label: t("dashboard"),
      isSelected: true,
    },
    {
      icon: MdHistory,
      label: t("history"),
      isSelected: false,
    },
    {
      icon: TbTemplate,
      label: t("templates"),
      isSelected: false,
    },
    {
      icon: MdFavorite,
      label: t("favorites"),
      isSelected: false,
    },
    {
      icon: MdOutlineViewCarousel,
      label: t("subscriptions"),
      isSelected: false,
    },
  ]);

  const [secondMenuItems, setSecondMenuItems] = useState<MenuItem[]>([
    {
      icon: MdDarkMode,
      label: t("darkMode"),
    },
    {
      icon: MdLogout,
      label: t("logout"),
    },
  ]);

  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isSideBarHidden, setIsSideBarHidden] = useState(false);
  const [stretchSideBar, setStretchSideBar] = useState<boolean>(false);
  const [windowWidth, setWindowWidth] = useState<number>(0);
  const [openPaymentWindow, setOpenPaymentWindow] = useState(false);

  const s = useTranslations("stats");
  const [statsData, setStatsData] = useState<StatsDropDownItem[]>([
    {
      id: 1,
      icon: <LuWholeWord className="text-[18px] text-purple-600" />,
      title: s("total_words_generated"),
      value: "0",
      isSelected: true,
    },
    {
      id: 2,
      icon: <IoDocumentsOutline className="text-[18px] text-purple-600" />,
      title: s("total_doc_generated"),
      value: "0",
      isSelected: false,
    },
    {
      id: 3,
      icon: <IoMdTime className="text-[18px] text-purple-600" />,
      title: s("total_time_saved"),
      value: "1 h 23 min",
      isSelected: false,
    },
    {
      id: 4,
      icon: <BiChart className="text-[18px] text-purple-600" />,
      title: s("average_word"),
      value: "0",
      isSelected: false,
    },
  ]);

  const [daysDropDown, setDaysDropDown] = useState<DaysDropDownItem[]>([
    {
      id: 1,
      title: s("last_5_days"),
      icon: <RiReplay5Line className="text-[18px] text-purple-600" />,
      isSelected: true,
    },
    {
      id: 2,
      title: s("last_10_days"),
      icon: <RiReplay15Line className="text-[18px] text-purple-600" />,
      isSelected: false,
    },
    {
      id: 3,
      title: s("last_15_days"),
      icon: <RiReplay30Line className="text-[18px] text-purple-600" />,
      isSelected: false,
    },
  ]);

  const [allTemplates, setAllTemplates] = useState(templatesArray);

  //This array is extension of all templatesArray to use only for the drop down
  const [templatesForDropDown, setTemplatesForDropDown] = useState<
    SingleTemplateExtended[]
  >(() => {
    return allTemplates.map((singleTemplate) => {
      return { ...singleTemplate, isSelected: false };
    });
  });

  const [allHistoryData, setAllHistoryData] = useState<HistoryData[]>([]);
  const [templatesFilteringItems, setTemplatesFilteringItems] = useState<
    SingleFilteringItem[]
  >(templatesFilteringItemsArray);
  // Simulate the fetching of the data

  const [openContentGeneratorForm, setOpenContentGeneratorForm] =
    useState(false);

  const [selectedTemplate, setSelectedTemplate] =
    useState<SingleTemplate | null>(null);
  const [contentGenerated, setContentGenerated] = useState("");
  const [openConfirmationWindow, setOpenConfirmationWindow] = useState(false);
  const [selectedHistoryEntry, setSelectedHistoryEntry] =
    useState<HistoryData | null>(null);

  const [fakeUser, setFakeUser] = useState<User>({
    isPro: false,
    cumulativeWords: 0,
    firstName: "",
    lastName: "",
    userId: "",
  });

  const { user, isLoaded, isSignedIn } = useUser();

  //Update the window size
  useEffect(() => {
    function handleResize() {
      //Update the windowWidth state
      setWindowWidth(window.innerWidth);
      //Cancel the stretch of the sidebar when the window size is changed
      setStretchSideBar(false);
    }

    // Initial check
    handleResize();

    // Event listener for window resize
    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  //Each time the user clicks and if the screen is on mobile on, close the sidebar
  useEffect(() => {
    if (stretchSideBar) {
      setStretchSideBar(false);
    }
  }, [mainMenuItems]);

  // Salvando as configura localmente
  useEffect(() => {
    // Load the value from localStorage when the component mounts (client-side only)
    const savedSideBarHiddenValue = localStorage.getItem("isSideBarHidden");
    const savedIsDarkModeValue = localStorage.getItem("isDarkMode");
    if (savedSideBarHiddenValue !== null) {
      setIsSideBarHidden(JSON.parse(savedSideBarHiddenValue));
    }

    if (savedIsDarkModeValue !== null) {
      setIsDarkMode(JSON.parse(savedIsDarkModeValue));
    }
  }, []);

  useEffect(() => {
    // Fetch the data history from the database
    async function fetchDataHistory() {
      if (user) {
        try {
          const response = await fetch(
            `/api/histories?clerkUserId=${user.id}`,
            {
              method: "GET",
            },
          );

          const historyData = await response.json();

          if (response.ok) {
            console.log("History data fetched successfully:", historyData);

            // Assuming `historyData.history` contains the history entries
            // setAllHistoryData([]);
            setAllHistoryData(historyData.histories);
          } else {
            console.error("Failed to fetch history data:", historyData.error);
          }
        } catch (error) {
          console.error("Error fetching history data:", error);
        }
      }
    }

    // Fetch the user data from the server
    async function fetchUserData() {
      if (user) {
        try {
          const response = await fetch(`/api/users?userId=${user.id}`, {
            method: "GET",
          });
          const userData = await response.json();

          if (response.ok) {
            console.log("User data fetched successfully:", userData);

            const userObject: User = {
              isPro: userData.isPro,
              cumulativeWords: userData.accumulatedWords,
              userId: user.id,
              lastName: user.lastName,
              firstName: user.firstName,
            };

            setFakeUser(userObject);
          } else {
            console.error("Failed to fetch user data:", userData.error);
          }
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    }

    // Only run this if the user is signed in and the Clerk user data is loaded
    if (isLoaded && isSignedIn) {
      fetchDataHistory();
      fetchUserData(); // Fetch the user data from the server
      console.log(user); // This will log the Clerk user object
    }
  }, [user, isLoaded, isSignedIn]);

  console.log(fakeUser);

  //Reset the content generated state when the selected template updates
  useEffect(() => {
    setContentGenerated("");
  }, [selectedTemplate, openContentGeneratorForm]);

  return (
    <AppContext.Provider
      value={{
        fakeUser,
        setFakeUser,
        selectedHistoryEntryObject: {
          selectedHistoryEntry,
          setSelectedHistoryEntry,
        },
        openConfirmationWindowObject: {
          openConfirmationWindow,
          setOpenConfirmationWindow,
        },
        selectedTemplatesObject: { selectedTemplate, setSelectedTemplate },
        openContentGeneratorFormObject: {
          openContentGeneratorForm,
          setOpenContentGeneratorForm,
        },
        templateFilteringItemsObject: {
          templatesFilteringItems,
          setTemplatesFilteringItems,
        },
        contentGeneratedObject: { contentGenerated, setContentGenerated },
        allHistoryDataObject: { allHistoryData, setAllHistoryData },
        daysDropDownObject: { daysDropDown, setDaysDropDown },
        statsDropDownItemsObject: { statsData, setStatsData },
        mainMenuItemsObject: { mainMenuItems, setMainMenuItems },
        isDarkModeObject: { isDarkMode, setIsDarkMode },
        secondMenuItemsObject: { secondMenuItems, setSecondMenuItems },
        isSideBarHiddenObject: { isSideBarHidden, setIsSideBarHidden },
        windowWidthObject: { windowWidth, setWindowWidth },
        stretchSideBarObject: { stretchSideBar, setStretchSideBar },
        allTemplatesObject: { allTemplates, setAllTemplates },
        allTemplatesForDropDownObject: {
          templatesForDropDown,
          setTemplatesForDropDown,
        },
        openPaymentWindowObject: { openPaymentWindow, setOpenPaymentWindow },
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

// Custom hook to use the AppContext.
//This allows components to access the context values.
export function useAppContext() {
  return useContext(AppContext);
}
