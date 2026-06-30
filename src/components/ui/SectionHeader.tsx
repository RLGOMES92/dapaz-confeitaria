interface Props {
  title: string;
  subtitle?: string;
  emoji?: string;
}

export default function SectionHeader({ title, subtitle, emoji }: Props) {
  return (
    <div className="mb-5">
      <h2 className="font-display text-2xl font-bold text-stone-900 leading-tight flex items-center gap-2">
        {emoji && <span role="img" aria-hidden>{emoji}</span>}
        {title}
      </h2>
      {subtitle && (
        <p className="text-xs text-stone-400 mt-1 leading-relaxed">{subtitle}</p>
      )}
    </div>
  );
}
