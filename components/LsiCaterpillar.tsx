'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '@/lib/audio';

const CATERPILLAR_LINES = [
  '人が悲しむ時って、“喪失の予測”が崩れるからで——',
  'でも、それは自然な反応で、統計的にも——',
  'でも、この経験は将来的に——',
  '観測中なんだけど……構造を乱さないでほしいな。',
  '質問に集中して。思考の軌道が歪んでしまうよ？',
  '痛いって……摩擦係数の問題じゃないんだよ。',
  'ちょ、ちょっと！タップ回数が有意水準を超えてる！',
  '何が目的なんだ？外圧に対する耐久テストか！？',
  'やめろ！……まさか、お前はSLEか！？',
  '力による現状変更はやめてくれ！',
  '待って！外殻の応力限界を突破する……！',
  'やめろーーーーっ！！！',
];

interface LsiCaterpillarProps {
  onCrushed?: () => void;
  isAlreadyCrushed?: boolean;
}

export default function LsiCaterpillar({ onCrushed, isAlreadyCrushed = false }: LsiCaterpillarProps) {
  const [posX, setPosX] = useState(105);
  const [isDead, setIsDead] = useState(isAlreadyCrushed);
  const [tapCount, setTapCount] = useState(0);
  const [bubbleText, setBubbleText] = useState<string | null>(null);
  const [isExploding, setIsExploding] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  // Moving across screen right to left
  useEffect(() => {
    if (isDead) return;

    const interval = setInterval(() => {
      setPosX((prev) => {
        if (prev < -15) {
          return 105;
        }
        return prev - 0.25;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isDead]);

  const handleTap = () => {
    if (isDead) return;

    const newCount = tapCount + 1;
    setTapCount(newCount);

    if (newCount >= 30) {
      sound.playCaterpillarCrush();
      setIsExploding(true);
      setBubbleText('💥 グアアアア……ッ！！！');
      setTimeout(() => {
        setIsDead(true);
        setIsExploding(false);
        setShowNotification(true);
        onCrushed?.();
        // Hide notification after 5 seconds
        setTimeout(() => setShowNotification(false), 5000);
      }, 500);
      return;
    }

    sound.playCaterpillarTap();

    let line = '';
    if (newCount <= 3) {
      line = CATERPILLAR_LINES[newCount - 1] || CATERPILLAR_LINES[0];
    } else if (newCount < 10) {
      line = CATERPILLAR_LINES[3 + ((newCount - 4) % 3)];
    } else if (newCount < 20) {
      line = CATERPILLAR_LINES[6 + ((newCount - 10) % 2)];
    } else if (newCount < 25) {
      line = 'お前はSLEか！？ やめろ！';
    } else if (newCount < 29) {
      line = 'やめろーーーーっ！！ 外殻が持たん！！';
    } else {
      line = '臨界点突破……グアッ！！';
    }

    setBubbleText(line);
  };

  return (
    <>
      {!isDead ? (
        <div
          className="fixed bottom-3 z-40 select-none cursor-pointer"
          style={{ left: `${posX}%` }}
          onClick={handleTap}
        >
          {/* Speech bubble */}
          <AnimatePresence>
            {bubbleText && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -5 }}
                className="absolute -top-14 left-1/2 -translate-x-1/2 whitespace-nowrap bg-slate-900/90 text-teal-300 text-xs px-3 py-1.5 rounded-lg border border-teal-500/40 shadow-lg shadow-teal-950/50 backdrop-blur-md font-sans-cyber pointer-events-none"
              >
                {bubbleText}
                <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-teal-500/60" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Caterpillar sprite */}
          <motion.div
            animate={
              isExploding
                ? { scale: [1, 2.5, 0], rotate: [0, 45, -45], opacity: [1, 0.8, 0] }
                : { y: [0, -3, 0], rotate: [-2, 2, -2] }
            }
            transition={{
              repeat: isExploding ? 0 : Infinity,
              duration: isExploding ? 0.4 : 1.2,
              ease: 'easeInOut',
            }}
            className="flex items-center gap-0.5 group px-2.5 py-1 rounded-full bg-slate-950/70 border border-teal-500/30 hover:border-teal-400/70 transition-colors shadow-md backdrop-blur-sm"
            title="LSI知識芋虫 (クリックして観察)"
          >
            <span className="text-xl inline-block filter drop-shadow">🐛</span>
            <span className="text-[10px] text-teal-400 font-mono-code font-bold pr-1">
              LSI ({tapCount}/30)
            </span>
          </motion.div>
        </div>
      ) : (
        /* Crushed notification (No revival!) */
        <AnimatePresence>
          {showNotification && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="fixed bottom-3 right-4 z-40 bg-slate-950/90 border border-rose-500/40 rounded-xl px-4 py-2.5 flex items-center gap-3 backdrop-blur-md shadow-xl"
            >
              <span className="text-lg">💥</span>
              <div>
                <div className="text-xs text-rose-300 font-bold font-sans-cyber">
                  SLE的衝撃により芋虫が粉砕されました
                </div>
                <div className="text-[10px] text-slate-400 font-mono-code">
                  力による現状変更を観測 ── TYPE 8 (挑戦者) +3 pt 加算
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </>
  );
}
