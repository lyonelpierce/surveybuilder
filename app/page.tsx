"use client";

import SurveyBuilder from "./components/SurveyBuilder";
import Header from "./components/Header";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-[1920px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Header />
        <SurveyBuilder />
      </div>
    </div>
  );
}
