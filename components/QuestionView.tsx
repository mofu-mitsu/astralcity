'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  QuestionItem,
  QuestionChoice,
  HornevianType,
  HarmonicType,
} from '@/lib/enneagram-data';
import { sound } from '@/lib/audio';

interface QuestionViewProps {
  question: QuestionItem;
  currentIndex: number;
  totalQuestions: number;
  onSelect: (choice: QuestionChoice) => void;
  onPrev?: () => void;
}

export default function QuestionView({
  question,
  currentIndex,
  totalQuestions,
  onSelect,
  onPrev,
}: QuestionViewProps) {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);
  const [isFrosted, setIsFrosted] = useState(false);

  // Trigger frost special effect when Neptune Princess appears
  const isNeptune = question.character.avatar === '👑';

  const handleChoiceClick = (choice: QuestionChoice, idx: number) => {
    setSelectedIdx(idx);
    sound.playClick();

    if (isNeptune) {
      sound.playFrost();
      setIsFrosted(true);
      setTimeout(() => {
        setIsFrosted(false);
        onSelect(choice);
        setSelectedIdx(null);
      }, 400);
      return;
    }

    setTimeout(() => {
      onSelect(choice);
      setSelectedIdx(null);
    }, 250);
  };

  const progressPercent = ((currentIndex + 1) / totalQuestions) * 100;

  return (
    <div className="relative w-full max-w-2xl mx-auto px-4 py-6">
      {/* Frost effect overlay if Neptune princess freezes */}
      <AnimatePresence>
        {isFrosted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 pointer-events-none z-50 bg-cyan-200/15 backdrop-blur-[2px] border-8 border-cyan-300/40"
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-cyan-200 font-mono-code text-sm tracking-widest bg-cyan-950/80 px-4 py-2 rounded-full border border-cyan-400/50 shadow-lg shadow-cyan-500/20">
              ❄️ 海王星の冷気により観測コンソールが凍結中……
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header bar: Station & Progress */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            <span className="text-cyan-400 font-bold">{question.stage}</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">{question.location}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-400">
            <span>ORBIT</span>
            <span className="text-cyan-300 font-bold">
              {currentIndex + 1}
            </span>
            <span className="text-slate-600">/</span>
            <span>{totalQuestions}</span>
          </div>
        </div>

        {/* Progress track */}
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.35, ease: 'easeOut' }}
          />
        </div>
      </div>

      {/* Main Question Card */}
      <motion.div
        key={question.id}
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -15 }}
        transition={{ duration: 0.3 }}
        className="relative bg-slate-950/85 border border-slate-800/80 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-cyan-950/20"
      >
        {/* Subtle grid line accents */}
        <div className="absolute top-0 right-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />
        <div className="absolute bottom-0 left-8 w-24 h-[1px] bg-gradient-to-r from-transparent via-purple-500/40 to-transparent" />

        {/* Character Card Dialog */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-slate-900/90 to-slate-950/90 border border-slate-800 flex items-start gap-4">
          <div className="flex-shrink-0 relative">
            <div className="w-12 h-12 rounded-xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-2xl shadow-inner">
              {question.character.avatar}
            </div>
            {isNeptune && (
              <span className="absolute -bottom-1 -right-1 text-xs">❄️</span>
            )}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-xs font-bold text-slate-200">
                {question.character.name}
              </span>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-slate-800 text-slate-400 border border-slate-700">
                {question.character.title}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 italic font-sans-cyber leading-relaxed">
              {question.character.speech}
            </p>
          </div>
        </div>

        {/* Observation Dimension Badge */}
        <div className="mb-3 flex items-center gap-2">
          <span className="text-[10px] font-mono-code uppercase px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400">
            {question.dimension === 'hornevian'
              ? '✦ 観測軸 A: ホーナイ対人スタンス'
              : '✦ 観測軸 B: ハーモニクス対処戦略'}
          </span>
        </div>

        {/* Question Title */}
        <h2 className="text-base sm:text-lg font-bold text-slate-100 mb-6 font-sans-cyber leading-snug">
          {question.title}
        </h2>

        {/* Choices */}
        <div className="space-y-3">
          {question.choices.map((choice, idx) => {
            const isSelected = selectedIdx === idx;
            return (
              <motion.button
                key={idx}
                onClick={() => handleChoiceClick(choice, idx)}
                whileHover={{ scale: 1.01, x: 2 }}
                whileTap={{ scale: 0.99 }}
                className={`w-full text-left p-4 rounded-xl border transition-all relative overflow-hidden group ${
                  isSelected
                    ? 'bg-cyan-950/70 border-cyan-400 text-cyan-100 shadow-lg shadow-cyan-950/50'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/90 text-slate-200'
                }`}
              >
                {/* Glow bar indicator */}
                <div
                  className={`absolute left-0 top-0 bottom-0 w-1 transition-colors ${
                    isSelected
                      ? 'bg-cyan-400'
                      : 'bg-slate-800 group-hover:bg-cyan-500/50'
                  }`}
                />

                <div className="flex items-start gap-3 pl-2">
                  <span className="flex-shrink-0 w-6 h-6 rounded-md bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-xs font-mono-code text-cyan-300">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <div className="flex-1">
                    <p className="text-xs sm:text-sm font-medium font-sans-cyber leading-snug">
                      {choice.text}
                    </p>
                    {choice.subText && (
                      <p className="text-[11px] text-slate-400 mt-1 font-mono-code">
                        {choice.subText}
                      </p>
                    )}
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Back button */}
        {currentIndex > 0 && onPrev && (
          <div className="mt-6 pt-4 border-t border-slate-900 flex justify-start">
            <button
              onClick={() => {
                sound.playClick();
                onPrev();
              }}
              className="text-xs font-mono-code text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors"
            >
              <span>←</span> 前の軌道観測へ戻る
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
}
