"""Edited Traditional Chinese curriculum; all source references are resolved at build time."""

COMPONENT_ROWS = '''
architect|架構設計|先畫型別、介面與模組邊界，比較不同結構，再依選定草圖實作。|設計跨越函式邊界，或直接要求 architect。|任務、受影響子系統、既有約束。|設計草圖、使用端範例、選擇理由與整合後設計。|重新設計快取 API 前，先比較兩種責任邊界。
arena|多方案競技場|讓多個候選獨立完成同一任務，選出基底並整合有用部分。|有多種合理的設計或實作形狀。|相同任務、grounding、rubric 與隔離輸出位置。|一份合成產物、base／graft 理由、judge 與驗證結果。|比較兩種狀態模型，保留介面較清楚的一個。
automate-me|把工作偏好變成技能|從近期工作與使用者意圖中整理可重用的個人 -mode Skill。|要求捕捉、更新或刷新自己的工作方式。|限定 workspace 的歷史、使用者偏好、既有 mode。|個人 mode 草稿、迭代後的 Skill 與 PR。|把多次出現的審查習慣整理成自己的 mode。
benchmark-checklist|檢查量測是否可信|先確認限制因素、錯誤、重現性，以及量到的工作是否真的發生。|執行 benchmark 或準備報告測得的提升、退步。|workload、量測方法、環境、原始結果。|量測可信度說明與仍未排除的問題。|先確認快取沒有讓基準測試跳過真正工作。
blast-radius|追查影響範圍|走出 diff 與直接 callers，找出安全性依賴的關鍵事實並跑程式證明。|審查有疑慮的修改，或問這可能破壞什麼。|diff、相依套件的固定版本與下游使用方式。|已證風險、排除項目與關鍵事實的可重跑證據。|檢查序列化格式的修改是否影響另一個語言的消費端。
bro|用白話重述|把上一則訊息改寫成不用專業術語也能理解的說法。|要求白話重述上一則訊息。|上一則訊息。|保留原意的白話說明。|把複雜的審查結論說成同事能直接理解的一段話。
correct|讓重複錯誤無法再發生|從 recurring mistakes 找可用架構、型別、lint 或 test 阻止的錯誤類別。|使用者糾正 Agent，或直接要求 correct。|repo 內重複錯誤、歷史修正與現有檢查。|結構性修正、能在真實舊錯誤上失敗的檢查與規則表。|將反覆寫錯的狀態組合改成不可能建立的型別。
create-formal-verification-skill|建立形式驗證技能|選出高風險區域，用適當工具驗證明確 property 並留下可維護的 Skill。|並行、重試、parser 或不變量需要超過一般測試的檢查。|實際程式、property、工具可用性與驗證範圍。|project verify Skill、模型或 harness、coverage 與 sync commit。|為租約競爭建立模型，先讓移除檢查的變體失敗。
create-verification-skill|建立真實操作驗證|訪查 repo，產生 Launch／Doctor／Drive／Evidence／Cleanup 與 feature map。|專案沒有可重現地驅動真實 app 的方式。|啟動方式、真實使用 surface、driver 與可觀察結果。|已實際證明一條功能路徑的驗證 Skill 與 feature map。|讓下一位 Agent 能啟動 app、操作搜尋、留下截圖再清理。
figure-it-out|設計可稽核的專用流程|當現有 Playbook 不合適時，建立有 gates、實驗與決策紀錄的工作方式。|大型遷移、多階段未知，或沒有較窄 Playbook 的工作。|可否證完成條件、工作量與風險、既有系統。|專用階段清單、決策紀錄與整體驗證結論。|替跨多個模組的遷移設計逐單位驗證流程。
how|解釋實際如何運作|探索程式庫，說清楚子系統的架構、執行路徑與責任位置。|問如何運作、應放哪裡、由哪個模組負責。|問題與唯讀 source scope。|讓陌生工程師能建立心智模型的架構解釋。|從使用者按下儲存追到檔案寫入路徑。
in-your-own-words|對齊使用者目標|用自己的話重述使用者想達成什麼，以及真正要解決的問題。|直接要求，或其他 Skill 先確認 intent。|使用者需求與可用背景。|目標與問題的重述。|審查前先確認這次修改是修錯還是改行為。
interrogate|對抗式審查|要求多個 reviewer 嘗試破壞設計，只有親自重跑證明的 finding 才留下。|設計有爭議、找盲點或明確要求 adversarial review。|scope、intent、diff 或設計、可重跑程式。|合併根因的 verified findings 與 dropped findings 說明。|讓 reviewer 用最小 repro 證明一個邊界條件會失敗。
ketchup|掌握這次工作的進度|從使用者上次訊息起，整理變更、真實狀態與等使用者決定的事項。|要求 catch up 或 ketchup。|這段對話的產物、reports、PR／CI live state。|白話進度、已有圖像與可獨立理解的 action items。|回來後快速了解完成什麼、哪項決定還在等自己。
ketchup-video|用影片掌握進度|沿用 ketchup 的查證與交接方式，將已有成果做成有字幕的短影片。|要求 ketchup-video。|已查證進度、既有 screenshots／videos。|短影片與文字 action items；render 失敗明示。|把多個已取得的畫面剪成短片，不捏造未擷取的 UI。
maintain-formal-verification-skill|維護形式驗證對應|根據 covered code 的變更更新模型、harness 或 property，區分 drift 與真正 bug。|驗證範圍的程式合併、重構或懷疑模型已過時。|既有 formal Skill、coverage／sync commit、後續 code diff。|更新驗證、重新執行結果與 drift／bug 判定。|鎖的生命週期改變後，檢查模型是否仍對應真正 atomic steps。
maintain-verification-skill|維護功能驗證地圖|逐 feature 比對 source，再由單一 coordinator 驅動所有真實路徑。|定期 audit verify Skill 或 feature map。|已有 verify Skill、feature files、可啟動 app。|clean／changed／blocked 結論，最多一份有證據的修正 PR。|產品新增搜尋入口後，補上 feature map 中遺漏的路徑。
make-bot-ui|建立喚醒 Bot 的介面|描述建立 webhook routine、收集 sender key、在本機與 tailnet 提供 UI 的程序。|需要按鈕或頁面喚醒 Grok Bot 的明確情境。|外部 routine 工具、webhook key、主機與 Tailscale 設定。|可喚醒外部 Bot 的介面與設定流程。|在具備相應外部服務的環境製作控制頁；本學院不執行。
no-comments|審查註解與結構|委派 Comment Sicko，核對可接受的 findings，再做最小範圍修正。|review 前或直接要求 no-comments。|明確 files／diff，或目前對 base branch 的 diff。|accepted fixes、保留的 REVIEW、刪除數與未解約束。|外部平台規則無法查證時保留 REVIEW，而非直接刪除。
poteto-help|選擇合適入口|協助設定、開始 poteto-mode，並依問題找 Skill、Playbook 或 Principle。|不確定如何開始、選什麼流程或修正偏離的 run。|使用者問題、設定與任務狀況。|適用入口與可操作的建議。|不知道應用 Investigation 還是 Bug fix 時先釐清目的。
poteto-mode|工程工作方式與路由|讓宿主 Agent 依任務選 Playbook，按需使用 Skills、原則與驗證規範。|需要嚴謹工程工作的任務，或明確啟用 poteto-mode。|使用者任務、repo、宿主工具與 per-role settings。|依所選 Playbook 決定的設計、修改、說明與證據。|收到捲動異常後路由 Bug fix，而非直接猜 patch。
recall|重建近期工作脈絡|限定 workspace 與時間，整合自身歷史、shared record 與 live state。|回顧近期工作或恢復某個主題的工作脈絡。|相關 transcripts、Git／PR／tracker／issue record。|capsule、帶狀態的 threads、問題與下一步。|回到上週的快取工作，先讀已被 revert 的修正紀錄。
reflect|從對話提取可持續的改進|三種 reviewer 視角與 synthesizer 找出值得保留的 learnings。|使用者明確說 reflect。|active transcript 或限定摘要、既有 Skills。|Accepted／Rejected／Backlog；核准後才套用指定 Skill 編輯。|把反覆遇到的工具用法錯誤送到結構性 enforcement，而非一直加 prompt。
setup-pstack|設定角色與模型|偵測當前可用模型，確認 reasoning budget 與角色表，再寫設定檔。|初次設定、修改預算或更換角色模型。|宿主 model list、目前設定、使用者選擇。|依 harness 寫入的 per-role model settings。|使用 inherit-parent 保留父對話模型，不寫不存在的 slug。
sharpen|把任務想深而非做大|讓需求更精確、更深入，改寫 prompt 而非擴張無關範圍。|明確要求 sharpen。|目前任務與使用者目標。|更聚焦、更有深度的 prompt。|把「改善效能」改成有明確 workload 與觀察終點的任務。
show-me-your-work|留下決策與證據|用單一 append-only TSV 記錄選擇、原因、evidence 與結果，並對照 transcript。|長期、unattended 或交回後才會被審查的工作。|每個決策與 checkpoint 的可開啟證據指標。|canonical TSV、稽核與不同模型 reviewer 的注意事項。|一輪優化沒改善就記 revert，不把失敗嘗試從歷史刪掉。
statechart|讀懂形式模型的狀態路徑|執行 TLA+ 模型檢查並轉成可讀的 report 與適用時的 Mermaid 圖。|有 TLA+ spec／config，想理解 invariant 或 counterexample。|TLA+ spec、cfg、可選 view module 與空輸出目錄。|report.md、tlc.out、依模型大小與結果決定的 chart.mmd。|看出哪條最短路徑到達違反規則的狀態；通過只涵蓋模型範圍。
swarm|平行覆蓋與彙總|把獨立 slices 或 race 交給 workers，核對證據後回傳整合報告。|多區域探索、coverage matrix、race 或 gauntlet。|done predicate、分工或 race rule、固定 SHA／量測方法。|PASS／ISSUES／BLOCKED 的整合報告與 gaps。|三個 worker 各檢查一個獨立模組，而非選最佳候選來 graft。
tdd|先證明失敗再修正|在適用且便宜的測試路徑，以 failing test→fix→verify 建立回歸證據。|使用者明確要求，或 bug 有明確低成本 local test。|可失敗的具體行為、測試目標。|先紅後綠的 regression proof 與最小修改。|先寫一個能重現越界行為的小測試，不強行測昂貴整合。
teach|把如何與為何連成理解|結合 how 的實際路徑與 why 的歷史理由，按讀者需要逐層說明。|要求理解某個 subsystem、變更或工作成果。|讀者目的、相關 code 與決策紀錄。|清楚解釋、分段圖示與保留 uncertainty 的理由。|先說明儲存機制，再說歷史上為何選擇這種責任邊界。
technical-writing|有結構的技術寫作|結合 Diátaxis、簡明句子、指令規則與 Global English 的寫作規範。|撰寫或審查 docs、RFC、README、PR 說明。|文件目的、讀者與待表達的工程事實。|適合目的的文件，並由 unslop 檢查 AI-tells。|區分 how-to 與 explanation，讓操作文件能被照著完成。
typescript-best-practices|TypeScript 實務|提供型別、邊界、結構與程式風格的 TypeScript 指引。|閱讀或編輯 .ts／.tsx 檔案。|TypeScript 程式與 repo 的既有約束。|依規範撰寫或審查的 TypeScript；沒有獨立 runtime 產物。|用 discriminated union 表達不同狀態，而非多個互斥 boolean。
unslop|刪除寫作中的 AI-tells|辨識並移除空泛用詞、冗長格式與沒有內容的說法。|整理任何 prose surface，或直接要求 unslop。|待整理的文字與真正要表達的內容。|較清楚、具體、保留事實的文字。|用可觀察的改變取代沒有證據的誇大效果。
why|從記錄查設計理由|讀引入決策的 commits、PR 討論與後續紀錄，保留證據與不確定性。|問動機、regression、postmortem 或為何選擇某個門檻。|相關 history、PR 討論與第一手記錄。|有來源的理由與取捨，推論與未知分開。|不從目前 code 猜作者想法，先找引入該設計的討論。
'''

