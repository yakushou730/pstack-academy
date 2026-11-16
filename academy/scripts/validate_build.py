"""Validate shipped static assets and pinned source payloads without starting a server."""
from pathlib import Path
import hashlib
import json
import re
from urllib.parse import urljoin, urlparse

root=Path(__file__).resolve().parents[1]
data=json.loads((root/'src/content/generated.json').read_text())
dist=root/'dist'
index=(dist/'index.html').read_text()
assets=re.findall(r'(?:src|href)="(\./assets/[^"?#]+)"',index)
assert assets, 'No generated JS/CSS assets in production index'
assert not re.search(r'(?:src|href)="/(?!/)', index), 'Root-relative asset URL breaks project Pages paths'
assert (dist/'.nojekyll').is_file(), 'Missing static Pages marker'
assert not (dist/'CNAME').exists(), 'Project must inherit the existing user-site domain'
for asset in assets:
    assert (dist/asset).is_file(), f'Missing production asset: {asset}'
    assert urlparse(urljoin('https://blog.yakushou.com/pstack-academy/', asset)).path.startswith('/pstack-academy/'), f'Asset escapes project path: {asset}'
for source in data['sources']:
    path=dist/'sources'/f"{source['id']}.json"
    payload=json.loads(path.read_text())
    assert payload['commit']==data['snapshot']['commit'], f'Wrong commit in {path}'
    assert hashlib.sha256(payload['text'].encode()).hexdigest()==source['sha256'], f'Hash mismatch in {path}'
assert len(list((dist/'sources').glob('*.json')))==len(data['sources']), 'Unexpected stale source payload'
assert not (dist/'node_modules').exists()
print(f"Static output verified: {len(assets)} entry assets, {len(data['sources'])} pinned source payloads, no runtime dependency on ../pstack.")
