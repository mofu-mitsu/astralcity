'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { toPng } from 'html-to-image';
import {
  HornevianType,
  HarmonicType,
  EnneagramType,
  HORNEVIAN_DATA,
  HARMONIC_DATA,
  TYPE_DETAILS,
  MATRIX_TYPE_MAP,
  COSMIC_SIGNALS,
  COSMIC_LOCATIONS,
  SECRET_STARS,
  calculateWing,
  calculateTritype,
} from '@/lib/enneagram-data';
import { sound } from '@/lib/audio';
import EnneagramStarChart from './EnneagramStarChart';
import ShareModal from './ShareModal';

const GAS_WEBHOOK_URL =
  'https://script.google.com/macros/s/AKfycbw1wN9U_8uh5RbendNYB-qWG8FLA_R5NESeTrgM1OHDIxZxxxEqBHD6iMxzxsY38_Duwg/exec';

interface ResultViewProps {
  hornevian: HornevianType;
  harmonic: HarmonicType;
  enneagramScores: Record<EnneagramType, number>;
  selectedChecklist: Record<EnneagramType, number[]>;
  selfIdentifiedType?: string;
  userFinalText?: string;
  bonusType?: EnneagramType | null;
  caterpillarCrushed?: boolean;
  onReset: () => void;
  onOpenMatrixModal: () => void;
}

// Helper function to calculate deterministic cosmic fortune
function getCosmicFortune(typeNum: EnneagramType) {
  const today = new Date();
  const daySeed = today.getFullYear() * 1000 + (today.getMonth() + 1) * 31 + today.getDate();
  const hash = (daySeed + typeNum * 17) % 1000;

  const signal = COSMIC_SIGNALS[hash % COSMIC_SIGNALS.length];
  const location = COSMIC_LOCATIONS[(hash + 3) % COSMIC_LOCATIONS.length];
  const secretStar = SECRET_STARS[(hash + 7) % SECRET_STARS.length];

  const moonPhases = [
    { phase: '🌑 新月 (New Moon)', name: '空白の軌道', meaning: 'ゼロから構想を温めるのに最も適した静寂。急いで輪郭を描かなくてもいい時。' },
    { phase: '🌓 上弦の月 (First Quarter)', name: '構築の光', meaning: '集めた知識と直感を線で結び、現実へ一歩引き寄せる推進の周期。' },
    { phase: '🌕 満月 (Full Moon)', name: '満ちる知性', meaning: '全体像がクリアに照らし出される時。感情と論理の境界が美しく浮かび上がる。' },
    { phase: '🌗 下弦の月 (Last Quarter)', name: '余白の調律', meaning: '不要なノイズを削ぎ落とし、本当に大切な本質だけを手元に残す時。' },
    { phase: '🌙 三日月 (Crescent)', name: '微光の予感', meaning: 'まだ誰も気づいていない微弱な可能性に、そっと意識を向けるタイミング。' },
  ];
  const moonPhase = moonPhases[(hash + typeNum) % moonPhases.length];

  return { signal, location, secretStar, moonPhase };
}

