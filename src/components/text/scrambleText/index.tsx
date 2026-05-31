import type { ScrambleTextProps } from "./interfaces";
import { DEFAULT_SPEED, DEFAULT_CHARSET, DEFAULT_FONT_SIZE } from "./utils";
import { useScramble } from "./hooks/useScramble";
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
  const { display, resolvedCount, handlers } = useScramble({ text, trigger, speed, charset });

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
          {char === " " ? " " : char}
        </span>
      ))}
    </span>
  );
}
