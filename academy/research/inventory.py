"""Reproduce the research inventory without running any pstack code."""

from pathlib import Path
from collections import Counter
import hashlib
import json
import re
import subprocess

HERE = Path(__file__).resolve().parent
ROOT = HERE.parents[1]
SOURCE = ROOT / "pstack"


def description(text):
    frontmatter = text.split("---", 2)[1]
    match = re.search(r"^description:\s*(.*?)(?=\n\S|\Z)", frontmatter, re.M | re.S)
    value = match[1].strip() if match else ""
    if value.startswith((">-", "|")):
        value = " ".join(value.splitlines()[1:]).strip()
    if value.startswith('"'):
        value = json.loads(value)
    return value


files = sorted(p for p in SOURCE.rglob("*") if p.is_file() and ".git" not in p.parts)
commit = subprocess.check_output(["git", "-C", str(SOURCE), "rev-parse", "HEAD"], text=True).strip()
skills = sorted(SOURCE.glob("skills/*/SKILL.md"))
playbooks = sorted(SOURCE.glob("skills/poteto-mode/playbooks/*.md"))
snapshot = {
    "commit": commit,
    "version": json.loads((SOURCE / "plugin.json").read_text())["version"],
    "counts": {
        "files_excluding_git": len(files),
        "top_level_skills": len(skills),
        "principles": sum(p.parent.name.startswith("principle-") for p in skills),
        "playbooks": len(playbooks),
        "agents": len(list(SOURCE.glob("agents/*.md"))),
        "automation_instruction_skills": len(list(SOURCE.glob("automations/*/skills/*/SKILL.md"))),
    },
    "top_level_directories": dict(sorted(Counter(p.relative_to(SOURCE).parts[0] for p in files).items())),
    "files": [
        {"path": p.relative_to(SOURCE).as_posix(), "bytes": p.stat().st_size,
         "sha256": hashlib.sha256(p.read_bytes()).hexdigest()}
        for p in files
    ],
}
(HERE / "source-snapshot.json").write_text(json.dumps(snapshot, ensure_ascii=False, indent=2) + "\n")

lines = ["# Component Inventory", "", f"研究版本 `{commit}`，plugin `{snapshot['version']}`。", "",
         "這是檔案與宣告的完整盤點，不代表所有元件都已實際執行驗證。description 保留原文，避免翻譯改變觸發條件。",
         "本文件由 `python3 academy/research/inventory.py` 產生。檔案數、大小與 SHA-256 見 [source-snapshot.json](source-snapshot.json)。", "",
         "## 頂層 Skills", "", "| Skill | 類別 | 宣告的用途與觸發條件 | Source |", "|---|---|---|---|"]
for p in skills:
    name = p.parent.name
    kind = "Principle Skill" if name.startswith("principle-") else "Skill"
    desc = description(p.read_text()).replace("|", "&#124;").replace("\n", " ")
    lines.append(f"| `{name}` | {kind} | {desc} | [SKILL.md](../../pstack/{p.relative_to(SOURCE).as_posix()}) |")
lines += ["", "## Agents", "", "| Agent | 宣告的責任 | Source |", "|---|---|---|"]
for p in sorted(SOURCE.glob("agents/*.md")):
    lines.append(f"| `{p.stem}` | {description(p.read_text())} | [定義](../../pstack/{p.relative_to(SOURCE).as_posix()}) |")
lines += ["", "## Dormant Automation Instructions", "", "這 3 個 SKILL.md 不在 manifest 的 `./skills/` 下，Benny 文件明確要求直接讀取，不透過 slash discovery。", "",
          "| 名稱 | 宣告的用途 | Source |", "|---|---|---|"]
for p in sorted(SOURCE.glob("automations/*/skills/*/SKILL.md")):
    lines.append(f"| `{p.parent.name}` | {description(p.read_text())} | [定義](../../pstack/{p.relative_to(SOURCE).as_posix()}) |")
lines += ["", "## Playbook 檔案清單", "", "逐一流程分析見 [workflows.md](workflows.md)。", ""]
for p in playbooks:
    lines.append(f"- [{p.stem}](../../pstack/{p.relative_to(SOURCE).as_posix()})。")
lines += ["", "## 目錄分布", "", "下列數目為檔案數，排除 `.git/`。測試 corpus 的 `.out` 與 `.exit` 是 fixture，不是執行中的 session state。", "",
          "| 目錄／根檔案 | 檔案數 |", "|---|---|"]
for name, count in snapshot["top_level_directories"].items():
    lines.append(f"| `{name}` | {count} |")
(HERE / "components.md").write_text("\n".join(lines) + "\n")
print(json.dumps({"commit": commit, **snapshot["counts"]}, ensure_ascii=False))
