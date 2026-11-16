import { describe, expect, it } from 'vitest';
import { readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { catalog, componentById, graphNodes, sourceById, componentRef, workflowRef } from '../src/content/catalog';
import { authorSources, insights } from '../src/content/editorial';
import { introQuestions, lessons } from '../src/content/lessons';
import type { SourceRef } from '../src/content/model';

function verifyRef(ref: SourceRef) {
  const file=sourceById.get(ref.sourceId);
  expect(file,ref.sourceId).toBeDefined();
  expect(ref.startLine).toBeGreaterThanOrEqual(1);
  expect(ref.endLine).toBeGreaterThanOrEqual(ref.startLine);
  expect(ref.endLine).toBeLessThanOrEqual(file!.lineCount);
}
describe('pinned, traceable curriculum',()=>{
  it('covers every researched Skill and Playbook with unique IDs',()=>{
    const snapshot=JSON.parse(readFileSync('research/source-snapshot.json','utf8')) as {files:{path:string}[]};
    const skills=snapshot.files.map(f=>f.path).filter(p=>/^skills\/[^/]+\/SKILL.md$/.test(p)).map(p=>p.split('/')[1]);
    const playbooks=snapshot.files.map(f=>f.path).filter(p=>/^skills\/poteto-mode\/playbooks\/[^/]+\.md$/.test(p)).map(p=>p.split('/').at(-1)!.replace('.md',''));
    expect(catalog.components.filter(c=>c.kind==='skill').map(c=>c.id).sort()).toEqual(skills.sort());
    expect(catalog.workflows.map(w=>w.id).sort()).toEqual(playbooks.sort());
    expect(new Set(catalog.components.map(c=>c.id)).size).toBe(catalog.components.length);
    expect(catalog.components.filter(c=>c.subtype==='principle')).toHaveLength(24);
  });
  it('packages inert source text with original hashes, line counts and pinned URLs',()=>{
    for(const file of catalog.sources){
      const payload=JSON.parse(readFileSync(`public/sources/${file.id}.json`,'utf8')) as {text:string;commit:string;path:string};
      expect(payload.commit).toBe(catalog.snapshot.commit);
      expect(payload.path).toBe(file.path);
      expect(createHash('sha256').update(payload.text).digest('hex')).toBe(file.sha256);
      expect(payload.text.replace(/\n$/,'').split('\n').length).toBe(file.lineCount);
      expect(file.url).toContain(`/blob/${catalog.snapshot.commit}/`);
    }
  });
  it('links every step to its exact source excerpt and to real components',()=>{
    for(const flow of catalog.workflows){
      verifyRef(flow.source);
      expect(flow.steps.length).toBeGreaterThan(0);
      for(const step of flow.steps){
        verifyRef(step.source);
        const payload=JSON.parse(readFileSync(`public/sources/${step.source.sourceId}.json`,'utf8')) as {text:string};
        expect(payload.text.split('\n').slice(step.source.startLine-1,step.source.endLine).join('\n')).toBe(step.excerpt);
        for(const id of step.componentIds)expect(componentById.has(id),`${flow.id} -> ${id}`).toBe(true);
      }
    }
  });
  it('requires evidence for every reviewed edge and never creates dangling graph nodes',()=>{
    expect(new Set(catalog.relationships.map(r=>r.id)).size).toBe(catalog.relationships.length);
    for(const edge of catalog.relationships){
      expect(graphNodes.has(edge.from),edge.from).toBe(true);
      expect(graphNodes.has(edge.to),edge.to).toBe(true);
      expect(edge.condition).not.toBe('');
      verifyRef(edge.source);
    }
    for(const item of catalog.components)verifyRef(item.source);
    for(const item of insights)verifyRef(item.source);
  });
  it('has three simulations and evidence-backed answers with one correct choice each',()=>{
    expect(lessons).toHaveLength(3);
    const questions=[...introQuestions,...lessons.flatMap(l=>l.questions)];
    expect(new Set(questions.map(q=>q.id)).size).toBe(questions.length);
    expect(lessons.flatMap(l=>l.questions)).toHaveLength(6);
    for(const question of questions){
      verifyRef(question.source);
      expect(question.options.filter(o=>o.correct)).toHaveLength(1);
      expect(question.options.every(o=>o.feedback.length>15)).toBe(true);
      expect(new Set(question.options.map(o=>o.id)).size).toBe(question.options.length);
    }
  });
  it('keeps unverified external content explicitly unavailable',()=>{
    for(const id of ['x-blog','youtube']){
      const source=authorSources.find(s=>s.id===id)!;
      expect(source.access).toBe('unavailable');
      expect(source.timestamps).toBeUndefined();
      expect(source.limitation.length).toBeGreaterThan(25);
    }
    expect(()=>componentRef('invented-skill')).toThrow();
    expect(()=>workflowRef('invented-flow')).toThrow();
  });
});