PRINCIPLE_ROWS = '''
attack-the-premise|檢查共同前提|兩次以上共享同一前提的修正都未通過時，先寫出並測試前提。|多個修正卡在相同 gate。|失敗紀錄與共同假設。|被驗證或推翻的前提。|連續加 guard 都沒修好問題時，先測資料是否真的以為的順序到達。
boundary-discipline|把防線放在邊界|在 CLI、config、network 等系統邊界驗證外部資料，讓內部邏輯保持純粹。|接 validation、error handling 或 framework adapter。|外部輸入、系統邊界與內部型別。|清楚的解析／驗證邊界。|在 API adapter 解析資料，而非每個內部函式重做同一 guard。
build-the-lever|建立可重跑的工具|把修改或證明工作變成 reviewer 可以重跑的 script、generator 或 harness。|非瑣碎的修改、分析或檢查。|重複操作與可檢查的終點。|可重跑的工具與實際產物。|用 codemod 遷移呼叫者，再檢查實際 diff。
encode-lessons-in-structure|把教訓寫進結構|重複的提醒優先轉成型別、metadata、lint、runtime check 或 script。|第二次寫同一條指令或重複糾正。|反覆出現的錯誤與可執行約束。|能阻止同類錯誤的結構或 gate。|讓 lint 明確指出錯誤與修法，不再加一段容易被忽略的 prompt。
exhaust-the-design-space|比較完整替代方案|對沒有先例的互動或架構，先做二到三個整體候選再比較。|新型 UI interaction 或架構決策。|待決問題、候選與比較條件。|候選觀察、取捨與選擇。|把兩種資訊密度放在切換器中比較，而非只微調第一個版本。
experience-first|使用體驗優先|便利性與完整體驗衝突時，縮小功能並打磨使用者真正會遇到的路徑。|產品、UX、feature scope 取捨。|使用者路徑與維護者需要。|有體驗理由的範圍與設計決策。|先讓核心搜尋可用，再增加裝飾性篩選功能。
explain-the-number|解釋量到的數字|先理解限制因素與做了多少真實工作，再信任或使用測量結果。|量測前、報告或採取行動前。|workload、限制、error count 與原始樣本。|能被解釋的量測與適用範圍。|確認速度提升沒有來自少算了資料。
fix-root-causes|修正根因|追到系統第一次出錯的位置，避免在合法內部狀態之外堆 symptom guards。|除錯與修正錯誤。|症狀、執行觀察與上游狀態。|由機制證據支持的修正。|修復產生錯誤狀態的轉移，而非每個使用端加 null guard。
foundational-thinking|先選對資料結構|先決定 core types、資料形狀與共享狀態，使後續邏輯自然成立。|開始寫邏輯、scaffold 或並行設計前。|領域概念、核心型別與 actors。|資料結構與建置順序的決策。|先決定誰擁有狀態，再寫 worker 的更新邏輯。
guard-the-context-window|保護上下文空間|把大量檔案與原始資料交給子 Agent，主對話保留摘要與指標。|長輸出、反覆讀取、大檔案或 fan-out 規劃。|大量 source／artifact 與限定範圍。|聚焦摘要與可追溯的檔案指標。|主對話讀 profile 結論，原始樣本由專責 worker 查詢。
laziness-protocol|以最小解法降低負擔|優先刪除與最小修改，避免沒有需求的抽象、layers 或 signal threading。|重構、評估 diff 大小或想增加抽象時。|目標行為與現有結構。|更小且足以解決問題的設計。|移除單一 caller 的包裝函式，而非再增加一層。
make-operations-idempotent|讓重試收斂|設計在 crash、restart 與 retry 後仍能收斂到相同終點的操作。|command、lifecycle 或重試迴圈。|部分完成狀態、重試方式與目標狀態。|可重試的操作設計。|恢復時辨認已建立的資源，而非重複新增。
migrate-callers-then-delete-legacy-apis|遷移呼叫者並刪舊介面|引入新 API 時同一波搬完 callers，刪除舊 API。|內部 API 形狀改動。|舊 API、所有 callers 與新契約。|只有新路徑的遷移結果。|更新所有呼叫位置後刪除 compatibility wrapper。
minimize-reader-load|減少讀者心中狀態|減少隱藏狀態、追蹤層數、單 caller wrappers 與過大的 mutable scope。|難追蹤的程式設計或 code review。|呼叫路徑、隱藏假設與變數範圍。|更容易局部理解的程式。|讓閱讀一個模組就能知道責任，而非跳五個薄 wrapper。
model-the-domain|以結構表達領域|用 state machine、typed model、table、registry 或 reducer 承載領域規則。|stateful logic、大量分支或重複形狀假設。|領域狀態、規則與合法轉移。|可以表達領域限制的結構。|用明確狀態表達 queued／running／done，避免矛盾 boolean。
never-block-on-the-human|可逆工作持續推進|對已授權的可逆工作直接做並呈現結果，保留真正需要人決策的事項。|想詢問是否進行可逆工作的時候。|已授權範圍與可逆性判斷。|可審查的具體成果。|先完成唯讀盤點，再把需要產品取捨的部分交給人決定。
outcome-oriented-execution|朝目標架構收斂|已規劃的重寫與遷移，不為短暫中間狀態保留會丟掉的相容層。|有明確 phase boundaries 的遷移。|最終架構與各階段 scope。|朝目標形狀前進的修改。|在核定範圍內完成新資料流，不永久維護兩套中間模型。
prove-it-works|用真實產物證明|宣告完成前操作或檢查實際 artifact，而不是只信自述或編譯成功。|完成任務、準備報告結果前。|原目標、真實 app／輸出與可重跑檢查。|同 surface 的可觀察證據與限制。|按使用者路徑操作並檢查結果，而非只看測試數量。
redesign-from-first-principles|把新約束當成起點|整合新需求時，重新思考若第一天就知道它，架構會是什麼。|新需求融入現有設計。|原系統、新約束與目標。|重新整合而非外掛補丁的設計。|把新 ownership 規則放進核心模型，而不是讓每個 caller 特判。
separate-before-serializing-shared-state|先隔離再序列化|並行 actors 可能共寫同一目標時，先消除共享，再判斷鎖是否真的必要。|多 worker 寫同檔案、branch、key 或物件。|writers、寫入目標與真實 invariants。|獨立輸出或有理由的單 writer 邊界。|每個候選使用自己的 worktree，不在同一 branch 同時改碼。
sequence-verifiable-units|拆成可驗證單位|每個小單位結尾就檢查，再執行下一個；delivery 順序自己說明證據。|多步修改、migrations、commits 或 PR stack。|可拆分工作與每段 check。|逐段保持可驗證的修改序列。|先交 failing repro，再交 fix，保留紅到綠的歷史。
subtract-before-you-add|先減再加|在增加或重構前，移除死碼、重複 validators 與失效引用。|安排 addition、refactor 或 rewrite 的順序。|既有結構、失效路徑與新需求。|較小基礎上的實作。|先刪無用的舊資料路徑再加入新結構。
test-behavior-not-implementation|測可觀察行為|對使用者能觀察的契約做 assertion，使內部重構不會無故破壞測試。|撰寫、修改或保留 test。|使用者行為契約與可觀察結果。|保護真正行為的測試。|驗搜尋結果而非 state setter 被呼叫幾次。
type-system-discipline|用型別阻止不合法狀態|語意 primitive、外部解析與 variants 交由型別系統表達。|設計 signature、型別或靜態型別程式。|領域合法狀態與 authoritative schemas。|清楚邊界與可被編譯器檢查的契約。|用 discriminated union 讓未驗證與已驗證資料不能混用。
'''

