import React, { useEffect, useState } from "react";
import "./AnimatedText.css";
import { LetterProps, TextProps, AnimatedTextProps } from "../../assets/types";

const Letter: React.FC<LetterProps> = ({ char, animationDelay, fontSize }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(true);
    }, animationDelay);

    return () => clearTimeout(timer);
  }, [animationDelay]);

  return (
    <span
      className={`letter ${char === " " ? "space" : ""}`}
      style={{
        fontSize,
        opacity: visible ? 1 : 0,
        filter: visible ? "blur(0px)" : "blur(8px)",
        transition: "opacity 0.5s ease-in, filter 0.5s ease-in",
      }}
    >
      {char}
    </span>
  );
};

const RandomText: React.FC<TextProps> = ({
  text,
  animationSpeed,
  fontSize,
}) => {
  return (
    <div className="text-container">
      {text.split("").map((char, i) => (
        <Letter
          key={i}
          char={char}
          animationDelay={i * animationSpeed}
          fontSize={fontSize}
        />
      ))}
    </div>
  );
};

const AnimatedText: React.FC<AnimatedTextProps> = ({
  text = "Welcome to Pinpoint!",
  animationSpeed = 20,
  fontSize = 45,
}) => {
  return (
    <RandomText
      text={text}
      animationSpeed={animationSpeed}
      fontSize={fontSize}
    />
  );
};

export default AnimatedText;
