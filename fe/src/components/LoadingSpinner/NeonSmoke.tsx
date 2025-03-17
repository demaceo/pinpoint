import React, { useEffect, useRef } from "react";
import './NeonSmoke.css'

// Utility Functions
const randomRange = (min: number, max: number) =>
  min + Math.random() * (max - min);

const animation = () => {
  let id: number;
  return (fn: () => { update: (frameId: number) => void }) => {
    if (id) cancelAnimationFrame(id);
    id = requestAnimationFrame(function animateFrame() {
      fn().update(id);
      id = requestAnimationFrame(animateFrame);
    });
  };
};

const generatePath = (width: number, height: number) => {
  const partitions = Math.floor(randomRange(3, 5));
  const partSize = width / partitions;
  const positionVectors = [];

  for (let i = 0; i <= partitions; i++) {
    positionVectors.push({
      dx: randomRange(-partSize * i, partSize * i),
      dy: randomRange(-partSize, partSize),
      x: (i * partSize + randomRange(-partSize / 8, partSize / 8)).toFixed(0),
      y: (height / 2 + randomRange(-1, 1)).toFixed(0),
    });
  }

  return positionVectors.reduce(
    (path, v, idx) =>
      idx === 0
        ? `M${v.x},${v.y}`
        : idx === 1
        ? `${path} Q${v.dx},${v.dy},${v.x},${v.y}`
        : `${path} T${v.x},${v.y}`,
    ""
  );
};

class Curve {
  path: string;
  scale: { x: number; y: number };
  alpha: number;
  hue: number;
  translate: { tx: number; ty: number };
  translateRange: { rx: number; ry: number };
  t: number;
  tIncrement: number;
  alphaOffset: number;
  alphaSpeed: number;
  color: { h: number; s: number; l: number };

  constructor(
    color: { h: number; s: number; l: number },
    width: number,
    height: number
  ) {
    this.color = color;
    this.path = generatePath(width, height);
    this.scale = { x: randomRange(-1, 1), y: randomRange(-1, 1) };
    this.alpha = 0;
    this.hue = color.h;
    this.translate = { tx: randomRange(-0.2, 0.5), ty: randomRange(-0.2, 0.5) };
    this.translateRange = {
      rx: randomRange(-0.5, 0.5),
      ry: randomRange(-0.5, 0.5),
    };
    this.t = 0;
    this.tIncrement = randomRange(0.0001, 0.00001);
    this.alphaOffset = randomRange(0.2, 0.8);
    this.alphaSpeed = randomRange(400, 1000);
  }

  getColorString() {
    return `hsla(${this.hue}deg, ${this.color.s}%, ${this.color.l}%, ${this.alpha})`;
  }

  update() {
    this.t += this.tIncrement;
    this.alpha =
      this.alphaOffset * Math.sin(this.t * this.alphaSpeed + 0.1) ** 2;

    if (this.alpha < 0.001) {
      this.hue = this.color.h;
      this.path = generatePath(window.innerWidth, window.innerHeight);
      this.alphaOffset = randomRange(0.1, 0.6);
      this.alphaSpeed = randomRange(300, 1000);
    }

    return this;
  }

  draw(ctx: CanvasRenderingContext2D, width: number, height: number) {
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = this.getColorString();
    ctx.translate(width / 2, height / 2);
    ctx.scale(this.scale.x, this.scale.y);
    ctx.stroke(new Path2D(this.path));
    ctx.restore();
  }
}

const NeonSmoke: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    window.addEventListener("resize", resize);

    const curves: Curve[] = Array.from(
      { length: 30 },
      () => new Curve({ h: 340, s: 100, l: 50 }, width, height)
    );

    const fader = () => {
      const gradient = ctx.createRadialGradient(
        width / 2,
        height / 2,
        0,
        width / 2,
        height / 2,
        Math.max(width / 2, height / 2)
      );
      gradient.addColorStop(0, `hsla(220deg, 35%, 15%, 0.2)`);
      gradient.addColorStop(1, `hsla(220deg, 35%, 15%, 0.02)`);
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);
    };

    const animator = animation();
    animator(() => ({
      update: (frameId) => {
        if (!(frameId % 4)) fader();
        curves.forEach((curve) => curve.update().draw(ctx, width, height));
      },
    }));

    return () => window.removeEventListener("resize", resize);
  }, []);

  return (
    <div className="neon-smoke-container">
      <canvas ref={canvasRef}></canvas>
      <h1>
        neon smok<span className="last">e</span>
      </h1>
    </div>
  );
};

export default NeonSmoke;
