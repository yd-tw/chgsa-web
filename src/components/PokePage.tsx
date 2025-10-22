"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeButton from "./HomeButton";

interface Prize {
  id: number;
  name: string;
  emoji: string;
  rarity: "common" | "rare" | "epic" | "legendary";
}

const prizes: Prize[] = [
  { id: 1, name: "百萬廁所", emoji: "🚽", rarity: "common" },
  { id: 2, name: "地震掉下來的磁磚", emoji: "🧱", rarity: "common" },
  { id: 3, name: "颱風吹倒的樹", emoji: "🌳", rarity: "rare" },
  { id: 4, name: "學分", emoji: "📘", rarity: "common" },
  {
    id: 5,
    name: "免上課卡(限中和高中且重補修不適用)",
    emoji: "🎉",
    rarity: "legendary",
  },
  { id: 6, name: "都你在獎", emoji: "🎊", rarity: "common" },
  { id: 7, name: "臭臭樹", emoji: "🌲", rarity: "epic" },
  { id: 8, name: "手機箱(掌控大家手機使用權)", emoji: "📱", rarity: "rare" },
  { id: 9, name: "爆音廣播", emoji: "📢", rarity: "legendary" },
  { id: 10, name: "地下室流量清零", emoji: "📴", rarity: "common" },
  { id: 11, name: "合作社快速通關", emoji: "🚶‍♂️", rarity: "common" },
  { id: 12, name: "發芽的薯條", emoji: "🥔", rarity: "epic" },
  { id: 13, name: "薯條增量", emoji: "🍟", rarity: "common" },
  { id: 14, name: "教官的微笑", emoji: "😏", rarity: "legendary" },
  { id: 15, name: "大傳工具人體驗卡 1 小時", emoji: "🛠️", rarity: "common" },
  { id: 16, name: "隔板吃飯", emoji: "🍽️", rarity: "epic" },
  { id: 17, name: "電梯加速器", emoji: "🛗", rarity: "common" },
  { id: 18, name: "什麼都不必說", emoji: "🤐", rarity: "rare" },
  { id: 19, name: "中和水樂園門票乙張", emoji: "🏊", rarity: "common" },
  { id: 20, name: "中和動物園免費參觀", emoji: "🦁", rarity: "rare" },
  { id: 21, name: "便服免簽字", emoji: "👕", rarity: "common" },
  { id: 22, name: "捷運永遠蓋不好", emoji: "🚇", rarity: "legendary" },
  { id: 23, name: "超派警衛", emoji: "🛡️", rarity: "rare" },
  { id: 24, name: "蒼蠅甜不辣", emoji: "🪰", rarity: "common" },
  { id: 25, name: "參加畢業典禮資格", emoji: "🎓", rarity: "rare" },
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case "legendary":
      return "from-yellow-400 to-orange-500";
    case "epic":
      return "from-purple-400 to-pink-500";
    case "rare":
      return "from-blue-400 to-cyan-500";
    default:
      return "from-gray-400 to-gray-600";
  }
};

