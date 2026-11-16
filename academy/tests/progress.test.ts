import { describe, expect, it } from 'vitest';
import { emptyProgress, parseProgress, progressReducer, CONTENT_VERSION } from '../src/content/progress';
const allowed={q:['a','b']};
describe('local-only learning progress',()=>{
 it('rejects malformed or stale storage and filters unknown content or answer IDs',()=>{
  expect(parseProgress('not json',['debug'],allowed)).toEqual(emptyProgress());
  expect(parseProgress(JSON.stringify({version:'old',visited:['debug'],answers:{q:'a'}}),['debug'],allowed)).toEqual(emptyProgress());
  expect(parseProgress(JSON.stringify({version:CONTENT_VERSION,visited:['debug','injected','debug'],answers:{q:'a',fake:'b'}}),['debug'],allowed)).toEqual({version:CONTENT_VERSION,visited:['debug'],answers:{q:'a'}});
  expect(parseProgress(JSON.stringify({version:CONTENT_VERSION,visited:[],answers:{q:'invalid'}}),['debug'],allowed).answers).toEqual({});
 });
 it('allows correcting an answer, deduplicates visits and clears without pretending knowledge mastery',()=>{
  let state=progressReducer(emptyProgress(),{type:'answer',question:'q',choice:'a'});
  state=progressReducer(state,{type:'answer',question:'q',choice:'b'});
  state=progressReducer(state,{type:'visit',lesson:'debug'});
  state=progressReducer(state,{type:'visit',lesson:'debug'});
  expect(state.answers.q).toBe('b');expect(state.visited).toEqual(['debug']);
  expect(progressReducer(state,{type:'clear'})).toEqual(emptyProgress());
 });
});