WORKFLOW_ROWS = '''
investigation|唯讀調查|回答如何運作或為何這樣設計，交付有來源的說明。|唯讀問題；可讀取的程式庫與限定問題。|有引用的解釋或 trade-offs 建議；不開 PR。|要修改時先交回，再轉 Feature／Bug fix。|理解受影響程式;標記唯讀 checkpoint;組織有來源的解答;整理文字
bug-fix|錯誤修正|先重現與證明根因，再做最小修正。|明確症狀；可到達真實使用 surface 的 driver。|root cause、修正、同 surface 的前後證據與 PR。|無法重現先合成 trigger 或加 instrumentation；inconclusive 不算通過。|親自重現;排除假設並證明機制;規劃與委派修正;重跑同一使用路徑;保留先紅後綠的歷史;開啟 PR
perf-issue|一次效能改善|將一項量測到的 slowness 改善到有證據的結果。|可重現 workload、baseline 與 matching control skill。|baseline／after／delta、trace artifacts 與 PR。|數字需 benchmark-checklist；錯 surface 或不確定不算成功。|建立可信 baseline;依成本順序尋找瓶頸;規劃、委派並取得新 trace;解析與比較產物;把量測證據寫入 PR;開啟 PR
hillclimb|持續量測改善|固定一個 metric，以假設、量測、keep／revert 持續前進。|真實 workload、可檢查 predicate、regression gate。|accepted commits、iteration 統計、decision log 與最終量測。|噪音內提升不接受；無效修改完整 revert，不可放寬目標。|選 workload、metric 與停止條件;證明並固定量測 harness;開啟每輪決策紀錄;由架構形成可檢查假設;一次實驗、量測並保留或還原;停滯後轉換策略;依 predicate 或邊際成本決定終點;以已接受修改開 PR
runtime-forensics|即時執行診斷|從 live process 的 profile、heap 或 instrumentation 確認機制。|可觀察的 live symptom 與對應控制 surface。|附來源的 diagnosis 與 capture；沒有自行交付 fix。|未證明機制不能當成確定根因；修正另轉 Bug fix／Perf。|擷取真實訊號;縮小到關鍵證據;在執行中證明機制;對應到 source symbol;標記唯讀 checkpoint
trace-forensics|既有追蹤檔分析|分析已取得的固定 artifact，追到 hot path 或 retainer。|trace／profile／spindump 等已有 capture。|格式、縮減發現、source mapping 與是否 confirmed。|缺 symbols 要明說；無 paired capture 僅列最強假設，不重跑 capture。|辨識格式;轉成可查詢資料;縮小根因候選;對應原始碼符號;有配對 capture 時比較;交付診斷而非修正
feature|功能開發|由資料形狀與架構探索開始，再委派、驗證與交付。|新增或改變行為；可讀取的受影響 subsystem。|功能、設計理由、throughput checkpoint 與 PR。|多種合理形狀用 arena；設計有爭議才 interrogate；不確定不過關。|理解受影響子系統;探索並選擇架構;規劃吞吐與共享狀態;委派實作或比較候選;在真實 surface 驗證;整理可驗證的 commits;有爭議時對抗審查;開啟 PR
refactoring|保持行為的重構|先固定契約，再降低結構與閱讀負擔。|能用 characterization 或 equivalence 固定既有行為。|結構改變、等價證據與 reader-load 說明。|新 bug／feature 拆開；沒有降低閱讀負擔的修改應還原。|先固定既有行為;命名缺少的領域結構;定義目標形狀;先減去多餘結構;小步搬移全部 callers;證明真實行為等價;確認閱讀成本真的下降;整理小 commits 並開 PR
prototype|拋棄式原型|用最低成本觀察設計或行為，回答一個具體決策。|有要比較的 UI、密度、時序或行為問題。|拋棄式候選、觀察、推薦與 scratch 路徑。|沒有待決問題轉 Feature；原型不作正式出貨程式。|決定要回答的問題;方向未定時找參考;在隔離 scratch 建立原型;把候選放在同一切換器;觀察真實 surface;比較並交接正式設計
visual-parity|視覺等價遷移|讓遷移後 UI 與原 baseline 達成像素等價。|先有修改前的 screenshots 與 comparison harness。|逐 component diff 結果、baseline 位置與剩餘工作。|nonzero diff 就 fail；不准改 baseline 或 harness 讓結果通過。|先建立 baseline;固定不可抄捷徑的規則;隔離並逐 component 遷移;用 image diff 驗證至零;逐安全單位開 PR
authoring-a-skill|撰寫技能|用所在 harness 的 authoring tool 建立精準 Skill。|需要建立或修改 SKILL.md 的具體行為。|Skill、設計理由與 frontmatter／links 驗證。|結構性行為適合 test cases；主觀文字不強行做 benchmark。|使用適用的技能撰寫工具;驗證宣告與參照;結構變動時加入測試案例;開啟 PR
eval|盲評技能改動|以自然任務、隔離 candidates 與盲評比較實際行為。|variant、success criteria、僅 judge 可見的 rubric。|candidate 證據、judge verdict 與是否 promote 的建議。|不洩露評測身分；從 transcript／產物驗證，不能靠自述。|定義變體與 rubric;準備 sanitized 環境;寫自然使用者任務;平行執行候選;使用盲評 judge;由 transcript 驗證實際遵循;親讀所有結果並統整
babysit|照看 PR 到可合併|清除 frontier 的阻擋，到 merge-ready 交回，不授權 merge。|使用者要求查狀態、處理 review 或 babysit。|各 PR 的 live state、merge-ready 或具體 blocker。|conflict 通常回報 owner；flake 最多一次 fresh build；不改 stack topology。|先宣告模式與 forge;只處理最低 frontier;確保每個 stack 單一照看者;保護 stack topology;依 conflict、review、CI 順序處理;信任 forge 的合併判定;分類 CI 再決定重試;用證據回應 Bugbot;到人類授權邊界停止
shipping|獨立驗證後合併|從 stack 底部只合併連續且經獨立驗證的一段。|明確 merge／land／ship 授權與非作者 verifier。|每 PR verdict、已 merge 證據與下一個 gap。|CI 綠不等於 verdict；queued 不等於 merged；patch drift 要重驗。|獨立驗證每個 PR;界定連續已驗證範圍;確認 verdict 仍涵蓋目前 patch;由底往上逐個合併;在落地期間維持 stack 穩定;到原定 ceiling 停止
autonomous-run|持續朝完成條件前進|先定義 checkable predicate，反覆實驗並留下每輪證據。|已授權的 run until done 與明確終點。|iteration、保留／還原、decision trail 與最終 predicate。|停滯不等於完成；真正 dead end 回報，不放寬目標。|定義可檢查終點;選事件或 heartbeat 喚醒;每輪最小修改並驗證;處理目標相關障礙;每輪寫 checkpoint;達成 predicate 才結束
orchestrate|長期工作協調|coordinator 只分工與查證，owner 負責各自 PR。|多日、多 PR 的 standing program，而非單個 session 的任務。|已落地目標、每 PR live state、被捨棄項目與待決策。|worker 依原因重試兩次後 drop／replan；不用 polling scripts 或 status relays。|先驗證單位與責任拓樸;以明確證據監督與交接
autopilot-full|自主 PR 佇列|每 PR 一位 owner，root 以獨立 swarm／verifier 把關後在授權內合併。|operator 明確 go、限定 queue 與保留 gates。|各 PR verdict、merges、countersigns 與 follow-ups。|新行為需重驗；不繞過 forge approval；stop 為全員零寫入。|先保護 operator gates;建立可接手的 PR owner;獨立 PR 從 trunk 平行;在 code-ready head 獨立驗證;只合併已驗證且測過的程式;root 持續稽核並 countersign;收到 stop 立刻停止寫入
autopilot-stack|自主建置後交回合併|沿用 Autopilot-full，明確覆寫成不 merge。|operator 要 verified／green PRs，保留自己落地。|current head verified 的 PR 清單與交接。|交接後無 go 不再 push；lower head 變動需要 restack／判定。|覆寫 full：到 verified 就停;只為真正相依關係建立 stack
session-pickup|接手一個既有執行|從指定 prior run 的 trail 重建狀態，保留已完成工作。|prior transcript、cloud-agent URL 或 pushed branch。|繼承／重做範圍、resume point 與後續路由。|不盲目重做；前人自述不是 proof，仍對原目標驗證。|找到前次紀錄;重建 operational state;區分已完成與待處理;路由剩餘工作;驗證繼承的主張
pause-safely|安全暫停|在原子邊界停下，留下冷啟動能接手的 checkpoint。|明確 pause；keep going 不構成暫停。|WIP commit、resume note、clean／broken 狀態。|不為暫停新增 irreversible actions；不把記憶中的進度當成已保存。|在安全邊界停止並處理 children;不增加不可逆動作;用 commit 保存編輯;把恢復紀錄留在對話以外
multi-phase-plan|多階段計畫|寫下可由 owner 執行、由 operator 稽核的計畫，先不實作。|跨階段或多 PR 的工作與 evidence 要求。|plan、appendices 與 check-plan 結果。|小且明確的工作可 skip；checker pass 不是內容真實或執行授權。|判斷是否值得規劃;先用觀察解決未知;探索 conventions 與 entry points;依 skeleton 寫完整計畫;整理技術文件與文字;執行計畫格式檢查;交回並等待明確 go
worktree-cleanup|清理開發狀態|先盤點與確認實際使用，再移除已確認可清理的 worktree。|清磁碟需求、pinned／active chats 的真實集合。|前後空間、已移除項目與保留理由。|bucket 不是授權；in-use 或 uncommitted work 需決策，不能自動判安全。|盤點 baseline 與 worktrees;把建議與真正使用狀態交叉比對;查證近期 chat;遇不可逆損失先交決策;只清理確認過的集合;必要時處理其他 simulator 或 cache
opening-a-pr|包裝與交付 PR|依規範整理 worktree、commits、描述與正確 stack base。|需要變更交付的 Playbook 到達 PR 階段。|ready PR、清楚 scope 與 verification，不自動 babysit。|Benny 的 draft-only 是獨立 pack 規則；Autopilot owner 的 babysit 是既有 brief 例外。|隔離工作目錄;整理可驗證的 commits;審查程式與寫作;使用清楚標題;寫一分鐘 PR 說明;固定 forge;有內建 PR 工具時優先使用;拆小 PR 與正確 stack base;確認 ready 狀態;交 URL 並繼續原 phase
'''

