"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Prize {
  id: number;
  name: string;
  emoji: string;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

const prizes: Prize[] = [
  { id: 1, name: '恭喜獲得 100元', emoji: '💰', rarity: 'common' },
  { id: 2, name: '謝謝參與', emoji: '😊', rarity: 'common' },
  { id: 3, name: '恭喜獲得 500元', emoji: '💸', rarity: 'rare' },
  { id: 4, name: '再來一次', emoji: '🔄', rarity: 'common' },
  { id: 5, name: '恭喜獲得 iPhone', emoji: '📱', rarity: 'legendary' },
  { id: 6, name: '恭喜獲得咖啡券', emoji: '☕', rarity: 'common' },
  { id: 7, name: '恭喜獲得 1000元', emoji: '💵', rarity: 'epic' },
  { id: 8, name: '恭喜獲得美食券', emoji: '🍔', rarity: 'rare' },
  { id: 9, name: '恭喜獲得大獎！', emoji: '🏆', rarity: 'legendary' },
  { id: 10, name: '恭喜獲得 200元', emoji: '💰', rarity: 'common' },
  { id: 11, name: '恭喜獲得禮品卡', emoji: '🎁', rarity: 'common' },
  { id: 12, name: '恭喜獲得旅遊券', emoji: '✈️', rarity: 'epic' },
  { id: 13, name: '恭喜獲得折扣券', emoji: '🏷️', rarity: 'common' },
  { id: 14, name: '恭喜獲得筆電', emoji: '💻', rarity: 'legendary' },
  { id: 15, name: '恭喜獲得電影票', emoji: '🎬', rarity: 'common' },
  { id: 16, name: '恭喜獲得 2000元', emoji: '💸', rarity: 'epic' },
  { id: 17, name: '恭喜獲得書籍券', emoji: '📚', rarity: 'common' },
  { id: 18, name: '恭喜獲得手錶', emoji: '⌚', rarity: 'rare' },
  { id: 19, name: '謝謝參與', emoji: '🤝', rarity: 'common' },
  { id: 20, name: '恭喜獲得健身券', emoji: '💪', rarity: 'rare' },
  { id: 21, name: '恭喜獲得音樂券', emoji: '🎵', rarity: 'common' },
  { id: 22, name: '恭喜獲得超級大獎', emoji: '🌟', rarity: 'legendary' },
  { id: 23, name: '恭喜獲得按摩券', emoji: '💆', rarity: 'rare' },
  { id: 24, name: '恭喜獲得甜點券', emoji: '🍰', rarity: 'common' },
  { id: 25, name: '恭喜獲得遊戲券', emoji: '🎮', rarity: 'rare' }
];

const getRarityColor = (rarity: string) => {
  switch (rarity) {
    case 'legendary': return 'from-yellow-400 to-orange-500';
    case 'epic': return 'from-purple-400 to-pink-500';
    case 'rare': return 'from-blue-400 to-cyan-500';
    default: return 'from-gray-400 to-gray-600';
  }
};

