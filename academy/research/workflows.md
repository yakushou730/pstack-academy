# Workflow Inventory

版本與證據規則同 [研究首頁](README.md)。本文件涵蓋 `poteto-mode/playbooks/` 的 **23/23** 個檔案，另列核心 Skill 組合流程及 Benny 的三個操作入口。

## 如何解讀流程

下列 Playbooks 都是 **Verified Implementation / instruction-defined**。箭頭是把原文步驟縮寫成教學順序，不是實際執行紀錄或可執行 state machine。未寫狀態機的流程，不能自行補上 pending／running／failed 之類的持久化狀態。

共同 Entry Point 是使用者啟用 `poteto-mode` 並提出任務，由宿主 Agent 依 [mode 的 Playbooks 段落](../../pstack/skills/poteto-mode/SKILL.md) 路由。也可能直接提供某個 Playbook 作為指引；沒有每個 Playbook 都註冊成 slash command 的證據。每節的「觸發／前提」補充該流程的特定輸入；「步驟」是執行與決策；「元件」是明確引用的 subset；「結果／失敗」記錄產物、終止與復原。共同的風格／原則要求見 mode，不重複當成每個 Playbook 的獨立步驟。

教學例子與未來 stepper 應標 **Simulation**。來源中的命令只作為研究資料，這次未執行。

## 01 Investigation

[Source](../../pstack/skills/poteto-mode/playbooks/investigation.md)。用途是回答唯讀問題或提出有取捨的建議。

- 觸發／前提：如何運作、為何這樣設計、是否確定；需要可讀取的程式庫與問題範圍。
- 步驟：trace code → 若問動機則 why → throughput checkpoint 標 read-only → 寫 Overview／Key Concepts／How It Works／Where Things Live／Gotchas 或 trade-offs → unslop。
- 元件：條件式 why、unslop；不開 PR、不 babysit、不自動 architect。
- 結果／失敗：附來源的說明；若要接著修改，先交回再路由 Bug fix／Feature。沒有特定 retry／持久化 state 定義。

## 02 Bug fix

[Source](../../pstack/skills/poteto-mode/playbooks/bug-fix.md)。用途是用 runtime evidence 找到並修正機制。

- 觸發／前提：可辨識的錯誤症狀；真實 surface 的 driver 或可說明的存取限制。
- 步驟：親自重現 → 候選假設與二分排除 → instrumentation 證明機制 → 跨函式時 architect → 委派 fix → 同 surface 重驗 → 可低成本測試時先 failing test 再 fix → Opening a PR。
- 元件：why、條件式 architect／tdd、poteto-agent、sequence-verifiable-units、Opening a PR。
- 結果／失敗：root cause、最小修正、前後 repro 輸出、PR。無法直接重現先合成 trigger／instrument；需要人協助必須指出 driver 到不了的具體原因。Inconclusive 不算通過，證據推翻的修改必須 revert。

## 03 Perf issue

[Source](../../pstack/skills/poteto-mode/playbooks/perf-issue.md)。用途是修正一次可量測的效能問題。

- 觸發／前提：使用者觀察到的 slowness 與可取得 baseline trace。
- 步驟：capture baseline／benchmark-checklist → trace code → 依序考慮不做、避免重做、少做、晚做、閒時做、並行、便宜做 → plan／必要時 architect → 委派 → capture post trace → parse／compare → PR 引用數字 → Opening a PR。
- 元件：benchmark-checklist、條件式 architect、poteto-agent、sequence-verifiable-units。
- 結果／失敗：baseline／after／delta／artifact path。早期策略達標即停止；不能只看 source 宣稱提升，錯 surface／inconclusive 不過關。持續優化另路由 Hillclimb。

## 04 Hillclimb

[Source](../../pstack/skills/poteto-mode/playbooks/hillclimb.md)。用途是反覆改善一個 metric。

