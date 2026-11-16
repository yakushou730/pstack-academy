import { authorSources } from '../content/editorial';
import { createContext, useContext, useEffect, useReducer, useState, type Dispatch, type ReactNode } from 'react';
import { introQuestions, lessons, type Question } from '../content/lessons';
import { emptyProgress, parseProgress, PROGRESS_KEY, progressReducer, type Progress, type ProgressAction } from '../content/progress';
import { Badge, NotFound, PageHeading, Panel, SourceLink } from '../shared/ui';

const allQuestions=[...introQuestions,...lessons.flatMap(l=>l.questions)];
const answerOptions=Object.fromEntries(allQuestions.map(q=>[q.id,q.options.map(o=>o.id)]));
const ProgressContext=createContext<{progress:Progress;dispatch:Dispatch<ProgressAction>;storageAvailable:boolean}>({progress:emptyProgress(),dispatch:()=>{},storageAvailable:true});
export function LearningProvider({children}:{children:ReactNode}){
  const [storageAvailable,setAvailable]=useState(true);
  const [progress,dispatch]=useReducer(progressReducer,undefined,()=>{if(typeof window==='undefined')return emptyProgress();try{return parseProgress(window.localStorage.getItem(PROGRESS_KEY),lessons.map(l=>l.id),answerOptions);}catch{return emptyProgress();}});
  useEffect(()=>{try{window.localStorage.setItem(PROGRESS_KEY,JSON.stringify(progress));}catch{setAvailable(false);}},[progress]);
  return <ProgressContext value={{progress,dispatch,storageAvailable}}>{children}</ProgressContext>;
}
export function KnowledgeCheck({question}:{question:Question}){
  const {progress,dispatch}=useContext(ProgressContext);
  const answer=question.options.find(o=>o.id===progress.answers[question.id]);
  const articleSource=authorSources.find(s=>s.id===question.articleSourceId);
  return <section className="quiz-card"><div className="eyebrow">KNOWLEDGE CHECK</div><h3>{question.title}</h3><p>{question.scenario}</p><div className="quiz-options" role="group" aria-label={question.title}>{question.options.map((option,i)=><button key={option.id} className={answer?.id===option.id?`chosen ${option.correct?'correct':'incorrect'}`:''} aria-pressed={answer?.id===option.id} onClick={()=>dispatch({type:'answer',question:question.id,choice:option.id})}><span className="option-letter">{String.fromCharCode(65+i)}</span><span>{option.text}</span>{answer?.id===option.id&&<span aria-hidden="true">{option.correct?'✓':'↻'}</span>}</button>)}</div>{answer&&<div className={`answer-feedback ${answer.correct?'correct':'incorrect'}`} role="status"><strong>{answer.correct?'理解正確':'再想一想，可以重試'}</strong><p>{answer.feedback}</p><SourceLink source={question.source} label="對照固定版本實作" compact/>{articleSource&&<p><a className="text-link" href={articleSource.url} target="_blank" rel="noreferrer">作者文章：{articleSource.title} ↗</a></p>}</div>}</section>;
}
export function LearningIndex(){
  const {progress,dispatch,storageAvailable}=useContext(ProgressContext);
  const answered=lessons.flatMap(l=>l.questions).filter(q=>progress.answers[q.id]);
  return <><PageHeading eyebrow="05 / GUIDED LEARNING" title="理解，從做一次選擇開始。" description="把工程概念放進具體情境。這裡的 Simulation 使用合成資料，不會執行 pstack、TLC 或任何帳號操作。"><span className="badge simulation">Simulation · 教學模擬</span></PageHeading>
    <div className="learning-summary"><div><span className="eyebrow">YOUR LEARNING TRAIL</span><h2>{progress.visited.length} / {lessons.length} <small>單元已看過</small></h2><p>已作答 {answered.length} / {lessons.flatMap(l=>l.questions).length} 個情境問題。閱讀與作答紀錄不等於已掌握知識。</p></div><button className="button" onClick={()=>dispatch({type:'clear'})}>清除本機學習紀錄</button></div>
    {!storageAvailable&&<div className="notice" role="status">瀏覽器未允許儲存，現在以記憶體保留本次進度；所有探索功能仍可使用。</div>}
    <div className="lesson-grid">{lessons.map((lesson,i)=><a className="lesson-card" href={`#/learn/${lesson.id}`} key={lesson.id}><div className="lesson-illustration"><span className="lesson-abstract" aria-hidden="true">{lesson.icon}</span><span className="lesson-number mono">0{i+1}</span><span className="badge simulation">Simulation</span></div><div className="lesson-copy"><div className="eyebrow">{lesson.duration} · {lesson.questions.length} 個決策</div><h2>{lesson.title}</h2><h3>{lesson.subtitle}</h3><p>{lesson.description}</p><span className="text-link">{progress.visited.includes(lesson.id)?'重新探索':'開始情境'} →</span></div></a>)}</div>
    <Panel title="把設計方法帶回自己的工作流"><div className="learning-path">{['認識系統','選擇流程','理解協作','理解驗證','應用設計'].map((label,i)=><span key={label}><small>0{i+1}</small>{label}{i<4&&<b aria-hidden="true">→</b>}</span>)}</div><p className="muted-text">建議先走完五分鐘入門，再探索一條工作流、閱讀它的來源，最後回到這裡做決策。</p><a className="text-link" href="#/insights">看看哪些設計值得借鑑 →</a></Panel>
  </>;
}
export function LessonDetail({id}:{id:string}){
  const lesson=lessons.find(l=>l.id===id);
  const {progress,dispatch}=useContext(ProgressContext);
  const [index,setIndex]=useState(0);
  useEffect(()=>{if(lesson)dispatch({type:'visit',lesson:lesson.id});},[lesson,dispatch]);
  if(!lesson)return <NotFound/>;
  const question=lesson.questions[index];
  if(!question)return <NotFound/>;
  const answer=question.options.find(o=>o.id===progress.answers[question.id]);
  const done=lesson.questions.every(q=>q.options.some(o=>o.correct&&o.id===progress.answers[q.id]));
  return <><a className="back-link" href="#/learn">← 引導學習</a><PageHeading eyebrow={`SIMULATION / ${lesson.subtitle}`} title={lesson.title} description={lesson.description}><span className="badge simulation">Simulation · 合成情境，非真實執行</span></PageHeading>
    <div className="simulation-layout"><aside className="simulation-context"><span className="eyebrow">SCENARIO NOTES</span><div className="scenario-symbol" aria-hidden="true">{lesson.icon}</div><h2>{lesson.subtitle}</h2><p>{lesson.context??(id==='debug'?'先看見錯誤，再理解機制，最後用同一路徑證明修正。':id==='shipping'?'ready、verified、authorized、merged，是不同的狀態與證據。':'模型、程式與真實系統之間，必須保留範圍與假設。')}</p><Badge kind="inference" execution="conceptual"/><p className="caption">情境由教學者合成，判斷標準來自右側可追溯來源。</p>{lesson.workflowId&&<a className="text-link" href={`#/workflows/${lesson.workflowId}`}>查看對應 Playbook →</a>}</aside><div><div className="step-progress"><span className="eyebrow">DECISION {index+1} / {lesson.questions.length}</span><button className="text-button" onClick={()=>{setIndex(0);for(const q of lesson.questions)dispatch({type:'answer',question:q.id,choice:''});}}>重新開始 ↻</button></div>
      <KnowledgeCheck question={question}/><div className="step-navigation"><button className="button" disabled={index===0} onClick={()=>setIndex(i=>i-1)}>← 上一題</button>{index<lesson.questions.length-1?<button className="button primary" disabled={!answer?.correct} onClick={()=>setIndex(i=>i+1)}>下一個決策 →</button>:<a className="button" href="#/learn">返回學習路徑 →</a>}</div>
      {done&&<div className="completion-panel" role="status"><span aria-hidden="true">✓</span><h2>你已走完這個情境。</h2><p>下一步，打開判斷背後的原始碼，確認規則在哪裡成立，以及它的邊界。</p><SourceLink source={question.source} label="回到證據"/></div>}
    </div></div>
  </>;
}
