import { useState, useCallback, useRef, useEffect } from "react";
import type { ScrambleTextProps } from "./interfaces";
import { DEFAULT_SPEED, DEFAULT_CHARSET, DEFAULT_FONT_SIZE } from "./utils";
import "./styles/index.css";

export type { ScrambleTextProps } from "./interfaces";

export default function ScrambleText({
  text,
  trigger = "hover",
  speed = DEFAULT_SPEED,
  charset = DEFAULT_CHARSET,
  color = "#fff",
  fontSize = DEFAULT_FONT_SIZE,
}: ScrambleTextProps) {
  const [display, setDisplay] = useState(text);
  const [resolvedCount, setResolvedCount] = useState(text.length);
  const intervalRef = useRef<ReturnType<typeof setInterval>>();
  const prevText = useRef(text);

  useEffect(() => {
    if (prevText.current !== text) {
      prevText.current = text;
      setDisplay(text);
      setResolvedCount(text.length);
    }
  }, [text]);

  const scramble = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    let iteration = 0;
    setResolvedCount(0);

    intervalRef.current = setInterval(() => {
      setDisplay(
        text
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (i < iteration) return text[i];
            return charset[Math.floor(Math.random() * charset.length)];
          })
          .join("")
      );

      setResolvedCount(iteration);

      if (iteration >= text.length) {
        clearInterval(intervalRef.current);
        setResolvedCount(text.length);
      }

      iteration += 1 / 3;
    }, speed);
  }, [text, speed, charset]);

  useEffect(() => {
    if (trigger === "auto") scramble();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [trigger, scramble]);

  const handlers =
    trigger === "hover"
      ? { onMouseEnter: scramble }
      : trigger === "click"
      ? { onClick: scramble }
      : {};

  const vars = {
    "--st-fs": `${fontSize}px`,
    "--st-color": color,
  } as React.CSSProperties;

  return (
    <span className="st-container" style={vars} {...handlers}>
      {display.split("").map((char, i) => (
        <span
          key={i}
          className={`st-char ${char === " " ? "space" : i < resolvedCount ? "resolved" : "scrambling"}`}
        >
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
