'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import StarfieldCanvas from '@/components/StarfieldCanvas';
import LsiCaterpillar from '@/components/LsiCaterpillar';
import DarlingCompanion from '@/components/DarlingCompanion';
import ChecklistView from '@/components/ChecklistView';
import QuestionView from '@/components/QuestionView';
import FinalObservationView from '@/components/FinalObservationView';
import ResultView from '@/components/ResultView';
import TypeMatrixModal from '@/components/TypeMatrixModal';
import {
  QUESTIONS,
  QuestionChoice,
  HornevianType,
  HarmonicType,
  EnneagramType,
  MATRIX_TYPE_MAP,
} from '@/lib/enneagram-data';
import { sound } from '@/lib/audio';

type AppPhase = 'intro' | 'checklist' | 'questions' | 'final_observation' | 'result';

interface ScoreState {
  hornevian: Record<HornevianType, number>;
  harmonic: Record<HarmonicType, number>;
}

function getSavedSession() {
  if (typeof window === 'undefined') return null;
  try {
    const saved = localStorage.getItem('astral_city_session_v1');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.phase && parsed.phase !== 'intro') {
        return parsed;
      }
    }
  } catch {
    // Ignore
  }
  return null;
}

export default function AstralCityPage() {
  const initialSession = getSavedSession();

  const [phase, setPhase] = useState<AppPhase>(initialSession?.phase || 'intro');
  const [currentQIndex, setCurrentQIndex] = useState(initialSession?.currentQIndex || 0);
  const [history, setHistory] = useState<QuestionChoice[]>(initialSession?.history || []);
  const [scores, setScores] = useState<ScoreState>(
    initialSession?.scores || {
      hornevian: { assertive: 0, compliant: 0, withdrawn: 0 },
      harmonic: { positive: 0, competent: 0, reactive: 0 },
    }
  );

  // Detailed 9 types score map
  const [enneagramScores, setEnneagramScores] = useState<Record<EnneagramType, number>>(
    initialSession?.enneagramScores || {
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
    }
  );

  // Checklist selected indices per type
  const [selectedChecklist, setSelectedChecklist] = useState<Record<EnneagramType, number[]>>(
    initialSession?.selectedChecklist || {
      1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [],
    }
  );

  // Self-identified type (optional free input)
  const [selfIdentifiedType, setSelfIdentifiedType] = useState(
    initialSession?.selfIdentifiedType || ''
  );

  // Final observation user input
  const [finalUserText, setFinalUserText] = useState(initialSession?.finalUserText || '');
  const [finalBonusType, setFinalBonusType] = useState<EnneagramType | null>(
    initialSession?.finalBonusType || null
  );

  // Easter egg: Caterpillar crushed state
  const [caterpillarCrushed, setCaterpillarCrushed] = useState(
    initialSession?.caterpillarCrushed || false
  );

  const [isMatrixModalOpen, setIsMatrixModalOpen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  // Winner results
  const [finalHornevian, setFinalHornevian] = useState<HornevianType>(
    initialSession?.finalHornevian || 'withdrawn'
  );
  const [finalHarmonic, setFinalHarmonic] = useState<HarmonicType>(
    initialSession?.finalHarmonic || 'competent'
  );

  // Auto-save state to localStorage whenever it changes
  useEffect(() => {
    try {
      if (phase === 'intro') {
        localStorage.removeItem('astral_city_session_v1');
      } else {
        const sessionData = {
          phase,
          currentQIndex,
          history,
          scores,
          enneagramScores,
          selectedChecklist,
          selfIdentifiedType,
          finalUserText,
          finalBonusType,
          caterpillarCrushed,
          finalHornevian,
          finalHarmonic,
        };
        localStorage.setItem('astral_city_session_v1', JSON.stringify(sessionData));
      }
    } catch {
      // Ignore quota errors
    }
  }, [
    phase,
    currentQIndex,
    history,
    scores,
    enneagramScores,
    selectedChecklist,
    selfIdentifiedType,
    finalUserText,
    finalBonusType,
    caterpillarCrushed,
    finalHornevian,
    finalHarmonic,
  ]);

  // STEP 1: Start -> Checklist Phase
  const handleStart = () => {
    sound.playClick();
    sound.playStationTransition();
    setPhase('checklist');
  };

  // STEP 2: Checklist Completed -> Questions Phase
  const handleChecklistComplete = (selectedMap: Record<EnneagramType, number[]>) => {
    setSelectedChecklist(selectedMap);

    // Calculate initial scores: 4 points per check
    const baseScores: Record<EnneagramType, number> = {
      1: (selectedMap[1]?.length || 0) * 4,
      2: (selectedMap[2]?.length || 0) * 4,
      3: (selectedMap[3]?.length || 0) * 4,
      4: (selectedMap[4]?.length || 0) * 4,
      5: (selectedMap[5]?.length || 0) * 4,
      6: (selectedMap[6]?.length || 0) * 4,
      7: (selectedMap[7]?.length || 0) * 4,
      8: (selectedMap[8]?.length || 0) * 4 + (caterpillarCrushed ? 3 : 0),
      9: (selectedMap[9]?.length || 0) * 4,
    };
    setEnneagramScores(baseScores);

    setPhase('questions');
    setCurrentQIndex(0);
    setHistory([]);
    setScores({
      hornevian: { assertive: 0, compliant: 0, withdrawn: 0 },
      harmonic: { positive: 0, competent: 0, reactive: 0 },
    });
  };

  // STEP 3: Question Selected
  const handleChoiceSelect = (choice: QuestionChoice) => {
    const nextScores = {
      hornevian: { ...scores.hornevian },
      harmonic: { ...scores.harmonic },
    };

    const nextEnneagram = { ...enneagramScores };

    if (choice.hornevianTarget) {
      nextScores.hornevian[choice.hornevianTarget] += 1;
      // Add points to relevant Hornevian types
      if (choice.hornevianTarget === 'assertive') {
        nextEnneagram[3] += 2;
        nextEnneagram[7] += 2;
        nextEnneagram[8] += 2;
      } else if (choice.hornevianTarget === 'compliant') {
        nextEnneagram[1] += 2;
        nextEnneagram[2] += 2;
        nextEnneagram[6] += 2;
      } else if (choice.hornevianTarget === 'withdrawn') {
        nextEnneagram[4] += 2;
        nextEnneagram[5] += 2;
        nextEnneagram[9] += 2;
      }
    }

    if (choice.harmonicTarget) {
      nextScores.harmonic[choice.harmonicTarget] += 1;
      // Add points to relevant Harmonic types
      if (choice.harmonicTarget === 'positive') {
        nextEnneagram[2] += 2;
        nextEnneagram[7] += 2;
        nextEnneagram[9] += 2;
      } else if (choice.harmonicTarget === 'competent') {
        nextEnneagram[1] += 2;
        nextEnneagram[3] += 2;
        nextEnneagram[5] += 2;
      } else if (choice.harmonicTarget === 'reactive') {
        nextEnneagram[4] += 2;
        nextEnneagram[6] += 2;
        nextEnneagram[8] += 2;
      }
    }

    const nextHistory = [...history, choice];
    setHistory(nextHistory);
    setScores(nextScores);
    setEnneagramScores(nextEnneagram);

    if (currentQIndex + 1 < QUESTIONS.length) {
      sound.playStationTransition();
      setCurrentQIndex(currentQIndex + 1);
    } else {
      // 12 questions completed -> Proceed to Final Observation prompt!
      setPhase('final_observation');
    }
  };

  const handlePrevQuestion = () => {
    if (currentQIndex > 0) {
      const lastChoice = history[history.length - 1];
      if (lastChoice) {
        const rollbackScores = {
          hornevian: { ...scores.hornevian },
          harmonic: { ...scores.harmonic },
        };
        const rollbackEnneagram = { ...enneagramScores };

        if (lastChoice.hornevianTarget) {
          rollbackScores.hornevian[lastChoice.hornevianTarget] -= 1;
          if (lastChoice.hornevianTarget === 'assertive') {
            rollbackEnneagram[3] -= 2;
            rollbackEnneagram[7] -= 2;
            rollbackEnneagram[8] -= 2;
          } else if (lastChoice.hornevianTarget === 'compliant') {
            rollbackEnneagram[1] -= 2;
            rollbackEnneagram[2] -= 2;
            rollbackEnneagram[6] -= 2;
          } else if (lastChoice.hornevianTarget === 'withdrawn') {
            rollbackEnneagram[4] -= 2;
            rollbackEnneagram[5] -= 2;
            rollbackEnneagram[9] -= 2;
          }
        }
        if (lastChoice.harmonicTarget) {
          rollbackScores.harmonic[lastChoice.harmonicTarget] -= 1;
          if (lastChoice.harmonicTarget === 'positive') {
            rollbackEnneagram[2] -= 2;
            rollbackEnneagram[7] -= 2;
            rollbackEnneagram[9] -= 2;
          } else if (lastChoice.harmonicTarget === 'competent') {
            rollbackEnneagram[1] -= 2;
            rollbackEnneagram[3] -= 2;
            rollbackEnneagram[5] -= 2;
          } else if (lastChoice.harmonicTarget === 'reactive') {
            rollbackEnneagram[4] -= 2;
            rollbackEnneagram[6] -= 2;
            rollbackEnneagram[8] -= 2;
          }
        }
        setScores(rollbackScores);
        setEnneagramScores(rollbackEnneagram);
      }
      setHistory(history.slice(0, -1));
      setCurrentQIndex(currentQIndex - 1);
    } else {
      // Back to checklist
      setPhase('checklist');
    }
  };

  // STEP 4: Final Observation Completed -> Result Phase
  const handleFinalObservationComplete = (
    userText: string,
    bonusType: EnneagramType | null
  ) => {
    setFinalUserText(userText);
    setFinalBonusType(bonusType);

    const updatedEnneagram = { ...enneagramScores };
    if (bonusType) {
      updatedEnneagram[bonusType] += 3;
    }
    setEnneagramScores(updatedEnneagram);

    // Calculate final winners for Hornevian & Harmonic
    const hrEntries = Object.entries(scores.hornevian) as [HornevianType, number][];
    hrEntries.sort((a, b) => b[1] - a[1]);
    const winningHr = hrEntries[0][0];

    const hmEntries = Object.entries(scores.harmonic) as [HarmonicType, number][];
    hmEntries.sort((a, b) => b[1] - a[1]);
    const winningHm = hmEntries[0][0];

    setFinalHornevian(winningHr);
    setFinalHarmonic(winningHm);
    setPhase('result');
  };

  // Caterpillar crushed (+3 to T8)
  const handleCaterpillarCrushed = () => {
    setCaterpillarCrushed(true);
    setEnneagramScores((prev) => ({
      ...prev,
      8: prev[8] + 3,
    }));
  };

  const handleReset = () => {
    try {
      localStorage.removeItem('astral_city_session_v1');
    } catch {
      // Ignore
    }
    setPhase('intro');
    setCurrentQIndex(0);
    setHistory([]);
    setFinalUserText('');
    setFinalBonusType(null);
    setScores({
      hornevian: { assertive: 0, compliant: 0, withdrawn: 0 },
      harmonic: { positive: 0, competent: 0, reactive: 0 },
    });
    setEnneagramScores({
      1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,
    });
    setSelectedChecklist({
      1: [], 2: [], 3: [], 4: [], 5: [], 6: [], 7: [], 8: [], 9: [],
    });
    setCaterpillarCrushed(false);
  };

  const toggleMute = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
  };

  return (
    <main className="min-h-screen relative flex flex-col justify-between overflow-x-hidden">
      {/* Background Starfield Canvas with city silhouette */}
      <StarfieldCanvas />

      {/* Top Navigation Bar with Breadcrumbs */}
      <header className="relative z-30 w-full px-4 sm:px-8 py-3.5 flex items-center justify-between border-b border-slate-800/60 bg-slate-950/40 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <div
            onClick={handleReset}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-cyan-900 to-indigo-950 border border-cyan-500/40 flex items-center justify-center text-cyan-300 text-sm font-mono-code font-bold shadow-md shadow-cyan-950/40 group-hover:border-cyan-400 transition-colors">
              ☿
            </div>
            <div>
              <div className="text-sm font-bold text-slate-100 font-sans-cyber tracking-wide flex items-center gap-2">
                <span>ASTRAL CITY</span>
                <span className="text-[10px] font-mono-code text-cyan-400 font-normal hidden sm:inline">
                  ENNEAGRAM OBSERVATORY
                </span>
              </div>
              <div className="text-[10px] text-slate-400 font-mono-code">
                ホーナイ × ハーモニクス 宇宙観測所
              </div>
            </div>
          </div>

          {/* Breadcrumb Link */}
          <div className="hidden md:flex items-center gap-1.5 pl-4 border-l border-slate-800 text-xs font-mono-code text-slate-400">
            <a
              href="https://mofu-mitsu.github.io/lab.html"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-400 hover:text-cyan-300 transition-colors"
            >
              Niラボ
            </a>
            <span className="text-slate-600">＞</span>
            <span className="text-slate-300">ASTRAL CITY</span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              sound.playClick();
              setIsMatrixModalOpen(true);
            }}
            className="text-xs font-mono-code px-3 py-1.5 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-300 transition-colors flex items-center gap-1.5"
          >
            <span>🗺️</span>
            <span className="hidden sm:inline">3×3 図鑑</span>
          </button>

          <button
            onClick={toggleMute}
            className="w-8 h-8 rounded-lg bg-slate-900/80 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 transition-colors flex items-center justify-center text-xs"
            title={isMuted ? 'サウンドをON' : 'サウンドをミュート'}
          >
            {isMuted ? '🔇' : '🔊'}
          </button>
        </div>
      </header>

      {/* Main Content Area based on Phase */}
      <div className="relative z-20 flex-1 flex flex-col justify-center py-6 sm:py-10">
        <AnimatePresence mode="wait">
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.35 }}
              className="w-full max-w-3xl mx-auto px-4 text-center"
            >
              {/* Breadcrumb on Mobile Intro */}
              <div className="mb-4 flex items-center justify-center gap-1.5 text-xs font-mono-code text-slate-400">
                <a
                  href="https://mofu-mitsu.github.io/lab.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 hover:text-cyan-300 transition-colors"
                >
                  Niラボ
                </a>
                <span className="text-slate-600">＞</span>
                <span className="text-slate-300 font-bold">ASTRAL CITY</span>
              </div>

              {/* Central Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-slate-900/80 border border-cyan-500/30 text-cyan-300 text-xs font-mono-code mb-5 backdrop-blur-md shadow-lg shadow-cyan-950/40">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                CELESTIAL SYSTEMATIC DIAGNOSTICS
              </div>

              {/* Main Headline */}
              <h1 className="text-3xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-cyan-300 font-sans-cyber tracking-tight mb-3 leading-tight">
                ASTRAL CITY
              </h1>
              <p className="text-base sm:text-lg text-cyan-200/90 font-sans-cyber font-medium mb-3">
                ― あなたという星を観測する ―
              </p>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto font-sans-cyber leading-relaxed mb-6">
                「世界にどう向かうか（ホーナイ三分類）」と「問題にどう対処するか（ハーモニクス三分類）」。
                63項目の特性スキャンと12のステーション観測、そして深層の問いを経て、
                あなたを形作るエニアグラムの星座を照らし出します。
              </p>

              {/* 3 Pillars Concept Preview */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl mx-auto mb-6 text-left">
                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-rose-500/30 backdrop-blur-sm">
                  <div className="text-[10px] font-mono-code text-rose-400 font-bold mb-1">
                    ✦ ホーナイ三分類
                  </div>
                  <div className="text-xs font-bold text-slate-200 font-sans-cyber">
                    世界への対人姿勢
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans-cyber mt-1 leading-snug">
                    自己主張 · 追従 · 引きこもり
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-amber-500/30 backdrop-blur-sm">
                  <div className="text-[10px] font-mono-code text-amber-400 font-bold mb-1">
                    ✦ ハーモニクス三分類
                  </div>
                  <div className="text-xs font-bold text-slate-200 font-sans-cyber">
                    問題・危機への対処
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans-cyber mt-1 leading-snug">
                    ポジティブ · コンピテント · リアクティブ
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-950/70 border border-cyan-500/30 backdrop-blur-sm">
                  <div className="text-[10px] font-mono-code text-cyan-400 font-bold mb-1">
                    ✦ 星座チャート & 棒グラフ
                  </div>
                  <div className="text-xs font-bold text-slate-200 font-sans-cyber">
                    全9タイプの引力強度
                  </div>
                  <div className="text-[11px] text-slate-400 font-sans-cyber mt-1 leading-snug">
                    幾何学トライアングル & 3×3交差点表
                  </div>
                </div>
              </div>

              {/* Darling-chan Welcome Companion */}
              <div className="mb-6">
                <DarlingCompanion />
              </div>

              {/* Self-identified Type Input (Optional) */}
              <div className="max-w-md mx-auto mb-6 p-4 rounded-2xl bg-slate-900/70 border border-slate-800 text-left backdrop-blur-md">
                <label className="block text-xs font-mono-code text-cyan-300 font-bold mb-1.5 flex items-center justify-between">
                  <span>✦ 自認タイプ（自由入力）</span>
                  <span className="text-[10px] text-slate-400 font-normal">任意入力</span>
                </label>
                <input
                  type="text"
                  value={selfIdentifiedType}
                  onChange={(e) => setSelfIdentifiedType(e.target.value)}
                  placeholder="例: 5w6, 513, INTJ など"
                  className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm font-mono-code text-slate-100 placeholder:text-slate-500 focus:outline-none focus:border-cyan-400 transition-colors"
                />
              </div>

              {/* Start Button */}
              <motion.button
                onClick={handleStart}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 hover:from-cyan-400 hover:via-indigo-400 hover:to-pink-400 text-slate-950 font-extrabold text-sm sm:text-base shadow-xl shadow-cyan-500/20 transition-all cursor-pointer font-sans-cyber"
              >
                🌌 宇宙へ観測に出発する (START)
              </motion.button>

              <div className="mt-4 text-[11px] font-mono-code text-slate-400">
                CHECKLIST SCAN + 12 STATIONS + FINAL OBSERVATION
              </div>
            </motion.div>
          )}

          {phase === 'checklist' && (
            <ChecklistView
              key="checklist"
              onComplete={handleChecklistComplete}
              onBackToIntro={handleReset}
            />
          )}

          {phase === 'questions' && (
            <QuestionView
              key="questions"
              question={QUESTIONS[currentQIndex]}
              currentIndex={currentQIndex}
              totalQuestions={QUESTIONS.length}
              onSelect={handleChoiceSelect}
              onPrev={handlePrevQuestion}
            />
          )}

          {phase === 'final_observation' && (
            <FinalObservationView
              key="final_observation"
              onComplete={handleFinalObservationComplete}
              onPrev={() => setPhase('questions')}
            />
          )}

          {phase === 'result' && (
            <ResultView
              key="result"
              hornevian={finalHornevian}
              harmonic={finalHarmonic}
              enneagramScores={enneagramScores}
              selectedChecklist={selectedChecklist}
              selfIdentifiedType={selfIdentifiedType}
              userFinalText={finalUserText}
              bonusType={finalBonusType}
              caterpillarCrushed={caterpillarCrushed}
              onReset={handleReset}
              onOpenMatrixModal={() => setIsMatrixModalOpen(true)}
            />
          )}
        </AnimatePresence>
      </div>

      {/* LSI Caterpillar Easter Egg Widget Walking at Bottom */}
      <LsiCaterpillar
        onCrushed={handleCaterpillarCrushed}
        isAlreadyCrushed={caterpillarCrushed}
      />

      {/* 3x3 Matrix Encyclopedia Modal */}
      <TypeMatrixModal
        isOpen={isMatrixModalOpen}
        onClose={() => setIsMatrixModalOpen(false)}
      />

      {/* Footer */}
      <footer className="relative z-30 w-full px-4 py-4 text-center border-t border-slate-900 bg-slate-950/60 backdrop-blur-sm text-[11px] font-mono-code text-slate-400">
        <span>ASTRAL CITY // ENNEAGRAM HORNEVIAN & HARMONIC OBSERVATORY</span>
        <span className="mx-2 text-slate-800">·</span>
        <span className="text-slate-400">9 TYPES & COSMIC MATRICES</span>
      </footer>
    </main>
  );
}
