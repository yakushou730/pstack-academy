# pstack Interactive Academy 設計計畫

狀態：**使用者已於本對話回覆 approve，核准本計畫；Phase 3 實作已完成，Phase 4 自動檢查已通過，瀏覽器 QA 因執行環境限制尚未驗證。** 日期：2026-11-16。

目標是在本機用繁體中文學會 pstack 的設計、元件與工作流，並且每個重要結論都能回到證據。本計畫以 [Phase 1 研究](../research/README.md) 為內容基準，固定 source commit `74bcc61bd216687b1d6d480c28f109adfc9824ec`／plugin `0.15.42`。不需要登入、後端資料庫或雲端部署。

## 研究如何影響設計

| 研究發現 | 設計決策 |
|---|---|
| 核心流程是 Markdown 指令，不是一般 workflow runtime | 所有圖與步驟標 instruction-defined／code-enforced／conceptual；Simulation 永遠顯示，不提供「執行 pstack」按鈕 |
| 原作者、上游、mirror 角色不同 | 首頁與來源頁清楚顯示 Lauren Tan／poteto、cursor/plugins、backnotprop mirror 與研究版本 |
| 58 Skills／23 Playbooks 一次展示過多 | 首頁先呈現一條最小 task→playbook→skill→host tool→evidence 路徑，再進入可篩選目錄 |
| graph 的引用不都等於 invokes | edge 有關係種類、條件、證據；可同時看 direct 與 transitive paths，不把安裝建議當呼叫 |
| 部分影片沒有可取得全文 | Talks 頁展示已確認的官方 metadata／章節與取得程度；沒有發言引文的來源不作發言摘要 |
| 原則與工具落實的程度不同 | 實作／作者說明／推論／未知四種標記，加一個執行種類標記；兩者維度分開 |

## Information Architecture

桌面左側固定六個主章節，頂部有搜尋與版本；內容在中間，右側視需要顯示關聯與證據。手機改成可收合導覽與單欄細節。

| 章節／預定 hash route | 主要學習目標 | 核心互動 | 主要來源 |
|---|---|---|---|
| 1. 五分鐘入門 `#/intro` | 知道 pstack 是什麼、哪些能力由宿主提供 | 三段漸進 Architecture Overview；點節點看責任與例子 | research/README.md |
| 2. 作者與設計觀 `#/philosophy` | 區分設計意圖與實作 | 觀點→本機 Skill 對照、來源取得程度 filter、官方章節連結 | research/external-sources.md |
| 3. 元件探索 `#/components`／`#/components/:id` | 找到所有 Skills、Agents、tools 與 pack | 文字搜尋、類型篩選、元件詳情、關聯圖／表 | research/components.md、dependencies.md |
| 4. 工作流探索 `#/workflows`／`#/workflows/:id` | 了解 23 Playbooks 的步驟、分支與交接 | 完整流程＋stepper、前後步、條件分支、Skill／Source cross-links | research/workflows.md |
| 5. 引導學習 `#/learn`／`#/learn/:id` | 用情境練習選流程與判斷證據 | 明示 Simulation 的 walkthrough／情境題／解釋回饋 | 經查證的流程與 code branches |
| 6. 工程實務 `#/insights` | 借鑑隔離、驗證、context、維護設計 | arena／swarm、Babysit／Shipping 等對照；實務卡片連 evidence | research/README.md 的 Trade-offs |

另有 `#/sources/:id` 的來源閱讀頁、研究方法／coverage／Unknowns 說明。它們是共用查證工具，不另塞一個與學習路徑競爭的主章節。

所有詳情可直接連結並在重新整理後還原選取項；hash routing 避免本機靜態 server 的 fallback 設定。未知 route 顯示清楚的返回入口，無搜尋結果有 reset filters。

## Learning Experience Design

### 五分鐘入門

以下時間是**教學篇幅目標，尚未做使用者測試**，不是可證明的學習成效。