export default function PokePage() {
  const [gameGrid, setGameGrid] = useState<(Prize | null)[]>([]);
  const [scratchedBoxes, setScratchedBoxes] = useState<boolean[]>(
    Array(25).fill(false),
  );
  const [scratchingBoxes, setScratchingBoxes] = useState<boolean[]>(
    Array(25).fill(false),
  );
  const [currentPrize, setCurrentPrize] = useState<Prize | null>(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);

  const initializeGame = () => {
    const shuffledPrizes = [...prizes].sort(() => Math.random() - 0.5);
    setGameGrid(shuffledPrizes);
    setScratchedBoxes(Array(25).fill(false));
    setScratchingBoxes(Array(25).fill(false));
    setCurrentPrize(null);
    setShowPrizeModal(false);
  };

  useEffect(() => {
    initializeGame();
  }, []);

  const scratchBox = (index: number) => {
    if (
      scratchedBoxes[index] ||
      scratchingBoxes[index] ||
      gameGrid.length === 0
    )
      return;

    // 開始戳開動畫
    const newScratchingBoxes = [...scratchingBoxes];
    newScratchingBoxes[index] = true;
    setScratchingBoxes(newScratchingBoxes);

    // 延遲顯示結果
    setTimeout(() => {
      const newScratchedBoxes = [...scratchedBoxes];
      newScratchedBoxes[index] = true;
      setScratchedBoxes(newScratchedBoxes);

      const newScratchingBoxes = [...scratchingBoxes];
      newScratchingBoxes[index] = false;
      setScratchingBoxes(newScratchingBoxes);

      const prize = gameGrid[index];
      if (prize) {
        setCurrentPrize(prize);
        setTimeout(() => setShowPrizeModal(true), 500);
      }
    }, 1000);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <HomeButton />
      <div className="w-full max-w-2xl">
        {/* 標題 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center"
        >
          <h1 className="mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-4xl font-bold text-white md:text-6xl">
            🎯 回憶戳戳樂 🎯
          </h1>
          <p className="text-lg text-white/80">戳擊格子，拿取在中和的回憶</p>
        </motion.div>

        <div className="rounded-3xl border border-white/20 bg-white/10 p-8 shadow-2xl backdrop-blur-lg">
          <div className="mb-6 grid grid-cols-5 gap-2 md:gap-3">
            {gameGrid.map((prize, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, rotateY: -90 }}
                animate={{ opacity: 1, rotateY: 0 }}
                transition={{ delay: index * 0.02 }}
                className="relative"
              >
                <motion.button
                  onClick={() => scratchBox(index)}
                  disabled={scratchedBoxes[index] || scratchingBoxes[index]}
                  className={`relative aspect-square w-full transform overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${
                    scratchedBoxes[index]
                      ? `bg-gradient-to-br ${getRarityColor(prize?.rarity || "common")} scale-105`
                      : "cursor-pointer bg-gradient-to-br from-gray-200 to-gray-400 hover:scale-105 hover:shadow-xl"
                  } ${scratchingBoxes[index] ? "cursor-not-allowed" : ""} ${!scratchedBoxes[index] && !scratchingBoxes[index] ? "hover:from-gray-100 hover:to-gray-300" : ""} `}
                  whileHover={{ scale: scratchedBoxes[index] ? 1.05 : 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {scratchingBoxes[index] ? (
                      <motion.div
                        key="scratching"
                        initial={{ scale: 1 }}
                        animate={{
                          scale: [1, 1.2, 0.8, 1.1, 0.9, 1],
                          rotate: [0, -5, 5, -3, 3, 0],
                        }}
                        transition={{
                          duration: 1,
                          ease: "easeInOut",
                          times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                        }}
                        className="flex h-full items-center justify-center bg-gradient-to-br from-yellow-200 to-orange-300"
                      >
                        <motion.div
                          animate={{
                            rotate: 360,
                            scale: [1, 1.3, 1],
                          }}
                          transition={{
                            rotate: { duration: 0.5, repeat: 1 },
                            scale: { duration: 0.5, repeat: 1 },
                          }}
                          className="text-lg md:text-xl"
                        >
                          ✨
                        </motion.div>
                      </motion.div>
                    ) : scratchedBoxes[index] && prize ? (
                      <motion.div
                        key="revealed"
                        initial={{ opacity: 0, scale: 0, rotateY: -180 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 200,
                          damping: 15,
                          duration: 0.6,
                        }}
                        className="flex h-full flex-col items-center justify-center text-white"
                      >
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{
                            delay: 0.2,
                            type: "spring",
                            stiffness: 300,
                          }}
                          className="mb-1 text-lg md:text-2xl"
                        >
                          {prize.emoji}
                        </motion.div>
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.4 }}
                          className="px-1 text-center text-[8px] leading-tight font-bold md:text-xs"
                        >
                          {prize.name.length > 8
                            ? prize.name.substring(0, 8) + "..."
                            : prize.name}
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.div
                        key="hidden"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex h-full items-center justify-center"
                      >
                        <span className="text-lg md:text-xl">❓</span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <button
              onClick={initializeGame}
              className="transform rounded-xl bg-gradient-to-r from-green-500 to-teal-500 px-6 py-3 font-bold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-green-600 hover:to-teal-600"
            >
              🔄 重新開始
            </button>
          </div>
        </div>

        <AnimatePresence>
          {showPrizeModal && currentPrize && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
              onClick={() => setShowPrizeModal(false)}
            >
              <motion.div
                initial={{ scale: 0, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0, rotateY: 90 }}
                className={`bg-gradient-to-br ${getRarityColor(currentPrize.rarity)} w-full max-w-sm rounded-3xl border-4 border-white/30 p-8 text-center shadow-2xl`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="mb-4 text-6xl">{currentPrize.emoji}</div>
                <h3 className="mb-4 text-2xl font-bold text-white">
                  {currentPrize.name}
                </h3>
                <div className="mb-6 text-sm tracking-wider text-white/80 uppercase">
                  {currentPrize.rarity === "legendary" && "🌟 傳說級獎品"}
                  {currentPrize.rarity === "epic" && "💎 史詩級獎品"}
                  {currentPrize.rarity === "rare" && "⭐ 稀有獎品"}
                  {currentPrize.rarity === "common" && "🍀 普通獎品"}
                </div>
                <button
                  onClick={() => setShowPrizeModal(false)}
                  className="rounded-xl bg-white/20 px-6 py-2 font-bold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/30"
                >
                  繼續遊戲
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
