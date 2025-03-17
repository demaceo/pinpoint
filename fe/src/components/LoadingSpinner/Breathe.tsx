import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import "./Breathe.css";
import {
  Point,
  CrestProps,
  NucleusProps,
  CanvasProps,
} from "../../assets/types";

const Crest: React.FC<CrestProps> = ({
  count,
  circleSize,
  radius,
  center,
  offset,
  delay,
  fill,
}) => {
  const refs = useRef<(SVGCircleElement | null)[]>([]);

  useEffect(() => {
    const offsetToC = offsetTo(center);
    const theta = (2 * Math.PI) / count;
    const delta = offset ? theta / 2 : 0;

    refs.current.forEach((circle, idx) => {
      if (!circle) return;

      const start = getLocation(theta, delta, idx, radius, offsetToC);
      const end = getLocation(theta, delta, idx, radius * 0.5, offsetToC);

      gsap.fromTo(
        circle,
        { attr: { r: circleSize, cx: start.x, cy: start.y } },
        {
          attr: { r: circleSize / 8, cx: end.x, cy: end.y },
          ease: "sine.inOut",
          delay,
          yoyo: true,
          repeat: -1,
          duration: 1,
        }
      );
    });
  }, [count, circleSize, radius, center, offset, delay]);

  return (
    <g className="crest-container">
      {Array.from({ length: count }).map((_, idx) => {
        const l = getLocation(
          (2 * Math.PI) / count,
          offset ? Math.PI / count : 0,
          idx,
          radius,
          offsetTo(center)
        );
        return (
          <circle
            key={idx}
            ref={(el) => {
              refs.current[idx] = el;
            }}
            cx={l.x}
            cy={l.y}
            r={circleSize}
            fill={fill}
            strokeWidth={circleSize * 0.2}
          />
        );
      })}
    </g>
  );
};

const Nucleus: React.FC<NucleusProps> = ({ x, y, r, fill }) => {
  const circleRef = useRef<SVGCircleElement | null>(null);

  useEffect(() => {
    if (!circleRef.current) return;

    gsap.fromTo(
      circleRef.current,
      { attr: { r } },
      {
        attr: { r: r / 8 },
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
        duration: 1,
      }
    );
  }, [r]);

  return <circle className="nucleus-container" ref={circleRef} cx={x} cy={y} r={r} fill={fill} />;
};

const Canvas: React.FC<CanvasProps> = ({
  w,
  h,
  children,
}) => {
  return (
    <svg
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${w} ${h}`}
      className="canvas-container"
    >
      {children}
    </svg>
  );
};

const offsetTo =
  (center: Point) =>
  ({ x, y }: Point) => ({
    x: center.x + x,
    y: center.y - y,
  });

const polarToCartesian = (
  theta: number,
  r: number,
  offsetToC: (p: Point) => Point
) => {
  return offsetToC({ x: r * Math.cos(theta), y: r * Math.sin(theta) });
};

const getLocation = (
  theta: number,
  delta: number,
  idx: number,
  r: number,
  offsetToC: (p: Point) => Point
) => {
  return polarToCartesian(delta + theta * idx, r, offsetToC);
};

const Breathe: React.FC = () => {
  const s = 200;
  const center = { x: s / 2, y: s / 2 };
  const circleSize = 3;
  const amp = 12;
  const crests = [
    { count: 8, offset: false },
    { count: 16, offset: false },
    { count: 16, offset: true },
    { count: 16, offset: false },
    { count: 16, offset: true },
    { count: 16, offset: false },
  ];

  return (
    <div className="breathe-container">
      <a
        className="breathe-text"
        href="https://github.com/winkerVSbecks/splash"
        target="_blank"
      >
        Loading...
      </a>
      <Canvas w={s} h={s} >
        <Nucleus x={center.x} y={center.y} r={circleSize} />
        {crests.map(({ count, offset }, idx) => (
          <Crest
            key={idx}
            count={count}
            circleSize={circleSize}
            radius={amp + amp * idx}
            center={center}
            offset={offset}
            delay={(0.8 * (idx + 1)) / crests.length}
          />
        ))}
      </Canvas>
    </div>
  );
};

export default Breathe;