- 觸發／前提：真實 workload 能重現、已定方向與 stop predicate；目標與最低嘗試數需可檢查。
- 步驟：ground workload → 建立並證明 harness 敏感度 → freeze harness／baseline／regression gate → 開 decision log → 每次一個假設與委派修改 → 測前後／gate → keep 或完整 revert → accepted fix 各一個 commit → plateau 後轉策略 → predicate 達成或邊際成本不值時結束 → PR。
- 元件：benchmark-checklist、show-me-your-work、poteto-agent、shared-state／sequence principles；借 Perf mantras 的順序。
- 結果／失敗：metric、iteration 數、kept／reverted、decision log 與 accepted commits。噪音內提升不算成功；不得放寬 predicate。只借 Autonomous run 的 wake 機制，不借它的 stop rule。

## 05 Runtime forensics

[Source](../../pstack/skills/poteto-mode/playbooks/runtime-forensics.md)。用途是對 live process 診斷，未授權修正。

- 觸發／前提：leak、spin、glitch 等 live symptom；profile／heap／CDP 等觀察工具。
- 步驟：capture live artifact → reduce smoking gun → live instrumentation／hotfix probe 確認機制 → map file／symbol／line → read-only checkpoint。
- 元件：matching control skill、子 Agent 處理大 artifact、guard-the-context-window。
- 結果／失敗：有證據的 diagnosis 與 artifact path；之後才轉 Bug fix／Perf。未觀察到機制不可當確定根因；無獨立 retry schema。

## 06 Trace forensics

[Source](../../pstack/skills/poteto-mode/playbooks/trace-forensics.md)。用途是分析已有 capture。

- 觸發／前提：cpuprofile、trace、spindump、heap snapshot 等固定資料。
- 步驟：辨識格式 → 轉可查詢形狀（例如 SQLite）→ query hot path／retainer → 原 artifact symbols 對應 source → 有 paired capture 則 diff → cited diagnosis。
- 元件：格式專用 parser／工具、子 Agent、guard-the-context-window。
- 結果／失敗：source location／artifact／是否 paired-confirmed。缺 symbols 必須說明；沒有 paired capture 時是最強假設，不能冒充已證根因；不重跑 capture、不自行 fix。

## 07 Feature

[Source](../../pstack/skills/poteto-mode/playbooks/feature.md)。用途是新增或改變行為。

- 觸發／前提：明確功能目標與受影響 subsystem，先命名 data shape。
- 步驟：trace → architect → blocking gates／independent streams／shared state／decomposition checkpoint → 委派實作（多種合理形狀時 arena）→ matching surface verify → 小 ordered commits → contested design 時 interrogate → Opening a PR。
- 元件：architect、arena（條件式）、poteto-agent、interrogate（條件式）、sequence-verifiable-units。
- 結果／失敗：feature、設計理由、throughput checkpoint、open decisions、PR。資料相依的 slice 由同一 owner 掌握，再在內部 fan out；inconclusive／wrong surface 不過關。不是固定無條件串起所有 Skills。

## 08 Refactoring

[Source](../../pstack/skills/poteto-mode/playbooks/refactoring.md)。用途是保持行為、降低 reader load。

- 觸發／前提：待改善的結構與可固定的既有行為 contract。
- 步驟：先建 characterization／snapshot／equivalence pin → 命名缺的結構與 target shape → 跨函式時 architect → subtract → 小步移動並保持 pin → 同步遷移所有 callers、刪 legacy → 委派 mechanical edits → real artifact equivalence → 評估 reader-load delta → ordered commits／PR。
- 元件：architect（條件式）、poteto-agent、model-the-domain、subtract／migrate／prove principles。
- 結果／失敗：結構修改與行為等價證據。發現 bug／feature 要拆開；沒有降低 reader load 則 revert。typecheck／lint 本身不是行為 pin。

## 09 Prototype

[Source](../../pstack/skills/poteto-mode/playbooks/prototype.md)。用途是廉價回答設計或行為問題。