# Per-step component usage is editorially reviewed, not keyword extraction.
STEP_COMPONENTS = {
 'investigation': {0:['why'],3:['unslop']},
 'bug-fix':{1:['why'],2:['architect','poteto-agent'],4:['tdd','principle-sequence-verifiable-units']},
 'feature':{1:['architect'],2:['principle-separate-before-serializing-shared-state'],3:['poteto-agent','arena','principle-model-the-domain'],5:['principle-sequence-verifiable-units'],6:['interrogate']},
 'perf-issue':{0:['benchmark-checklist'],2:['architect','poteto-agent']},
 'hillclimb':{1:['benchmark-checklist','principle-build-the-lever'],2:['show-me-your-work'],4:['poteto-agent','principle-separate-before-serializing-shared-state']},
 'runtime-forensics':{1:['principle-guard-the-context-window']},
 'trace-forensics':{0:['principle-guard-the-context-window']},
 'refactoring':{1:['principle-model-the-domain'],2:['architect'],3:['principle-subtract-before-you-add'],4:['poteto-agent','principle-migrate-callers-then-delete-legacy-apis'],5:['principle-prove-it-works']},
 'prototype':{3:['principle-exhaust-the-design-space']},
 'visual-parity':{2:['principle-separate-before-serializing-shared-state']},
 'eval':{3:['arena'],4:['arena']},
 'autonomous-run':{2:['principle-sequence-verifiable-units'],4:['show-me-your-work']},
 'autopilot-full':{1:['show-me-your-work','no-comments'],3:['swarm'],5:['ketchup']},
 'multi-phase-plan':{1:['principle-never-block-on-the-human'],2:['poteto-agent'],4:['technical-writing','unslop'],5:['check-plan']},
 'opening-a-pr':{2:['no-comments','technical-writing','unslop']},
 'worktree-cleanup':{0:['worktree-audit'],2:['principle-guard-the-context-window']},
 'session-pickup':{0:['principle-guard-the-context-window'],4:['principle-prove-it-works']},
 'shipping':{4:['watch-pr']},'babysit':{5:['watch-pr']},
}

