import { componentById, workflows, workflowById } from '../content/catalog';
import { safeStep } from '../content/selectors';
import { changeParams } from '../app/route';
import { Badge, EmptyState, Field, NotFound, PageHeading, Panel, SearchField, SourceLink } from '../shared/ui';

const groups: Record<string,string[]> = {
  'understand':['investigation','runtime-forensics','trace-forensics','session-pickup'],
  'build':['feature','bug-fix','refactoring','perf-issue','hillclimb','prototype','visual-parity','authoring-a-skill','eval'],
  'deliver':['opening-a-pr','babysit','shipping'],
  'coordinate':['autonomous-run','orchestrate','autopilot-full','autopilot-stack','pause-safely','multi-phase-plan','worktree-cleanup'],
};
export function WorkflowExplorer({ query, group }: { query: string; group: string }) {
  const terms=query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const filtered=workflows.filter(w=>(group==='all'||(groups[group]?.includes(w.id)??false))&&terms.every(t=>`${w.name} ${w.title} ${w.purpose}`.toLowerCase().includes(t)));
  return <><PageHeading eyebrow="04 / WORKFLOW EXPLORER" title="工作流探索" description="不是每個任務都需要寫程式。選擇一條真實 Playbook，理解步驟、分支與完成門檻。"><Badge kind="implementation" execution="instruction"/></PageHeading>
    <div className="catalog-toolbar"><SearchField value={query} label="搜尋工作流" placeholder="搜尋工作流名稱或目標…" onChange={q=>changeParams({q})}/><span className="count-label">{filtered.length} / 23 條 Playbooks</span></div>
    <div className="filter-row" role="group" aria-label="工作流目的">{[['all','全部'],['understand','理解與診斷'],['build','建置與改善'],['deliver','審查與交付'],['coordinate','協調與交接']].map(([key,label])=><button aria-pressed={group===key} className={group===key?'active':''} key={key} onClick={()=>changeParams({group:key??'all'})}>{label}</button>)}</div>
    <div className="workflow-grid">{filtered.map((w,i)=><a className="workflow-card" href={`#/workflows/${w.id}`} key={w.id}><span className="workflow-number mono">{String(i+1).padStart(2,'0')}</span><div><span className="mono component-name">{w.name}</span><h2>{w.title}</h2><p>{w.purpose}</p><div className="workflow-card-footer"><span>{w.steps.length} {w.stepMode==='sections'?'個原文分區':'個原文步驟'}</span><span>探索流程 →</span></div></div></a>)}</div>
    {!filtered.length&&<EmptyState><button className="button" onClick={()=>changeParams({q:'',group:''})}>清除篩選</button></EmptyState>}
    <Panel title="還有哪些工作方式？"><p>Benny setup／triage／repro 是獨立 automation pack 的指令；architect／arena 等組合流程則由 Skills 定義，不另外冒稱為 Playbooks。</p><div className="inline-links"><a href="#/components?kind=automation-instruction">探索 Benny 指令 →</a><a href="#/components/architect">architect 設計流程 →</a><a href="#/components/arena">arena 候選合成 →</a></div></Panel>
  </>;
}
export function WorkflowDetail({ id, stepParam }: { id: string; stepParam: string | null }) {
  const workflow=workflowById.get(id);
  if(!workflow)return <NotFound/>;
  const index=safeStep(stepParam,workflow.steps.length);
  const step=workflow.steps[index];
  if(!step)return <NotFound/>;
  return <><a className="back-link" href="#/workflows">← 工作流目錄</a><PageHeading eyebrow={`PLAYBOOK / ${workflow.name}`} title={workflow.title} description={workflow.purpose}><Badge kind="implementation" execution="instruction"/></PageHeading>
    <div className="workflow-overview"><Field label="進入點"><p>{workflow.entry}</p></Field><Field label="前置條件"><p>{workflow.prerequisites}</p></Field><Field label="最終產物"><p>{workflow.outputs}</p></Field></div>
    {id==='autopilot-stack'&&<div className="notice">本 Playbook 沿用 <a href="#/workflows/autopilot-full">Autopilot-full</a>，以下兩步是覆寫規則。應先讀 full，再套用「不 merge」與 stack 的例外。</div>}
    <div className="workflow-workbench"><aside className="workflow-outline"><div className="outline-heading">{workflow.stepMode==='sections'?'原文分區導覽':'完整流程'}<span>{workflow.steps.length}</span></div><ol>{workflow.steps.map((s,i)=><li key={s.id}><button className={index===i?'selected':''} aria-current={index===i?'step':undefined} onClick={()=>changeParams({step:String(i)})}><span className="outline-index">{String(i+1).padStart(2,'0')}</span><span>{s.title}{s.condition&&<small>條件式步驟</small>}</span></button></li>)}</ol><p className="caption">{workflow.limits}</p></aside>
    <section className="workflow-active"><div className="step-progress"><span className="eyebrow">{workflow.stepMode==='sections'?'SECTION':'STEP'} {String(index+1).padStart(2,'0')} / {String(workflow.steps.length).padStart(2,'0')}</span><span className="badge muted">唯讀導覽 · 非執行</span></div><div className="step-meter"><span style={{width:`${(index+1)/workflow.steps.length*100}%`}}/></div><h2>{step.title}</h2>
      {step.condition&&<div className="condition-box"><span className="eyebrow">DECISION POINT</span><p>{step.condition}</p></div>}
      <Field label="這一步在解決什麼？"><p>{step.why}</p><p className="caption">中文是教學摘述；具體動作、限制與例外保留於下方原文。</p></Field>
      <div className="io-grid"><Field label="輸入"><p>{step.inputs}</p></Field><Field label="預期輸出"><p>{step.outputs}</p></Field></div>
      <Field label="使用的 Skills / Components">{step.componentIds.length?<div className="skill-chips">{step.componentIds.map(c=>{const component=componentById.get(c);return <a key={c} href={`#/components/${c}`}>{component?.title}<span className="mono">{c}</span><span aria-hidden="true">↗</span></a>;})}</div>:<p className="muted-text">此步沒有額外收錄的具名 Skill 呼叫；宿主工具與共同規範請以原文為準。</p>}</Field>
      <details className="original-step" key={step.id}><summary>閱讀這一步的完整原文 <span className="mono">L{step.source.startLine}–{step.source.endLine}</span></summary><pre>{step.excerpt}</pre></details><SourceLink source={step.source} label="在 Source Viewer 開啟"/>
      <div className="step-navigation"><button className="button" disabled={index===0} onClick={()=>changeParams({step:String(index-1)})}>← 上一步</button><span>{index+1} / {workflow.steps.length}</span><button className="button primary" disabled={index===workflow.steps.length-1} onClick={()=>changeParams({step:String(index+1)})}>下一步 →</button></div>
    </section></div>
    <div className="two-column"><Panel title="失敗與復原"><p>{workflow.failure}</p><p className="caption">未定義的 retry、state schema 或 rollback 不補寫成已存在機制。</p></Panel><Panel title="狀態與產物的邊界"><p>這份 Playbook 定義的是作業程序，沒有共用持久化狀態機。Git／PR／TSV 等狀態由各工具承載。</p><SourceLink source={workflow.source} label="查閱整份 Playbook"/></Panel></div>
  </>;
}
