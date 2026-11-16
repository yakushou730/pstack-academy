# Component Inventory

研究版本 `74bcc61bd216687b1d6d480c28f109adfc9824ec`，plugin `0.15.42`。

這是檔案與宣告的完整盤點，不代表所有元件都已實際執行驗證。description 保留原文，避免翻譯改變觸發條件。
本文件由 `python3 academy/research/inventory.py` 產生。檔案數、大小與 SHA-256 見 [source-snapshot.json](source-snapshot.json)。

## 頂層 Skills

| Skill | 類別 | 宣告的用途與觸發條件 | Source |
|---|---|---|---|
| `architect` | Skill | Sketch types, signatures, and module structure before code, then stay in the loop while implementation fills in. Use for /architect, 'architect this', 'design this', or non-trivial work where jumping to code would lock in the wrong shape. | [SKILL.md](../../pstack/skills/architect/SKILL.md) |
| `arena` | Skill | Spawn N parallel candidates at the same task, pick a base, graft the strongest parts of the losers into it. Use for /arena, 'arena this', 'throw it in the arena', or when one attempt at a non-trivial artifact would lock in the wrong shape. | [SKILL.md](../../pstack/skills/arena/SKILL.md) |
| `automate-me` | Skill | Use for "automate me", "create/update/refresh my -mode skill", "turn/capture my preferences or working style into a skill", or wanting agents to follow how the user works. Drafts or revises a personal -mode skill via create-skill + unslop, optionally pulling fresh evidence from recent transcripts. | [SKILL.md](../../pstack/skills/automate-me/SKILL.md) |
| `benchmark-checklist` | Skill | Vet a perf measurement (limiter, tuning, limits, errors, repeatability, relevance, and whether the work happened) before you report or act on it. Use when you run a benchmark or report a speedup or regression you measured. | [SKILL.md](../../pstack/skills/benchmark-checklist/SKILL.md) |
| `blast-radius` | Skill | Find what a change could break somewhere else before it ships, beyond the diff, and prove the one fact it's safe because of by running real code instead of writing it up. Use for 'blast radius of X', 'what could this break', or reviewing a small diff you don't trust. | [SKILL.md](../../pstack/skills/blast-radius/SKILL.md) |
| `bro` | Skill | Restate the last message in plain human language, with no jargon. | [SKILL.md](../../pstack/skills/bro/SKILL.md) |
| `correct` | Skill | Find the mistakes agents keep repeating in this repo and make each one impossible. Try architecture first, then types, then a lint whose error names the fix, then a test, and write docs last. Prove each check fails on a real past mistake. Repeat this each time the operator corrects you. Use for /correct. | [SKILL.md](../../pstack/skills/correct/SKILL.md) |
| `create-formal-verification-skill` | Skill | Generate a project-local skill that formally verifies the code where a bug costs the most and tests reach the least, in any language, with whichever verification tool fits. Use for /create-formal-verification-skill, "model-check this race", "prove this invariant", or when concurrency, retries, state machines, parsers, or unsafe code need more than tests. | [SKILL.md](../../pstack/skills/create-formal-verification-skill/SKILL.md) |
| `create-verification-skill` | Skill | Generate a project-local verification skill that drives your app the way a user does — any language, framework, or platform. Use for /create-verification-skill, "make a control skill for this repo", or when a project has no scripted way to prove UI/CLI/service behavior. | [SKILL.md](../../pstack/skills/create-verification-skill/SKILL.md) |
| `figure-it-out` | Skill | Design an auditable playbook when no narrower one fits: a large migration, an ambitious multi-part change, or work a human reviews after stepping away. Scales rigor to the task, runs a hypothesis loop, and logs decisions. Use for /figure-it-out or 'figure it out'. | [SKILL.md](../../pstack/skills/figure-it-out/SKILL.md) |
| `how` | Skill | Use for "how does X work", code walkthroughs before changing something, and placement / ownership / layering questions ("where should this live", "which package owns this", "is this the right layer"). Explains subsystem architecture, runtime flow, onboarding mental models. Use why for motivation. | [SKILL.md](../../pstack/skills/how/SKILL.md) |
| `in-your-own-words` | Skill | Restate in your own words what you think the user's goals are and what problem they're trying to solve. Use for /in-your-own-words. | [SKILL.md](../../pstack/skills/in-your-own-words/SKILL.md) |
| `interrogate` | Skill | Use for "interrogate", "adversarial review", "multi-model review", "challenge this", "stress test this code", "find blind spots", or "tear this apart". Adversaries try to break a change or design, and only findings proven by a run survive. | [SKILL.md](../../pstack/skills/interrogate/SKILL.md) |
| `ketchup` | Skill | Catch the user up on what changed in this chat since their last message, in plain words and small visuals. List every item waiting on them with what they need to decide it from the reply alone. Use for /ketchup. | [SKILL.md](../../pstack/skills/ketchup/SKILL.md) |
| `ketchup-video` | Skill | Catch the user up like /ketchup, with a short subtitled video of slides for what happened and the waiting calls as text under it. Use for /ketchup-video. | [SKILL.md](../../pstack/skills/ketchup-video/SKILL.md) |
| `maintain-formal-verification-skill` | Skill | Bring a project's formal verification back in line with the code after the code changes: find the commits that touched verified code, update the model, harness, or properties to describe the code as it is now, rerun, and say whether each failure is drift in the verification or a bug in the code. Use for /maintain-formal-verification-skill, "is the model still true to the code", or after merges and refactors that touched verified code without rechecking it. | [SKILL.md](../../pstack/skills/maintain-formal-verification-skill/SKILL.md) |
| `maintain-verification-skill` | Skill | Periodic pass that keeps a project's verification skill and feature map honest: parallel source readers per feature, one live session driving every feature, at most one PR of proven corrections. Use for /maintain-verification-skill or "audit the verify skill". | [SKILL.md](../../pstack/skills/maintain-verification-skill/SKILL.md) |
| `make-bot-ui` | Skill | Use when building a custom UI (page, dashboard, buttons) that should wake a   Grok Bot over a webhook, when the user must provide a webhook sender key, or   when exposing that UI on Tailscale. | [SKILL.md](../../pstack/skills/make-bot-ui/SKILL.md) |
| `no-comments` | Skill | Spawn Comment Sicko, fix accepted findings, and offer encodings for claimed constraints. | [SKILL.md](../../pstack/skills/no-comments/SKILL.md) |
| `poteto-help` | Skill | Guides users through pstack setup, /poteto-mode, and picking the skill, playbook, or principle for a task. Type /poteto-help with a question. | [SKILL.md](../../pstack/skills/poteto-help/SKILL.md) |
| `poteto-mode` | Skill | poteto's agent style for concise, detailed responses, deliberate subagents, unslopped prose, simple code, and verified work. Use for poteto, /poteto-mode, or requests to work in this style. | [SKILL.md](../../pstack/skills/poteto-mode/SKILL.md) |
| `principle-attack-the-premise` | Principle Skill | Apply when two or more fixes that share one premise have failed the same gate. Write the premise down and test it directly before you write another fix that assumes it. | [SKILL.md](../../pstack/skills/principle-attack-the-premise/SKILL.md) |
| `principle-boundary-discipline` | Principle Skill | Apply when wiring validation, error handling, or framework adapters. Concentrate guards at system boundaries (CLI, config, network, external APIs); trust internal types and keep business logic in pure functions. | [SKILL.md](../../pstack/skills/principle-boundary-discipline/SKILL.md) |
| `principle-build-the-lever` | Principle Skill | Apply to any non-trivial work, not just bulk work: edits, migrations, analyses, checks. Build the tool that does it or proves it (codemod, script, generator, or a skill your subagents follow) instead of working by hand. The tool is the artifact a reviewer can rerun. | [SKILL.md](../../pstack/skills/principle-build-the-lever/SKILL.md) |
| `principle-encode-lessons-in-structure` | Principle Skill | Apply when you catch yourself writing the same instruction a second time, or notice a recurring correction. Encode the rule as a lint, metadata flag, runtime check, or script instead of more text. | [SKILL.md](../../pstack/skills/principle-encode-lessons-in-structure/SKILL.md) |
| `principle-exhaust-the-design-space` | Principle Skill | Apply when facing a novel UI interaction or architectural decision with no precedent in the codebase. Build 2-3 competing prototypes and compare side by side before committing. | [SKILL.md](../../pstack/skills/principle-exhaust-the-design-space/SKILL.md) |
| `principle-experience-first` | Principle Skill | Apply when product, UX, or feature-scope tradeoffs come up. Choose user delight over implementation convenience; ship fewer polished features over more rough ones. | [SKILL.md](../../pstack/skills/principle-experience-first/SKILL.md) |
| `principle-explain-the-number` | Principle Skill | Apply before you measure, and before you trust, report, or act on a number you measured: a speedup, a regression, a throughput, a latency, or an eval result. Find what limits it, and rule out that it measured something other than the work you think. | [SKILL.md](../../pstack/skills/principle-explain-the-number/SKILL.md) |
| `principle-fix-root-causes` | Principle Skill | Apply when debugging. Trace each symptom back to the first place the system went wrong and fix it there. A guard is a fix only when the state it handles is legitimate. | [SKILL.md](../../pstack/skills/principle-fix-root-causes/SKILL.md) |
| `principle-foundational-thinking` | Principle Skill | Apply before writing logic: choosing core types and data structures, sequencing scaffold-vs-feature work, asking what concurrent actors share. Get the data structures right so downstream code becomes obvious. | [SKILL.md](../../pstack/skills/principle-foundational-thinking/SKILL.md) |
| `principle-guard-the-context-window` | Principle Skill | Apply when context is filling up: large outputs, long files, repeated reads, fan-out planning. Route bulk to subagents; keep summaries in the main thread, not raw payloads. | [SKILL.md](../../pstack/skills/principle-guard-the-context-window/SKILL.md) |
| `principle-laziness-protocol` | Principle Skill | Apply when refactoring, evaluating diff size, or tempted to add abstractions, layers, or signal threading. Bias toward deletion and the smallest change that solves the problem. | [SKILL.md](../../pstack/skills/principle-laziness-protocol/SKILL.md) |
| `principle-make-operations-idempotent` | Principle Skill | Apply when designing commands, lifecycle steps, or processing loops that run amid crashes, restarts, and retries. Converge to the same end state regardless of partial prior runs. | [SKILL.md](../../pstack/skills/principle-make-operations-idempotent/SKILL.md) |
| `principle-migrate-callers-then-delete-legacy-apis` | Principle Skill | Apply when introducing a new internal API while old callers still exist. Migrate callers and delete the old API in the same wave instead of preserving compatibility layers. | [SKILL.md](../../pstack/skills/principle-migrate-callers-then-delete-legacy-apis/SKILL.md) |
| `principle-minimize-reader-load` | Principle Skill | Apply when reviewing or shaping code that's hard to trace. Count layers between question and answer, and hidden state in the reader's head; collapse one-caller wrappers and shrink mutable scope. | [SKILL.md](../../pstack/skills/principle-minimize-reader-load/SKILL.md) |
| `principle-model-the-domain` | Principle Skill | Apply when writing stateful logic, or when code branches a lot or repeats a shape assumption across files. | [SKILL.md](../../pstack/skills/principle-model-the-domain/SKILL.md) |
| `principle-never-block-on-the-human` | Principle Skill | Apply when tempted to ask 'should I do X?' on reversible work. | [SKILL.md](../../pstack/skills/principle-never-block-on-the-human/SKILL.md) |
| `principle-outcome-oriented-execution` | Principle Skill | Apply during planned rewrites and migrations with explicit phase boundaries. Converge on the target architecture; don't preserve smooth intermediate states with throwaway compatibility code. | [SKILL.md](../../pstack/skills/principle-outcome-oriented-execution/SKILL.md) |
| `principle-prove-it-works` | Principle Skill | Apply after completing a task, before declaring done. Verify against the real artifact (run the feature, read the actual value, inspect the diff), not a proxy, self-report, or 'it compiles.' | [SKILL.md](../../pstack/skills/principle-prove-it-works/SKILL.md) |
| `principle-redesign-from-first-principles` | Principle Skill | Apply when integrating a new requirement into an existing design. | [SKILL.md](../../pstack/skills/principle-redesign-from-first-principles/SKILL.md) |
| `principle-separate-before-serializing-shared-state` | Principle Skill | Apply when concurrent actors might write to the same file, branch, key, or state object. Eliminate the sharing first; serialize structurally only when one shared writer is a real invariant. | [SKILL.md](../../pstack/skills/principle-separate-before-serializing-shared-state/SKILL.md) |
| `principle-sequence-verifiable-units` | Principle Skill | Apply to multi-step work (sweeps, migrations, runs of similar edits) and to how you stack commits and PRs. Break work into small units that each end in a verifiable state, check each before the next, and order delivery so the sequence proves itself to a reviewer. | [SKILL.md](../../pstack/skills/principle-sequence-verifiable-units/SKILL.md) |
| `principle-subtract-before-you-add` | Principle Skill | Apply when sequencing an addition, refactor, or rewrite. Remove dead code, redundant validators, and stub references first, then build on the simpler base. | [SKILL.md](../../pstack/skills/principle-subtract-before-you-add/SKILL.md) |
| `principle-test-behavior-not-implementation` | Principle Skill | Apply when you write, change, or keep a test. Assert what the code's users can observe, so that the test fails when that behavior breaks and keeps passing when only the internals change. | [SKILL.md](../../pstack/skills/principle-test-behavior-not-implementation/SKILL.md) |
| `principle-type-system-discipline` | Principle Skill | Apply when designing types, reviewing a function signature, or writing code in any statically-typed language. Make illegal states unrepresentable, brand semantic primitives, parse external data at boundaries, exhaust variants, derive from authoritative schemas. | [SKILL.md](../../pstack/skills/principle-type-system-discipline/SKILL.md) |
| `recall` | Skill | Reconstruct your recent working context from your own chat history, live state, and the shared record (user reports, prior fixes, incidents), then hand back a tight current-state brief. Use for 'recall my work on X', 'catch me up', 'what have I been working on', 'where did I leave off', before starting or resuming work. | [SKILL.md](../../pstack/skills/recall/SKILL.md) |
| `reflect` | Skill | Spawn three parallel review subagents over the active transcript, surface learnings, and route each to a concrete edit on an existing skill. Use when the user says reflect. | [SKILL.md](../../pstack/skills/reflect/SKILL.md) |
| `setup-pstack` | Skill | Configure which models pstack uses per role and at what reasoning budget. Detects your available models and writes an always-applied rule that overrides the skill defaults. Use for /setup-pstack, "configure pstack models", "pstack budget", or changing pstack's model choices. | [SKILL.md](../../pstack/skills/setup-pstack/SKILL.md) |
| `sharpen` | Skill | Make a task deeper, not bigger, then rewrite the prompt. Use for /sharpen. | [SKILL.md](../../pstack/skills/sharpen/SKILL.md) |
| `show-me-your-work` | Skill | Keep a reviewable decision trail for long-running or unattended work: a TSV log with one row per decision (what, why, evidence, result). Local by default; commit it when a reviewer needs the trail to trust the result. Use for /show-me-your-work, autonomous or multi-phase runs, or work a human reviews after stepping away. | [SKILL.md](../../pstack/skills/show-me-your-work/SKILL.md) |
| `statechart` | Skill | Check a TLA+ model of a system that moves between states, such as a product flow, a protocol, or a service, and draw it as a Mermaid statechart. The report gives the shortest path to each state that breaks a rule. Use for /statechart, or to show a bug as a path through states. | [SKILL.md](../../pstack/skills/statechart/SKILL.md) |
| `swarm` | Skill | Fan out N parallel workers, drain them, and return one report. Use for /swarm, 'swarm this', or parallel coverage, races, gauntlets, and exploration. | [SKILL.md](../../pstack/skills/swarm/SKILL.md) |
| `tdd` | Skill | Use only when the user explicitly asks for TDD, a failing test, or a regression test, OR when the bug has an obvious cheap local test target. Skip when the test path is unclear, expensive, integration-heavy, or not requested. | [SKILL.md](../../pstack/skills/tdd/SKILL.md) |
| `teach` | Skill | Explain a body of work plainly so a person actually understands it. Runs the `how` and `why` skills and weaves what they find into one clear explanation. Use for 'teach me this', 'help me really understand X', 'explain this change or subsystem to me'. | [SKILL.md](../../pstack/skills/teach/SKILL.md) |
| `technical-writing` | Skill | Layered technical-writing standard: Diátaxis structure, Google developer style sentences, STE instruction rules, Global English syntax. Use for /technical-writing or when writing or reviewing docs, RFCs, readmes, PR descriptions, or commit messages. | [SKILL.md](../../pstack/skills/technical-writing/SKILL.md) |
| `typescript-best-practices` | Skill | TypeScript best practices. Use when reading or editing any .ts or .tsx file. | [SKILL.md](../../pstack/skills/typescript-best-practices/SKILL.md) |
| `unslop` | Skill | Cut AI tells from any writing. | [SKILL.md](../../pstack/skills/unslop/SKILL.md) |
| `why` | Skill | Use for 'why does X work this way', 'why we picked Y', design rationale, regressions, postmortems, or data-backed thresholds. Returns a cited read on decisions and tradeoffs. Use how for runtime behavior. | [SKILL.md](../../pstack/skills/why/SKILL.md) |

