"""Check research links, source integrity, inventory coverage and repeatability."""

from pathlib import Path
import hashlib
import json
import re
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
ACADEMY = ROOT / "academy"
SNAPSHOT = HERE / "source-snapshot.json"


def digest(path):
    return hashlib.sha256(path.read_bytes()).hexdigest()


errors = []
links = 0
for doc in sorted(p for p in ACADEMY.rglob("*.md") if not {"node_modules", "dist", ".git"}.intersection(p.relative_to(ACADEMY).parts)):
    for target in re.findall(r"\]\(([^)]+)\)", doc.read_text()):
        if "://" in target or target.startswith("#"):
            continue
        links += 1
        if not (doc.parent / target.split("#")[0]).exists():
            errors.append(f"Broken link: {doc.relative_to(ROOT)} -> {target}")

snapshot = json.loads(SNAPSHOT.read_text())
source = ROOT / "pstack"
actual = {
    p.relative_to(source).as_posix(): digest(p)
    for p in source.rglob("*") if p.is_file() and ".git" not in p.parts
}
expected = {entry["path"]: entry["sha256"] for entry in snapshot["files"]}
if actual != expected:
    errors.append("Source file set or SHA-256 differs from research snapshot")
commit = subprocess.check_output(["git", "-C", str(source), "rev-parse", "HEAD"], text=True).strip()
if commit != snapshot["commit"]:
    errors.append("Source commit differs from research snapshot")
status = subprocess.check_output(["git", "-C", str(source), "status", "--porcelain=v1"], text=True)
if status.strip():
    errors.append("Source working tree is not clean")

components = (HERE / "components.md").read_text()
for skill in source.glob("skills/*/SKILL.md"):
    if f"| `{skill.parent.name}` |" not in components:
        errors.append(f"Missing component: {skill.parent.name}")
workflow = (HERE / "workflows.md").read_text()
for playbook in source.glob("skills/poteto-mode/playbooks/*.md"):
    if f"playbooks/{playbook.name})" not in workflow:
        errors.append(f"Missing workflow: {playbook.stem}")
if len(re.findall(r"^## \d{2} ", workflow, re.M)) != snapshot["counts"]["playbooks"]:
    errors.append("Workflow section count differs from inventory")

generated = [HERE / "components.md", SNAPSHOT]
before = [digest(p) for p in generated]
if not errors:
    subprocess.run(["python3", str(HERE / "inventory.py")], check=True, capture_output=True)
    if before != [digest(p) for p in generated]:
        errors.append("Inventory regeneration changed generated research outputs")

print(json.dumps({
    "result": "PASS" if not errors else "FAIL",
    "local_links_checked": links,
    "source_files_checked": len(actual),
    "source_commit": commit,
    "source_working_tree": "clean" if not status.strip() else "dirty",
    "coverage": snapshot["counts"],
    "inventory_regeneration": "checked" if not errors else "see errors",
    "errors": errors,
}, ensure_ascii=False, indent=2))
raise SystemExit(1 if errors else 0)
