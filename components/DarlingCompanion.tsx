'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '@/lib/audio';
import { DARLING_INITIAL_LINE, DARLING_CHAT_LINES } from '@/lib/enneagram-data';

interface DarlingCompanionProps {
  currentStageText?: string;
  isCompact?: boolean;
}

export default function DarlingCompanion({ isCompact = false }: DarlingCompanionProps) {
  const [clickCount, setClickCount] = useState(0);

  const handleSpeakNext = () => {
    sound.playClick();
    setClickCount((prev) => prev + 1);
  };

  const currentSpeech =
    clickCount === 0
      ? DARLING_INITIAL_LINE
      : DARLING_CHAT_LINES[(clickCount - 1) % DARLING_CHAT_LINES.length];

  return (
    <div className="relative inline-flex flex-col items-center">
      {/* Speech bubble */}
      <AnimatePresence mode="wait">
        <motion.div
          key={clickCount}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          className="mb-3 p-3.5 sm:p-4 rounded-2xl max-w-sm text-xs leading-relaxed backdrop-blur-xl shadow-xl transition-colors bg-purple-950/80 text-pink-200 border border-pink-500/30 shadow-pink-950/40"
        >
          <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-pink-500/20">
            <span className="text-[10px] font-mono-code font-bold tracking-wider uppercase text-pink-300">
              ダーリンちゃん (ILI 5w4 / ナビゲーター)
            </span>
            <span className="text-[10px] font-mono-code text-pink-400/70">
              LOG #{clickCount + 1}
            </span>
          </div>
          <p
            className="font-sans-cyber cursor-pointer select-none whitespace-pre-line text-left leading-relaxed"
            onClick={handleSpeakNext}
          >
            {currentSpeech}
          </p>
          <div className="text-[9px] font-mono-code text-pink-400/50 mt-1.5 text-right">
            クリックで次の対話 →
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Avatar Button */}
      <motion.button
        onClick={handleSpeakNext}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative flex items-center gap-2 px-3.5 py-1.5 rounded-full border transition-all shadow-md group bg-slate-900/80 border-pink-500/40 hover:border-pink-400"
      >
        <span className="text-xl select-none group-hover:rotate-6 transition-transform">🥺</span>
        <span className="text-xs font-mono-code font-medium text-pink-300">
          ダーリンちゃん <span className="text-pink-400/60 text-[10px]">▼ タップで対話</span>
        </span>
      </motion.button>
    </div>
  );
}
