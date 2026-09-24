'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '@/lib/audio';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareText: string;
}

export default function ShareModal({ isOpen, onClose, shareText }: ShareModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  // Web Share API (端末のネイティブ共有シート: LINE, X, その他アプリへ自由に共有可能)
  const handleNativeShare = async () => {
    sound.playClick();
    if (typeof navigator !== 'undefined' && navigator.share) {
      try {
        await navigator.share({
          title: 'ASTRAL CITY 宇宙観測記録',
          text: shareText,
          url: 'https://astralcity.vercel.app',
        });
      } catch (err) {
        if ((err as Error)?.name !== 'AbortError') {
          handleCopy();
        }
      }
    } else {
      handleCopy();
    }
  };

  // LINE共有リンク
  const handleOpenLine = () => {
    sound.playClick();
    const encoded = encodeURIComponent(shareText);
    const lineUrl = `https://line.me/R/msg/text/?${encoded}`;
    window.open(lineUrl, '_blank', 'noopener,noreferrer');
  };

  // X (Twitter) 共有リンク
  const handleOpenX = () => {
    sound.playClick();
    const encoded = encodeURIComponent(shareText);
    const xUrl = `https://twitter.com/intent/tweet?text=${encoded}`;
    window.open(xUrl, '_blank', 'noopener,noreferrer');
  };

  // テキストコピー
  const handleCopy = () => {
    sound.playClick();
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-7 shadow-2xl text-left"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-800">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-mono-code text-base">🧭</span>
              <h3 className="text-base font-bold text-slate-100 font-sans-cyber">
                ナビゲーション共有
              </h3>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center text-sm transition-colors cursor-pointer"
            >
              ✕
            </button>
          </div>

          <p className="text-xs text-slate-400 font-sans-cyber mb-3">
            観測結果をLINEや𝕏（Twitter）、各種アプリへ自由に共有できます。
          </p>

          {/* Text preview container */}
          <div className="mb-5">
            <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 font-mono-code text-xs text-slate-200 whitespace-pre-wrap leading-relaxed select-all max-h-48 overflow-y-auto">
              {shareText}
            </div>
          </div>

          {/* Native Web Share Button */}
          <div className="mb-3">
            <button
              onClick={handleNativeShare}
              className="w-full px-5 py-3 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-slate-950 text-xs sm:text-sm font-sans-cyber font-extrabold shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>📲 端末のナビゲーション共有を開く（LINE・Xなど）</span>
            </button>
          </div>

          {/* Individual App Share Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {/* LINE Button */}
            <button
              onClick={handleOpenLine}
              className="px-4 py-2.5 rounded-xl bg-[#06C755]/15 hover:bg-[#06C755]/25 border border-[#06C755]/40 text-[#06C755] text-xs font-sans-cyber font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="font-extrabold text-sm">LINE</span>
              <span>で送る</span>
            </button>

            {/* X Button */}
            <button
              onClick={handleOpenX}
              className="px-4 py-2.5 rounded-xl bg-sky-950/60 hover:bg-sky-900/60 border border-sky-500/40 text-sky-300 text-xs font-sans-cyber font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span className="font-bold text-sm">𝕏</span>
              <span>でポスト</span>
            </button>

            {/* Copy Button */}
            <button
              onClick={handleCopy}
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 text-xs font-mono-code font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{copied ? '✓ 完了' : '📋 コピー'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
