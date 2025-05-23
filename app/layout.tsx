"use client";
import type { Metadata } from "next";
import "./globals.css";
import Navigation from "Components/NavigationBar/Navigation";
import { useEffect, useRef, useState } from "react";
import Footer from "Components/Footer/Footer";
import { MdLightMode } from "react-icons/md";
import { Router } from "next/router";
import { AppProgressBar } from "next-nprogress-bar";
import ReadingProgressBar from "Components/UI/ReadingProgressBar/ReadingProgressBar";
import { GoogleAnalytics } from "@next/third-parties/google";
import { useTheme } from "next-themes";

interface RootLayoutProps {
  children: React.ReactNode;
}

const RootLayout = (props: RootLayoutProps) => {
  const [localStorageStatus, setLocalStorageStatus] = useState(null);
  const [darkMode, setDarkMode] = useState<any>(localStorageStatus);

  useEffect(() => {
    if (localStorage.getItem("darkMode")) {
      const parsedLocalStorage = JSON.parse(localStorage.getItem("darkMode")!);
      setLocalStorageStatus(parsedLocalStorage);
      setDarkMode(parsedLocalStorage);
    } else {
      localStorage.setItem("darkMode", JSON.stringify(!darkMode));
    }
  }, [darkMode]);

  const onDarkModeBtnClickHandler = () => {
    setDarkMode(!darkMode);
    localStorage.setItem("darkMode", JSON.stringify(!darkMode));
  };

  return (
    <html lang="en" className={darkMode ? "dark transition-colors duration-100" : "transition-all duration-300"}>
      <body className="relative p-0 m-0 bg-white dark:bg-slate-900 dark:prose-invert prose prose-stone min-h-[65vh] max-w-full border-0 border-sky-400  h-full overflow-x-hidden">
        <ReadingProgressBar />
        <AppProgressBar height="1px" color="#ffffff" options={{ showSpinner: true }} shallowRouting />
        <header>
          <Navigation darkMode={localStorageStatus} />
        </header>
        <main className="border-0 border-red-900 grid grid-cols-12">
          <section className="hidden md:invisible md:block md:col-span-1 border-2 border-green-800"></section>
          <section className="col-span-12 md:col-span-10 border-0 border-red-500 m-auto w-full mb-32">
            <article>{props.children}</article>
          </section>
          <section className="hidden md:col-span-1 md:block md:invisible border border-slate-500"></section>
        </main>
        {/* <section>
          <div
            className="darkMode fixed bottom-52 left-0 border bg-brandColor text-white border-slate-700 p-2 px-4 cursor-pointer rounded-e-2xl dark:bg-slate-900  dark:text-black shadow-inner z-50"
            onClick={onDarkModeBtnClickHandler}
          >
            {!darkMode ? <MdLightMode size={25} fill="white" /> : <MdLightMode size={25} fill="white" />}
          </div>
        </section> */}
        <footer>
          <Footer />
        </footer>
      </body>
      {/* Adding Google Analytics Code Below */}
      <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_TAG!} />
    </html>
  );
};

export default RootLayout;
