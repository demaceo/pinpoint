import React, { useEffect, useState, useRef } from "react";

// Config Vars
const fadeInOut = true;
const animationDuration = 4000;
const animationSpeed = 1000;
const fontSize = 50;
const numKeyframes = 20;

const text = `
Welcome to Pinpoint`.replace(/\n/i, "");

interface LetterProps {
  x: number;
  y: number;
  char: string;
  fontHeight: number;
  animationSpeed: number;
  animationStart: number;
  animate: "in" | "out";
}

const Letter: React.FC<LetterProps> = ({
  x,
  y,
  char,
  fontHeight,
  animationSpeed,
  animationStart,
  animate,
}) => {
  const letterRef = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);
  const [fadeState, setFadeState] = useState<"in" | "out">("in");

  useEffect(() => {
    const handleFade = (state: "in" | "out") => {
      setTimeout(() => {
        setFadeState(state);
        setVisible(state === "in");
      }, animationStart + Math.random() * animationSpeed);
    };

    if (animate === "in") {
      handleFade("in");
    } else {
      handleFade("out");
    }
  }, [animate, animationSpeed, animationStart]);

  if (!visible) return null;

  return (
    <div
      ref={letterRef}
      className="letter"
      style={{
        fontSize: fontHeight,
        height: fontHeight,
        width: fontHeight / 2,
        left: x,
        top: y,
        animation: `${fadeState}-${Math.floor(
          Math.random() * numKeyframes + 1
        )} ${animationSpeed}ms forwards`,
      }}
    >
      {char}
    </div>
  );
};

interface RandomTextProps {
  text: string;
  width: number;
  fontHeight: number;
  animate: "in" | "out";
  animationDuration: number;
  animationSpeed: number;
}

const RandomText: React.FC<RandomTextProps> = ({
  text,
  width,
  fontHeight,
  animate,
  animationDuration,
  animationSpeed,
}) => {
  const [chars, setChars] = useState<{ x: number; y: number; char: string }[]>(
    []
  );

  useEffect(() => {
    const generateChars = () => {
      const fontWidth = fontHeight / 2;
      const charsPerRow = Math.floor(width / fontWidth);
      return text.split("").map((char, i) => ({
        x: (i % charsPerRow) * fontWidth,
        y: Math.floor(i / charsPerRow) * fontHeight,
        char,
      }));
    };

    setChars(generateChars());
  }, [text, width, fontHeight]);

  return (
    <div className="container" style={{ width }}>
      {chars.map((charData, i) => (
        <Letter
          key={i}
          x={charData.x}
          y={charData.y}
          char={charData.char}
          fontHeight={fontHeight}
          animate={animate}
          animationSpeed={animationSpeed}
          animationStart={
            ((animationDuration - animationSpeed) / text.length) * i
          }
        />
      ))}
    </div>
  );
};

const RandomLetter: React.FC = () => {
  const [animate, setAnimate] = useState<"in" | "out">("in");
  const [width, setWidth] = useState(window.innerWidth * 0.6);

  useEffect(() => {
    if (fadeInOut) {
      const interval = setInterval(() => {
        setAnimate((prev) => (prev === "in" ? "out" : "in"));
      }, animationDuration + 5000);
      return () => clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth * 0.6);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <RandomText
      width={width}
      text={text}
      fontHeight={fontSize}
      animate={animate}
      animationDuration={animationDuration}
      animationSpeed={animationSpeed}
    />
  );
};

export default RandomLetter;
