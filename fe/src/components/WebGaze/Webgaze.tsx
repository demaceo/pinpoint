
//@ts-expect-error allow webgazer
import webgazer from "webgazer";
import { useEffect, useRef, useState } from "react";
import "./Webgaze.css";

const LOOK_DELAY = 1000;

function getRandomImageUrl() {
  return "https://picsum.photos/1000?" + Math.random();
}

export default function Webgaze() {
  const [currentImg, setCurrentImg] = useState(getRandomImageUrl);
  const [nextImg, setNextImg] = useState(getRandomImageUrl);
  const [swipeClass, setSwipeClass] = useState("");

  const leftCutoff = window.innerWidth / 4;
  const rightCutoff = window.innerWidth - window.innerWidth / 4;

  const startLookTime = useRef(Infinity);
  const lookDirection = useRef<"LEFT" | "RIGHT" | "STOP" | "RESET" | null>(
    null
  );
  const webgazerInitialized = useRef(false);

  useEffect(() => {
    if (webgazerInitialized.current) return; // Prevents multiple initializations
    webgazerInitialized.current = true;

    if (webgazer?.setGazeListener) {
      // Ensures function exists before calling
      webgazer
        .setGazeListener((data: { x: number }, timestamp: number) => {
          if (!data) return;
          if (lookDirection.current === "STOP") return;

          if (
            data.x < leftCutoff &&
            lookDirection.current !== "LEFT" &&
            lookDirection.current !== "RESET"
          ) {
            startLookTime.current = timestamp;
            lookDirection.current = "LEFT";
          } else if (
            data.x > rightCutoff &&
            lookDirection.current !== "RIGHT" &&
            lookDirection.current !== "RESET"
          ) {
            startLookTime.current = timestamp;
            lookDirection.current = "RIGHT";
          } else if (data.x >= leftCutoff && data.x <= rightCutoff) {
            startLookTime.current = Infinity;
            lookDirection.current = null;
          }

          if (startLookTime.current + LOOK_DELAY < timestamp) {
            setSwipeClass(lookDirection.current === "LEFT" ? "left" : "right");
            lookDirection.current = "STOP";
            startLookTime.current = Infinity;

            setTimeout(() => {
              setSwipeClass("");
              setCurrentImg(nextImg);
              setNextImg(getRandomImageUrl());
              lookDirection.current = "RESET";
            }, 200);
          }
        })
        .showVideoPreview?.(false) // Checks if method exists before calling
        .showPredictionPoints?.(false)
        .begin?.();
    }

    return () => {
      try {
        webgazer?.pause?.(); // Ensures pause exists before calling
      } catch (error) {
        console.warn("Error pausing WebGazer:", error);
      }
    };
  }, []);

  return (
    <div className="webgazer-wrapper">
      <div className="img-container">
        <img
          src={currentImg}
          alt="Current"
          className={`random-image ${swipeClass}`}
        />
        <img
          src={nextImg}
          alt="Next"
          className="random-image"
          style={{ display: swipeClass ? "none" : "block" }}
        />
      </div>
    </div>
  );
}
