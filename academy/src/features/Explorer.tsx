import { useState } from 'react';
import { components, workflows, relationships, componentById, kindLabels, relationLabels, graphNodes } from '../content/catalog';
import { relationPaths, searchComponents } from '../content/selectors';
import type { Component, RelationKind } from '../content/model';
import { changeParams, type parseRoute } from '../app/route';
import { Badge, EmptyState, Field, NotFound, PageHeading, Panel, SearchField, SourceLink } from '../shared/ui';

type Route = ReturnType<typeof parseRoute>;
const kinds = ['invokes','conditional','references','recommends','protocol','runs'] as RelationKind[];
export function ComponentCard({ item }: { item: Component }) {
  return <a className="component-card" href={`#/components/${item.id}`}><div className="card-topline"><span className={`type-tag ${item.subtype==='principle'?'principle':''}`}>{kindLabels[item.subtype==='principle'?'principle':item.kind]}</span><span aria-hidden="true">↗</span></div><h2>{item.title}</h2><div className="component-name mono">{item.name}</div><p>{item.purpose}</p></a>;
}
export function ComponentExplorer({ route }: { route: Route }) {
  const query = route.params.get('q')??'';
  const kind = route.params.get('kind')??'all';
  const filtered = searchComponents(components,query,kind);
  return <><PageHeading eyebrow="03 / COMPONENT EXPLORER" title="元件探索" description="從一個元件的責任，理解整個系統如何協作。所有名稱與來源固定在同一個研究版本。"/>
    <div className="catalog-toolbar"><SearchField value={query} onChange={q=>changeParams({q})}/><span className="count-label" aria-live="polite">{filtered.length} / {components.length} 個元件</span></div>
    <div className="filter-row" role="group" aria-label="元件類型">{[['all','全部'],['skill','Skills · 58'],['principle','原則 · 24'],['agent','Agents · 2'],['tool','程式工具 · 6'],['automation-instruction','Automation 指令 · 3']].map(([id,label])=><button className={kind===id?'active':''} key={id} aria-pressed={kind===id} onClick={()=>changeParams({kind:id??'all'})}>{label}</button>)}</div>
    {filtered.length?<div className="component-grid">{filtered.map(item=><ComponentCard key={item.id} item={item}/>)}</div>:<EmptyState><button className="button" onClick={()=>changeParams({q:'',kind:''})}>清除篩選</button></EmptyState>}
    <p className="caption">原則是 Skills 的子集合。Benny 的三份指令不註冊為 plugin slash skills；程式工具也不計入 58 個 Skills。</p>
  </>;
}
export function ComponentDetail({ id }: { id: string }) {
  const item = componentById.get(id);
  if(!item)return <NotFound/>;
  const usedBy=workflows.filter(w=>w.steps.some(s=>s.componentIds.includes(id)));
  return <><a className="back-link" href="#/components">← 元件目錄</a><PageHeading eyebrow={`${kindLabels[item.kind]} / ${item.name}`} title={item.title} description={item.purpose}><Badge kind={item.evidenceKind} execution={item.executionKind}/></PageHeading>
    <div className="detail-layout"><div><Panel title="責任與使用時機"><Field label="Purpose / Responsibilities"><p>{item.purpose}</p></Field><Field label="觸發條件"><p>{item.trigger}</p></Field><div className="io-grid"><Field label="輸入 Inputs"><p>{item.inputs}</p></Field><Field label="輸出 Outputs"><p>{item.outputs}</p></Field></div></Panel><Panel title="使用情境"><span className="badge inference">教學情境 · 未執行</span><p>{item.example}</p><p className="muted-text">{item.limits}</p></Panel></div>
    <aside><Panel title="來源與版本"><SourceLink source={item.source} label="閱讀完整定義"/><p className="caption">文字定義的查證，與實際執行成功，是兩種不同的證據。</p>{item.declaration&&<details><summary>查看原始 trigger 宣告</summary><p className="declaration">{item.declaration}</p></details>}</Panel><Panel title="哪些 Playbooks 使用它？">{usedBy.length?<ul className="link-list">{usedBy.map(w=><li key={w.id}><a href={`#/workflows/${w.id}`}>{w.title} <span>→</span></a></li>)}</ul>:<p className="caption">目前人工核對的 step mapping 未收錄使用路徑。這不表示全專案沒有引用。</p>}</Panel></aside></div>
    <DependencyGraph id={id}/>
  </>;
}
export function DependencyGraph({ id }: { id: string }) {
  const [depth,setDepth]=useState<1|2>(1);
  const [direction,setDirection]=useState<'out'|'in'|'both'>('both');
  const [filter,setFilter]=useState<RelationKind|'all'>('all');
  const [sort,setSort]=useState(false);
  const paths = relationPaths(id, relationships, depth, filter==='all'?kinds:[filter], direction);
  const ordered=sort?[...paths].sort((a,b)=>a.edges.at(-1)!.kind.localeCompare(b.edges.at(-1)!.kind)):paths;
  const neighbors=[...new Set(paths.map(p=>p.nodes.at(-1)!))].filter(n=>n!==id).slice(0,8);
  const node=graphNodes.get(id);
  return <Panel className="graph-panel"><div className="section-heading"><div><div className="eyebrow">DEPENDENCIES / REVIEWED EDGES</div><h2>從這裡，追蹤關係。</h2><p>每條邊都有來源；間接路徑保留完整 chain，不覆蓋直接引用。</p></div></div>
    <div className="graph-controls"><div className="segmented small" role="group" aria-label="相依深度">{([1,2] as const).map(n=><button key={n} aria-pressed={depth===n} onClick={()=>setDepth(n)}>{n===1?'一跳 · 直接':'兩跳 · 含間接'}</button>)}</div><label>方向<select value={direction} onChange={e=>setDirection(e.target.value as typeof direction)}><option value="both">上下游</option><option value="out">使用哪些元件</option><option value="in">被哪些元件使用</option></select></label><label>關係<select value={filter} onChange={e=>setFilter(e.target.value as typeof filter)}><option value="all">全部關係</option>{kinds.map(k=><option key={k} value={k}>{relationLabels[k]}</option>)}</select></label></div>
    {neighbors.length>0?<div className="dependency-canvas" aria-label="可點選的局部相依圖"><svg viewBox="0 0 1000 300" preserveAspectRatio="none" aria-hidden="true">{neighbors.map((n,i)=><path key={n} d={`M500 52 C500 80 ${(i%4+.5)*250} 80 ${(i%4+.5)*250} ${i<4?142:244}`} fill="none" stroke="currentColor" strokeWidth="1.5"/>)}</svg><div className="graph-root"><span className="small-dot"/>{node?.name}</div>{neighbors.map((n,i)=>{const target=graphNodes.get(n);return target&&<a title={target.name} key={n} className="graph-node" style={{left:`${(i%4+.5)*25}%`,top:i<4?'48%':'82%'}} href={target.href}><strong>{target.title}</strong><span className="mono">{target.name}</span></a>;})}</div>:<EmptyState title="此篩選下尚無收錄的關係" description="調整方向或關係種類。未收錄與沒有依賴，是不同的結論。"/>}
    <div className="table-heading"><span>{paths.length} 條已收錄路徑 <span className="muted-text">· 圖中最多顯示 8 個鄰近節點</span></span><button className="text-button" onClick={()=>setSort(v=>!v)}>{sort?'還原路徑順序':'依關係種類排序'} ↕</button></div>
    {paths.length>0&&<div className="table-scroll"><table className="relation-table"><caption className="sr-only">可用鍵盤操作的相依關係與證據表</caption><thead><tr><th>路徑</th><th>種類與條件</th><th>證據</th></tr></thead><tbody>{ordered.slice(0,40).map((path,i)=><tr key={path.edges.map(e=>e.id).join(':')+i}><td><span className="path-length">{path.edges.length===1?'直接':'間接'}</span><div className="relation-chain">{path.nodes.map((n,j)=>{const target=graphNodes.get(n);return <span key={n}>{j>0&&<span className="chain-connector" aria-hidden="true"> ↔ </span>}<a href={target?.href}>{target?.name??n}</a></span>;})}</div></td><td>{path.edges.map(edge=><div className="edge-condition" key={edge.id}><span className="type-tag">{relationLabels[edge.kind]}</span><p><span className="mono">{graphNodes.get(edge.from)?.name} → {graphNodes.get(edge.to)?.name}</span><br/>{edge.condition}</p></div>)}</td><td>{path.edges.map(edge=><div key={edge.id}><SourceLink source={edge.source} label="原文" compact/></div>)}</td></tr>)}</tbody></table></div>}
    {paths.length>40&&<p className="caption">表格先顯示 40 條路徑；請用方向或種類縮小結果。</p>}<p className="caption">這是 {relationships.length} 條人工核對的核心關係所形成的局部圖，非完整 runtime call graph。箭頭的原始方向與條件顯示於表格；路徑可反向追查使用者。</p>
  </Panel>;
}

