import generated from './generated.json';
import type { Curriculum, GraphNode, SourceRef } from './model';

export const catalog = generated as Curriculum;
export const components = catalog.components;
export const workflows = catalog.workflows;
export const relationships = catalog.relationships;
export const componentById = new Map(components.map((item) => [item.id, item]));
export const workflowById = new Map(workflows.map((item) => [item.id, item]));
export const sourceById = new Map(catalog.sources.map((item) => [item.id, item]));
export const graphNodes = new Map<string, GraphNode>([
  ...components.map((item): [string, GraphNode] => [item.id, { ...item, href: `#/components/${item.id}` }]),
  ...workflows.map((item): [string, GraphNode] => [`wf:${item.id}`, { id: `wf:${item.id}`, name: item.name, title: item.title, href: `#/workflows/${item.id}` }]),
]);
export function componentRef(id: string): SourceRef {
  const component = componentById.get(id);
  if (!component) throw new Error(`Unknown curriculum component: ${id}`);
  return component.source;
}
export function workflowRef(id: string): SourceRef {
  const workflow = workflowById.get(id);
  if (!workflow) throw new Error(`Unknown curriculum workflow: ${id}`);
  return workflow.source;
}
export function coreRef(id: string): SourceRef {
  const ref = catalog.coreRefs[id];
  if (!ref) throw new Error(`Unknown source reference: ${id}`);
  return ref;
}
export const kindLabels: Record<string, string> = {
  skill: '技能', agent: 'Agent', tool: '程式工具', 'automation-instruction': 'Automation 指令', principle: '工程原則',
};
export const relationLabels: Record<string, string> = {
  invokes: '要求使用', conditional: '條件式使用', references: '參考', recommends: '建議後續', protocol: '交接契約', runs: '工具入口',
};
