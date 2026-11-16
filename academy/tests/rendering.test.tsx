import { describe, expect, it } from 'vitest';
import { renderToStaticMarkup } from 'react-dom/server';
import { Introduction } from '../src/features/Introduction';
import { ComponentDetail, ComponentExplorer } from '../src/features/Explorer';
import { WorkflowDetail, WorkflowExplorer } from '../src/features/Workflows';
import { LearningIndex, LearningProvider, LessonDetail } from '../src/features/Learning';
import { Philosophy } from '../src/features/Philosophy';
import { Insights } from '../src/features/Insights';
import { SourceViewer } from '../src/features/Sources';
import { parseRoute } from '../src/app/route';
import { components, workflows } from '../src/content/catalog';

// Server rendering checks reachability and escaped markup; it is not browser interaction QA.
describe('rendered curriculum boundaries',()=>{
 it('renders the six sections with one h1 and without executable research HTML',()=>{
  const views=[<Introduction/>,<Philosophy/>,<ComponentExplorer route={parseRoute('#/components')}/>,<WorkflowExplorer query="" group="all"/>,<LearningIndex/>,<Insights/>];
  for(const view of views){
   const markup=renderToStaticMarkup(<LearningProvider>{view}</LearningProvider>);
   expect(markup.match(/<h1>/g)).toHaveLength(1);
   expect(markup).not.toContain('<script');
  }
 });
 it('renders every component and every workflow step to a source-backed detail page',()=>{
  for(const component of components){
   const markup=renderToStaticMarkup(<ComponentDetail id={component.id}/>);
   expect(markup).toContain('閱讀完整定義');expect(markup).not.toContain('找不到這個頁面');
  }
  for(const flow of workflows)for(let index=0;index<flow.steps.length;index++){
   const markup=renderToStaticMarkup(<WorkflowDetail id={flow.id} stepParam={String(index)}/>);
   expect(markup).toContain('在 Source Viewer 開啟');expect(markup).not.toContain('找不到這個頁面');
   expect(markup).toContain('唯讀導覽');
  }
 });
 it('marks each educational scenario as Simulation and handles unknown IDs explicitly',()=>{
  for(const id of ['debug','shipping','formal']){
   const markup=renderToStaticMarkup(<LearningProvider><LessonDetail id={id}/></LearningProvider>);
   expect(markup).toContain('Simulation');expect(markup).toContain('非真實執行');
  }
  expect(renderToStaticMarkup(<ComponentDetail id="nonexistent"/>)).toContain('找不到這個頁面');
  expect(renderToStaticMarkup(<SourceViewer id="../../etc/passwd" line={null} end={null}/>)).toContain('找不到這個頁面');
 });
});