## Agents

| Agent | 宣告的責任 | Source |
|---|---|---|
| `comment-sicko` | A deranged comment-hater that savors deletion and condemns workaround code. | [定義](../../pstack/agents/comment-sicko.md) |
| `poteto-agent` | Delegate subagent for code-writing and helper tasks spawned during a `/poteto-mode` run. Use for delegates, not as the runner for `/poteto-mode` itself. Spawn a fresh `poteto-agent` for each new task, and resume one only in the strict cases that poteto-mode's Subagents section names. Reads the `poteto-mode` skill's `SKILL.md` in full before any work, including its inline Principles index. Substituting `generalPurpose` skips that read and drifts. | [定義](../../pstack/agents/poteto-agent.md) |

## Dormant Automation Instructions

這 3 個 SKILL.md 不在 manifest 的 `./skills/` 下，Benny 文件明確要求直接讀取，不透過 slash discovery。

| 名稱 | 宣告的用途 | Source |
|---|---|---|
| `reproduce-and-fix-issues` | Reproduce triaged Slack bugs through a configured app-control adapter, verify existing fixes, and open a bounded draft pull request only after before-and-after proof. Use only from the configured Benny repro automation. | [定義](../../pstack/automations/benny/skills/reproduce-and-fix-issues/SKILL.md) |
| `setup-benny` | Configure Benny and prepare its triage and repro automations. Use when installing Benny or changing its Slack, tracker, repository, routing, control, model, or budget settings. | [定義](../../pstack/automations/benny/skills/setup-benny/SKILL.md) |
| `triage-issue-reports` | Triage Slack issue reports with one thread-only verdict, evidence review, cause-aware routing, tracker dedupe, and fail-closed ticket creation. Use only from the configured Benny triage automation. | [定義](../../pstack/automations/benny/skills/triage-issue-reports/SKILL.md) |