export default function ScratchLotteryGame() {
  const [gameGrid, setGameGrid] = useState<(Prize | null)[]>(Array(25).fill(null));
  const [scratchedBoxes, setScratchedBoxes] = useState<boolean[]>(Array(25).fill(false));
  const [scratchingBoxes, setScratchingBoxes] = useState<boolean[]>(Array(25).fill(false));
  const [currentPrize, setCurrentPrize] = useState<Prize | null>(null);
  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);

  const initializeGame = () => {
    const shuffledPrizes = [...prizes].sort(() => Math.random() - 0.5);
    setGameGrid(shuffledPrizes);
    setScratchedBoxes(Array(25).fill(false));
    setScratchingBoxes(Array(25).fill(false));
    setGameStarted(true);
    setCurrentPrize(null);
    setShowPrizeModal(false);
  };

  const scratchBox = (index: number) => {
    if (scratchedBoxes[index] || scratchingBoxes[index] || !gameStarted) return;

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

  const resetGame = () => {
    setGameStarted(false);
    setGameGrid(Array(25).fill(null));
    setScratchedBoxes(Array(25).fill(false));
    setScratchingBoxes(Array(25).fill(false));
    setCurrentPrize(null);
    setShowPrizeModal(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* 標題 */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text">
            🎯 戳戳樂 🎯
          </h1>
          <p className="text-white/80 text-lg">點擊格子，看看你的運氣如何！</p>
        </motion.div>

        {/* 遊戲區域 */}
        <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20">
          {!gameStarted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <button
                onClick={initializeGame}
                className="bg-gradient-to-r from-pink-500 to-violet-500 hover:from-pink-600 hover:to-violet-600 text-white font-bold py-4 px-8 rounded-2xl text-xl shadow-lg transform hover:scale-105 transition-all duration-200"
              >
                🚀 開始遊戲
              </button>
            </motion.div>
          ) : (
            <>
              {/* 遊戲格子 */}
              <div className="grid grid-cols-5 gap-2 md:gap-3 mb-6">
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
                      className={`
                        w-full aspect-square rounded-xl shadow-lg transform transition-all duration-300 relative overflow-hidden
                        ${scratchedBoxes[index] 
                          ? `bg-gradient-to-br ${getRarityColor(prize?.rarity || 'common')} scale-105` 
                          : 'bg-gradient-to-br from-gray-200 to-gray-400 hover:scale-105 hover:shadow-xl cursor-pointer'
                        }
                        ${scratchingBoxes[index] ? 'cursor-not-allowed' : ''}
                        ${!scratchedBoxes[index] && !scratchingBoxes[index] ? 'hover:from-gray-100 hover:to-gray-300' : ''}
                      `}
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
                              rotate: [0, -5, 5, -3, 3, 0]
                            }}
                            transition={{ 
                              duration: 1,
                              ease: "easeInOut",
                              times: [0, 0.2, 0.4, 0.6, 0.8, 1]
                            }}
                            className="flex items-center justify-center h-full bg-gradient-to-br from-yellow-200 to-orange-300"
                          >
                            <motion.div
                              animate={{ 
                                rotate: 360,
                                scale: [1, 1.3, 1]
                              }}
                              transition={{ 
                                rotate: { duration: 0.5, repeat: 1 },
                                scale: { duration: 0.5, repeat: 1 }
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
                              duration: 0.6
                            }}
                            className="flex flex-col items-center justify-center h-full text-white"
                          >
                            <motion.div 
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              transition={{ delay: 0.2, type: "spring", stiffness: 300 }}
                              className="text-lg md:text-2xl mb-1"
                            >
                              {prize.emoji}
                            </motion.div>
                            <motion.div 
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 }}
                              className="text-[8px] md:text-xs font-bold text-center px-1 leading-tight"
                            >
                              {prize.name.length > 8 ? prize.name.substring(0, 8) + '...' : prize.name}
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.div
                            key="hidden"
                            initial={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center justify-center h-full"
                          >
                            <span className="text-lg md:text-xl">❓</span>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.button>
                  </motion.div>
                ))}
              </div>

              {/* 重新開始按鈕 */}
              <div className="text-center">
                <button
                  onClick={resetGame}
                  className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-6 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                >
                  🔄 重新開始
                </button>
              </div>
            </>
          )}
        </div>

        {/* 獎品彈窗 */}
        <AnimatePresence>
          {showPrizeModal && currentPrize && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
              onClick={() => setShowPrizeModal(false)}
            >
              <motion.div
                initial={{ scale: 0, rotateY: -90 }}
                animate={{ scale: 1, rotateY: 0 }}
                exit={{ scale: 0, rotateY: 90 }}
                className={`bg-gradient-to-br ${getRarityColor(currentPrize.rarity)} p-8 rounded-3xl shadow-2xl text-center max-w-sm w-full border-4 border-white/30`}
                onClick={(e) => e.stopPropagation()}
              >
                <div className="text-6xl mb-4">{currentPrize.emoji}</div>
                <h3 className="text-2xl font-bold text-white mb-4">
                  {currentPrize.name}
                </h3>
                <div className="text-white/80 mb-6 text-sm uppercase tracking-wider">
                  {currentPrize.rarity === 'legendary' && '🌟 傳說級獎品'}
                  {currentPrize.rarity === 'epic' && '💎 史詩級獎品'}
                  {currentPrize.rarity === 'rare' && '⭐ 稀有獎品'}
                  {currentPrize.rarity === 'common' && '🍀 普通獎品'}
                </div>
                <button
                  onClick={() => setShowPrizeModal(false)}
                  className="bg-white/20 hover:bg-white/30 text-white font-bold py-2 px-6 rounded-xl backdrop-blur-sm transition-all duration-200"
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
