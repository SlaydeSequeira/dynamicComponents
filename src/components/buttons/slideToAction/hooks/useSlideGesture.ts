import { useState, useRef, useCallback, useEffect } from "react";
import { clamp } from "../../../shared/utils";

export function useSlideGesture(props: {
  maxSlide: number;
  threshold: number;
  onComplete?: () => void;
  autoReset: boolean;
}) {
  const { maxSlide, threshold, onComplete, autoReset } = props;

  const [completed, setCompleted] = useState(false);
  const [offset, setOffset] = useState(0);
  const [animating, setAnimating] = useState(false);
  const dragging = useRef(false);
  const startX = useRef(0);
  const shellRef = useRef<HTMLDivElement>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (completed) return;
      dragging.current = true;
      startX.current = e.clientX - offset;
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [offset, completed]
  );

  const onPointerMove = useCallback(
    (e: React.PointerEvent) => {
      if (!dragging.current) return;
      setOffset(clamp(e.clientX - startX.current, 0, maxSlide));
    },
    [maxSlide]
  );

  const onPointerUp = useCallback(() => {
    if (!dragging.current) return;
    dragging.current = false;

    if (offset >= maxSlide * threshold) {
      setAnimating(true);
      setCompleted(true);
      setOffset(maxSlide);
      onComplete?.();

      if (autoReset) {
        setTimeout(() => {
          setCompleted(false);
          setOffset(0);
          setTimeout(() => setAnimating(false), 400);
        }, 1600);
      } else {
        setTimeout(() => setAnimating(false), 400);
      }
    } else {
      setAnimating(true);
      setOffset(0);
      setTimeout(() => setAnimating(false), 400);
    }
  }, [offset, maxSlide, threshold, onComplete, autoReset]);

  useEffect(() => {
    return () => {
      dragging.current = false;
    };
  }, []);

  return { completed, offset, animating, shellRef, onPointerDown, onPointerMove, onPointerUp };
}