- 觸發／前提：必須有要決定的問題；沒有則路由 Feature。
- 步驟：scope decision → 方向未定時搜 prior art／moodboard → 隔離 scratch、最輕量實驗 → variants 同 switcher → 真實 surface screenshot 或觀察行為 → 比較／建議 → handoff Feature 或 architect。
- 元件：exhaust-the-design-space、matching driver；不像 Feature 要求 production tests／架構完整性。
- 結果／失敗：throwaway artifact、各方案觀察與 recommendation，不是可出貨程式。無法觀察就沒有證據支持取捨。

## 10 Visual parity

[Source](../../pstack/skills/poteto-mode/playbooks/visual-parity.md)。用途是 baseline 與目標 UI 像素等價。

- 觸發／前提：修改前已存在跨狀態 screenshot baseline／harness。
- 步驟：建立 baseline → 固定不竄改 harness／baseline 的規則 → shared primitives 先完成 → 每 component／worktree 一 owner 遷移 → image diff／loop 至零 → 每 component 或安全 batch PR。
- 元件：control skill、shared-state principle、宿主 `/loop`、Opening a PR。
- 結果／失敗：逐 component diff 結果與 baseline 位置；nonzero diff 就 fail。baseline 看起來不對要先問，不得為了通過改 baseline。

## 11 Authoring a skill

[Source](../../pstack/skills/poteto-mode/playbooks/authoring-a-skill.md)。用途是建立或修改 Skill 文件。

- 觸發／前提：Skill 的具體行為需求、所在 harness 的 authoring skill。
- 步驟：create-skill／skill-creator 或 Agent Skills format → 驗 frontmatter、檔案、跨 Skill links → 結構性變動才適合 test cases → Opening a PR。
- 元件：外部 create-skill／skill-creator，encode-lessons-in-structure。
- 結果／失敗：Skill、設計決策與 validation notes；沒有固定自動測試器。主觀內容不強行建立與實作鏡像的 tests。

## 12 Eval

[Source](../../pstack/skills/poteto-mode/playbooks/eval.md)。用途是測量 prompt／Skill 改動對行為的影響。

- 觸發／前提：待測 variant、success behavior、judge-only rubric；獨立環境與可讀 transcript。
- 步驟：frame → sanitized candidate dirs → organic prompt → 依 arena fan-out → blinded judge → 從 transcript／code 確認實際遵循 → parent 讀全部 outputs 與 judge 比對 → recommendation。
- 元件：arena 的 B／C 階段概念、poteto-mode Harness transcript mappings。
- 結果／失敗：rubric、candidate notes、judge verdict、parent synthesis、是否 promote。禁止 candidate 看見評測字眼或其他 candidates；判定不能只靠 candidate 自述。無法取得 transcript 必須記 coverage gap。

## 13 Babysit

[Source](../../pstack/skills/poteto-mode/playbooks/babysit.md)。用途是把 PR／stack 帶到 merge-ready，**不授權 merge**。

- 觸發／前提：使用者要求 babysit／查狀態／處理 review；不是開 PR 自動觸發。先選 forge、宣告 drive／background／threads-only／check。
- 步驟：只工作最低未 merged frontier → 確認單一 babysitter → 不改 stack topology → conflicts→review threads→CI → forge verdict／GitHub watcher → 分類 CI 再做有限 retry → 證實 Bugbot findings 才修／回覆 → 到人類 gate 停止。
- 元件：GitHub watch-pr 或 Origin CLI、bugbot-triage reference、條件式 red-first proof；drive／background 依宿主 loop。
- 結果／失敗：merge-ready 或 blockers／escalation。conflict 通常回報 owner rebase；自有 PR 的 Autopilot owner 另有明文例外。flake／infra 只給一次 fresh build，重複同錯要重新分類。GitHub single／stack READY 停；queued WAITING／merge-queue 即可交 merge-ready；Origin 不使用 GitHub verdict names。

