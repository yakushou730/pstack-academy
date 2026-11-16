import { useState } from 'react';
import { articleGuides } from '../content/article-guides';
import { componentById } from '../content/catalog';

export function ArticleGuides(){
  const [selected,setSelected]=useState(articleGuides[0]!.id);
  const guide=articleGuides.find(g=>g.id===selected)??articleGuides[0]!;
  return <section className="article-guides" aria-labelledby="article-guides-title">
    <div className="section-heading"><div><div className="eyebrow">FROM THE AUTHOR / TWO READING PATHS</div><h2 id="article-guides-title">把作者的做法，轉成你的工程練習。</h2><p>依兩篇原文整理的中文導讀；範例與練習由教材編寫。</p></div></div>
    <div className="segmented article-switch" role="group" aria-label="選擇文章導讀">{articleGuides.map(g=><button key={g.id} aria-pressed={g.id===selected} onClick={()=>setSelected(g.id)}>{g.title}</button>)}</div>
    <article className="article-guide" key={guide.id}>
      <header><span className="eyebrow">{guide.subtitle}</span><h3>{guide.title}</h3><p>{guide.takeaway}</p><a className="text-link" href={guide.url} target="_blank" rel="noreferrer">閱讀作者原文 ↗</a></header>
      <ol className="article-steps">{guide.steps.map((step,index)=><li key={step.id}><span className="article-step-number mono">0{index+1}</span><div><h4>{step.title}</h4><p>{step.idea}</p><dl><dt>動手練習</dt><dd>{step.practice}</dd><dt>完成證據</dt><dd>{step.evidence}</dd></dl>
        {step.example&&<details className="original-step"><summary>{step.example.label}</summary><pre><code>{step.example.text}</code></pre></details>}
        <div className="inline-links article-component-links">{step.componentIds.map(id=><a key={id} href={`#/components/${id}`}>/{componentById.get(id)?.name??id} →</a>)}</div>
      </div></li>)}</ol><a className="button primary" href={`#/learn/${guide.id==='part-1'?'verification':'design'}`}>用兩個決策，練習這篇文章的方法 →</a>
      <a className="button primary" href={`#/learn/${guide.lessonId}`}>用情境題練習這篇的方法 →</a>
    </article>
    <div className="notice"><strong>如何解讀這兩篇文章？</strong><p>這是作者工作方式的第一手說明。文中的 PR 數與效率倍數是作者自述，本站未獨立驗證其量測、品質或適用條件，不作效果保證。正文已透過登入後的瀏覽器讀取；部分長段落在擷取中截斷，嵌圖未逐一核實，未標示為已讀全文。原文與固定研究版本可能不同，實作規則仍以對應原始碼為準。</p></div>
  </section>;
}
