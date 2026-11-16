export const PROGRESS_KEY='pstack-academy-progress-v1';
export const CONTENT_VERSION='74bcc61-1';
export interface Progress { version: string; visited: string[]; answers: Record<string,string> }
export function emptyProgress(): Progress { return {version:CONTENT_VERSION,visited:[],answers:{}}; }
export function parseProgress(raw: string | null, allowedLessons: string[], allowedAnswers: Record<string,string[]>): Progress {
  if(!raw)return emptyProgress();
  try{
    const value:unknown=JSON.parse(raw);
    if(!value||typeof value!=='object'||!('version' in value)||value.version!==CONTENT_VERSION||!('visited' in value)||!Array.isArray(value.visited)||!('answers' in value)||!value.answers||typeof value.answers!=='object')return emptyProgress();
    const visited=[...new Set(value.visited.filter((id):id is string=>typeof id==='string'&&allowedLessons.includes(id)))];
    const answers=Object.fromEntries(Object.entries(value.answers).filter(([id,choice])=>typeof choice==='string'&&allowedAnswers[id]?.includes(choice)));
    return {version:CONTENT_VERSION,visited,answers};
  }catch{return emptyProgress();}
}
export type ProgressAction={type:'answer';question:string;choice:string}|{type:'visit';lesson:string}|{type:'clear'};
export function progressReducer(state: Progress, action: ProgressAction): Progress {
  switch(action.type){
    case 'answer':return {...state,answers:{...state.answers,[action.question]:action.choice}};
    case 'visit':return {...state,visited:[...new Set([...state.visited,action.lesson])]};
    case 'clear':return emptyProgress();
  }
}
