"""Package pinned source as inert text, and build the edited Academy curriculum."""

from pathlib import Path
import hashlib
import json
import re
import subprocess
from step_teaching import CORE, REASONS
from content_spec import (COMPONENT_ROWS, PRINCIPLE_ROWS, WORKFLOW_ROWS,
                          EXTRA_COMPONENTS, RELATIONS, STEP_COMPONENTS, STEP_CONDITIONS)

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT.parent / 'pstack'
SNAPSHOT = json.loads((ROOT / 'research/source-snapshot.json').read_text())
COMMIT = SNAPSHOT['commit']
assert subprocess.check_output(['git', '-C', str(SOURCE), 'rev-parse', 'HEAD'], text=True).strip() == COMMIT, 'Source commit drift: review research before updating content.'
expected = {row['path']: row['sha256'] for row in SNAPSHOT['files']}
actual = {p.relative_to(SOURCE).as_posix(): hashlib.sha256(p.read_bytes()).hexdigest()
          for p in SOURCE.rglob('*') if p.is_file() and '.git' not in p.parts}
assert actual == expected, 'Source file drift: review research before updating content.'

sources = {}

def source_ref(path, marker=None, start=None, end=None):
    assert path in expected, f'Source outside pinned allowlist: {path}'
    text = (SOURCE / path).read_text()
    lines = text.splitlines()
    ident = hashlib.sha256(path.encode()).hexdigest()[:12]
    sources[ident] = {'id': ident, 'path': path, 'lineCount': len(lines),
                      'sha256': expected[path], 'url': f'https://github.com/backnotprop/pstack/blob/{COMMIT}/{path}'}
    if marker:
        matches = [i+1 for i, line in enumerate(lines) if marker in line]
        assert matches, f'Missing evidence marker {marker!r} in {path}'
        start = matches[0]
        end = min(start+5, len(lines))
    start, end = start or 1, end or len(lines)
    assert 1 <= start <= end <= len(lines), f'Invalid source range {path}:{start}-{end}'
    return {'sourceId': ident, 'startLine': start, 'endLine': end}


def rows(text):
    return [line.strip().split('|') for line in text.strip().splitlines()]


def frontmatter_description(text):
    match = re.search(r'^description:\s*(.*?)(?=\n\S|\Z)', text.split('---', 2)[1], re.M | re.S)
    value = match[1].strip() if match else ''
    if value.startswith('>-'):
        value = ' '.join(value.splitlines()[1:]).strip()
    if value.startswith('"'):
        value = json.loads(value)
    return value


components = []
for ident, title, purpose, trigger, inputs, outputs, example in rows(COMPONENT_ROWS):
    path = f'skills/{ident}/SKILL.md'
    components.append({'id':ident,'name':ident,'title':title,'kind':'skill','subtype':'workflow',
        'purpose':purpose,'trigger':trigger,'inputs':inputs,'outputs':outputs,'example':example,
        'evidenceKind':'implementation','executionKind':'instruction','source':source_ref(path),
        'declaration':frontmatter_description((SOURCE/path).read_text()),
        'limits':'這是 Skill 的文字規範；能否執行取決於宿主工具與授權，不是自動強制保證。'})
for slug, title, purpose, trigger, inputs, outputs, example in rows(PRINCIPLE_ROWS):
    ident = f'principle-{slug}'
    path = f'skills/{ident}/SKILL.md'
    components.append({'id':ident,'name':ident,'title':title,'kind':'skill','subtype':'principle',
        'purpose':purpose,'trigger':trigger,'inputs':inputs,'outputs':outputs,'example':example,
        'evidenceKind':'implementation','executionKind':'instruction','source':source_ref(path),
        'declaration':frontmatter_description((SOURCE/path).read_text()),
        'limits':'原則用來影響工程決策；它沒有獨立 runtime、固定檔案產物或自動 enforcement。'})
for ident, title, kind, path, purpose, inputs, outputs, example in EXTRA_COMPONENTS:
    components.append({'id':ident,'name':ident,'title':title,'kind':kind,'subtype':kind,
        'purpose':purpose,'trigger': ('由對應操作文件或工具入口使用。' if kind != 'agent' else '由 parent 在限定 scope 內委派。'),
        'inputs':inputs,'outputs':outputs,'example':example,'source':source_ref(path),
        'declaration':'','evidenceKind':'implementation','executionKind':'code' if kind=='tool' else 'instruction',
        'limits':'本學院只讀取來源與示範，不執行此工具。' if kind=='tool' else '操作規範需要外部宿主／工具配合；不是已啟用的服務。'})
component_map = {c['id']:c for c in components}
assert len(component_map) == len(components)
assert {p.parent.name for p in SOURCE.glob('skills/*/SKILL.md')} == {c['id'] for c in components if c['kind']=='skill'}

