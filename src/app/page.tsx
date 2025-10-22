"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

export default function HomePage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const navigationItems = [
    { title: "夜祭神社", href: "/shrine", icon: "⛩️" },
    { title: "回憶戳戳樂", href: "/poke", icon: "🎯" },
    { title: "撈金魚", href: "/fishing", icon: "🐠" },
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-[10%] left-[10%] h-48 w-48 animate-pulse rounded-full bg-purple-500 mix-blend-multiply blur-xl filter md:top-1/4 md:left-1/4 md:h-72 md:w-72"></div>
          <div className="animation-delay-2000 absolute top-[60%] right-[10%] h-48 w-48 animate-pulse rounded-full bg-cyan-500 mix-blend-multiply blur-xl filter md:top-3/4 md:right-1/4 md:h-72 md:w-72"></div>
          <div className="animation-delay-4000 absolute bottom-[20%] left-[50%] h-48 w-48 translate-x-[-50%] animate-pulse rounded-full bg-pink-500 mix-blend-multiply blur-xl filter md:bottom-1/4 md:left-1/2 md:h-72 md:w-72 md:translate-x-0"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div
          className={`mb-12 text-center transition-all duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <h1 className="mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-5xl font-bold text-white md:text-7xl">
            夜祭31°C
          </h1>
          <p className="mx-auto max-w-3xl text-xl leading-relaxed text-gray-300 md:text-2xl">
            中和高中第三十一屆畢業典禮
            <br />
            線上互動網站
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {navigationItems.map((item, index) => (
              <div
                key={item.href}
                className={`transition-all duration-700 ${
                  mounted
                    ? "translate-y-0 opacity-100"
                    : "translate-y-8 opacity-0"
                }`}
                style={{
                  transitionDelay: `${index * 100 + 200}ms`,
                }}
              >
                <Link href={item.href}>
                  <div className="group relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 rounded-2xl bg-gradient-to-r from-cyan-500 to-purple-500 opacity-0 blur transition duration-500 group-hover:opacity-75"></div>

                    {/* Button */}
                    <div className="relative rounded-2xl border border-gray-700 bg-gray-900/80 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:bg-gray-800/90 hover:shadow-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl transition-transform duration-300 group-hover:scale-110">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white transition-colors duration-300 group-hover:text-cyan-400">
                            {item.title}
                          </h3>
                          <div className="mt-2 h-0.5 w-0 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500 group-hover:w-full"></div>
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <div className="absolute top-6 right-6 text-gray-400 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white">
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Footer Section */}
        <div
          className={`mt-12 text-center transition-all delay-1000 duration-1000 ${mounted ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}
        >
          <div className="inline-flex items-center space-x-2 text-gray-400 transition-colors duration-300 hover:text-white">
            <div className="h-6 w-6 animate-pulse rounded-full bg-gradient-to-r from-cyan-400 to-purple-400"></div>
            <span>由中和畢籌會與楊光地共同建置</span>
          </div>
        </div>
      </div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  );
}
