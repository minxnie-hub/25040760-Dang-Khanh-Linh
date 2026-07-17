const stars = Array.from({ length: 54 }, (_, index) => ({
  left: `${(index * 37 + 11) % 100}%`,
  top: `${(index * 61 + 7) % 100}%`,
  size: 1 + ((index * 13) % 4),
  delay: `${-((index * 0.37) % 5)}s`,
  duration: `${3.2 + ((index * 17) % 30) / 10}s`,
}));

export function StarField({ subtle = false }: { subtle?: boolean }) {
  return <div className={`star-field ${subtle ? "star-field--subtle" : ""}`} aria-hidden="true">
    {stars.map((star, index) => <span key={index} style={{ left: star.left, top: star.top, width: star.size, height: star.size, animationDelay: star.delay, animationDuration: star.duration }} />)}
  </div>;
}
