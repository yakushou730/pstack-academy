import { useEffect, useRef, useState } from 'react';
import { catalog, sourceById } from '../content/catalog';
import { Badge, EmptyState, NotFound, PageHeading, SearchField } from '../shared/ui';

export function SourceViewer({ id, line, end }: { id: string; line: string | null; end: string | null }) {
  const file=sourceById.get(id);
  const [state,setState]=useState<{kind:'loading'}|{kind:'ready';text:string}|{kind:'error';message:string}>({kind:'loading'});
  const [full,setFull]=useState(line===null);
  const [find,setFind]=useState('');
  const [retry,setRetry]=useState(0);
  const selectedLine=useRef<HTMLLIElement>(null);
  const start=Math.min(file?.lineCount??1,Math.max(1,Number.isInteger(Number(line))?Number(line):1));
  const finish=Math.min(file?.lineCount??1,Math.max(start,Number.isInteger(Number(end))?Number(end):start));
  useEffect(()=>{
    if(!file)return;
    const controller=new AbortController();
    void (async()=>{
      try{
        const response=await fetch(`${import.meta.env.BASE_URL}sources/${file.id}.json`,{signal:controller.signal});
        if(!response.ok)throw new Error('無法載入已打包的來源。請確認 content build 完成，再重新整理。');
        const raw:unknown=await response.json();
        if(!raw||typeof raw!=='object'||!('text' in raw)||typeof raw.text!=='string'||!('commit' in raw)||raw.commit!==catalog.snapshot.commit)throw new Error('來源格式或版本不符合目前教材。');
        const hash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(raw.text))),b=>b.toString(16).padStart(2,'0')).join('');
        if(hash!==file.sha256)throw new Error('來源 hash 不符合研究 snapshot，不能當成已查證資料。');
        if(!controller.signal.aborted)setState({kind:'ready',text:raw.text});
      }catch(error){if(!controller.signal.aborted)setState({kind:'error',message:error instanceof Error?error.message:'來源載入失敗。'});}
    })();
    return()=>controller.abort();
  },[file,retry]);
  useEffect(()=>{if(state.kind==='ready')selectedLine.current?.scrollIntoView({block:'nearest'});},[state,start]);
  if(!file)return <NotFound/>;
  const lines=state.kind==='ready'?state.text.replace(/\n$/,'').split('\n'):[];
  const matches=find?lines.filter(l=>l.toLowerCase().includes(find.toLowerCase())).length:0;
  return <><a className="back-link" href="#/sources">← 來源索引</a><PageHeading eyebrow="SOURCE VIEWER / PINNED SNAPSHOT" title="回到原始碼" description="固定版本、唯讀文字。這裡只顯示來源，不執行任何指令或 script。"><Badge kind="implementation"/></PageHeading>
    <div className="source-meta"><div className="mono source-path">{file.path}</div><a href={`${file.url}#L${start}-L${finish}`} target="_blank" rel="noreferrer">GitHub 固定版本 ↗</a><div className="mono caption">commit {catalog.snapshot.commit} · SHA-256 {file.sha256.slice(0,16)}…</div></div>
    <div className="source-toolbar"><SearchField value={find} onChange={setFind} label="在來源中搜尋" placeholder="在這個檔案中搜尋…"/><span>{find?`${matches} 行符合`:`引用 L${start}–${finish}`}</span><button className="button" onClick={()=>setFull(v=>!v)}>{full?'只看引用區段':'顯示完整檔案'}</button></div>
    {state.kind==='loading'&&<p role="status" className="loading-state">正在載入並驗證來源完整性…</p>}
    {state.kind==='error'&&<EmptyState title="來源載入失敗" description={state.message}><button className="button" onClick={()=>{setState({kind:'loading'});setRetry(n=>n+1);}}>重新載入</button></EmptyState>}
    {state.kind==='ready'&&<div className="source-code-scroll" tabIndex={0} aria-label="可捲動的唯讀原始碼"><ol className="source-code">{lines.map((text,i)=>({text,n:i+1})).filter(({n})=>full||find||n>=Math.max(1,start-3)&&n<=finish+3).map(({text,n})=><li ref={n===start?selectedLine:undefined} value={n} id={`line-${n}`} className={`${n>=start&&n<=finish?'referenced':''} ${find&&text.toLowerCase().includes(find.toLowerCase())?'match':''}`} key={n}><span className="source-line-number" aria-label={`第 ${n} 行`}>{n}</span><code>{text||' '}</code></li>)}</ol></div>}
    <p className="caption">引用 highlight 是範圍提示；確認主張時仍應讀相鄰上下文。完整教材對應固定 mirror，不能代表遠端 main 的最新內容。</p>
  </>;
}
export function SourceIndex({ query }: { query: string }) {
  const filtered=catalog.sources.filter(s=>s.path.toLowerCase().includes(query.toLowerCase()));
  return <><PageHeading eyebrow="EVIDENCE / SOURCE INDEX" title="每個結論，都有回去的路。" description="本機來源以 SHA 固定；外部來源另標示取得層級。來源檔案只作唯讀文字，不載入為可執行內容。"/><SearchField value={query} onChange={q=>{window.location.hash=`/sources?q=${encodeURIComponent(q)}`;}} label="搜尋來源路徑" placeholder="搜尋來源路徑…"/><p className="count-label">{filtered.length} / {catalog.sources.length} 份已打包文字來源</p><div className="source-index-list">{filtered.map(file=><a key={file.id} href={`#/sources/${file.id}`}><span className="mono">{file.path}</span><span>{file.lineCount} 行 ↗</span></a>)}</div>{!filtered.length&&<EmptyState/>}<div className="notice">外部講座與作者文章的 metadata、日期與取得限制，請見 <a href="#/philosophy">作者與設計觀</a>。本索引只包含固定本機版本。</div></>;
}
