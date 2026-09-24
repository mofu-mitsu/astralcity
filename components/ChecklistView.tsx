'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import {
  ENNEAGRAM_CHECKLIST,
  TYPE_DETAILS,
  EnneagramType,
} from '@/lib/enneagram-data';
import { sound } from '@/lib/audio';

interface ChecklistViewProps {
  onComplete: (selectedMap: Record<EnneagramType, number[]>) => void;
  onBackToIntro: () => void;
}

export default function ChecklistView({
  onComplete,
  onBackToIntro,
}: ChecklistViewProps) {
  // Map of type -> array of selected index numbers (0..6)
  const [selectedMap, setSelectedMap] = useState<Record<EnneagramType, number[]>>({
    1: [],
    2: [],
    3: [],
    4: [],
    5: [],
    6: [],
    7: [],
    8: [],
    9: [],
  });

  const [activeTab, setActiveTab] = useState<EnneagramType | 'all'>('all');

  const toggleItem = (type: EnneagramType, idx: number) => {
    sound.playClick();
    setSelectedMap((prev) => {
      const currentList = prev[type] || [];
      const exists = currentList.includes(idx);
      const nextList = exists
        ? currentList.filter((i) => i !== idx)
        : [...currentList, idx];
      return { ...prev, [type]: nextList };
    });
  };

  const totalChecked = Object.values(selectedMap).reduce(
    (acc, arr) => acc + arr.length,
    0
  );

  const typeNumbers: EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];

  const handleProceed = () => {
    sound.playStationTransition();
    onComplete(selectedMap);
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-mono-code mb-2.5 shadow-md"
        >
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          PHASE 1 // ASTRAL SENSOR SCAN
        </motion.div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-200 via-white to-pink-200 font-sans-cyber tracking-tight">
          特性スキャン・チェックリスト
        </h2>
        <p className="text-xs sm:text-sm text-slate-400 mt-1.5 font-sans-cyber max-w-xl mx-auto leading-relaxed">
          直感で「自分に当てはまる」と感じる項目にチェックを入れてください（各+4点）。
          迷ったら無理に選ばなくても大丈夫です。
        </p>

        {/* Counter Badge */}
        <div className="mt-3 inline-flex items-center gap-3 px-4 py-1.5 rounded-full bg-slate-950/80 border border-slate-800 text-xs font-mono-code">
          <span className="text-slate-400">選択中:</span>
          <span className="text-cyan-300 font-bold text-sm">
            {totalChecked} <span className="text-[10px] text-slate-500">/ 63項目</span>
          </span>
        </div>
      </div>

      {/* Type Quick Navigation Tabs */}
      <div className="flex items-center justify-start sm:justify-center gap-1.5 overflow-x-auto pb-3 mb-6 scrollbar-none">
        <button
          onClick={() => setActiveTab('all')}
          className={`px-3 py-1.5 rounded-lg text-xs font-mono-code transition-all whitespace-nowrap ${
            activeTab === 'all'
              ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
              : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
          }`}
        >
          全タイプ表示
        </button>
        {typeNumbers.map((t) => {
          const count = selectedMap[t].length;
          const isSelected = activeTab === t;
          return (
            <button
              key={t}
              onClick={() => {
                sound.playClick();
                setActiveTab(t);
              }}
              className={`px-2.5 py-1.5 rounded-lg text-xs font-mono-code transition-all whitespace-nowrap flex items-center gap-1.5 ${
                isSelected
                  ? 'bg-cyan-950 border border-cyan-400 text-cyan-200 font-bold shadow-sm'
                  : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span>T{t}</span>
              {count > 0 && (
                <span className="w-4 h-4 rounded-full bg-cyan-400 text-slate-950 text-[10px] flex items-center justify-center font-bold">
                  {count}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Checklist Sections */}
      <div className="space-y-6 max-h-[58vh] overflow-y-auto pr-1 pb-4">
        {typeNumbers
          .filter((t) => activeTab === 'all' || activeTab === t)
          .map((t) => {
            const detail = TYPE_DETAILS[t];
            const items = ENNEAGRAM_CHECKLIST[t];
            const checkedList = selectedMap[t] || [];

            return (
              <div
                key={t}
                className="bg-slate-950/80 border border-slate-800/90 rounded-2xl p-4 sm:p-5 backdrop-blur-md"
              >
                {/* Type Header */}
                <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-slate-800/80">
                  <div className="flex items-center gap-2.5">
                    <span className="w-7 h-7 rounded-lg bg-slate-900 border border-slate-700 flex items-center justify-center text-sm font-mono-code text-amber-300">
                      {detail.planetSymbol}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono-code text-cyan-400 font-bold">
                          TYPE {t}
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs font-bold text-slate-200 font-sans-cyber">
                          {detail.title}
                        </span>
                      </div>
                      <div className="text-[10px] text-slate-400 font-mono-code">
                        {detail.subTitle}
                      </div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono-code text-cyan-300/80 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                    {checkedList.length} / 7 選択
                  </span>
                </div>

                {/* Checklist Grid */}
                <div className="space-y-2">
                  {items.map((itemText, idx) => {
                    const isChecked = checkedList.includes(idx);
                    return (
                      <div
                        key={idx}
                        onClick={() => toggleItem(t, idx)}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all flex items-start gap-3 select-none ${
                          isChecked
                            ? 'bg-cyan-950/60 border-cyan-400/80 text-cyan-100 shadow-sm'
                            : 'bg-slate-900/40 border-slate-800/70 hover:bg-slate-900/80 text-slate-300'
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded-md border flex items-center justify-center flex-shrink-0 mt-0.5 transition-colors ${
                            isChecked
                              ? 'bg-cyan-400 border-cyan-300 text-slate-950 font-bold text-xs'
                              : 'border-slate-700 bg-slate-950'
                          }`}
                        >
                          {isChecked && '✓'}
                        </div>
                        <span className="text-xs sm:text-sm font-sans-cyber leading-relaxed">
                          {itemText}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>

      {/* Sticky Bottom Actions */}
      <div className="mt-6 pt-4 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-3 bg-slate-950/90 backdrop-blur-md p-4 rounded-2xl border border-slate-800">
        <button
          onClick={() => {
            sound.playClick();
            onBackToIntro();
          }}
          className="text-xs font-mono-code text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors order-2 sm:order-1"
        >
          <span>←</span> タイトルへ戻る
        </button>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end order-1 sm:order-2">
          <span className="text-xs font-mono-code text-slate-400 hidden sm:inline">
            選択計: <strong className="text-cyan-300">{totalChecked}</strong> 件
          </span>
          <button
            onClick={handleProceed}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-slate-950 font-extrabold text-xs sm:text-sm shadow-lg shadow-cyan-500/25 transition-all flex items-center justify-center gap-2 cursor-pointer font-sans-cyber"
          >
            <span>次へ：12の宇宙ステーション観測へ進む</span>
            <span>➔</span>
          </button>
        </div>
      </div>
    </div>
  );
}
