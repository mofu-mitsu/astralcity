'use client';

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '@/lib/audio';

interface ImageSaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  imageUrl: string | null;
  fileName: string;
}

export default function ImageSaveModal({
  isOpen,
  onClose,
  imageUrl,
  fileName,
}: ImageSaveModalProps) {
  if (!isOpen || !imageUrl) return null;

  const handleDownloadFallback = () => {
    sound.playClick();
    const link = document.createElement('a');
    link.download = fileName;
    link.href = imageUrl;
    link.click();
  };

  return (
    <AnimatePresence>
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-4 sm:p-6 shadow-2xl flex flex-col max-h-[90vh]"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-3 sm:pb-4 mb-3 border-b border-slate-800 flex-shrink-0">
            <div className="flex items-center gap-2">
              <span className="text-pink-400 font-mono-code text-base">📸</span>
              <h3 className="text-sm sm:text-base font-bold text-slate-100 font-sans-cyber">
                観測結果カードの保存
              </h3>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 flex items-center justify-center text-sm transition-colors cursor-pointer"
              aria-label="閉じる"
            >
              ✕
            </button>
          </div>

          {/* Guide banner for Mobile Long-press */}
          <div className="mb-3 p-3 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 flex-shrink-0">
            <div className="flex items-start gap-2.5 text-xs text-cyan-200 font-sans-cyber leading-relaxed">
              <span className="text-base sm:text-lg flex-shrink-0">📱</span>
              <div>
                <p className="font-bold text-cyan-300">
                  画像を長押しして保存してください
                </p>
                <p className="text-[11px] text-cyan-200/80 mt-0.5">
                  下のカード画像を長押し（またはタップ長押し）するとメニューが表示され、
                  「写真に追加」や「画像を保存」から端末に保存できます。
                </p>
              </div>
            </div>
          </div>

          {/* Scrollable Image Area */}
          <div className="flex-1 overflow-y-auto pr-1 my-2 rounded-2xl border border-slate-800/80 bg-slate-950 p-2 sm:p-3 scrollbar-thin scrollbar-thumb-slate-700">
            <div className="flex flex-col items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={imageUrl}
                alt="ASTRAL CITY 観測結果カード"
                className="w-full h-auto rounded-xl shadow-2xl select-auto pointer-events-auto"
                style={{ WebkitTouchCallout: 'default' }}
              />
            </div>
          </div>

          {/* Footer Controls */}
          <div className="pt-3 mt-2 border-t border-slate-800 flex items-center justify-between gap-3 flex-shrink-0">
            <button
              onClick={handleDownloadFallback}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-mono-code transition-colors cursor-pointer"
            >
              💾 直接DLを試す
            </button>

            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-slate-950 font-bold text-xs sm:text-sm font-sans-cyber shadow-md cursor-pointer transition-all"
            >
              閉じる
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
