import './TechTag.scss';

export function TechTag({ label }: { label: string }) {
  return <span className="tech-tag mono">{label}</span>;
}