## 14 Shipping

[Source](../../pstack/skills/poteto-mode/playbooks/shipping.md)。用途是落地已驗證的一段 stack。

- 觸發／前提：明確 land／ship／merge 授權；每 PR 需要非作者 verifier 的 PASS／PASS+NOTES 與 current code 對應。
- 步驟：resolve forge／獨立 verify → bottom 起算 contiguous verified run 與 ceiling → 比對 patch-id／必要時重驗 → 逐一 bottom-up merge → 讀回狀態確認真正 merged 且 base trunk → retarget／rebase 下一 PR → watch 到 ceiling → stop。
- 元件：independent verifier、matching control skill、Git／forge、queued watch-pr 或 Origin watcher。
- 結果／失敗：各 PR verdict、verifier、已 merge 的確認證據、下一個 gap。green CI／bot approval 不等於 verifier；queued／auto-merge 不等於 merged；前面未驗證時上方即使 PASS 也等待。新 patch drift 需重驗，不可盲信舊 SHA。

## 15 Autonomous run

[Source](../../pstack/skills/poteto-mode/playbooks/autonomous-run.md)。用途是持續朝一個可檢查 predicate 推進。

- 觸發／前提：run until done／unattended task 與 checkable exit condition。
- 步驟：寫 predicate → 選事件 watcher＋heartbeat 或定時 wake → 每輪最小實驗／驗證 → 有進展 commit，無效 discard → 相關障礙以獨立 PR 解決 → 每輪 decision log → predicate 達成停止。
- 元件：宿主 `/loop`、可選 watcher subagent、show-me-your-work、sequence-verifiable-units。
- 結果／失敗：iteration、landed／discarded、final predicate。plateau 本身不算結束；不可放寬目標，真正 dead end 要回報。沒有內建常駐 pstack daemon。

## 16 Orchestrate

[Source](../../pstack/skills/poteto-mode/playbooks/orchestrate.md)。用途是 coordinator 管理長期多 PR program。

- 觸發／前提：多日、多工作者的 standing program，非單個 session 可完成的任務。
- 步驟：一 owner／PR → 用一單位驗證 kickoff→owner→verifier→merge 後才大量 fan out → 必要時最多 root／sub-coordinator／worker 三層 → 明確 scope／evidence kickoff → root 讀 artifact／diff 與 live forge → 替換 stall workers → 完成或重新規劃。
- 元件：宿主 Task／事件訂閱、Project store／notes.md、獨立不同 model family verifier、matching driver。
- 結果／失敗：landed goal、各 PR live state、dropped scope／待決策。文件要求不呼叫 scripts、不做 polling loops，由宿主 tools 監督；同原因兩次 retry 後 drop unit／replan。不要與 Autopilot 的 `/loop 1h` 混成共同必備步驟。

## 17 Autopilot-full

[Source](../../pstack/skills/poteto-mode/playbooks/autopilot-full.md)。用途是處理已授權的獨立 PR queue 到 merge。

- 觸發／前提：明確 operator go 與 queue 授權；operator 保留的項目只到 merge-ready。
- 步驟：freeze scope／gates → 每 PR 一 owner，推 durable branch／trail → independent PRs off trunk 平行 → code-ready SHA 開完整 swarm verify → merge-ready receipts／必要時新 head 單一重驗 → 按 trunk 變動決定 merge prep → verifier＋root countersign gates → `/loop 1h` audit workers／heads → stop order 零寫入。
- 元件：swarm、show-me-your-work、no-comments、外部 deslop、Babysit／Shipping／Opening a PR、ketchup。
- 結果／失敗：queue 各 PR 狀態與 verdict、merges、countersigns／follow-ups。全 swarm 通常一次，重大行為修改才重跑完整 swarm；minor fix／rebase 另有較小驗證。不能越過 forge approval；gate soft-fail／disable 不接受；VM 消失需從已 push 與 store 恢復。

