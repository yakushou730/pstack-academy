import { useState } from 'react';
import { catalog, componentRef, coreRef } from '../content/catalog';
import { Badge, Panel, SourceLink } from '../shared/ui';
import { introQuestions } from '../content/lessons';
import { KnowledgeCheck } from './Learning';

const architecture = [
  { id:'task', label:'使用者任務', sub:'定義要解決的問題', detail:'任務是流程的起點。先確認使用者要的結果，而不是把「寫程式」當成唯一活動；唯讀問題會走 Investigation。', source:componentRef('poteto-mode') },
  { id:'mode', label:'poteto-mode', sub:'選擇適合的 Playbook', detail:'宿主 Agent 讀取 mode 的 triggers、原則與路由。Playbook 依任務選擇，並不是一個固定、每次都跑到底的 pipeline。', source:componentRef('poteto-mode') },
  { id:'skills',label:'Skills 與委派',sub:'按情境調用工程方法',detail:'例如 Feature 先 architect，比較設計後才實作；arena 合成候選，swarm 彙整覆蓋。子 Agent 的建立工具由宿主提供。', source:componentRef('architect') },
  { id:'host', label:'宿主與工具', sub:'真正執行操作', detail:'Task／Agent、可用模型與許多控制 surface 來自宿主。pstack 另有 watch-pr、check-plan 等職責明確的小工具，沒有通用的常駐 scheduler。', source:componentRef('watch-pr') },
  { id:'proof', label:'可檢查的證據', sub:'在真實產物上驗證', detail:'完成不是一份令人信服的自述。檢查實際畫面、輸出或 artifact，保留與目標相符的 proof；不確定的結果不算通過。', source:componentRef('principle-prove-it-works') },
];