1. 第 1 分鐘：原作者／上游／mirror，以及「Skills 指引宿主 Agent」這個定義。
2. 第 2 分鐘：點擊 task→poteto-mode→Playbook，顯示一個具體 Bug fix 問題。
3. 第 3 分鐘：加入 architect／worker／真實 surface evidence，說明哪些步驟視情況使用。
4. 第 4 分鐘：打開 source viewer，看文件規範與 watch-pr 程式分支的差異。
5. 第 5 分鐘：三題 knowledge check，立即看到答案理由與 source，而非只顯示對錯。

### Progressive Learning Path

| 路徑 | 使用者活動 | 學習結束時應能回答 |
|---|---|---|
| 認識系統 | 看逐步架構圖、分辨宿主與插件 | pstack 自己提供了哪些東西？ |
| 選擇流程 | Bug fix／Feature／Investigation 情境 | 現在應該診斷、修改，還是只回答問題？ |
| 理解協作 | 比較 arena 與 swarm，點 direct／indirect edges | 合成候選與彙總覆蓋為何不同？ |
| 理解驗證 | Babysit／Shipping、TLA+ scope 情境 | ready／merged／model passed 分別能證明什麼？ |
| 應用設計 | 選一個工程實務，查看最小採用方式與 trade-off | 自己的工作流可以先加入哪個有用機制？ |

預定三個 Simulation：

- **捲動異常修復。** 在「先猜 patch／先重現」與「unit test 綠／同一真實 surface 已修正」的分支做選擇，看到 spec 內的證據門檻。錯誤選擇有解釋，可返回重試，不連任何真實 app。
- **PR 綠了是否能 merge。** 給固定的 mock CI／review／verdict 狀態，分清 Babysit、Shipping、queue 與真正 merged；資料明示模擬，結果是教學解釋。
- **形式驗證結果怎麼讀。** 用明示為合成的小型狀態路徑說明 property／counterexample／scope；不執行 TLC，不聲稱這是 pstack runtime 的狀態機。

學習進度只記「已看過哪些單元／作答結果」，以 versioned localStorage 存在同一瀏覽器，可一鍵清除；不可把閱讀完成當成已掌握知識。外部來源、source viewer 和核心探索功能不依賴 localStorage 成功。

## UI / UX Proposal

採深色 developer-tool 視覺：深藍灰背景、足夠對比的中性色文字，青綠色用於選取／verified；作者說明、推論、未知另有文字標籤與 icon，不能只靠顏色分辨。技術路徑與 code 使用系統 monospace，正文用系統繁中 sans-serif，初版不抓外部字型。

桌面佈局草圖（概念示意，尚未製作 UI）：

```text
┌───────────────────────────────────────────────────────────┐
│ pstack Academy              搜尋               0.15.42    │
├───────────┬───────────────────────────────┬───────────────┤
│ 五分鐘入門│ 工作流／元件標題              │ 證據標記      │
│ 作者觀點  │ 用途與觸發條件                │ 固定 SHA      │
│ 元件探索  │                               │ Source 引用   │
│ 工作流    │ 圖／逐步導覽／教學內容        │ 上下游元件    │
│ 引導學習  │                               │ 限制與未知    │
│ 工程實務  │ [上一步]  3 / 7  [下一步]    │               │
└───────────┴───────────────────────────────┴───────────────┘
```

互動約定：

- **Architecture Overview：**三段漸進展開，每個節點是可用鍵盤啟動的 button；詳細說明放鄰近 panel，提供同內容文字順序。
- **Dependency Graph：**預設只顯示選取元件的一跳關係；可切兩跳，顯示完整證據路徑與 direct／transitive。限制可見節點數並要求進一步篩選，避免全圖堆疊；相同資料另有可排序表格供鍵盤／手機使用。
- **Workflow Explorer：**全步驟 outline 與選中 step panel 並存；有條件的步驟顯示 condition。前後按鈕走教學順序，不能暗示真正執行。分支選擇是教材的 Simulation state，不能修改研究內容。
- **Source Viewer：**內建固定版本的唯讀文字、行號、被引用範圍與 GitHub SHA permalink。渲染為 escaped text，不執行 script，不渲染任意來源 HTML；沒有 Run／Install 功能。
- **Search：**依名稱、用途、trigger 與中文別名做本機搜尋，支援 Skills／Playbooks／Agents／tools／automation instructions filter。資料量適合簡單文字索引，先不加搜尋服務。
- **Accessibility：**semantic headings、focus styles、skip link、可操作名稱、Escape 關閉 panel／modal、prefers-reduced-motion、狀態文字可被讀屏理解。主要功能必須不用拖曳也可完成。

