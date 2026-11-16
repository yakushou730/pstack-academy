import { describe, expect, it } from 'vitest';
import { relationPaths, safeStep, searchComponents } from '../src/content/selectors';
import { components, relationships } from '../src/content/catalog';
import { parseRoute } from '../src/app/route';
import type { Relationship } from '../src/content/model';
const source={sourceId:'fixture',startLine:1,endLine:1};
function edge(id:string,from:string,to:string,kind:Relationship['kind']='invokes'):Relationship{return {id,from,to,kind,condition:'test fixture',source};}
describe('exploration behavior',()=>{
 it('preserves direct and transitive paths to the same target without looping through cycles',()=>{
  const edges=[edge('a','A','B'),edge('b','B','C'),edge('c','A','C'),edge('d','C','A')];
  const paths=relationPaths('A',edges,2,['invokes'],'out');
  expect(paths.some(p=>p.nodes.join('>')==='A>C')).toBe(true);
  expect(paths.some(p=>p.nodes.join('>')==='A>B>C')).toBe(true);
  expect(paths.every(p=>new Set(p.nodes).size===p.nodes.length)).toBe(true);
  expect(paths.every(p=>p.edges.length<=2)).toBe(true);
 });
 it('does not traverse filtered reference edges or reverse directed searches',()=>{
  const edges=[edge('a','A','B','references'),edge('b','B','C'),edge('c','D','A')];
  expect(relationPaths('A',edges,2,['invokes'],'out')).toEqual([]);
  expect(relationPaths('A',edges,2,['invokes'],'in').map(p=>p.nodes.join('>'))).toEqual(['A>D']);
 });
 it('finds architect direct arena and separate conditional Feature mappings',()=>{
  expect(relationPaths('architect',relationships,1,['invokes'],'out').some(p=>p.nodes.at(-1)==='arena')).toBe(true);
  const paths=relationPaths('wf:feature',relationships,2,['invokes','conditional'],'out');
  expect(paths.some(p=>p.nodes.join('>')==='wf:feature>architect>arena')).toBe(true);
  expect(paths.some(p=>p.nodes.join('>')==='wf:feature>arena')).toBe(true);
 });
 it('searches Chinese, English, multiple terms and the principle subset without changing the catalog',()=>{
  expect(searchComponents(components,'架構設計').some(c=>c.id==='architect')).toBe(true);
  expect(searchComponents(components,'ArChItEcT').some(c=>c.id==='architect')).toBe(true);
  expect(searchComponents(components,'型別 邊界','principle').length).toBeGreaterThan(0);
  expect(searchComponents(components,'','principle')).toHaveLength(24);
  expect(searchComponents(components,'不存在-zzzz')).toEqual([]);
  expect(components).toHaveLength(69);
 });
 it('restores step deep links and keeps invalid routes or indices within safe boundaries',()=>{
  const route=parseRoute('#/workflows/bug-fix?step=3');
  expect(route.id).toBe('bug-fix');expect(safeStep(route.params.get('step'),6)).toBe(3);
  for(const input of ['-1','99','NaN','1.5','Infinity'])expect(safeStep(input,6)).toBe(0);
  expect(parseRoute('').section).toBe('intro');
  expect(parseRoute('#/components/a/extra').validShape).toBe(false);
  expect(parseRoute('#/components?q=架構&kind=skill').params.get('q')).toBe('架構');
 });
});
