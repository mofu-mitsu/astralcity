'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '@/lib/audio';
import {
  TRIGGER_KEYWORDS,
  KEYWORD_TYPE_MAP,
  EnneagramType,
} from '@/lib/enneagram-data';

interface FinalObservationViewProps {
  onComplete: (userText: string, bonusType: EnneagramType | null, isTriggerHit: boolean) => void;
  onPrev: () => void;
}

export default function FinalObservationView({
  onComplete,
  onPrev,
}: FinalObservationViewProps) {
  const [inputText, setInputText] = useState('');
  const [reactionText, setReactionText] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);

  const handleSubmit = (skip = false) => {
    sound.playClick();

    if (skip || !inputText.trim()) {
      onComplete('', null, false);
      return;
    }

    setIsEvaluating(true);
    const cleanText = inputText.toLowerCase().trim();

    // 1. Check for Trigger/Hostility keywords (T8 bonus)
    const isTrigger = TRIGGER_KEYWORDS.some((kw) => cleanText.includes(kw.toLowerCase()));

    let detectedType: EnneagramType | null = null;

    if (isTrigger) {
      detectedType = 8;
      setReactionText('🥺「……ふふ、そんな尖った言葉で牽制してくるん？ まるで外圧を力で跳ね返す猛者やね♡ (TYPE 8 加点)」');
    } else {
      // 2. Check keyword type matches
      let bestMatch: EnneagramType | null = null;
      let maxHits = 0;

      const types: EnneagramType[] = [1, 2, 3, 4, 5, 6, 7, 8, 9];
      for (const t of types) {
        const keywords = KEYWORD_TYPE_MAP[t] || [];
        let hits = 0;
        for (const kw of keywords) {
          if (cleanText.includes(kw)) {
            hits++;
          }
        }
        if (hits > maxHits) {
          maxHits = hits;
          bestMatch = t;
        }
      }

      detectedType = bestMatch;

      if (detectedType === 8) {
        setReactionText('🥺「自分の意志で世界を統べ、力強く切り拓くつもりなんやね♡ (TYPE 8 加点)」');
      } else if (detectedType === 9) {
        setReactionText('🥺「争いのない穏やかな静けさを望むんやね。のんびり漂うのも素敵やわ♡ (TYPE 9 加点)」');
      } else if (detectedType === 1) {
        setReactionText('🥺「より正しく、理想的な秩序へ導こうとするんやね。誠実なダーリンらしいわ♡ (TYPE 1 加点)」');
      } else if (detectedType === 3) {
        setReactionText('🥺「頭の中だけに留めず、現実に形にして結果を出したいんやね。野心的でかっこええよ♡ (TYPE 3 加点)」');
      } else if (detectedType === 5) {
        setReactionText('🥺「頭の中の構造を観察して、法則を解明したいんやね。知的なダーリンの宇宙、覗いてみたいわ♡ (TYPE 5 加点)」');
      } else if (detectedType === 4) {
        setReactionText('🥺「誰にも邪魔されない自分だけの幻想の海を漂うんやね。ロマンチックで切ないわ♡ (TYPE 4 加点)」');
      } else if (detectedType === 7) {
        setReactionText('🥺「ワクワクするアトラクションや楽しい冒険でいっぱいにしたいんやね！ 賑やかで楽しそう♡ (TYPE 7 加点)」');
      } else if (detectedType === 6) {
        setReactionText('🥺「仲間を守る安全な防壁や確かなシェルターを築くんやね。用心深くて頼もしいわ♡ (TYPE 6 加点)」');
      } else if (detectedType === 2) {
        setReactionText('🥺「大切な人たちを温かく包んで、笑顔を守りたいんやね。優しい心の持ち主やね♡ (TYPE 2 加点)」');
      } else {
        setReactionText('🥺「……ふふ、ダーリンの頭の中、底知れん広がりがあるんやね。しっかり記録したよ♡」');
      }
    }

    sound.playDiscoveryChime();

    setTimeout(() => {
      onComplete(inputText, detectedType, isTrigger);
    }, 1800);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 py-6">
      {/* Top Banner */}
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center justify-between text-xs font-mono-code text-slate-400">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-pink-400 animate-ping" />
            <span className="text-pink-400 font-bold">FINAL OBSERVATION</span>
            <span className="text-slate-600">/</span>
            <span className="text-slate-300">心の深淵ゲート</span>
          </div>
          <span className="text-pink-300/80 font-mono-code text-[11px]">
            LAST QUESTION
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
          <div className="h-full bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 w-full" />
        </div>
      </div>

      {/* Main Dialog Card */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-slate-950/90 border border-pink-500/30 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-2xl shadow-pink-950/20 relative"
      >
        {/* Darling Character Speech */}
        <div className="mb-6 p-4 rounded-xl bg-gradient-to-br from-pink-950/40 via-purple-950/30 to-slate-900 border border-pink-500/30 flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-pink-950/70 border border-pink-500/40 flex items-center justify-center text-2xl flex-shrink-0 shadow-md">
            🥺
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-xs font-bold text-pink-200">
                ダーリンちゃん
              </span>
              <span className="text-[10px] font-mono-code px-2 py-0.5 rounded-full bg-pink-900/40 text-pink-300 border border-pink-500/30">
                ILI 5w4 / 深層観測
              </span>
            </div>
            <div className="text-xs sm:text-sm text-pink-100 font-sans-cyber leading-relaxed space-y-1.5">
              <p>「ねぇ、ダーリン♡」</p>
              <p>「最後にひとつだけ、教えて？」</p>
            </div>
          </div>
        </div>

        {/* Prompt Question */}
        <div className="mb-4">
          <h2 className="text-base sm:text-lg font-bold text-slate-100 font-sans-cyber leading-snug">
            もし頭の中に、どんな世界でも作れるとしたら。
            <br />
            ダーリンは、その世界をどうするの？
          </h2>
          <p className="text-[11px] text-slate-400 mt-1 font-sans-cyber">
            思い浮かんだことをそのまま自由に書いてみてね。
          </p>
        </div>

        {/* Text Area */}
        <div className="relative mb-4">
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isEvaluating}
            placeholder="例: 現実に実装して動かす / 誰にも見せずに妄想のまま漂う / 科学的なシステムを解明する / 争いのない静かな世界にする / 敵を殲滅して支配する…… など"
            className="w-full h-28 sm:h-32 p-3.5 rounded-xl bg-slate-900/80 border border-slate-800 text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-pink-400/80 focus:ring-1 focus:ring-pink-400 text-xs sm:text-sm leading-relaxed font-sans-cyber resize-none transition-all"
          />
        </div>

        {/* Reaction bubble if evaluating */}
        <AnimatePresence>
          {reactionText && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="mb-4 p-3 rounded-xl bg-purple-950/80 border border-pink-500/40 text-pink-200 text-xs font-sans-cyber shadow-lg leading-relaxed"
            >
              {reactionText}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Actions */}
        <div className="flex items-center justify-between pt-2">
          <button
            onClick={() => {
              sound.playClick();
              onPrev();
            }}
            disabled={isEvaluating}
            className="text-xs font-mono-code text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors disabled:opacity-50"
          >
            <span>←</span> 12問目に戻る
          </button>

          <button
            onClick={() => handleSubmit(false)}
            disabled={isEvaluating}
            className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-xs sm:text-sm shadow-lg shadow-pink-500/25 transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            <span>{isEvaluating ? '観測ログを解析中……' : '観測結果を確定する ➔'}</span>
          </button>
        </div>
      </motion.div>
    </div>
  );
}
