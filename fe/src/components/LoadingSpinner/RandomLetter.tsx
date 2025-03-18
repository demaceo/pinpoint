import React, { useEffect, useState } from "react";
import "./RandomLetter.css";

// Config Vars
const animationSpeed = 200; // Time between each letter appearing
const fontSize = 50;
const text = "Welcome to Pinpoint";

interface LetterProps {
  char: string;
  animationDelay: number;
  fontSize: number;
}

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

interface RandomTextProps {
  text: string;
  animationSpeed: number;
  fontSize: number;
}

const RandomText: React.FC<RandomTextProps> = ({
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

const RandomLetter: React.FC = () => {
  return (
    <RandomText
      text={text}
      animationSpeed={animationSpeed}
      fontSize={fontSize}
    />
  );
};

export default RandomLetter;