export function SearchPage({ query }: { query: string }) {
  const found=searchComponents(components,query);
  const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const flows=workflows.filter(w=>terms.every(t=>`${w.name} ${w.title} ${w.purpose} ${w.steps.map(s=>s.title).join(' ')}`.toLowerCase().includes(t)));
  return <><PageHeading eyebrow="SEARCH / LOCAL CURRICULUM" title="搜尋學習內容" description="在目前版本的元件與工作流中搜尋名稱、用途、觸發條件與中文別名。"/><SearchField value={query} label="搜尋學習內容" onChange={q=>changeParams({q})}/><div className="section-heading"><h2>工作流 <span className="count-label">{flows.length}</span></h2></div><div className="search-flows">{flows.map(w=><a className="search-flow" key={w.id} href={`#/workflows/${w.id}`}><strong>{w.title}</strong><span className="mono">{w.name}</span><span aria-hidden="true">→</span></a>)}</div><div className="section-heading"><h2>元件 <span className="count-label">{found.length}</span></h2></div><div className="component-grid">{found.map(item=><ComponentCard key={item.id} item={item}/>)}</div>{!found.length&&!flows.length&&<EmptyState><button className="button" onClick={()=>changeParams({q:''})}>清除搜尋</button></EmptyState>}</>;
}
