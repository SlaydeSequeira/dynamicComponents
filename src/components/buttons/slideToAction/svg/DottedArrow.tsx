export function DottedArrow() {
  const r = 1.6;
  const dots: [number, number][] = [];

  for (let row = 0; row < 5; row++) {
    const cols = row <= 2 ? row + 1 : 5 - row;
    for (let col = 0; col < cols; col++) {
      dots.push([col * 5, row * 5]);
    }
  }
  const chevronX = 16;
  for (let row = 0; row < 5; row++) {
    const cols = row <= 2 ? row + 1 : 5 - row;
    for (let col = 0; col < cols; col++) {
      dots.push([chevronX + col * 5, row * 5]);
    }
  }

  return (
    <svg viewBox="-2 -2 38 24" width="36" height="24">
      {dots.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={r} fill="currentColor" />
      ))}
    </svg>
  );
}
