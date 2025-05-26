"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Fish {
  id: number;
  x: number;
  y: number;
  speedX: number;
  speedY: number;
  size: number;
  color: string;
  type: string;
}

interface CatchEffect {
  id: number;
  x: number;
  y: number;
}

const FishCatchingGame: React.FC = () => {
  const [fish, setFish] = useState<Fish[]>([]);
  const [score, setScore] = useState(0);
  const [catchEffects, setCatchEffects] = useState<CatchEffect[]>([]);
  const [gameSize, setGameSize] = useState({ width: 800, height: 600 });

  const fishColors = ["🐠", "🐟", "🎣", "🐡", "🦈"];
  const fishSizes = [20, 25, 30, 35, 40];

  // 初始化遊戲尺寸
  useEffect(() => {
    const updateSize = () => {
      const width = Math.min(window.innerWidth - 40, 800);
      const height = Math.min(window.innerHeight - 200, 600);
      setGameSize({ width, height });
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  // 生成隨機魚
  const generateFish = useCallback(
    (id: number): Fish => {
      const edge = Math.floor(Math.random() * 4);
      let x, y, speedX, speedY;

      switch (edge) {
        case 0: // 上邊
          x = Math.random() * gameSize.width;
          y = -50;
          speedX = (Math.random() - 0.5) * 2;
          speedY = Math.random() * 2 + 0.5;
          break;
        case 1: // 右邊
          x = gameSize.width + 50;
          y = Math.random() * gameSize.height;
          speedX = -(Math.random() * 2 + 0.5);
          speedY = (Math.random() - 0.5) * 2;
          break;
        case 2: // 下邊
          x = Math.random() * gameSize.width;
          y = gameSize.height + 50;
          speedX = (Math.random() - 0.5) * 2;
          speedY = -(Math.random() * 2 + 0.5);
          break;
        default: // 左邊
          x = -50;
          y = Math.random() * gameSize.height;
          speedX = Math.random() * 2 + 0.5;
          speedY = (Math.random() - 0.5) * 2;
      }

      return {
        id,
        x,
        y,
        speedX,
        speedY,
        size: fishSizes[Math.floor(Math.random() * fishSizes.length)],
        color: fishColors[Math.floor(Math.random() * fishColors.length)],
        type: "fish",
      };
    },
    [gameSize],
  );

  // 初始化魚群
  useEffect(() => {
    const initialFish = Array.from({ length: 8 }, (_, i) => generateFish(i));
    setFish(initialFish);
  }, [generateFish]);

  // 魚的移動動畫
  useEffect(() => {
    const interval = setInterval(() => {
      setFish((prevFish) => {
        return prevFish.map((f) => {
          let newX = f.x + f.speedX;
          let newY = f.y + f.speedY;
          let newSpeedX = f.speedX;
          let newSpeedY = f.speedY;

          // 邊界檢測和反彈
          if (
            newX < -50 ||
            newX > gameSize.width + 50 ||
            newY < -50 ||
            newY > gameSize.height + 50
          ) {
            return generateFish(f.id);
          }

          // 隨機改變方向
          if (Math.random() < 0.02) {
            newSpeedX += (Math.random() - 0.5) * 0.5;
            newSpeedY += (Math.random() - 0.5) * 0.5;
            newSpeedX = Math.max(-3, Math.min(3, newSpeedX));
            newSpeedY = Math.max(-3, Math.min(3, newSpeedY));
          }

          return {
            ...f,
            x: newX,
            y: newY,
            speedX: newSpeedX,
            speedY: newSpeedY,
          };
        });
      });
    }, 50);

    return () => clearInterval(interval);
  }, [gameSize, generateFish]);

  // 處理點擊捕魚
  const handleCatch = useCallback(
    (event: React.MouseEvent<HTMLDivElement>) => {
      const rect = event.currentTarget.getBoundingClientRect();
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;

      // 檢查是否點擊到魚
      let caughtFish = false;
      setFish((prevFish) => {
        return prevFish.filter((f) => {
          const distance = Math.sqrt(
            Math.pow(clickX - f.x, 2) + Math.pow(clickY - f.y, 2),
          );

          if (distance < f.size) {
            caughtFish = true;
            setScore((prev) => prev + 10);

            // 添加捕捉特效
            const effectId = Date.now();
            setCatchEffects((prev) => [
              ...prev,
              { id: effectId, x: f.x, y: f.y },
            ]);

            // 移除特效
            setTimeout(() => {
              setCatchEffects((prev) => prev.filter((e) => e.id !== effectId));
            }, 1000);

            return false; // 移除被捕捉的魚
          }
          return true;
        });
      });

      // 如果捕到魚，生成新的魚
      if (caughtFish) {
        setTimeout(() => {
          setFish((prevFish) => [...prevFish, generateFish(Date.now())]);
        }, 500);
      }
    },
    [generateFish],
  );

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-blue-300 to-blue-600 p-4">
      <div className="bg-white rounded-lg shadow-lg p-4 mb-4">
        <h1 className="text-2xl font-bold text-center text-blue-800 mb-2">
          🎣 線上撈魚遊戲
        </h1>
        <div className="text-center">
          <span className="text-xl font-semibold text-blue-600">
            得分: {score}
          </span>
        </div>
      </div>

      <div
        className="relative bg-gradient-to-b from-cyan-200 to-blue-400 rounded-lg overflow-hidden cursor-crosshair shadow-2xl border-4 border-blue-500"
        style={{
          width: gameSize.width,
          height: gameSize.height,
          touchAction: "manipulation",
        }}
        onClick={handleCatch}
      >
        {/* 水波紋背景 */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent"
            animate={{
              x: [-100, gameSize.width + 100],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>

        {/* 魚群 */}
        <AnimatePresence>
          {fish.map((f) => (
            <motion.div
              key={f.id}
              className="absolute select-none pointer-events-none"
              style={{
                left: f.x - f.size / 2,
                top: f.y - f.size / 2,
                fontSize: f.size,
                transform: f.speedX < 0 ? "scaleX(-1)" : "scaleX(1)",
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: 1,
                opacity: 1,
                rotate: [0, 5, -5, 0],
              }}
              exit={{
                scale: 0,
                opacity: 0,
                rotate: 360,
              }}
              transition={{
                scale: { duration: 0.3 },
                opacity: { duration: 0.3 },
                rotate: {
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                },
              }}
            >
              {f.color}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 捕捉特效 */}
        <AnimatePresence>
          {catchEffects.map((effect) => (
            <motion.div
              key={effect.id}
              className="absolute pointer-events-none"
              style={{
                left: effect.x - 25,
                top: effect.y - 25,
              }}
              initial={{ scale: 0, opacity: 1 }}
              animate={{
                scale: [1, 2, 3],
                opacity: [1, 0.5, 0],
                rotate: [0, 180, 360],
              }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1 }}
            >
              <div className="text-5xl">💥</div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* 泡泡效果 */}
        {Array.from({ length: 15 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-60"
            style={{
              left: Math.random() * gameSize.width,
              top: gameSize.height,
            }}
            animate={{
              y: -gameSize.height - 50,
              x: [0, Math.random() * 50 - 25, 0],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              ease: "easeOut",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="mt-4 text-center text-white">
        <p className="text-sm md:text-base">🎯 點擊魚兒來捕捉它們！</p>
        <p className="text-xs md:text-sm opacity-80">每捕捉一條魚得 10 分</p>
      </div>
    </div>
  );
};

export default FishCatchingGame;
