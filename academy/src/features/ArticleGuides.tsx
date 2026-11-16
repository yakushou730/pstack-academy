import { useState } from 'react';
import { articleGuides } from '../content/article-guides';
import { componentById } from '../content/catalog';

export function ArticleGuides(){
  const [selected,setSelected]=useState(articleGuides[0]!.id);
  const guide=articleGuides.find(g=>g.id===selected)??articleGuides[0]!;
  return <section className="article-guides" aria-labelledby="article-guides-title">
    <div className="section-heading"><div><div className="eyebrow">FROM THE AUTHOR / TWO READING PATHS</div><h2 id="article-guides-title">把作者的做法，轉成你的工程練習。</h2><p>依兩篇原文整理的中文導讀；範例分別標示「作者原例」或「教材自編」，練習由教材編寫。</p></div></div>
    <div className="segmented article-switch" role="group" aria-label="選擇文章導讀">{articleGuides.map(g=><button key={g.id} aria-pressed={g.id===selected} onClick={()=>setSelected(g.id)}>{g.title}</button>)}</div>
    <article className="article-guide" key={guide.id}>
      <header><span className="eyebrow">{guide.subtitle}</span><h3>{guide.title}</h3><p>{guide.takeaway}</p><a className="text-link" href={guide.url} target="_blank" rel="noreferrer">閱讀作者原文 ↗</a></header>
      <ol className="article-steps">{guide.steps.map((step,index)=><li key={step.id}><span className="article-step-number mono">0{index+1}</span><div><h4>{step.title}</h4><p>{step.idea}</p><dl><dt>動手練習</dt><dd>{step.practice}</dd><dt>完成證據</dt><dd>{step.evidence}</dd></dl>
        {step.example&&<details className="original-step"><summary>{step.example.label}</summary><pre><code>{step.example.text}</code></pre></details>}
        {step.authorExample&&<details className="original-step"><summary>{step.authorExample.label}</summary><p>出自本篇作者原文；指令需在具備對應技能與權限的環境執行。</p><pre><code>{step.authorExample.text}</code></pre><a className="text-link" href={guide.url} target="_blank" rel="noreferrer">對照原文 ↗</a></details>}
        <div className="inline-links article-component-links">{step.componentIds.map(id=><a key={id} href={`#/components/${id}`}>/{componentById.get(id)?.name??id} →</a>)}</div>
      </div></li>)}</ol>
      <a className="button primary" href={`#/learn/${guide.lessonId}`}>用情境題練習這篇的方法 →</a>
    </article>
    <div className="notice"><strong>如何解讀這兩篇文章？</strong><p>這是作者工作方式的第一手說明。文中的 PR 數與效率倍數是作者自述，本站未獨立驗證其量測、品質或適用條件，不作效果保證。兩篇完整正文及程式碼／提示範例已由使用者提供並完成教材核對，已補齊先前瀏覽器擷取的文字缺口；原頁嵌圖未逐張獨立核對。原文與固定研究版本可能不同，實作規則仍以對應原始碼為準。</p></div>
  </section>;
}