## 18 Autopilot-stack

[Source](../../pstack/skills/poteto-mode/playbooks/autopilot-stack.md)。用途是沿用 full 的製作與驗證，交給 operator merge。

- 觸發／前提：要求 autopilot 但不 merge，或把 verified PRs 留給 operator。
- 步驟：依 full → **取代 step 5，在 current head verified／green 停** → 只有相依 PR 才 stack → child base parent branch、root base trunk → lower head 改動時 restack → patch-id 未變可依規則保留 verdict → handoff。
- 元件：full 的依賴加 Opening a PR 的 stack 規則。
- 結果／失敗：每 PR verdict／交接；不 merge。交接後沒有 operator go 就不再 push；每個 audit tick 必須引用此檔讓 no-merge override 存在。

## 19 Session pickup

[Source](../../pstack/skills/poteto-mode/playbooks/session-pickup.md)。用途是接手一個已存在的 run。

- 觸發／前提：指定 prior chat／cloud URL／pushed branch；限定 active workspace 範圍。
- 步驟：先 overview／last messages 再關鍵決策 → Git／worktree／todos 重建 operational state → diff done vs pending → 選 continue／recommendation／ratify／postmortem 並路由 → 對原始目標驗證 inherited claims。
- 元件：大 transcript 時子 Agent、Harness mappings、prove-it-works、後續匹配 Playbook。
- 結果／失敗：前人停點、繼承與重做的區別、resume point、outcome。不要無差別重做已完成工作；prior self-report 仍不是實際 proof。沒有自動 restore engine。

## 20 Pause safely

[Source](../../pstack/skills/poteto-mode/playbooks/pause-safely.md)。用途是明確暫停並留冷啟動 checkpoint。

- 觸發／前提：明確 pause；「going to bed, keep going」不是 pause。
- 步驟：完成或退出當前 atomic step／cancel children → 不因暫停新增 irreversible actions → WIP commit 保存編輯 → off-context resume note 包含 intent／progress／verified／state／next／files／gotchas。
- 元件：Git、resume note；已有 show-me-your-work 時指向同一 trail。
- 結果／失敗：WIP commit、resume file、clean／broken 狀態與第一個 resume action。原文敘述有 compaction note 的處理，但不能據此假設 pstack 自行實作 compaction 或必然自動觸發。

## 21 Multi-phase plan

[Source](../../pstack/skills/poteto-mode/playbooks/multi-phase-plan.md)。用途是交付可稽核的大型計畫，**不是實作**。

- 觸發／前提：跨階段／多 PR，需 owner 逐格執行與 evidence；一兩檔且明確的變更可 skip plan。
- 步驟：settle empirical questions with Prototype → subagent 探查路徑／conventions／checks → 按原 skeleton 寫 docs 計畫 → technical-writing／unslop → `check-plan.mjs` 修所有格式錯 → 交付／stop，explicit go 才進 execution playbook。
- 元件：Prototype、poteto-agent、technical-writing、unslop、check-plan；計畫需指定 full／stack／orchestrate。
- 結果／失敗：plan＋Appendices／screenshots 等 evidence；unit／live／perf gates、review gate 必須依原模板表達。checker pass 只代表形式要求，不代表已完成驗證或已獲執行許可。

## 22 Worktree cleanup

[Source](../../pstack/skills/poteto-mode/playbooks/worktree-cleanup.md)。用途是盤點並清理已確認可移除的開發狀態。

- 觸發／前提：清磁碟／prune worktrees／simulators；需要 pinned／active chats 的真實集合。
- 步驟：`df` baseline／worktree-audit → 建議 bucket 與 pinned 集合交叉檢查 → 可疑 recent chats 委派查證 → 有 uncommitted／in-use 先交決策 → prune confirmed paths → 必要時其他 simulator／cache → `df`／re-list。
- 元件：worktree-audit、子 Agent、prove-it-works／guard-context principles、Git／xcrun 等系統工具。
- 結果／失敗：回收空間、刪除與保留理由。bucket 不是授權；`safe` 也可能誤判 pinned worktree。沒有 code review 的刪除流程須以前置實際使用狀態把關；研究未執行任何刪除。