## Playbook 檔案清單

逐一流程分析見 [workflows.md](workflows.md)。

- [authoring-a-skill](../../pstack/skills/poteto-mode/playbooks/authoring-a-skill.md)。
- [autonomous-run](../../pstack/skills/poteto-mode/playbooks/autonomous-run.md)。
- [autopilot-full](../../pstack/skills/poteto-mode/playbooks/autopilot-full.md)。
- [autopilot-stack](../../pstack/skills/poteto-mode/playbooks/autopilot-stack.md)。
- [babysit](../../pstack/skills/poteto-mode/playbooks/babysit.md)。
- [bug-fix](../../pstack/skills/poteto-mode/playbooks/bug-fix.md)。
- [eval](../../pstack/skills/poteto-mode/playbooks/eval.md)。
- [feature](../../pstack/skills/poteto-mode/playbooks/feature.md)。
- [hillclimb](../../pstack/skills/poteto-mode/playbooks/hillclimb.md)。
- [investigation](../../pstack/skills/poteto-mode/playbooks/investigation.md)。
- [multi-phase-plan](../../pstack/skills/poteto-mode/playbooks/multi-phase-plan.md)。
- [opening-a-pr](../../pstack/skills/poteto-mode/playbooks/opening-a-pr.md)。
- [orchestrate](../../pstack/skills/poteto-mode/playbooks/orchestrate.md)。
- [pause-safely](../../pstack/skills/poteto-mode/playbooks/pause-safely.md)。
- [perf-issue](../../pstack/skills/poteto-mode/playbooks/perf-issue.md)。
- [prototype](../../pstack/skills/poteto-mode/playbooks/prototype.md)。
- [refactoring](../../pstack/skills/poteto-mode/playbooks/refactoring.md)。
- [runtime-forensics](../../pstack/skills/poteto-mode/playbooks/runtime-forensics.md)。
- [session-pickup](../../pstack/skills/poteto-mode/playbooks/session-pickup.md)。
- [shipping](../../pstack/skills/poteto-mode/playbooks/shipping.md)。
- [trace-forensics](../../pstack/skills/poteto-mode/playbooks/trace-forensics.md)。
- [visual-parity](../../pstack/skills/poteto-mode/playbooks/visual-parity.md)。
- [worktree-cleanup](../../pstack/skills/poteto-mode/playbooks/worktree-cleanup.md)。

## 目錄分布

下列數目為檔案數，排除 `.git/`。測試 corpus 的 `.out` 與 `.exit` 是 fixture，不是執行中的 session state。

| 目錄／根檔案 | 檔案數 |
|---|---|
| `.cursor-plugin` | 1 |
| `.gitignore` | 1 |
| `LICENSE` | 1 |
| `MIRROR.md` | 1 |
| `README.md` | 1 |
| `SYNC-LOG.md` | 1 |
| `agents` | 2 |
| `assets` | 1 |
| `automations` | 12 |
| `docs` | 18 |
| `mirror-assets` | 6 |
| `plugin.json` | 1 |
| `skills` | 523 |
