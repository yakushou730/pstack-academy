export type EvidenceKind = 'implementation' | 'author' | 'inference' | 'unknown';
export type ExecutionKind = 'instruction' | 'code' | 'conceptual';
export interface SourceRef { sourceId: string; startLine: number; endLine: number }
export interface SourceFile { id: string; path: string; lineCount: number; sha256: string; url: string }
export interface Component {
  id: string; name: string; title: string; kind: 'skill' | 'agent' | 'tool' | 'automation-instruction';
  subtype: string; purpose: string; trigger: string; inputs: string; outputs: string; example: string;
  evidenceKind: EvidenceKind; executionKind: ExecutionKind; source: SourceRef;
  declaration: string; limits: string;
}
export interface Step {
  id: string; title: string; source: SourceRef; excerpt: string; componentIds: string[];
  condition: string | null; why: string; inputs: string; outputs: string;
}
export interface Workflow {
  id: string; name: string; title: string; purpose: string; prerequisites: string; outputs: string;
  failure: string; source: SourceRef; steps: Step[]; stepMode: string; entry: string;
  evidenceKind: EvidenceKind; executionKind: ExecutionKind; limits: string;
}
export type RelationKind = 'invokes' | 'conditional' | 'references' | 'recommends' | 'protocol' | 'runs';
export interface Relationship { id: string; from: string; to: string; kind: RelationKind; condition: string; source: SourceRef }
export interface Curriculum {
  snapshot: { commit: string; version: string; researchDate: string; repo: string; upstream: string };
  components: Component[]; workflows: Workflow[]; relationships: Relationship[]; sources: SourceFile[];
  coreRefs: Record<string, SourceRef>;
}
export interface GraphNode { id: string; title: string; name: string; href: string }
export interface GraphPath { nodes: string[]; edges: Relationship[] }
