import { useState, useCallback } from "react";

interface UseControllableStateOptions<T> {
  controlledValue: T | undefined;
  defaultValue: T;
  onChange?: (value: T) => void;
}

export function useControllableState<T>({
  controlledValue,
  defaultValue,
  onChange,
}: UseControllableStateOptions<T>) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setInternalValue(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [value, setValue] as const;
}