STEP_CONDITIONS = {
 ('investigation',0):'問設計動機時才使用 why。',
 ('bug-fix',2):'修正跨函式邊界時才先 architect。',
 ('bug-fix',4):'便宜且明確的 local test 才採 tdd；否則保留同 surface proof。',
 ('feature',3):'多個合理實作形狀時改由 arena 比較。',
 ('feature',6):'設計有爭議時才進行。',
 ('refactoring',2):'target 跨函式邊界時使用 architect。',
 ('prototype',1):'方向已定則跳過 prior-art／moodboard。',
 ('trace-forensics',4):'只有 paired capture 才做前後確認；否則保留假設標記。',
 ('babysit',5):'GitHub 使用 watch-pr；Origin 使用自己的 CLI，不混用 verdict 名稱。',
 ('shipping',4):'GitHub 使用 queued watcher；Origin 讀回各 PR 狀態。',
 ('authoring-a-skill',2):'結構性行為才需要 test cases；主觀文字略過。',
 ('multi-phase-plan',0):'只有一兩個檔案且明確的修改，可略過大型計畫並停止。',
 ('worktree-cleanup',3):'有 uncommitted 或 in-use 工作時，先取得具體決策。',
}

EXTRA_COMPONENTS = [
 ('poteto-agent','委派工作者','agent','agents/poteto-agent.md','接收 Playbook 的 code-writing／helper 工作；先讀完整 poteto-mode。','parent 給定的 task、scope、mode 絕對路徑。','任務指定產物與 evidence，不接管頂層 Playbook。','例如由 Feature 的 parent 委派一段已定義的實作。'),
 ('comment-sicko','註解審查者','agent','agents/comment-sicko.md','依 scope 評估註解與結構問題；不寫 application code。','指定 files／diff；預設對 main 的目前 diff。','刪除建議、MUST KILL、REVIEW 與 skips。','例如外部約束不可查證時保留 REVIEW。'),
 ('setup-benny','設定 Benny','automation-instruction','automations/benny/skills/setup-benny/SKILL.md','將 dormant pack 配置到 target repo，查 readiness，再由外部 Automations 啟用。','target repo、外置 config、adapter 與明確建立授權。','已 commit 的 pack／config、經 review 的外部 automations。','例如先測試所有發文都留在原始 thread。'),
 ('triage-issue-reports','Benny 回報分類','automation-instruction','automations/benny/skills/triage-issue-reports/SKILL.md','在原始 thread 分類、去重，必要時建立 ticket，發一個可信 marker。','top-level report、外置 config、Slack／tracker adapters。','原 thread 的 verdict 與可選 tracker URL。','例如已有可能 duplicate 時不建立新 ticket。'),
 ('reproduce-and-fix-issues','Benny 重現與修正','automation-instruction','automations/benny/skills/reproduce-and-fix-issues/SKILL.md','等待可信 triage marker，檢查 ownership，再重現與嘗試 bounded fix。','原 thread、可信 identity／marker、control adapter、feature map。','repro evidence、existing-fix verdict 或 draft PR；不 merge。','例如已有 fix artifact 時驗證它，而非競爭建立新修正。'),
 ('watch-pr','GitHub PR 狀態觀察器','tool','skills/poteto-mode/scripts/watch-pr/policy.ts','依 GitHub snapshots 判斷 blockers、等待與終止 verdict；不是通用工作流引擎。','GitHubReader、clock、queue／PR context 與 polling options。','NDJSON／pretty verdict：READY、BLOCKER、TIMEOUT 等，依 mode 而異。','例如 queued mode 無 blocker 仍 WAITING／merge-queue，全 merged 才 COMPLETE。'),
 ('check-plan','計畫格式檢查器','tool','skills/poteto-mode/scripts/check-plan.mjs','檢查 multi-phase-plan 的 sections、markers、boxes 與部分文字規範。','依該模板撰寫的 plan.md。','格式問題與行號／exit code；不證明計畫內容真實。','例如缺 Verify, live 區塊時回報問題。'),
 ('worktree-audit','Worktree 盤點工具','tool','skills/poteto-mode/scripts/worktree-audit.sh','盤點 worktrees、merge／PR／chat 資訊並建議 bucket；不自行刪除。','repo 與可選 base ref、Git／forge／transcript 資訊。','分類表與清理建議。雖稱 read-only，實際會 fetch refs／建暫存檔。','例如建議 safe 仍需與 pinned chats 交叉檢查。'),
 ('log-helper','決策 TSV helper','tool','skills/show-me-your-work/scripts/log.sh','追加 UTC timestamp 與欄位，清理 tabs／newlines 與試算表公式前綴。','logfile、phase、decision、why、evidence、result 共六個參數。','append-only TSV 列；沒有全域檔案鎖。','例如把每輪 keep／revert 寫成可稽核的決策。'),
 ('statechart-runner','TLA+ 檢查與圖表工具','tool','skills/statechart/scripts/statechart.ts','驗輸出目錄，啟 worker／TLC、暫存清理，再交付完整 report。','spec、cfg、可選 view、空輸出目錄與所需 runtime／mise。','report.md、tlc.out、可能的 chart.mmd；錯誤不交付半套結果。','例如超過 chart 規模時只畫失敗路徑，沒有失敗可能無圖。'),
 ('bootstrap','工具依賴初始化','tool','skills/poteto-mode/scripts/bootstrap.ts','以 package／lockfile hash 判斷是否安裝 frozen dependencies，再重啟工具。','scripts/package.json、bun.lock 與本機 node_modules。','安裝與 install key；可能需要網路並寫工具目錄。','例如第一次執行 watch-pr 時確認 commander 已安裝。'),
]

