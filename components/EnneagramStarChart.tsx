'use client';

import React from 'react';
import { EnneagramType, TYPE_DETAILS } from '@/lib/enneagram-data';

interface EnneagramStarChartProps {
  scores: Record<EnneagramType, number>;
  primaryType: EnneagramType;
  matrixType?: EnneagramType;
}

export default function EnneagramStarChart({
  scores,
  primaryType,
  matrixType,
}: EnneagramStarChartProps) {
  // Center is (150, 150), radius = 105
  const cx = 150;
  const cy = 150;
  const r = 105;

  // Enneagram circle angles: 9 is at top (-90 deg), going clockwise
  // Order: 9, 1, 2, 3, 4, 5, 6, 7, 8
  const typeOrder: EnneagramType[] = [9, 1, 2, 3, 4, 5, 6, 7, 8];

  const nodeCoordinates: Record<EnneagramType, { x: number; y: number }> = {
    9: { x: cx, y: cy - r },
    1: { x: cx + r * Math.sin((40 * Math.PI) / 180), y: cy - r * Math.cos((40 * Math.PI) / 180) },
    2: { x: cx + r * Math.sin((80 * Math.PI) / 180), y: cy - r * Math.cos((80 * Math.PI) / 180) },
    3: { x: cx + r * Math.sin((120 * Math.PI) / 180), y: cy - r * Math.cos((120 * Math.PI) / 180) },
    4: { x: cx + r * Math.sin((160 * Math.PI) / 180), y: cy - r * Math.cos((160 * Math.PI) / 180) },
    5: { x: cx + r * Math.sin((200 * Math.PI) / 180), y: cy - r * Math.cos((200 * Math.PI) / 180) },
    6: { x: cx + r * Math.sin((240 * Math.PI) / 180), y: cy - r * Math.cos((240 * Math.PI) / 180) },
    7: { x: cx + r * Math.sin((280 * Math.PI) / 180), y: cy - r * Math.cos((280 * Math.PI) / 180) },
    8: { x: cx + r * Math.sin((320 * Math.PI) / 180), y: cy - r * Math.cos((320 * Math.PI) / 180) },
  };

  // Classical Enneagram lines:
  // 1. Triangle 3-6-9
  const trianglePath = `M ${nodeCoordinates[9].x} ${nodeCoordinates[9].y} L ${nodeCoordinates[3].x} ${nodeCoordinates[3].y} L ${nodeCoordinates[6].x} ${nodeCoordinates[6].y} Z`;

  // 2. Hexad 1-4-2-8-5-7-1
  const hexadPath = `M ${nodeCoordinates[1].x} ${nodeCoordinates[1].y} L ${nodeCoordinates[4].x} ${nodeCoordinates[4].y} L ${nodeCoordinates[2].x} ${nodeCoordinates[2].y} L ${nodeCoordinates[8].x} ${nodeCoordinates[8].y} L ${nodeCoordinates[5].x} ${nodeCoordinates[5].y} L ${nodeCoordinates[7].x} ${nodeCoordinates[7].y} Z`;

  // Find max score for normalization
  const maxScore = Math.max(...Object.values(scores), 1);

  // Top 3 types (Tri-type)
  const sortedTypes = (Object.keys(scores) as unknown as EnneagramType[]).sort(
    (a, b) => (scores[b] || 0) - (scores[a] || 0)
  );
  const top3 = sortedTypes.slice(0, 3);

  // Personal user constellation polygon points (scaled from center)
  const polygonPoints = typeOrder
    .map((t) => {
      const score = scores[t] || 0;
      // Normalized radius from 0.25 to 1.0
      const scale = 0.25 + (score / maxScore) * 0.75;
      const angleDeg =
        t === 9 ? -90 : -90 + (t <= 4 ? t * 40 : t * 40); // exact angles mapped to nodeCoordinates
      const targetCoord = nodeCoordinates[t];
      const px = cx + (targetCoord.x - cx) * scale;
      const py = cy + (targetCoord.y - cy) * scale;
      return `${px},${py}`;
    })
    .join(' ');

  // Top 3 triangle path (User's primary triangle constellation)
  const top3Triangle =
    top3.length === 3
      ? `M ${nodeCoordinates[top3[0]].x} ${nodeCoordinates[top3[0]].y} L ${nodeCoordinates[top3[1]].x} ${nodeCoordinates[top3[1]].y} L ${nodeCoordinates[top3[2]].x} ${nodeCoordinates[top3[2]].y} Z`
      : '';

  return (
    <div className="flex flex-col items-center">
      <div className="relative w-72 h-72 sm:w-80 sm:h-80 select-none">
        <svg viewBox="0 0 300 300" className="w-full h-full filter drop-shadow-xl">
          <defs>
            <linearGradient id="astroGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.45" />
              <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.45" />
            </linearGradient>

            <radialGradient id="centerNebula" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.25" />
              <stop offset="70%" stopColor="#3b82f6" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#020617" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Background Ambient Circle */}
          <circle cx={cx} cy={cy} r={r + 14} fill="url(#centerNebula)" />
          <circle
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
            strokeDasharray="3 3"
          />

          {/* Standard Enneagram Geometry 1: Hexad (1-4-2-8-5-7) */}
          <path
            d={hexadPath}
            fill="none"
            stroke="#334155"
            strokeWidth="1.2"
            strokeDasharray="2 2"
            opacity="0.8"
          />

          {/* Standard Enneagram Geometry 2: Triangle (3-6-9) */}
          <path
            d={trianglePath}
            fill="none"
            stroke="#475569"
            strokeWidth="1.2"
            strokeDasharray="4 2"
            opacity="0.9"
          />

          {/* User's Scaled Constellation Polygon */}
          <polygon
            points={polygonPoints}
            fill="url(#astroGlow)"
            stroke="#38bdf8"
            strokeWidth="1.8"
            className="transition-all duration-700 ease-out"
          />

          {/* User's Top 3 Star Triangle (Triad Link) */}
          {top3Triangle && (
            <path
              d={top3Triangle}
              fill="rgba(244, 63, 94, 0.12)"
              stroke="#f43f5e"
              strokeWidth="2.2"
              strokeDasharray="none"
              className="animate-pulse"
            />
          )}

          {/* Enneagram Nodes */}
          {typeOrder.map((t) => {
            const coord = nodeCoordinates[t];
            const isPrimary = t === primaryType;
            const isMatrix = matrixType && t === matrixType && matrixType !== primaryType;
            const isTop3 = top3.includes(t);
            const score = scores[t] || 0;
            const detail = TYPE_DETAILS[t];

            return (
              <g key={t} className="cursor-pointer group">
                {/* Node Outer Halo for Primary or Top 3 */}
                {isPrimary && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="16"
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth="1.5"
                    strokeDasharray="2 2"
                    className="animate-spin origin-center"
                    style={{ transformOrigin: `${coord.x}px ${coord.y}px` }}
                  />
                )}

                {/* Node Outer Halo for Matrix type if different */}
                {isMatrix && (
                  <circle
                    cx={coord.x}
                    cy={coord.y}
                    r="15"
                    fill="none"
                    stroke="#fbbf24"
                    strokeWidth="1.5"
                    strokeDasharray="3 2"
                  />
                )}

                {/* Node Circle */}
                <circle
                  cx={coord.x}
                  cy={coord.y}
                  r={isPrimary ? 11 : isMatrix ? 10 : isTop3 ? 9 : 7}
                  fill={isPrimary ? '#38bdf8' : isMatrix ? '#f59e0b' : isTop3 ? '#f43f5e' : '#0f172a'}
                  stroke={isPrimary ? '#e0f2fe' : isMatrix ? '#fde68a' : isTop3 ? '#fda4af' : '#475569'}
                  strokeWidth={isPrimary || isMatrix ? 2.5 : 1.5}
                  className="transition-transform group-hover:scale-125"
                />

                {/* Node Label (Number & Symbol) */}
                <text
                  x={coord.x}
                  y={coord.y + (isPrimary ? 3.5 : 3)}
                  textAnchor="middle"
                  fill={isPrimary || isMatrix || isTop3 ? '#020617' : '#94a3b8'}
                  fontSize={isPrimary ? '10' : '9'}
                  fontWeight="bold"
                  fontFamily="monospace"
                >
                  {t}
                </text>

                {/* Planet Symbol outside */}
                <text
                  x={coord.x + (coord.x - cx) * 0.22}
                  y={coord.y + (coord.y - cy) * 0.22 + 3}
                  textAnchor="middle"
                  fill={isPrimary ? '#38bdf8' : isMatrix ? '#fbbf24' : '#64748b'}
                  fontSize="9"
                  fontFamily="monospace"
                >
                  {detail.planetSymbol}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Legend below the chart */}
      <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-[10px] sm:text-xs font-mono-code text-slate-400 mt-2">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 border border-white" />
          <span>主星 (TYPE {primaryType})</span>
        </div>
        {matrixType && matrixType !== primaryType && (
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400 border border-amber-200" />
            <span>交差点星 (TYPE {matrixType})</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500 border border-rose-300" />
          <span>上位三角 (TOP 3)</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-4 h-0.5 bg-slate-600 border-dashed" />
          <span>幾何構造</span>
        </div>
      </div>
    </div>
  );
}
