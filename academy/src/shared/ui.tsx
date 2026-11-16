import { useId, type ReactNode } from 'react';
import { sourceById } from '../content/catalog';
import type { EvidenceKind, ExecutionKind, SourceRef } from '../content/model';

const evidenceLabels = { implementation: '已查證實作', author: '作者說明', inference: '研究推論', unknown: '待確認' };
const executionLabels = { instruction: '文字規範', code: '程式約束', conceptual: '概念投影' };
export function Badge({ kind, execution }: { kind: EvidenceKind; execution?: ExecutionKind }) {
  return <span className="badges"><span className={`badge ${kind}`}><span aria-hidden="true">{kind === 'implementation' ? '✓' : kind === 'unknown' ? '?' : '◇'}</span> {evidenceLabels[kind]}</span>{execution && <span className="badge muted">{executionLabels[execution]}</span>}</span>;
}
export function SourceLink({ source, label = '查看來源', compact = false }: { source: SourceRef; label?: string; compact?: boolean }) {
  const file = sourceById.get(source.sourceId);
  if (!file) return <span>來源尚未收錄</span>;
  return <a className={`source-link ${compact ? 'compact' : ''}`} href={`#/sources/${file.id}?line=${source.startLine}&end=${source.endLine}`} title={`${file.path}:${source.startLine}–${source.endLine}`}><span aria-hidden="true">↗</span> {label}{!compact && <span className="mono"> L{source.startLine}–{source.endLine}</span>}</a>;
}
export function PageHeading({ eyebrow, title, description, children }: { eyebrow: string; title: string; description: string; children?: ReactNode }) {
  return <header className="page-heading"><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p>{children}</header>;
}
export function Panel({ title, children, className = '' }: { title?: string; children: ReactNode; className?: string }) {
  return <section className={`panel ${className}`}>{title && <h2>{title}</h2>}{children}</section>;
}
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <div className="detail-field"><h3>{label}</h3><div>{children}</div></div>;
}
export function EmptyState({ title = '沒有符合的結果', description = '試試較短的名稱，或清除篩選條件。', children }: { title?: string; description?: string; children?: ReactNode }) {
  return <div className="empty-state"><span aria-hidden="true">⌕</span><h2>{title}</h2><p>{description}</p>{children}</div>;
}
export function SearchField({ value, onChange, placeholder = '搜尋名稱、用途或觸發條件…', label = '搜尋元件' }: { value: string; onChange: (value: string) => void; placeholder?: string; label?: string }) {
  const id = useId();
  return <div className="search-field"><label className="sr-only" htmlFor={id}>{label}</label><span aria-hidden="true">⌕</span><input id={id} type="search" value={value} placeholder={placeholder} onChange={(event) => onChange(event.target.value)} /></div>;
}
export function NotFound() {
  return <EmptyState title="找不到這個頁面" description="這個識別碼不在目前研究版本中。你可以回到入口，重新選擇內容。"><a className="button primary" href="#/intro">回到五分鐘入門</a></EmptyState>;
}
