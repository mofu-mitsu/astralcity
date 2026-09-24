'use client';

import React, { useEffect, useRef } from 'react';

interface StarfieldCanvasProps {
  intensity?: 'normal' | 'vibrant' | 'hyper';
}

export default function StarfieldCanvas({ intensity = 'normal' }: StarfieldCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    window.addEventListener('resize', handleResize);

    interface Star {
      x: number;
      y: number;
      size: number;
      alpha: number;
      speed: number;
      color: string;
      twinkleSpeed: number;
    }

    interface ShootingStar {
      x: number;
      y: number;
      length: number;
      speed: number;
      angle: number;
      life: number;
      maxLife: number;
    }

    let stars: Star[] = [];
    let shootingStars: ShootingStar[] = [];

    const starColors = [
      '#e0f2fe', // sky-100
      '#bae6fd', // sky-200
      '#fbcfe8', // pink-200
      '#ddd6fe', // purple-200
      '#fef08a', // yellow-200
      '#ffffff',
    ];

    const initStars = () => {
      const starCount = Math.floor((width * height) / 3200);
      stars = [];
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size: Math.random() * 1.8 + 0.5,
          alpha: Math.random() * 0.8 + 0.2,
          speed: Math.random() * 0.05 + 0.02,
          color: starColors[Math.floor(Math.random() * starColors.length)],
          twinkleSpeed: Math.random() * 0.02 + 0.008,
        });
      }
    };

    initStars();

    const spawnShootingStar = () => {
      if (Math.random() < 0.015 && shootingStars.length < 3) {
        shootingStars.push({
          x: Math.random() * width,
          y: Math.random() * (height * 0.6),
          length: Math.random() * 80 + 40,
          speed: Math.random() * 7 + 6,
          angle: (Math.PI / 4) + (Math.random() * 0.2 - 0.1),
          life: 0,
          maxLife: 40,
        });
      }
    };

    let tick = 0;

    const render = () => {
      tick++;
      ctx.clearRect(0, 0, width, height);

      // Deep space gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 0, height);
      bgGrad.addColorStop(0, '#050711');
      bgGrad.addColorStop(0.5, '#090d20');
      bgGrad.addColorStop(0.85, '#0c102a');
      bgGrad.addColorStop(1, '#050814');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant cosmic nebulae
      const nebula1 = ctx.createRadialGradient(
        width * 0.2,
        height * 0.25,
        20,
        width * 0.2,
        height * 0.25,
        width * 0.45
      );
      nebula1.addColorStop(0, 'rgba(168, 85, 247, 0.08)');
      nebula1.addColorStop(0.6, 'rgba(56, 189, 248, 0.04)');
      nebula1.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula1;
      ctx.fillRect(0, 0, width, height);

      const nebula2 = ctx.createRadialGradient(
        width * 0.8,
        height * 0.4,
        30,
        width * 0.8,
        height * 0.4,
        width * 0.5
      );
      nebula2.addColorStop(0, 'rgba(244, 63, 94, 0.06)');
      nebula2.addColorStop(0.5, 'rgba(251, 191, 36, 0.03)');
      nebula2.addColorStop(1, 'transparent');
      ctx.fillStyle = nebula2;
      ctx.fillRect(0, 0, width, height);

      // Draw faint celestial orbital rings in background
      ctx.save();
      ctx.translate(width * 0.5, height * 0.45);
      ctx.rotate(tick * 0.0003);

      ctx.strokeStyle = 'rgba(56, 189, 248, 0.04)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.38, height * 0.28, 0, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = 'rgba(168, 85, 247, 0.03)';
      ctx.beginPath();
      ctx.ellipse(0, 0, width * 0.5, height * 0.36, Math.PI / 8, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Render stars
      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.alpha += Math.sin(tick * s.twinkleSpeed) * 0.015;
        if (s.alpha < 0.15) s.alpha = 0.15;
        if (s.alpha > 0.95) s.alpha = 0.95;

        ctx.fillStyle = s.color;
        ctx.globalAlpha = s.alpha;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      // Shooting stars
      spawnShootingStar();
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const ss = shootingStars[i];
        ss.life++;
        ss.x += Math.cos(ss.angle) * ss.speed;
        ss.y += Math.sin(ss.angle) * ss.speed;

        const tailX = ss.x - Math.cos(ss.angle) * ss.length;
        const tailY = ss.y - Math.sin(ss.angle) * ss.length;

        const grad = ctx.createLinearGradient(tailX, tailY, ss.x, ss.y);
        grad.addColorStop(0, 'transparent');
        grad.addColorStop(1, 'rgba(255, 255, 255, 0.9)');

        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(tailX, tailY);
        ctx.lineTo(ss.x, ss.y);
        ctx.stroke();

        if (ss.life >= ss.maxLife || ss.x > width + 100 || ss.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      // City skyline silhouette at bottom
      const cityY = height * 0.92;
      ctx.fillStyle = '#03050c';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(0, cityY);

      // Building steps
      const segmentWidth = 32;
      const count = Math.ceil(width / segmentWidth);
      for (let i = 0; i < count; i++) {
        const bx = i * segmentWidth;
        const seed = Math.sin(i * 99.7) * 20;
        const bHeight = cityY + seed - 15;
        ctx.lineTo(bx, bHeight);
        ctx.lineTo(bx + segmentWidth, bHeight);
      }
      ctx.lineTo(width, cityY);
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fill();

      // Cyber glow horizon line
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.18)';
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(0, height * 0.92);
      ctx.lineTo(width, height * 0.92);
      ctx.stroke();

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
