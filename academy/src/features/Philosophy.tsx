import { ArticleGuides } from './ArticleGuides';
import { useState } from 'react';
import { authorSources, accessLabels } from '../content/editorial';
import { componentById, coreRef } from '../content/catalog';
import { Badge, PageHeading, Panel, SourceLink } from '../shared/ui';

export function Philosophy(){
  const [filter,setFilter]=useState('all');
  const filtered=authorSources.filter(s=>filter==='all'||s.access===filter);
  return <><PageHeading eyebrow="02 / AUTHOR & PHILOSOPHY" title="理解作者的判斷，也檢查實作。" description="第一手資料用來理解意圖，固定版本原始碼用來確認行為。兩者可以對照，不能互相代替。"/>
    <Panel className="author-panel"><div className="author-avatar" aria-hidden="true">lt<span>poteto</span></div><div><div className="eyebrow">THE AUTHOR</div><h2>Lauren Tan <span className="muted-text">/ poteto</span></h2><p>plugin manifest 標示的 pstack 作者。GitHub 個人頁與 React 官方團隊頁可交叉確認 Lauren Tan／poteto 及 Compiler 工作組的關係。</p><div className="inline-links"><a href="https://github.com/poteto" target="_blank" rel="noreferrer">GitHub 個人頁 ↗</a><a href="https://react.dev/community/team" target="_blank" rel="noreferrer">React 官方團隊 ↗</a><SourceLink source={coreRef('manifest')} label="本機作者宣告" compact/></div><p className="caption">外部個人簡介可能變動；不以不同頁面的雇主文字推定轉職日期。</p></div></Panel>
    <div className="philosophy-thesis"><span className="eyebrow">THE INTENT</span><h2>先深入理解，再建立平行工作的信任。</h2><p>README 把目標放在較少、較高品質的程式碼，並以可驗證的單一 Agent 工作支援平行化。這是作者的設計主張，本研究沒有量測固定的效率或品質提升。</p><Badge kind="author"/><SourceLink source={coreRef('readme')} label="對照 README 原文" compact/></div>
    <ArticleGuides/>
    <div className="section-heading"><div><div className="eyebrow">PRIMARY SOURCES / RESEARCHED 2026.11.16</div><h2>從一手資料，連回原始碼。</h2></div></div>
    <div className="filter-row" role="group" aria-label="來源取得層級">{[['all','全部來源'],...Object.entries(accessLabels)].map(([id,label])=><button key={id} aria-pressed={filter===id} className={filter===id?'active':''} onClick={()=>setFilter(id??'all')}>{label}</button>)}</div>
    <div className="author-source-list">{filtered.map(source=><article className="author-source" key={source.id}><div className="source-card-header"><div><span className={`badge ${source.access==='unavailable'?'unknown':'muted'}`}>{accessLabels[source.access]}</span><h2>{source.title}</h2><p className="caption">{source.author} · {source.date}</p></div><a href={source.url} target="_blank" rel="noreferrer" className="external-arrow" aria-label={`開啟 ${source.title} 官方來源`}>↗</a></div><p>{source.summary}</p>
    {source.timestamps&&<div className="talk-chapters" aria-label="主辦方章節索引">{source.timestamps.map(t=><div key={t.time}><span className="mono">{t.time}</span><span>{t.title}</span></div>)}</div>}
    <div className="source-limits"><strong>{source.access==='unavailable'?'內容未查證':'證據的範圍'}</strong><p>{source.limitation}</p></div>
    {source.componentIds.length>0&&<div className="source-mapping"><span className="eyebrow">CONCEPT → SOURCE CODE</span><div className="inline-links">{source.componentIds.map(id=><a key={id} href={`#/components/${id}`}>{componentById.get(id)?.title} →</a>)}</div><p className="caption">對照代表主題關聯，不代表已證實此文章或講座直接產生該 Skill。</p></div>}</article>)}</div>
    <Panel title="哪些事情仍然不知道？"><Badge kind="unknown"/><p>兩篇 X 文章已讀到正文與主要範例，但仍有局部截斷、嵌圖及年份待核實。訪談影音、吞吐數字的量測基線與品質結果，以及 mirror 與指定上游 commit 的逐檔差異仍未查證；不以第三方摘要補成作者發言。</p><a className="text-link" href="#/sources">瀏覽本機固定版本來源 →</a></Panel>
  </>;
}