export default function ResultView({
  hornevian,
  harmonic,
  enneagramScores,
  selectedChecklist,
  selfIdentifiedType = '',
  userFinalText = '',
  bonusType = null,
  caterpillarCrushed = false,
  onReset,
  onOpenMatrixModal,
}: ResultViewProps) {
  const [copiedShare, setCopiedShare] = useState(false);
  const [copiedLog, setCopiedLog] = useState(false);
  const [isExportingImage, setIsExportingImage] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const captureRef = useRef<HTMLDivElement>(null);
  const hasAutoSentRef = useRef(false);

  // Derived enneagram type from 3x3 matrix
  const matrixType = MATRIX_TYPE_MAP[hornevian][harmonic];

  // Also check top scored type from all sources
  const sortedTypes = (Object.keys(enneagramScores) as unknown as EnneagramType[]).sort(
    (a, b) => (enneagramScores[b] || 0) - (enneagramScores[a] || 0)
  );
  // Primary type is top score (or fallback to matrix type)
  const primaryType = sortedTypes[0] || matrixType;
  const primaryDetail = TYPE_DETAILS[primaryType];
  const hrInfo = HORNEVIAN_DATA[hornevian];
  const hmInfo = HARMONIC_DATA[harmonic];

  // Wing calculation (e.g. 5w6)
  const wingData = calculateWing(primaryType, enneagramScores);

  // Tritype calculation (Gut / Heart / Head, e.g. 513)
  const tritypeData = calculateTritype(primaryType, enneagramScores);

  // Check if primary type matches matrix intersection type
  const isMatrixMatch = primaryType === matrixType;

  // Deterministic cosmic fortune data
  const fortuneData = getCosmicFortune(primaryType);

  const logId = 10000 + primaryType * 1111;

  // 行動ログ全文の生成
  const generateActionLogText = () => {
    const now = new Date().toLocaleString('ja-JP');
    const checklistSummary = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneagramType[])
      .map((t) => `T${t}: ${(selectedChecklist[t] || []).length}個`)
      .join(', ');

    const scoresSummary = ([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneagramType[])
      .map((t) => `TYPE ${t}: ${enneagramScores[t] || 0}pt`)
      .join('\n  ');

    return `=== ASTRAL CITY 宇宙観測・行動ログ ===
■ 観測日時: ${now}
■ 観測ID: #${logId}
■ 自認タイプ: ${selfIdentifiedType || '(未入力)'}
■ 主星判定: TYPE ${primaryType}「${primaryDetail.title}」
■ ウィング: ${wingData.wingLabel} (w${wingData.wing1.type}:${wingData.wing1.score}pt vs w${wingData.wing2.type}:${wingData.wing2.score}pt)
■ トライタイプ: ${tritypeData.code} (Gut: T${tritypeData.gut.type} / Heart: T${tritypeData.heart.type} / Head: T${tritypeData.head.type})
■ ホーナイ分類: ${hrInfo.name} (${hrInfo.starName})
■ ハーモニクス分類: ${hmInfo.name} (${hmInfo.starName})
■ マトリクス交差点: TYPE ${matrixType}「${TYPE_DETAILS[matrixType].title}」${isMatrixMatch ? '（主星と完全一致）' : '（多層ハイブリッド）'}
■ 基礎スキャン(チェックボックス)選択数:
  ${checklistSummary}
■ エニアグラム総合スコア:
  ${scoresSummary}
■ 芋虫遭遇イベント: ${caterpillarCrushed ? 'SLE的衝撃により粉砕 (+3pt to T8)' : '未粉砕'}
■ 最終観測 (記述回答):
  "${userFinalText || '(未記入)'}"
■ 最終判定加点タイプ: ${bonusType ? `TYPE ${bonusType} (+3pt)` : 'なし'}
■ 今日の観測シグナル:
  ${fortuneData.signal}
=======================================`;
  };

  // Google Spreadsheet 自動送信ペイロード
  const totalCheckedCount = Object.values(selectedChecklist).reduce(
    (acc, arr) => acc + (arr?.length || 0),
    0
  );

  const actionLogFull = generateActionLogText();

  const spreadsheetPayload = {
    logId: `#${logId}`,
    selfIdentifiedType: selfIdentifiedType || '未入力',
    primaryType,
    primaryTypeName: primaryDetail.title,
    wingLabel: wingData.wingLabel,
    tritypeCode: tritypeData.code,
    hornevian: hrInfo.name,
    harmonic: hmInfo.name,
    matrixType,
    isMatrixMatch,
    scores: enneagramScores,
    totalChecked: totalCheckedCount,
    caterpillarCrushed,
    userFinalText,
    bonusType,
    actionLogText: actionLogFull,
  };

  // マウント時にサウンド再生＆Googleスプレッドシートへ自動送信
  useEffect(() => {
    sound.playDiscoveryChime();

    if (!hasAutoSentRef.current) {
      hasAutoSentRef.current = true;
      try {
        fetch(GAS_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'text/plain' },
          body: JSON.stringify(spreadsheetPayload),
          mode: 'no-cors',
        }).catch(() => {
          // Silently ignore background network errors
        });
      } catch {
        // Silently ignore
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // SNS共有テキスト
  const generateShareText = () => {
    return `【ASTRAL CITY 宇宙観測記録】
観測星: TYPE ${primaryType}「${primaryDetail.title}」(${wingData.wingLabel})
トライタイプ: ${tritypeData.code}
ホーナイ: ${hrInfo.name}
ハーモニクス: ${hmInfo.name}
マトリクス交差点: TYPE ${matrixType}
天体座標: ${primaryDetail.planetSymbol} ${fortuneData.location.name}
#ASTRAL_CITY #エニアグラム
https://astralcity.vercel.app`;
  };

  const handleCopyShare = () => {
    sound.playClick();
    const text = generateShareText();
    navigator.clipboard.writeText(text);
    setCopiedShare(true);
    setTimeout(() => setCopiedShare(false), 2500);
  };

  const handleOpenShareModal = () => {
    sound.playClick();
    setIsShareModalOpen(true);
  };

  // 行動ログのコピー
  const handleCopyLog = () => {
    sound.playClick();
    navigator.clipboard.writeText(actionLogFull);
    setCopiedLog(true);
    setTimeout(() => setCopiedLog(false), 2500);
  };

  // 画像保存 (html-to-image)
  const handleSaveImage = async () => {
    if (!captureRef.current) return;
    try {
      sound.playClick();
      setIsExportingImage(true);
      const dataUrl = await toPng(captureRef.current, {
        cacheBust: true,
        backgroundColor: '#020617',
        pixelRatio: 2,
      });
      const link = document.createElement('a');
      link.download = `astral_city_observation_T${primaryType}_${wingData.wingLabel}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error('Failed to export image', err);
    } finally {
      setIsExportingImage(false);
    }
  };

  // Find max score for relative bar progress
  const maxScore = Math.max(...Object.values(enneagramScores), 1);

  // Matrix categories
  const hornevianKeys: HornevianType[] = ['assertive', 'compliant', 'withdrawn'];
  const harmonicKeys: HarmonicType[] = ['positive', 'competent', 'reactive'];

  return (
    <div className="w-full max-w-4xl mx-auto px-4 py-8 relative z-10">
      {/* Breadcrumb Navigation */}
      <div className="mb-6 flex items-center justify-between text-xs font-mono-code text-slate-400 border-b border-slate-800/80 pb-3">
        <div className="flex items-center gap-2">
          <a
            href="https://mofu-mitsu.github.io/lab.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cyan-400 hover:text-cyan-300 transition-colors flex items-center gap-1"
          >
            <span>Niラボ</span>
            <span className="text-[10px] text-slate-500">↗</span>
          </a>
          <span className="text-slate-600">＞</span>
          <span className="text-slate-200 font-bold">ASTRAL CITY 観測結果</span>
        </div>
        <div className="text-[11px] text-slate-500">
          LOG ID: #{10000 + primaryType * 1111}
        </div>
      </div>

      {/* Main Exportable Container */}
      <div ref={captureRef} className="space-y-8 p-1 sm:p-2 rounded-3xl bg-transparent">
        {/* Top Result Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-slate-950/90 border border-slate-800 rounded-3xl p-6 sm:p-8 backdrop-blur-2xl shadow-2xl overflow-hidden"
        >
          {/* Ambient Glow */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 -mr-20 -mt-20"
            style={{ backgroundColor: hrInfo.color }}
          />
          <div
            className="absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl pointer-events-none opacity-20 -ml-20 -mb-20"
            style={{ backgroundColor: hmInfo.color }}
          />

          {/* Status Label */}
          <div className="flex flex-wrap items-center justify-between gap-3 mb-6 relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-cyan-500/30 text-cyan-300 text-xs font-mono-code shadow-sm">
              <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
              ASTRAL ORBIT COMPLETED {'//'} 観測完了
            </div>
            <div className="flex items-center gap-2 text-xs font-mono-code text-slate-400">
              <span>天体座標:</span>
              <span className="text-amber-300 font-bold">
                {primaryDetail.planetSymbol} {primaryDetail.planetName} ({fortuneData.location.name})
              </span>
            </div>
          </div>

          {/* Planet & Type Title Header */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mb-8 relative z-10">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-slate-900 border-2 border-cyan-400/50 flex items-center justify-center text-3xl sm:text-4xl shadow-xl shadow-cyan-950/50 flex-shrink-0">
                {primaryDetail.planetSymbol}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs sm:text-sm font-mono-code font-bold text-cyan-400 uppercase tracking-widest">
                    PRIMARY TYPE {primaryType}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-indigo-950/80 border border-indigo-500/40 text-indigo-300 font-mono-code font-bold text-xs">
                    WING: {wingData.wingLabel}
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-pink-950/80 border border-pink-500/40 text-pink-300 font-mono-code font-bold text-xs">
                    TRI: {tritypeData.code}
                  </span>
                </div>
                <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-100 font-sans-cyber tracking-tight">
                  {primaryDetail.title}
                </h1>
                <p className="text-xs sm:text-sm text-slate-400 mt-1 font-sans-cyber">
                  {primaryDetail.planetTitle} {'//'} {primaryDetail.starCoordinate}
                </p>
              </div>
            </div>

            {/* Triad Badges */}
            <div className="flex flex-col gap-2 w-full sm:w-auto">
              <div
                className="px-3.5 py-2 rounded-xl border flex items-center justify-between gap-3 text-xs"
                style={{
                  backgroundColor: hrInfo.bgGlow,
                  borderColor: hrInfo.color,
                }}
              >
                <span className="text-[10px] font-mono-code text-slate-400 uppercase">
                  対人スタンス
                </span>
                <span className="font-bold font-sans-cyber" style={{ color: hrInfo.color }}>
                  {hrInfo.name} ({hrInfo.starName})
                </span>
              </div>
              <div
                className="px-3.5 py-2 rounded-xl border flex items-center justify-between gap-3 text-xs"
                style={{
                  backgroundColor: hmInfo.bgGlow,
                  borderColor: hmInfo.color,
                }}
              >
                <span className="text-[10px] font-mono-code text-slate-400 uppercase">
                  対処戦略
                </span>
                <span className="font-bold font-sans-cyber" style={{ color: hmInfo.color }}>
                  {hmInfo.name} ({hmInfo.starName})
                </span>
              </div>
            </div>
          </div>

          {/* Explanation if Primary Type != Matrix Intersection Type */}
          {!isMatrixMatch && (
            <div className="p-4 sm:p-5 rounded-2xl bg-amber-950/30 border border-amber-500/40 text-xs sm:text-sm text-amber-100 font-sans-cyber leading-relaxed mb-6 relative z-10 backdrop-blur-md">
              <p className="font-semibold text-amber-200">
                「{hrInfo.name} × {hmInfo.name}」の傾向が強く観測されました。
              </p>
              <p className="mt-2 text-slate-100 font-medium">
                一方、総合判定では <strong className="text-cyan-300 font-bold font-mono-code text-sm">タイプ{primaryType}</strong>。
              </p>
              <p className="mt-2 text-slate-300 text-xs leading-relaxed">
                同じタイプでも、場面や問い方によって異なる側面が観測されることがあります。
              </p>
            </div>
          )}

          {/* Core Essence Text */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900/80 border border-slate-800 text-xs sm:text-sm text-slate-200 leading-relaxed font-sans-cyber mb-6 relative z-10">
            <span className="text-cyan-400 font-bold block mb-1 font-mono-code text-xs">
              {'// 魂の本質 (CORE ESSENCE)'}
            </span>
            {primaryDetail.essence}
          </div>

          {/* Grid: Strengths & Worldview */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 relative z-10">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xs font-mono-code text-emerald-400 font-bold mb-2 flex items-center gap-1.5">
                <span>✦</span>
                <span>天賦の引力・強み (Strengths)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans-cyber">
                {primaryDetail.strengths.map((str, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-emerald-400 mt-0.5">•</span>
                    <span>{str}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="text-xs font-mono-code text-rose-400 font-bold mb-2 flex items-center gap-1.5">
                <span>✦</span>
                <span>盲点・過剰な防衛 (Blindspots)</span>
              </div>
              <ul className="space-y-1.5 text-xs text-slate-300 font-sans-cyber">
                {primaryDetail.blindspots.map((bld, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-rose-400 mt-0.5">•</span>
                    <span>{bld}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Darling's Dialogue Card */}
          <div className="p-4 sm:p-5 rounded-2xl bg-purple-950/40 border border-pink-500/30 flex items-start gap-3.5 relative z-10">
            <div className="w-10 h-10 rounded-xl bg-pink-950/80 border border-pink-500/40 flex items-center justify-center text-xl flex-shrink-0 shadow-md">
              🥺
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-bold text-pink-300">ダーリンちゃん</span>
                <span className="text-[10px] font-mono-code text-pink-400/70">
                  ILI 5w4 / 観測コメント
                </span>
              </div>
              <p className="text-xs sm:text-sm text-pink-100 font-sans-cyber leading-relaxed">
                {primaryDetail.darlingComment}
              </p>
            </div>
          </div>
        </motion.div>

        {/* SECTION: Visualizations (Star Chart & Enneagram Bar Chart) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Star Chart (5 cols) */}
          <div className="lg:col-span-5 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl flex flex-col items-center justify-between">
            <div className="w-full text-left mb-2">
              <div className="text-xs font-mono-code text-cyan-400 font-bold mb-0.5">
                ✦ CONSTELLATION GRAPH
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-200 font-sans-cyber">
                エニアグラム幾何学・星間チャート
              </h2>
              <p className="text-[11px] text-slate-400 font-sans-cyber mt-0.5">
                9つの天体ノードと、あなたの引力で結ばれたパーソナル星座（上位三角）
              </p>
            </div>

            <div className="my-auto py-2">
              <EnneagramStarChart
                scores={enneagramScores}
                primaryType={primaryType}
                matrixType={matrixType}
              />
            </div>

            <div className="w-full text-[10px] font-mono-code text-slate-400 text-center pt-2 border-t border-slate-800/80">
              TRI-TYPE: {tritypeData.code} (本能:T{tritypeData.gut.type} / 感情:T{tritypeData.heart.type} / 思考:T{tritypeData.head.type})
            </div>
          </div>

          {/* Bar Chart (7 cols) */}
          <div className="lg:col-span-7 bg-slate-950/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="text-xs font-mono-code text-pink-400 font-bold mb-0.5">
                  ✦ ENNEAGRAM STRENGTH BAR
                </div>
                <h2 className="text-sm sm:text-base font-bold text-slate-200 font-sans-cyber">
                  9タイプの引力強度（スコア一覧）
                </h2>
              </div>
              <span className="text-[10px] font-mono-code text-slate-400 bg-slate-900 px-2 py-1 rounded border border-slate-800">
                MAX: {maxScore} pt
              </span>
            </div>

            <div className="space-y-2.5">
              {([1, 2, 3, 4, 5, 6, 7, 8, 9] as EnneagramType[]).map((t) => {
                const score = enneagramScores[t] || 0;
                const percent = Math.round((score / maxScore) * 100);
                const isPrimary = t === primaryType;
                const isMatrix = t === matrixType && !isPrimary;
                const isTop3 = sortedTypes.slice(0, 3).includes(t);
                const detail = TYPE_DETAILS[t];

                return (
                  <div key={t} className="space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono-code">
                      <div className="flex items-center gap-2">
                        <span
                          className={`w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold ${
                            isPrimary
                              ? 'bg-cyan-400 text-slate-950'
                              : isMatrix
                              ? 'bg-amber-400 text-slate-950'
                              : isTop3
                              ? 'bg-rose-500 text-white'
                              : 'bg-slate-800 text-slate-400'
                          }`}
                        >
                          {t}
                        </span>
                        <span
                          className={`font-sans-cyber ${
                            isPrimary
                              ? 'text-cyan-300 font-bold'
                              : isMatrix
                              ? 'text-amber-300 font-bold'
                              : 'text-slate-300'
                          }`}
                        >
                          {detail.title}
                        </span>
                        {isPrimary && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40">
                            PRIMARY 主星
                          </span>
                        )}
                        {isMatrix && (
                          <span className="text-[9px] px-1.5 py-0.2 rounded bg-amber-950 text-amber-300 border border-amber-500/40">
                            MATRIX 交差点
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-slate-400 text-[11px]">{score} pt</span>
                        <span className="text-slate-500 text-[10px] w-8 text-right">
                          {percent}%
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="w-full h-2 rounded-full bg-slate-900 overflow-hidden border border-slate-800/80">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className={`h-full rounded-full ${
                          isPrimary
                            ? 'bg-gradient-to-r from-cyan-400 to-sky-400 shadow-sm shadow-cyan-400/50'
                            : isMatrix
                            ? 'bg-gradient-to-r from-amber-400 to-orange-400 shadow-sm shadow-amber-400/30'
                            : isTop3
                            ? 'bg-gradient-to-r from-rose-500 to-pink-500'
                            : 'bg-slate-700'
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* SECTION: Hornevian × Harmonic Intersection Matrix Table */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="text-xs font-mono-code text-cyan-400 font-bold mb-0.5">
                ✦ HORNEVIAN × HARMONIC MATRIX
              </div>
              <h2 className="text-sm sm:text-base font-bold text-slate-200 font-sans-cyber">
                あなたの現在地：ホーナイ × ハーモニクス交差点
              </h2>
            </div>
            <button
              onClick={onOpenMatrixModal}
              className="text-xs font-mono-code text-cyan-400 hover:text-cyan-300 underline underline-offset-4"
            >
              9タイプ全解説を見る →
            </button>
          </div>

          <div className="w-full overflow-x-auto [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
            <table className="w-full text-left border-collapse min-w-[480px] sm:min-w-full">
              <thead>
                <tr>
                  <th className="p-2.5 sm:p-3 text-[10px] sm:text-[11px] font-mono-code text-slate-500 border border-slate-800 bg-slate-900/60 w-1/4">
                    対人姿勢 ＼ 対処戦略
                  </th>
                  {harmonicKeys.map((hmKey) => {
                    const hm = HARMONIC_DATA[hmKey];
                    return (
                      <th
                        key={hmKey}
                        className="p-2 sm:p-3 text-[11px] sm:text-xs font-mono-code font-bold border border-slate-800 bg-slate-900/80 w-1/4 text-center"
                        style={{ color: hm.color }}
                      >
                        {hm.name}
                        <div className="text-[9px] sm:text-[10px] text-slate-500 font-normal">
                          {hm.strategy}
                        </div>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {hornevianKeys.map((hrKey) => {
                  const hr = HORNEVIAN_DATA[hrKey];
                  return (
                    <tr key={hrKey}>
                      <td
                        className="p-2 sm:p-3 text-[11px] sm:text-xs font-mono-code font-bold border border-slate-800 bg-slate-900/60"
                        style={{ color: hr.color }}
                      >
                        {hr.name}
                        <div className="text-[9px] sm:text-[10px] text-slate-500 font-normal">
                          {hr.stance}
                        </div>
                      </td>

                      {harmonicKeys.map((hmKey) => {
                        const targetType = MATRIX_TYPE_MAP[hrKey][hmKey];
                        const isCurrentPosition =
                          hrKey === hornevian && hmKey === harmonic;
                        const isUserPrimaryType = targetType === primaryType;
                        const detail = TYPE_DETAILS[targetType];

                        return (
                          <td
                            key={hmKey}
                            className={`p-2.5 sm:p-3 border border-slate-800 transition-all text-center relative ${
                              isCurrentPosition
                                ? 'bg-cyan-950/80 border-cyan-400 shadow-inner'
                                : isUserPrimaryType
                                ? 'bg-indigo-950/50 border-indigo-500/60'
                                : 'bg-slate-950/50 hover:bg-slate-900/50'
                            }`}
                          >
                            {isCurrentPosition && (
                              <div className="text-[9px] font-mono-code font-bold text-cyan-300 mb-1 animate-pulse">
                                🌟 YOUR POSITION
                              </div>
                            )}
                            {isUserPrimaryType && !isCurrentPosition && (
                              <div className="text-[9px] font-mono-code font-bold text-indigo-300 mb-1">
                                ✦ PRIMARY STAR
                              </div>
                            )}
                            <div className="text-[11px] sm:text-xs font-bold text-slate-100 font-sans-cyber flex items-center justify-center gap-1">
                              <span className="text-amber-300 font-mono-code">
                                {detail.planetSymbol}
                              </span>
                              <span>TYPE {targetType}</span>
                            </div>
                            <div className="text-[10px] sm:text-[11px] text-slate-400 font-sans-cyber mt-0.5">
                              {detail.title}
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
        </div>

        {/* SECTION: Cosmic Daily Signals */}
        <div className="bg-slate-950/90 border border-slate-800 rounded-3xl p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 text-xs font-mono-code text-cyan-400 font-bold mb-3">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
            TODAY&apos;S COSMIC EPHEMERIS // 今日の観測シグナル
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-sans-cyber">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono-code text-slate-500 block mb-1">
                COSMIC SIGNAL
              </span>
              <p className="text-slate-200 leading-relaxed italic">
                {fortuneData.signal}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono-code text-slate-500 block mb-1">
                SUGGESTED LOCATION
              </span>
              <div className="font-bold text-amber-300 mb-0.5">
                {fortuneData.location.name}
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {fortuneData.location.desc}
              </p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800">
              <span className="text-[10px] font-mono-code text-slate-500 block mb-1">
                SECRET STAR & MOON
              </span>
              <div className="font-bold text-pink-300 mb-0.5">
                {fortuneData.moonPhase.phase}
              </div>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                {fortuneData.moonPhase.meaning}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Action Toolbar (Share / Image / Log Copy / Retest) */}
      {/* Action Toolbar (Share / Image / Log Copy / Spreadsheet / Retest) */}
      <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
        {/* Left side actions */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Share Navigation Modal */}
          <button
            onClick={handleOpenShareModal}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono-code text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>🧭 ナビゲーション共有</span>
          </button>

          {/* Copy Share Text */}
          <button
            onClick={handleCopyShare}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono-code text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>{copiedShare ? '✓ コピー完了' : '📋 共有文コピー'}</span>
          </button>

          {/* Save Image */}
          <button
            onClick={handleSaveImage}
            disabled={isExportingImage}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono-code text-xs flex items-center gap-2 transition-all cursor-pointer disabled:opacity-50"
          >
            <span>{isExportingImage ? '📸 生成中...' : '💾 画像保存'}</span>
          </button>

          {/* Copy Action Log */}
          <button
            onClick={handleCopyLog}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-mono-code text-xs flex items-center gap-2 transition-all cursor-pointer"
          >
            <span>{copiedLog ? '✓ ログコピー完了' : '📜 行動ログコピー'}</span>
          </button>
        </div>

        {/* Right side: Restart button */}
        <button
          onClick={() => {
            sound.playClick();
            onReset();
          }}
          className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 via-indigo-500 to-pink-500 hover:from-cyan-400 hover:to-pink-400 text-slate-950 font-extrabold text-xs sm:text-sm font-sans-cyber shadow-lg shadow-cyan-500/25 transition-all cursor-pointer"
        >
          🔄 もう一度観測する
        </button>
      </div>

      {/* Share Navigation Modal */}
      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        shareText={generateShareText()}
      />
    </div>
  );
}
