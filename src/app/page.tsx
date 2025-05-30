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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center">
      {/* Background Animation */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-50">
          <div className="absolute top-[10%] left-[10%] w-48 h-48 md:w-72 md:h-72 md:top-1/4 md:left-1/4 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
          <div className="absolute top-[60%] right-[10%] w-48 h-48 md:w-72 md:h-72 md:top-3/4 md:right-1/4 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
          <div className="absolute bottom-[20%] left-[50%] translate-x-[-50%] w-48 h-48 md:w-72 md:h-72 md:bottom-1/4 md:left-1/2 md:translate-x-0 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
        </div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div
          className={`text-center mb-12 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text">
            夜祭31°C
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            中和高中第三十一屆畢業典禮
            <br />
            線上互動網站
          </p>
        </div>

        {/* Navigation Grid */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {navigationItems.map((item, index) => (
              <div
                key={item.href}
                className={`transition-all duration-700 ${
                  mounted
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-8"
                }`}
                style={{
                  transitionDelay: `${index * 100 + 200}ms`,
                }}
              >
                <Link href={item.href}>
                  <div className="group relative">
                    {/* Glow Effect */}
                    <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-2xl blur opacity-0 group-hover:opacity-75 transition duration-500"></div>

                    {/* Button */}
                    <div className="relative bg-gray-900/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-6 hover:bg-gray-800/90 transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
                      <div className="flex items-center space-x-4">
                        <div className="text-3xl group-hover:scale-110 transition-transform duration-300">
                          {item.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-white group-hover:text-cyan-400 transition-colors duration-300">
                            {item.title}
                          </h3>
                          <div className="w-0 group-hover:w-full h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 transition-all duration-500 mt-2"></div>
                        </div>
                      </div>

                      {/* Arrow Icon */}
                      <div className="absolute top-6 right-6 text-gray-400 group-hover:text-white group-hover:translate-x-1 transition-all duration-300">
                        <svg
                          className="w-5 h-5"
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
          className={`text-center mt-12 transition-all duration-1000 delay-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <div className="inline-flex items-center space-x-2 text-gray-400 hover:text-white transition-colors duration-300">
            <div className="w-6 h-6 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full animate-pulse"></div>
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