## 23 Opening a PR

[Source](../../pstack/skills/poteto-mode/playbooks/opening-a-pr.md)。用途是規範變更的包裝與 PR 交付。

- 觸發／前提：其他需要 code change 的 Playbook 到 PR 階段；不是只讀流程的共同尾巴。
- 步驟：deslop／no-comments → Conventional Commit title → 簡潔 Why／What changed／Scope／Tradeoffs／Blast Radius／Verification → resolve forge → 有 built-in PR tool 優先它 → 小 PR／正確 stack base → ready PR 並讀回狀態 → 回 URL、繼續 phase。
- 元件：外部 deslop、no-comments、forge CLI 或 built-in PR tool。
- 結果／失敗：ready PR 與 proof；開 PR 本身不啟動 Babysit。Autopilot owner 的既有 brief 授權 babysit 是明文例外。Benny 的 draft-only 是另一套 pack 規則，不能被此一般規範覆蓋。

## 其他實際存在的組合流程

不是所有 Skill 都是 poteto-mode 的 Playbook。下表保留正確術語，詳細 inputs／outputs／dependencies 見來源與 [元件分析](README.md)。

| 組合流程 | 實際步驟與決策 | 產物／失敗處理 | Source |
|---|---|---|---|
| 設定模型 | detect→read current→budget→confirm roles→validate→write→confirm；可選 offer verification skills | model settings；不可寫未確認存在的 real slug | [setup-pstack](../../pstack/skills/setup-pstack/SKILL.md) |
| 設計探索 | architect ground→arena frame／fan-out／cross-judge／pick／graft／verify→可選 agree→implement；反覆結構摩擦則 scrap／重跑 | sketch＋rationale；dropout 用 N-1，judge 不可用明示 skip；合成後仍需 verify | [architect](../../pstack/skills/architect/SKILL.md)、[arena](../../pstack/skills/arena/SKILL.md) |
| 覆蓋彙總 | swarm frame／scope／race rule→fan-out→aggregate→report | PASS／ISSUES／BLOCKED；缺 SHA／method 一次 respawn，再失敗記 gap、不當 pass | [swarm](../../pstack/skills/swarm/SKILL.md) |
| 對抗審查 | intent→arena 部分 fan-out→重跑 findings→merge roots→report；跳過 base selection／graft | verified findings／dropped counts；不自動修正 | [interrogate](../../pstack/skills/interrogate/SKILL.md) |
| 教學 | 依使用者問題決定理解重點→how＋why→整合簡明說明／逐步圖示 | 解釋；why 的 uncertainty 需保留 | [teach](../../pstack/skills/teach/SKILL.md) |
| 反思 | 找 active transcript→三 reviewer→synthesizer→structural enforcement check→Accepted 等 explicit approval→編輯非 cache copy | Accepted／Rejected／Backlog；不是自動學習或默默改全域 prompt | [reflect](../../pstack/skills/reflect/SKILL.md) |
| 驗證技能建立／維護 | interview repo→generate／feature map→證明一功能→維護所有 features 的 source wave＋serial live pass | project verify skill／proof；product regression 只回報，不用改文件掩蓋 | [create](../../pstack/skills/create-verification-skill/SKILL.md)、[maintain](../../pstack/skills/maintain-verification-skill/SKILL.md) |
| 形式驗證建立／維護 | 找高風險 target→選工具→model 與 code map→broken variant 證明敏感度→還原／回歸→coverage sync | skill／model／counterexample；發現 bug 不弱化 property，不保證 scope 外正確 | [create formal](../../pstack/skills/create-formal-verification-skill/SKILL.md)、[maintain formal](../../pstack/skills/maintain-formal-verification-skill/SKILL.md) |

