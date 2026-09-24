'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  HORNEVIAN_DATA,
  HARMONIC_DATA,
  MATRIX_TYPE_MAP,
  TYPE_DETAILS,
  HornevianType,
  HarmonicType,
  EnneagramType,
} from '@/lib/enneagram-data';
import { sound } from '@/lib/audio';

interface TypeMatrixModalProps {
  isOpen: boolean;
  onClose: () => void;
  highlightType?: EnneagramType;
}

export default function TypeMatrixModal({
  isOpen,
  onClose,
  highlightType,
}: TypeMatrixModalProps) {
  const [selectedType, setSelectedType] = useState<EnneagramType | null>(
    highlightType || 5
  );

  if (!isOpen) return null;

  const hornevianList: HornevianType[] = ['assertive', 'compliant', 'withdrawn'];
  const harmonicList: HarmonicType[] = ['positive', 'competent', 'reactive'];

  const detail = selectedType ? TYPE_DETAILS[selectedType] : null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-slate-950/85 backdrop-blur-md"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-2xl p-5 sm:p-7 shadow-2xl shadow-cyan-950/40 z-10 my-8 overflow-hidden max-h-[92vh] flex flex-col"
        >
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono-code text-xs font-bold">
                  ENNEAGRAM ASTRAL MATRIX
                </span>
                <span className="text-slate-600">/</span>
                <span className="text-xs text-slate-400 font-mono-code">
                  3×3 全9タイプ軌道図鑑
                </span>
              </div>
              <h3 className="text-lg font-bold text-slate-100 font-sans-cyber mt-0.5">
                ホーナイ三分類 × ハーモニクス三分類 マトリクス
              </h3>
            </div>
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="w-8 h-8 rounded-lg bg-slate-900 border border-slate-800 text-slate-400 hover:text-slate-100 hover:border-slate-700 flex items-center justify-center text-sm transition-colors"
            >
              ✕
            </button>
          </div>

          <div className="overflow-y-auto flex-1 py-4 space-y-6">
            {/* Explanatory text */}
            <p className="text-xs text-slate-300 leading-relaxed font-sans-cyber">
              エニアグラムの9つのタイプは、
              <strong className="text-cyan-300 font-semibold">
                「世界にどう向かうか（ホーナイ）」
              </strong>
              と
              <strong className="text-amber-300 font-semibold">
                「問題にどう対処するか（ハーモニクス）」
              </strong>
              の二軸によって、各マスに1タイプずつ寸分違わず配置されます。
            </p>

            {/* Matrix Table */}
            <div className="overflow-x-auto pb-2">
              <table className="w-full text-left border-collapse min-w-[580px]">
                <thead>
                  <tr>
                    <th className="p-2 border border-slate-800 bg-slate-900/40 text-[11px] font-mono-code text-slate-400 text-center w-28">
                      ホーナイ＼ハーモニクス
                    </th>
                    {harmonicList.map((hKey) => {
                      const hInfo = HARMONIC_DATA[hKey];
                      return (
                        <th
                          key={hKey}
                          className="p-2.5 border border-slate-800 bg-slate-900/60 text-center"
                        >
                          <div className="text-xs font-bold text-slate-200 font-sans-cyber">
                            {hInfo.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono-code">
                            {hInfo.starName}
                          </div>
                        </th>
                      );
                    })}
                  </tr>
                </thead>
                <tbody>
                  {hornevianList.map((hrKey) => {
                    const hrInfo = HORNEVIAN_DATA[hrKey];
                    return (
                      <tr key={hrKey}>
                        <td className="p-2.5 border border-slate-800 bg-slate-900/60 align-middle">
                          <div className="text-xs font-bold text-slate-200 font-sans-cyber">
                            {hrInfo.name}
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono-code">
                            {hrInfo.starName}
                          </div>
                        </td>
                        {harmonicList.map((hmKey) => {
                          const typeNum = MATRIX_TYPE_MAP[hrKey][hmKey];
                          const typeInfo = TYPE_DETAILS[typeNum];
                          const isHighlighted = highlightType === typeNum;
                          const isSelected = selectedType === typeNum;

                          return (
                            <td
                              key={hmKey}
                              onClick={() => {
                                sound.playClick();
                                setSelectedType(typeNum);
                              }}
                              className={`p-3 border border-slate-800 cursor-pointer transition-all ${
                                isSelected
                                  ? 'bg-cyan-950/80 border-cyan-400/80 shadow-inner'
                                  : isHighlighted
                                  ? 'bg-purple-950/60 border-purple-400/80'
                                  : 'bg-slate-950 hover:bg-slate-900/80'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-mono-code font-bold text-cyan-300">
                                  TYPE {typeNum}
                                </span>
                                <span className="text-base text-amber-300 font-mono-code">
                                  {typeInfo.planetSymbol}
                                </span>
                              </div>
                              <div className="text-xs font-bold text-slate-200 font-sans-cyber">
                                {typeInfo.title.split(' ')[0]}
                              </div>
                              <div className="text-[10px] text-slate-400 font-mono-code truncate">
                                {typeInfo.planetName.split(' ')[0]}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Selected Type Detail Card */}
            {detail && (
              <motion.div
                key={detail.type}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-900/80 border border-slate-800 rounded-xl p-5"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-xl text-amber-300 font-mono-code">
                      {detail.planetSymbol}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono-code text-cyan-400 font-bold">
                          TYPE {detail.type}
                        </span>
                        <span className="text-slate-600">·</span>
                        <span className="text-xs text-slate-400 font-sans-cyber">
                          {detail.subTitle}
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-100 font-sans-cyber">
                        {detail.title}
                      </h4>
                    </div>
                  </div>
                  <div className="text-[11px] font-mono-code text-slate-400 text-left sm:text-right">
                    <div>{detail.starCoordinate}</div>
                    <div className="text-amber-400">{detail.planetName}</div>
                  </div>
                </div>

                <div className="mt-4 space-y-3 text-xs leading-relaxed font-sans-cyber text-slate-300">
                  <div>
                    <span className="text-slate-400 font-mono-code text-[11px] block mb-1">
                      【観測構造とエッセンス】
                    </span>
                    <p>{detail.essence}</p>
                  </div>

                  <div>
                    <span className="text-slate-400 font-mono-code text-[11px] block mb-1">
                      【内的世界観】
                    </span>
                    <p className="italic text-slate-400">「{detail.worldview}」</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                      <span className="text-[11px] font-mono-code text-emerald-400 block mb-1">
                        ✦ 固有の強み・引力
                      </span>
                      <ul className="space-y-1 text-slate-300">
                        {detail.strengths.map((s, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-emerald-500">·</span>
                            <span>{s}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800/80">
                      <span className="text-[11px] font-mono-code text-rose-400 block mb-1">
                        ✦ 歪み・死角の軌道
                      </span>
                      <ul className="space-y-1 text-slate-300">
                        {detail.blindspots.map((b, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="text-rose-500">·</span>
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="p-3 rounded-lg bg-pink-950/30 border border-pink-500/20 text-pink-200 mt-2">
                    <span className="text-[10px] font-mono-code text-pink-400 block mb-1">
                      🥺 ダーリンちゃんの観測ログ
                    </span>
                    <p className="italic">{detail.darlingComment}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div className="pt-3 border-t border-slate-800 flex justify-end">
            <button
              onClick={() => {
                sound.playClick();
                onClose();
              }}
              className="px-4 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-mono-code text-slate-300 transition-colors"
            >
              閉じる (Close)
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
