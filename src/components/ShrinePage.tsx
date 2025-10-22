"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import omikujiData from "@/data/omikuji.json";
import HomeButton from "@/components/HomeButton";

interface Omikuji {
  id: number;
  type: string;
  text: {
    [key: string]: string;
  };
}

export default function ShrinePage() {
  const [selected, setSelected] = useState<Omikuji | null>(null);
  const [flipped, setFlipped] = useState<boolean>(false);

  const omikujiWithId: Omikuji[] = (omikujiData as Omit<Omikuji, "id">[]).map(
    (item, idx) => ({
      id: idx,
      ...item,
    }),
  );

  const handleDraw = () => {
    const random: Omikuji =
      omikujiWithId[Math.floor(Math.random() * omikujiWithId.length)];
    setFlipped(false);
    setTimeout(() => {
      setSelected(random);
      setFlipped(true);
    }, 200);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-900 p-4 text-white">
      <HomeButton />
      <h1 className="mb-8 text-4xl font-bold">夜祭神社</h1>

      <div className="perspective-1000 mb-4 h-56 w-80">
        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id + flipped.toString()}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: flipped ? 180 : 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6 }}
              className="relative h-full w-full transform-3d"
            >
              {/* Front */}
              <div className="absolute flex h-full w-full items-center justify-center rounded-2xl bg-red-800 text-xl shadow-xl backface-hidden">
                抽籤中...
              </div>

              {/* Back */}
              <div className="absolute flex h-full w-full rotate-y-180 flex-col justify-center rounded-2xl bg-gray-100 p-4 text-gray-900 shadow-xl backface-hidden">
                <div className="mb-2 text-center text-2xl font-semibold">
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
        className="mt-4 rounded-lg bg-red-700 px-6 py-2 font-semibold text-white shadow hover:bg-red-600"
      >
        {selected ? "重新抽籤" : "抽一支籤"}
      </button>
    </main>
  );
}