## Benny：獨立於 slash discovery 的 automation 流程

以下三者是 dormant pack 中的 instruction files，**不是額外的頂層 plugin Skills 或已啟用 automations**。沒有通用 daemon、queue DB 或 API 層 safety enforcement 的證據。來源為 [Benny README](../../pstack/automations/benny/README.md)。

### Setup

- Entry：使用者指定 [FOR_AGENTS.md](../../pstack/automations/benny/FOR_AGENTS.md) 與 target repo。
- 前提／輸入：source channel／repo／tracker／triage identity／control adapter／feature map／budgets 等 secret-free config，secrets 在 pack 外。
- 步驟：merge pack 到 `.cursor/automations/benny/`，保留 destination-only files → merge project settings → fresh-agent 檢查依賴可在 project scope resolve → 配置與 readiness checks → 明確要求後才 `/automate` 建兩個 drafts 並各自 review／editor handoff → harmless test thread safety。
- 結果：已 commit 的 pack／configuration＋經 review 的外部 automations；既有 automation 用 editor checklist，不新增 duplicate。依賴不 resolve／ownership 不清楚就 stop。[setup Source](../../pstack/automations/benny/skills/setup-benny/SKILL.md)。

### Triage

- Entry：外部 automation 收到 source channel 的 top-level report；前提是配置完整可讀。
- 步驟：freeze channel／thread coordinates → 讀完整 thread 與 attachments → trace likely layer／history → classify → tracker dedupe → 必要時建立清楚 net-new bug ticket → 在原 thread 發一個 verdict marker。
- 元件：why、unslop、shared-state／reader-load principles、Slack／tracker adapters。
- 結果：`[benny:bug]`／`[benny:performance]`／`[benny:other]`，可附 tracker URL。來源 parent preflight 不過或配置缺失即 no writes；workers 不持 Slack credentials、不發文；ticket 建立需有來源 link，不能猜 duplicate。文件另規定建立 ticket／發 verdict 失敗時的補償策略，實際能力取決 tracker adapter。[Source](../../pstack/automations/benny/skills/triage-issue-reports/SKILL.md)。

### Reproduce and fix

- Entry：相同 report 或 setup 選定的支援 trigger；等原 thread 中 **指定 triage identity** 且只有一個 marker 的可信 verdict。
- 步驟：freeze coordinates → bounded wait → 非 bug／performance／不可信／timeout 靜默停止 → ownership gate → 已有 fix artifact 改 verify-existing-fix → optional operations thread → control adapter／feature map preflight → study → 相同真實 UI path 獨立重現兩次／state cross-check → capture／review evidence → report outcome → qualify one bounded root-cause fix → 必要時 tdd／architect → 同路徑兩次 after proof／blast smoke → draft PR → follow-up／cleanup。
- 元件：why、tdd（條件式）、控制 adapter、feature map、tracker／Slack、相關 principles、[existing-fix reference](../../pstack/automations/benny/skills/reproduce-and-fix-issues/references/verify-existing-fix.md)。
- 結果：repro proof／existing-fix verdict／可選 draft PR；不能 merge／deploy。有人明確接手就停止、不競速；缺 control 能力／環境／evidence 就 fail closed，不能用內部 setters 假裝真實使用路徑。[Source](../../pstack/automations/benny/skills/reproduce-and-fix-issues/SKILL.md)。

## Coverage 的邊界

23/23 表示已逐一對應本版 Playbook 檔案與研究摘要，**不是 23 條流程已成功執行**。58 個頂層 Skill 的完整用途／trigger 清單在 [components.md](components.md)；核心與複合工作流在本文件展開，較小的 prose／principle Skills 沒有為了頁數虛構多階段流程。未來網站可依這個 inventory 分階段製作課程，須明示課程範圍，不能把 MVP coverage 當全數完成。