workflows = []
for ident, title, purpose, prerequisites, outputs, failure, step_titles in rows(WORKFLOW_ROWS):
    path = f'skills/poteto-mode/playbooks/{ident}.md'
    lines = (SOURCE/path).read_text().splitlines()
    sections = [i for i,line in enumerate(lines) if re.match(r'^\d+\. ',line)]
    mode = 'numbered'
    if ident == 'opening-a-pr':
        sections = [i for i,line in enumerate(lines) if re.match(r'^\*\*(?:Worktree|Commits|PRs|Titles|Descriptions|Forge|Built-in PR tool|Size and stacks|Readiness|Babysit)\.',line)]
        mode = 'sections'
    if ident == 'orchestrate':
        sections = [i for i,line in enumerate(lines) if line.startswith('#### ')]
        mode = 'sections'
    titles = step_titles.split(';')
    assert len(sections)==len(titles), f'Step coverage mismatch {ident}: source {len(sections)}, edited {len(titles)}'
    steps=[]
    for n, (begin, label) in enumerate(zip(sections,titles)):
        finish = sections[n+1] if n+1<len(sections) else next((i for i in range(begin+1,len(lines)) if lines[i].startswith('**Reply:')), len(lines))
        while finish>begin and not lines[finish-1].strip(): finish-=1
        comps = STEP_COMPONENTS.get(ident,{}).get(n,[])
        assert all(c in component_map for c in comps), f'Dangling step component {ident}'
        steps.append({'id':f'{ident}-{n+1}','title':label,'source':source_ref(path,start=begin+1,end=finish),
            'excerpt':'\n'.join(lines[begin:finish]),'componentIds':comps,
            'condition':STEP_CONDITIONS.get((ident,n)),
            'why':CORE[ident][n][0] if ident in CORE else REASONS[ident][n],
            'inputs':CORE[ident][n][1] if ident in CORE else (prerequisites if n==0 else '上一階段的實際產物與證據；細節以此步原文為準。'),
            'outputs':CORE[ident][n][2] if ident in CORE else (outputs if n==len(titles)-1 else '本步要求的觀察、決策或產物，請見下方完整原文；未定義固定格式時不補設 schema。')})
    workflows.append({'id':ident,'name':ident,'title':title,'purpose':purpose,'prerequisites':prerequisites,
        'outputs':outputs,'failure':failure,'source':source_ref(path),'steps':steps,'stepMode':mode,
        'entry':'使用者啟用 poteto-mode，由宿主 Agent 依任務路由；Playbook 本身不是獨立 executable command。',
        'evidenceKind':'implementation','executionKind':'instruction',
        'limits': '本頁是原文分區的教學投影，不是原作者定義的線性執行順序。' if mode=='sections' else '順序對應原文步驟；條件、例外與回復依來源，不代表 runtime trace。'})
assert {p.stem for p in SOURCE.glob('skills/poteto-mode/playbooks/*.md')}=={w['id'] for w in workflows}

relationships=[]
for n,(a,b,kind,condition,marker) in enumerate(RELATIONS):
    assert a in component_map and b in component_map
    src = sources[component_map[a]['source']['sourceId']]['path']
    relationships.append({'id':f'rel-{n}','from':a,'to':b,'kind':kind,'condition':condition,'source':source_ref(src,marker)})
for workflow in workflows:
    for step in workflow['steps']:
        for target in step['componentIds']:
            relationships.append({'id':f"{step['id']}--{target}",'from':f"wf:{workflow['id']}",'to':target,
                'kind':'conditional' if step['condition'] else 'invokes',
                'condition':step['condition'] or f"原文步驟：{step['title']}。",'source':step['source']})

# These supplemental documents are explicitly part of the teaching source allowlist.
core_refs={}
for key,path in {
 'license':'LICENSE','readme':'README.md','manifest':'.cursor-plugin/plugin.json','mirror':'MIRROR.md','sync':'SYNC-LOG.md',
 'claude-adapter':'docs/harness/claude-code.md','watch-types':'skills/poteto-mode/scripts/watch-pr/types.ts',
 'watch-cli':'skills/poteto-mode/scripts/watch-pr/cli.ts','statechart-pipeline':'skills/statechart/scripts/pipeline.ts',
 'statechart-run':'skills/statechart/scripts/run.ts','benny-intent':'automations/benny/FOR_AGENTS.md',
 'benny-readme':'automations/benny/README.md','benny-config':'automations/benny/templates/configuration.example.yaml',
 'comment-reference':'skills/no-comments/references/comment-sicko.md',
 'formal-maintenance':'skills/maintain-formal-verification-skill/SKILL.md',
 'verify-template':'skills/create-verification-skill/references/feature-map-example/README.md',
}.items(): core_refs[key]=source_ref(path)

out = ROOT/'public/sources'
out.mkdir(parents=True,exist_ok=True)
for ident,entry in sources.items():
    payload={**entry,'commit':COMMIT,'text':(SOURCE/entry['path']).read_text()}
    (out/f'{ident}.json').write_text(json.dumps(payload,ensure_ascii=False)+'\n')
for old in out.glob('*.json'):
    if old.stem not in sources: old.unlink()

data={'snapshot':{'commit':COMMIT,'version':SNAPSHOT['version'],'researchDate':'2026-11-16','repo':'backnotprop/pstack','upstream':'cursor/plugins/pstack'},
      'components':components,'workflows':workflows,'relationships':relationships,'sources':list(sources.values()),'coreRefs':core_refs}
(ROOT/'src/content/generated.json').write_text(json.dumps(data,ensure_ascii=False,indent=2)+'\n')
print(f"Content verified: {len(components)} components (58 skills), {len(workflows)} playbooks, {sum(len(w['steps']) for w in workflows)} source-backed steps, {len(relationships)} reviewed relationships, {len(sources)} inert source files.")
