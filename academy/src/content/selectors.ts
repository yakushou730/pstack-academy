import type { Component, GraphPath, Relationship, RelationKind } from './model';

export function searchComponents(items: Component[], query: string, kind = 'all') {
  const terms = query.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return items.filter((item) => (kind === 'all' || item.kind === kind || item.subtype === kind)
    && terms.every((term) => [item.name, item.title, item.purpose, item.trigger, item.inputs, item.outputs, item.example, item.declaration].join(' ').toLocaleLowerCase().includes(term)));
}

export function relationPaths(start: string, edges: Relationship[], depth: 1 | 2, kinds: RelationKind[], direction: 'out' | 'in' | 'both' = 'both'): GraphPath[] {
  const paths: GraphPath[] = [];
  const walk = (nodes: string[], visitedEdges: Relationship[]) => {
    if (visitedEdges.length >= depth) return;
    const current = nodes.at(-1);
    for (const edge of edges) {
      if (!kinds.includes(edge.kind)) continue;
      const next = edge.from === current && direction !== 'in' ? edge.to
        : edge.to === current && direction !== 'out' ? edge.from : undefined;
      if (!next || nodes.includes(next)) continue;
      const path = { nodes: [...nodes, next], edges: [...visitedEdges, edge] };
      paths.push(path);
      walk(path.nodes, path.edges);
    }
  };
  walk([start], []);
  return paths;
}

export function safeStep(raw: string | null, count: number): number {
  const value = raw === null ? 0 : Number(raw);
  return Number.isInteger(value) && value >= 0 && value < count ? value : 0;
}