# Source markers are checked literally. Missing markers fail the content build.
RELATIONS = [
 ('poteto-mode','architect','conditional','code 跨函式邊界時。','Code crossing a function boundary'),
 ('poteto-mode','swarm','conditional','coverage、race 或探索分工。','Parallel fan-out'),
 ('poteto-mode','arena','conditional','設計或程式 bakeoff。','Use **arena**'),
 ('poteto-mode','no-comments','conditional','review 前。','Before review'),
 ('poteto-mode','unslop','conditional','prose surface。','Any prose surface'),
 ('poteto-mode','technical-writing','conditional','docs、RFC、README 或 PR 說明。','Docs, RFCs'),
 ('poteto-mode','show-me-your-work','conditional','長時間、unattended 或多階段。','Long, autonomous'),
 ('poteto-agent','poteto-mode','invokes','委派工作前讀完整 mode。','Read the `poteto-mode`'),
 ('architect','arena','invokes','Phase B 比較不同結構。','Run the **arena**'),
 ('architect','why','conditional','改 ownership／layering 時。','also run the **why**'),
 ('architect','interrogate','recommends','想在實作前加對抗式壓力時。','For adversarial pressure'),
 ('interrogate','arena','invokes','只使用指定 fan-out／verify 階段，不做 base／graft。','Run Phase A'),
 ('interrogate','in-your-own-words','invokes','先建立 intent。','State the intent'),
 ('teach','how','invokes','runtime explanation；小問題依內容縮小。','then run `how`'),
 ('teach','why','invokes','rationale；保留 uncertainty。','and `why`'),
 ('teach','unslop','invokes','整理輸出。','through the **unslop**'),
 ('technical-writing','unslop','invokes','每篇 touched doc。','Apply the **unslop**'),
 ('ketchup','bro','references','借 voice，不執行 bro 的 task。','voice, not its task'),
 ('ketchup-video','ketchup','invokes','沿用結構，影片取代 summary／visuals。','Follow [`/ketchup`]'),
 ('no-comments','comment-sicko','invokes','註冊 Agent 或使用 reference prompt fallback。','subagent_type: "comment-sicko"'),
 ('no-comments','architect','conditional','accepted fixes 需要形狀時，只到 sketch。','run `/architect` once'),
 ('no-comments','why','conditional','薄弱約束先 trace 或查理由。','or run `/why`'),
 ('figure-it-out','architect','conditional','one-way-door design；已定形機械工作略過。','run the **architect**'),
 ('figure-it-out','show-me-your-work','invokes','Phase D 留 canonical trail。','via the **show-me-your-work**'),
 ('setup-pstack','create-verification-skill','recommends','先 offer，使用者 yes 才啟用。','On yes, invoke `/create-verification-skill`'),
 ('setup-pstack','create-formal-verification-skill','recommends','先 offer，使用者 yes 才啟用。','On yes, invoke `/create-formal-verification-skill`'),
 ('create-verification-skill','maintain-verification-skill','recommends','交接後的維護 loop。','Point the user at `/maintain-verification-skill`'),
 ('create-formal-verification-skill','statechart','conditional','TLA+ 模型才使用；由生成的 verify skill 讀結果。','If the check is a TLA+ model'),
 ('create-formal-verification-skill','maintain-formal-verification-skill','recommends','後續 code／model 對應維護。','Point the user at `/maintain-formal-verification-skill`'),
 ('show-me-your-work','log-helper','recommends','可選 helper，也允許依規則追加。','Use the helper `scripts/log.sh'),
 ('blast-radius','how','references','角色互補，非固定呼叫。','Companion to `how`'),
 ('blast-radius','why','references','角色互補，非固定呼叫。','Companion to `how`'),
 ('blast-radius','arena','conditional','big／wide change。','run it as an `arena`'),
 ('blast-radius','unslop','invokes','交付寫作。','Write it through `unslop`'),
 ('recall','automate-me','conditional','若目標是持久化個人習慣，改路由此 Skill。','is `automate-me`'),
 ('triage-issue-reports','why','conditional','像 regression 或涉及 defensive code。',"Use pstack's `why`"),
 ('triage-issue-reports','unslop','invokes','整理 thread verdict。','and `unslop`'),
 ('reproduce-and-fix-issues','triage-issue-reports','protocol','等原 thread 的指定 identity＋唯一 marker；不是直接呼叫。','Accept a verdict only when'),
 ('statechart','statechart-runner','runs','依 Run section 執行工具。','scripts/statechart SPEC.tla'),
]
