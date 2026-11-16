import { useEffect, useRef, useState } from 'react';
import { useRoute } from './route';
import { catalog, coreRef } from '../content/catalog';
import { Introduction } from '../features/Introduction';
import { ComponentDetail, ComponentExplorer, SearchPage } from '../features/Explorer';
import { WorkflowDetail, WorkflowExplorer } from '../features/Workflows';
import { SourceIndex, SourceViewer } from '../features/Sources';
import { LearningIndex, LearningProvider, LessonDetail } from '../features/Learning';
import { Philosophy } from '../features/Philosophy';
import { Insights } from '../features/Insights';
import { NotFound, SourceLink } from '../shared/ui';

const nav=[
 {id:'intro',label:'五分鐘入門',en:'Start here',icon:'◈'},
 {id:'philosophy',label:'作者與設計觀',en:'The philosophy',icon:'◉'},
 {id:'components',label:'元件探索',en:'Component explorer',icon:'⌘'},
 {id:'workflows',label:'工作流探索',en:'Workflow explorer',icon:'⑂'},
 {id:'learn',label:'引導學習',en:'Guided learning',icon:'▷'},
 {id:'insights',label:'工程實務',en:'Practical insights',icon:'◇'},
];
export default function App(){
 const route=useRoute();
 const [menu,setMenu]=useState(false);
 const [search,setSearch]=useState('');
 const main=useRef<HTMLElement>(null);
 const menuButton=useRef<HTMLButtonElement>(null);
 useEffect(()=>{
  function escape(event:KeyboardEvent){if(event.key==='Escape'&&menu){setMenu(false);menuButton.current?.focus();}}
  window.addEventListener('keydown',escape);
  return()=>window.removeEventListener('keydown',escape);
 },[menu]);
 const title=nav.find(n=>n.id===route.section)?.label??(route.section==='sources'?'來源與證據':route.section==='search'?'搜尋':'找不到頁面');
 useEffect(()=>{document.title=`${title} · pstack Academy`;main.current?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});},[route.path,title]);
 let content;
 if(!route.validShape)content=<NotFound/>;
 else switch(route.section){
  case 'intro':content=route.id?<NotFound/>:<Introduction/>;break;
  case 'components':content=route.id?<ComponentDetail key={route.id} id={route.id}/>:<ComponentExplorer route={route}/>;break;
  case 'workflows':content=route.id?<WorkflowDetail id={route.id} stepParam={route.params.get('step')}/>:<WorkflowExplorer query={route.params.get('q')??''} group={route.params.get('group')??'all'}/>;break;
  case 'learn':content=route.id?<LessonDetail key={route.id} id={route.id}/>:<LearningIndex/>;break;
  case 'philosophy':content=route.id?<NotFound/>:<Philosophy/>;break;
  case 'insights':content=route.id?<NotFound/>:<Insights/>;break;
  case 'sources':content=route.id?<SourceViewer key={route.id} id={route.id} line={route.params.get('line')} end={route.params.get('end')}/>:<SourceIndex query={route.params.get('q')??''}/>;break;
  case 'search':content=route.id?<NotFound/>:<SearchPage query={route.params.get('q')??''}/>;break;
  default:content=<NotFound/>;
 }
 return <LearningProvider><a className="skip-link" href="#main-content" onClick={e=>{e.preventDefault();main.current?.focus();}}>跳到主要內容</a>
  <aside className={`sidebar ${menu?'open':''}`} aria-label="主要導覽"><a className="brand" href="#/intro" onClick={()=>setMenu(false)}><span className="brand-mark" aria-hidden="true"><i/><i/><i/></span><div><strong>pstack<span>academy</span></strong><small>UNDERSTANDING OVER MEMORIZATION</small></div></a>
    <div className="sidebar-section-label">THE LEARNING SPACE</div><nav aria-label="學習章節">{nav.map((item,i)=><a key={item.id} href={`#/${item.id}`} aria-current={route.section===item.id?'page':undefined} className={route.section===item.id?'active':''} onClick={()=>setMenu(false)}><span className="nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}<small>{item.en}</small></span><span className="nav-number mono">0{i+1}</span></a>)}</nav>
    <div className="sidebar-bottom"><a className={`source-nav ${route.section==='sources'?'active':''}`} href="#/sources" onClick={()=>setMenu(false)}><span aria-hidden="true">↗</span> 來源與證據<span className="mono">{catalog.sources.length}</span></a><div className="sidebar-research"><span className="small-dot"/><div><strong>研究版本 v{catalog.snapshot.version}</strong><a href={`https://github.com/backnotprop/pstack/tree/${catalog.snapshot.commit}`} target="_blank" rel="noreferrer">{catalog.snapshot.repo} <span className="mono">{catalog.snapshot.commit.slice(0,7)} ↗</span></a></div></div><p>From source code to understanding.</p></div>
  </aside>
  {menu&&<button className="menu-scrim" aria-label="關閉導覽" onClick={()=>setMenu(false)}/>}
  <div className="app-body"><header className="topbar"><div className="breadcrumbs"><button ref={menuButton} className="menu-toggle" aria-label={menu?'關閉導覽':'開啟導覽'} aria-expanded={menu} onClick={()=>setMenu(v=>!v)}>☰</button><span className="muted-text">學習空間</span><span className="breadcrumb-slash">/</span><strong>{title}</strong></div><form className="global-search" role="search" onSubmit={e=>{e.preventDefault();window.location.hash=`/search?q=${encodeURIComponent(search)}`;setMenu(false);}}><label className="sr-only" htmlFor="global-search">全站搜尋</label><span aria-hidden="true">⌕</span><input id="global-search" type="search" placeholder="搜尋元件與工作流" value={search} onChange={e=>setSearch(e.target.value)}/><button type="submit" aria-label="送出全站搜尋">↵</button></form><span className="topbar-version mono">LOCAL / v{catalog.snapshot.version}</span></header>
    <main id="main-content" tabIndex={-1} ref={main} key={route.path}>{content}</main>
    <footer className="app-footer"><span>pstack Academy <span className="footer-dot">·</span> Understanding over memorization.</span><span>Source pinned <span className="mono">{catalog.snapshot.commit.slice(0,7)}</span> <span className="footer-dot">·</span> <a href="#/sources">查證，而非假設 ↗</a><span className="footer-dot">·</span><SourceLink source={coreRef("license")} label="來源 MIT 授權" compact/></span></footer>
  </div>
 </LearningProvider>;
}