export function Introduction() {
  const [stage,setStage]=useState(0);
  const [active,setActive]=useState('mode');
  const visible=architecture.slice(0,stage===0?2:stage===1?3:5);
  const selected=visible.find(node=>node.id===active)??visible[0];
  return <>
    <section className="intro-hero">
      <div className="hero-copy"><div className="eyebrow"><span className="live-dot"/> PSTACK / INTERACTIVE ACADEMY</div>
        <h1>寫得更少。<br/><span>理解得更深。</span></h1>
        <p>從原始碼出發，探索 pstack 如何把工程判斷、<br className="desktop-br"/>工作流與驗證，帶進 AI Coding Agent。</p>
        <div className="hero-actions"><button className="button primary" onClick={()=>document.getElementById("architecture")?.scrollIntoView({behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"})}>開始五分鐘導覽 <span aria-hidden="true">↘</span></button><a className="text-link" href="#/workflows">直接探索工作流 <span aria-hidden="true">→</span></a></div>
        <div className="hero-meta"><span>繁體中文</span><span>以原始碼為證據</span><span>本機互動學習</span></div>
      </div>
      <div className="hero-terminal" aria-label="pstack 的概念路徑"><div className="terminal-bar"><span className="terminal-dots"><i/><i/><i/></span><span>the engineering loop</span><span className="mono">.md</span></div>
        <div className="terminal-code"><div><span className="line-num">01</span><span className="code-comment">// go deep before you go fast</span></div><div><span className="line-num">02</span><span className="code-accent">task</span><span className="code-dim"> → </span>understand()</div><div><span className="line-num">03</span><span className="indent">→ design()</span></div><div><span className="line-num">04</span><span className="indent indent-more">→ build()</span></div><div><span className="line-num">05</span><span className="indent indent-deep">→ <span className="code-accent">verify()</span></span></div><div><span className="line-num">06</span><span className="code-comment">// evidence, not self-report</span></div></div>
        <div className="terminal-note"><span className="small-dot"/> 教學概念圖，非可執行的 pstack API</div>
      </div>
    </section>
    <div className="stats-strip"><div><strong>58</strong><span>Skills <small>含 24 個工程原則</small></span></div><div><strong>23</strong><span>Playbooks <small>依真實任務路由</small></span></div><div><strong>2</strong><span>Agent 定義 <small>由宿主建立執行</small></span></div><div><strong className="version-stat">v{catalog.snapshot.version}</strong><span>研究版本 <small className="mono">{catalog.snapshot.commit.slice(0,7)}</small></span></div></div>
    <section className="intro-definition"><div><div className="eyebrow">01 / A MENTAL MODEL</div><h2>先建立一個正確的心智模型。</h2></div><div><p>pstack 是一組供 Coding Agent 使用的<strong>工程方法、技能文件與小型工具</strong>。主要工作流程由 Markdown 指引宿主 Agent 執行；文字規範與程式強制的約束，需要分開理解。</p><Badge kind="implementation" execution="instruction"/> <SourceLink source={componentRef('poteto-mode')} label="閱讀 mode 定義" compact/></div></section>
    <section id="architecture" className="architecture-section"><div className="section-heading"><div><div className="eyebrow">02 / CONNECT THE DOTS</div><h2>看懂一次任務，如何往前走。</h2><p>分三次展開系統。點選節點，理解每個角色的責任。</p></div><span className="badge muted">概念架構投影</span></div>
      <div className="segmented" role="group" aria-label="架構展開階段">{['任務與路由','加入 Skills','加入執行與證據'].map((label,i)=><button key={label} aria-pressed={stage===i} onClick={()=>{setStage(i);setActive(i===0?'mode':i===1?'skills':'proof');}}><span className="step-dot">0{i+1}</span>{label}</button>)}</div>
      <div className="architecture-board"><div className="architecture-flow">{visible.map((node,i)=><div className="arch-cell" key={node.id}>{i>0&&<span className="arch-arrow" aria-hidden="true">→</span>}<button className={`arch-node ${node.id===selected?.id?'selected':''}`} aria-pressed={node.id===selected?.id} onClick={()=>setActive(node.id)}><span className="mono node-index">0{i+1}</span><strong>{node.label}</strong><small>{node.sub}</small></button></div>)}</div>
        {selected&&<div className="architecture-detail" aria-live="polite"><div><span className="eyebrow">目前選取</span><h3>{selected.label}</h3></div><p>{selected.detail}</p><SourceLink source={selected.source}/></div>}
      </div>
      <p className="caption">這是根據原始碼關係整理的教學模型，並非 runtime trace。實際執行步驟與條件請查看各 Playbook。</p>
    </section>
    <section className="intro-cards"><a className="discovery-card" href="#/components"><span className="card-glyph">⌘</span><div className="eyebrow">COMPONENT EXPLORER</div><h3>認識構成系統的元件</h3><p>從用途與觸發條件出發，追蹤直接引用與間接相依。</p><span className="text-link">探索 58 個 Skills →</span></a><a className="discovery-card" href="#/workflows/bug-fix"><span className="card-glyph">⑂</span><div className="eyebrow">WORKFLOW EXPLORER</div><h3>沿著真實工作流前進</h3><p>逐步理解為什麼執行、需要什麼，以及如何判定完成。</p><span className="text-link">走一次 Bug fix →</span></a><a className="discovery-card" href="#/learn"><span className="card-glyph">▷</span><div className="eyebrow">LEARN BY EXPLORING</div><h3>把概念帶進工程情境</h3><p>用模擬情境練習判斷，從答案背後的證據建立理解。</p><span className="text-link">進入引導學習 →</span></a></section>
    <Panel className="provenance-panel"><div><div className="eyebrow">KNOW YOUR SOURCE</div><h2>作者、上游與 mirror，是不同角色。</h2><p>作者是 Lauren Tan（poteto）；上游位於 cursor/plugins/pstack。本機研究的是 backnotprop 維護的 standalone mirror，含跨宿主改寫與社群修正。</p></div><div className="provenance-links"><SourceLink source={coreRef('manifest')} label="作者與 plugin 宣告"/><SourceLink source={coreRef('mirror')} label="Mirror 同步說明"/><a className="text-link" href="#/philosophy">作者與設計觀 →</a></div></Panel>
    <section className="intro-check"><div className="section-heading"><div><div className="eyebrow">03 / CHECK YOUR UNDERSTANDING</div><h2>用三個問題，確認你的理解。</h2><p>答案可以重試；每個解釋都能回到來源。</p></div></div><div className="quiz-grid">{introQuestions.map(q=><KnowledgeCheck key={q.id} question={q}/>)}</div></section>
  </>;
}