## Technology Stack 與取捨

**建議 React＋TypeScript＋Vite，CSS Modules 或一般分層 CSS，npm lockfile。** 這是多個共享資料視圖與互動學習 state 的平台，採用 component model 比大量獨立 DOM event handlers 更容易維護。Vite 官方提供 react-ts template、dev server 與靜態 build／preview；不需要 SSR。[Vite 入門](https://vite.dev/guide/)、[靜態 build／preview](https://vite.dev/guide/static-deploy)。

State 先使用 React local state／reducer，由 URL 保存選取內容，不引入全域 state library；React 官方文件涵蓋 state 結構、共享與 reducer 等方法。[React Managing State](https://react.dev/learn/managing-state)。

| 決策 | 建議 | 不採其他選項的原因／何時重評估 |
|---|---|---|
| 前端 | React＋TypeScript＋Vite | buildless 適合更小頁面，本案有多視圖／資料關聯／學習狀態；SSR／server framework 初期增加無需求的 server 維護 |
| 圖形 | 小型 SVG 關係線＋HTML node buttons，由資料產生固定分層佈局 | React Flow 具更多圖編輯能力，但初期是唯讀探索；若後續需要大型可平移圖、複雜 layout 再評估，先以 keyboard list 滿足探索 |
| Routing | 小型 hash-route parser | 本機 preview 與直接開詳情不需 server rewrite；未來有複雜巢狀 routing 再加成熟 router |
| 內容 | 經編輯的 TypeScript／JSON data modules，與 UI 分開 | 不將整份 Markdown 直接渲染成網站；保留研究 Markdown 作研究紀錄 |
| Code viewer | escaped pre／code＋行號與 range highlight | 不需要編輯器 runtime；後續可依閱讀需求加高亮 |
| Testing | Vitest 測資料完整性／graph traversal／教學 transition；瀏覽器驗證真實 user journeys | 不寫與元件結構鏡像的快照 tests；瀏覽器端驗證方式在 Phase 3 依可用工具確認，不能用純函式 tests 冒充互動驗證 |
| Lint／typecheck | ESLint＋TypeScript strict，獨立 scripts | requirement 明列驗收，不能只靠 Vite build 代替 |

套件 exact versions 與 Node engine 在獲准實作時依環境及官方相容性確認，寫進 package-lock.json 與 README，不在此虛構已安裝版本或 build 通過紀錄。本階段沒有執行 create-vite／npm install。

## Data Model

以下是設計欄位，**不是 application code**。資料要表達證據與不確定性，不能用單一 boolean 混成「是真的／假的」。

| Entity | 核心欄位與約束 |
|---|---|
| SourceSnapshot | id、repo、commit、pluginVersion、researchDate、file hashes；本機來源引用必須屬於此 snapshot |
| Evidence | id、kind（implementation／author／inference／unknown）、executionKind（instruction／code／conceptual／不適用）、sourceRefs、limits；inference 也連 supporting refs，unknown 寫缺什麼證據 |
| SourceRef | id、snapshotId、path、startLine／endLine、quotedRange 可選、fixedUrl；外部來源另有 URL、作者、publishedAt nullable、accessLevel（全文／章節／metadata／無法取得）、retrievedAt |
| Component | id、name、kind（skill／agent／tool／automation-instruction）、purpose、responsibilities、triggers、inputs、outputs、constraints、examples、evidence；principle 是 skill subtype |
| Relationship | id、from、to、kind、condition、evidenceRef；同一 pair 可有不同情境 edges；不能由字串提到就自動產生 invokes |
| Workflow | id、name、kind（playbook／skill-flow／automation-flow）、purpose、entry、prerequisites、orderedSteps、finalArtifacts、limits、evidence |
| WorkflowStep | id、title、why、actions、inputs／outputs、componentIds、decisionConditions、next／alternativeIds、failureHandling、sourceRefs；不存在 retry 就明示未定義 |
| Lesson | id、goal、prerequisites、workflowRefs、simulationFlag、stages、choices、feedback、knowledgeChecks；正確答案與解釋皆有 evidence |
| Insight | id、principle、practicalUse、tradeoffs、evidence、inferenceLabel |
| LearningProgress | schemaVersion、contentVersion、visitedLessons、answers；只存本機，內容版本改動可重置，失效時退回空進度 |

Graph 由 Relationship 推導，反查 Workflow 使用的 Components 由 steps 推導，避免手寫兩份正反索引造成 drift。Transitive path 是當下由可見 edge kinds 計算的投影，UI 會顯示路徑，不將它改存成 direct edge。

來源打包採 allowlist：Phase 3 的 content build 工具只讀 `../pstack/` 中被引用的文字檔，複製為純文字靜態資料並產生 line map／hash；不修改 pstack、不掃使用者家目錄、不 import／執行任何 repo scripts。production build 不依賴執行時存取 `../pstack/`。遇到 source SHA 改變時檢查失敗，要求明確更新研究基準，而不是靜默改教材。

## Component Architecture 與目錄

預定結構（目前只存在 research／design 文件）：

```text
academy/
  README.md                 安裝／啟動／驗證與研究版本
  research/                 Phase 1 原始研究紀錄
  design/                   本計畫
  scripts/                  來源打包與 content validation
  src/
    app/                    shell、hash routing、navigation、search
    content/                snapshots、components、relationships、workflows、lessons
    features/
      introduction/         漸進架構圖
      philosophy/           作者觀點與來源取得程度
      components/           explorer、graph 與關係表
      workflows/            diagram、step details、stepper
      learning/             simulation、quiz、progress
      insights/             比較與 trade-offs
    shared/                 EvidenceBadge、SourceLink、SourceViewer、空狀態
    styles/                 tokens、responsive、focus／motion
  tests/                    必要的資料與互動行為測試
```

單向資料依賴：content → selectors／derived relationships → feature views。SourceViewer 只拿查證後的 source id，不接受任意 filesystem path／HTML；learning reducer 只控制 Simulation，不控制實際 tools。純視圖元件不 fetch 外部研究資料。

## MVP Scope

首個可運作版本保留六個主章節，採「完整可找到、核心可深入」的內容策略：

| 內容／互動 | MVP 包含 | 深度與邊界 |
|---|---|---|
| 入門 | 五分鐘教學、三段架構探索、來源／宿主邊界 | 以本版實際元件為準 |
| 元件目錄 | 58 個 Skills 各有可連結詳情，2 Agents、重要 tools、3 pack instructions 可篩選 | 每個 Skill 有用途／trigger／責任／I/O／已確認 dependencies／examples／source；不存在 formal I/O 或 edge 時明示，不能補假欄位 |
| 工作流目錄 | 23 Playbooks 各有獨立導覽與所有研究確認的步驟 | 每步能看元件／原因／輸出／source、前後移動；原文未定義 failure／state 就說明 |
| Dependency Explorer | 先收錄經人工核對的核心關係；一跳／兩跳與 relation filters | 邊未收錄不代表不存在；顯示 reviewed scope／Unknown，逐步擴充全部引用，不冒稱完整 runtime call graph |
| 作者分享 | Maven 主辦方章節／兩篇作者原文／索引與取得限制 | 不把未取得全文影片做虛構摘要 |
| Guided Learning | 三個 Simulation、至少六題帶 evidence 的知識檢查 | 不能真的啟動 pstack／TLC／Slack／PR 操作 |
| 工程實務 | 至少六項有來源的設計取捨與兩組流程比較 | Inference 清楚標示，不宣稱量測效果 |
| Source Viewer | 所有教材引用可開啟固定本機版本的文字或外部來源取得說明 | 不需要網路才能讀本機 source；外部文章只保存 metadata／合規摘要與連結 |

初版不做圖編輯、多人同步、AI chat tutor、登入、雲端、真實 pstack runner、全網影片轉錄或遠端自動更新。這些都不影響本地理解與查證的核心目標。

## Implementation Milestones

以下只在本計畫獲同意後開始，順序依可驗證的使用者能力安排。

| 里程碑 | 交付 | 完成判準 |
|---|---|---|
| M1：可追溯內容基礎 | toolchain、data model、source allowlist 打包、58／23 inventory 對應、app shell | 可啟動、typecheck／lint／build 通過；所有 IDs／paths／line ranges／hashes 有機器檢查；打包前後 pstack 無修改 |
| M2：入門與探索 | intro、component pages、搜尋／filter、核心 graph／表、source viewer | 以 UI 找到一個 Skill→看其來源→查看直接關係→返回；deep link／refresh 可還原 |
| M3：工作流與理念 | 23 workflow pages／steps、作者頁、insights／comparisons | 每個 Playbook 可到達與前後導覽，conditional steps 有標記；來源取得限制可見 |
| M4：學習與完整驗收 | 三 Simulation、knowledge checks、local progress、README／responsive／accessibility QA | 真實瀏覽器完成三個 journey，鍵盤／手機正常；production preview 可讀本機來源；所有要求的 checks 通過並留下結果 |

每完成一個里程碑先驗證再擴充，不把內容正確性留到最後。若某個工具不可用，記錄精確限制，不能將缺少的 live QA 寫成通過。

## Validation Plan

| 驗證面向 | 可重現檢查／使用者路徑 | 通過條件 |
|---|---|---|
| 本地啟動 | README 提供安裝、`npm run dev`、build／preview 指令與 Node 需求 | 從 lockfile 安裝後可重現，不依賴作者個人路徑／服務 |
| Typecheck／Lint／Build | 預定 `npm run typecheck`、`npm run lint`、`npm run build` | 各自成功退出；build 不代替 typecheck |
| Content integrity | inventory IDs、所有 refs／edges／step links、snapshot hash／line range validators | 58／23 無遺漏；邊有證據；不存在路徑／dangling refs／超界行號會失敗 |
| 關係語義 | meaningful unit cases：cycle、conditional edge、兩條不同路徑、引用 vs invokes | direct／indirect 正確，未收錄與無關係不混同 |
| Simulation behavior | 正確／錯誤分支、restart、step boundaries、版本不符的 local progress | 錯誤有解釋／source，可重試；進度不可造成死路 |
| 五分鐘理解 | browser journey：intro→架構節點→source→knowledge check | 各動作有可見結果；實際理解需人類試用回饋，測試不能冒充學習成效 |
| Workflow explorer | 搜尋 Bug fix→選 reproduce→看 inputs／outputs／Skill／source→上一／下一步 | step 與來源一致；完整 outline 不因選步而遺失 |
| 元件／Graph | 搜尋 architect→arena direct→Feature 反查→toggle indirect→keyboard list | 正反查同一組資料；關係與條件可解釋 |
| 作者／unknown | 開 Maven／X 來源卡，檢查 access level、日期未知與章節歸屬 | 沒有把章節摘要寫成逐字稿；缺全文明示 |
| 響應／可及性 | 390px／768px／1440px，Tab／Enter／Escape、減少動態效果 | 主要內容不被遮擋，沒有必要的水平 overflow，圖有等價文字操作 |
| Read-only source | implementation 前後 Git status＋snapshot hash 比對 | pstack tracked／untracked 狀態與研究基準一致 |

瀏覽器執行證據與適用的自動化測試將在 Phase 3–4 產生，本文件沒有聲稱任何上述網站檢查已通過。

## 審核範圍

請審核本文件的六章資訊架構、React／TypeScript／Vite 技術方案、MVP 內容深度與 M1–M4 順序。**同意此計畫才授權開始 Phase 3 本地網站實作**；不涉及雲端部署或對任何服務發文。若調整範圍，先更新此計畫與驗收標準，再開始對應程式碼。
