"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import omikujiData from "@/data/omikuji.json";

export default function OmikujiPage() {
  const [selected, setSelected] = useState(null);
  const [flipped, setFlipped] = useState(false);

  const handleDraw = () => {
    const random = omikujiData[Math.floor(Math.random() * omikujiData.length)];
    setFlipped(false);
    setTimeout(() => {
      setSelected(random);
      setFlipped(true);
    }, 200);
  };

  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold mb-8">夜祭神社</h1>

      <div className="w-80 h-56 perspective mb-4">
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id + flipped}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative w-full h-full preserve-3d"
            >
              {/* Front */}
              <div
                className={`absolute w-full h-full backface-hidden flex items-center justify-center bg-red-800 rounded-2xl shadow-xl text-xl`}
              >
                抽籤中...
              </div>

              {/* Back */}
              <div
                className={`absolute w-full h-full backface-hidden rotate-y-180 bg-gray-100 text-gray-900 p-4 rounded-2xl shadow-xl flex flex-col justify-center`}
              >
                <div className="text-2xl font-semibold mb-2 text-center">
                  {selected.type}
                </div>
                <div className="space-y-1 text-center">
                  {Object.values(selected.text).map((line, index) => (
                    <p key={index}>{line}</p>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <button
        onClick={handleDraw}
        className="mt-4 px-6 py-2 bg-red-700 hover:bg-red-600 rounded-lg text-white font-semibold shadow"
      >
        {selected ? "重新抽籤" : "抽一支籤"}
      </button>
    </main>
  );
}
