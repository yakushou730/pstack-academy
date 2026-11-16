# pstack Interactive Academy

以繁體中文探索 pstack 的本機互動教學平台。從 Skills、Playbooks 與作者第一手資料建立理解，每個重要概念可回到固定版本的原始碼。

本機來源為 `backnotprop/pstack` standalone mirror，研究 commit `74bcc61bd216687b1d6d480c28f109adfc9824ec`、plugin `0.15.42`。原作者 Lauren Tan（poteto），上游為 `cursor/plugins/pstack`；mirror 的跨宿主改寫與社群修正另行標示。

## GitHub Pages

目標網址：**https://blog.yakushou.com/pstack-academy/**。由 repo 根目錄的 `.github/workflows/pages.yml` 在 main 更新時驗證並發布。繼承既有 user-site 網域，不另設 CNAME。詳見 [部署文件](deployment/README.md)。

## 安裝與啟動

需要 Node.js 22.12+、npm、Python 3，以及 workspace 中與本學院相鄰的固定版本 `pstack/`。原始碼不需要安裝或執行。

在 workspace 根目錄：

```sh
cd academy
npm ci
npm run dev
```

開啟終端機顯示的本機網址，預設 `http://127.0.0.1:5173`。需要其他 port 時：

```sh
npm run dev -- --port 4173
```

安裝需要 npm registry 連線；安裝後，內容建置與網站學習不需要外部 API。作者文章與 GitHub 外部連結需要網路，本機來源閱讀不需要。

若顯示 `listen EPERM`，代表目前執行環境不允許監聽 socket，並不是前端編譯錯誤。本次 Agent 環境發生此限制；請在一般本機終端機執行上列指令。不要因此停用防火牆或降低系統安全設定。

## 已實作的體驗

| 章節 | 功能 |
|---|---|
| 五分鐘入門 | 三階段架構展開、節點細節、三題知識檢查、原作者／上游／mirror 說明 |
| 作者與設計觀 | 官方分享與作者文章、取得層級篩選、已核對章節時間、對應元件與 Unknowns |
| 元件探索 | 58 個 Skills（含 24 原則）、2 Agents、6 程式工具、3 automation instructions 的獨立頁；中英文搜尋與類型篩選 |
| 相依探索 | 93 條人工核對的核心關係，一跳／兩跳、上下游、關係種類、可點選圖與可排序證據表 |
| 工作流探索 | 23 個 Playbooks、137 個來源步驟／分區；前後導覽、條件、I/O、原因、相關元件、完整步驟原文 |
| 引導學習 | 三個 Simulation、六個帶來源的情境決策、錯誤回饋、重試與本機進度清除 |
| 工程實務 | 八項工程機制與取捨、arena／swarm、Babysit／Shipping 對照 |
| 來源閱讀 | 107 份 allowlist 文字來源、固定 SHA URL、行號與引用範圍、搜尋、載入時 hash 驗證、MIT 授權 |

六個主章節另共用來源索引與全站元件／工作流搜尋。hash routes 支援直接連結與重新整理，例如：

```text
#/components/architect
#/components?kind=principle&q=型別
#/workflows/bug-fix?step=3
#/learn/shipping
```

教學圖與 Simulation 均有標記。學院不執行 pstack、TLC、Shell 指令，不發 Slack、不操作 PR，也不讀取個人 transcripts 或帳號。所有 localStorage 資料僅為閱讀／作答紀錄，可清除；儲存被拒絕時保留本次記憶體進度。這不是學習成效評分。

## 驗證

在 `academy/` 內：

```sh
npm run check
python3 scripts/validate_build.py
python3 research/validate.py
```

`npm run check` 依序完成內容檢查、strict typecheck、ESLint、Vitest、production build。亦可獨立執行：

```sh
npm run content
npm run typecheck
npm run lint
npm test
npm run build
npm run preview -- --port 4173
```

Production build 在 `dist/`，含所有來源文字；不依賴執行時讀取 `../pstack/`。`vite preview` 是本機產物預覽。建置後可用一般靜態 HTTP server 提供 `dist/`；不以 `file://` 直接開啟，以免瀏覽器拒絕 module／fetch。

[驗證報告](validation/README.md) 與 [檢查輸出](validation/check.log) 記錄已通過及未通過的範圍。自動化 server-render checks 不等同於瀏覽器互動測試；本次 live preview 因 `listen EPERM` 未完成，沒有聲稱手機、鍵盤或視覺 QA 已通過。

## 內容與程式結構

- [research/README.md](research/README.md)：Phase 1 的架構、完整盤點、來源、未知事項。
- [design/phase-2-plan.md](design/phase-2-plan.md)：使用者核准的設計與 MVP 範圍。
- [scripts/content_spec.py](scripts/content_spec.py)：編輯後的繁中元件、工作流、已核對關係與引用 marker。
- [scripts/step_teaching.py](scripts/step_teaching.py)：逐步原因與核心流程的 I/O 教學摘述；原文是最終依據。
- [scripts/build_content.py](scripts/build_content.py)：先核對 pinned commit 與全部檔案 hashes，再產生資料與 allowlist 的惰性載入來源文字。
- [src/content/](src/content/)：資料模型、產生的內容、編輯內容、selector 與純進度邏輯。
- [src/features/](src/features/)：六個章節、探索與來源閱讀 UI。
- [src/app/](src/app/)：導覽、hash routing、搜尋與 shell。
- [tests/](tests/)：資料／證據完整性、graph traversal、navigation、進度防禦與全詳情 server rendering。

內容與 UI 分離，不將 Markdown 直接當整個網站介面。source payload 只包含 escaped text，由 React 顯示；不 import 或執行研究來源。

## 擴充內容

1. 元件／工作流的名稱與中文資料在 `scripts/content_spec.py` 編輯；逐步原因在 `scripts/step_teaching.py`。
2. 具名 component 使用／關係由人工核對加入，附明確原文 marker；不能從字串共現自動升格為 invokes。
3. 外部來源、實務與知識題分別在 `src/content/editorial.ts`、`src/content/lessons.ts` 維護，保留 evidence 與取得程度。
4. 執行 `npm run content`，再跑 `npm run check` 與 build artifact validator。

source commit 或檔案內容改變時，content build 會失敗。**先更新研究與差異分析，再明確更新 snapshot 和教材**，不可只重產 snapshot 來繞過 drift gate。`research/inventory.py` 是研究盤點工具，不是網站每次啟動自動執行的更新器。

## 已知邊界

- 58 個 Skill 與 23 個 Playbooks 的目錄覆蓋完整；93 條關係是已人工核對的核心子集合，未收錄不代表沒有引用。
- Markdown 描述的是指令規範，不保證 Agent 執行時必定遵守。獨立程式工具與宿主能力另有標記。
- Orchestrate／Opening a PR 的分區是教學導覽，不捏造成原作者定義的線性狀態機。Autopilot-stack 必須先理解 full 的繼承與覆寫。
- X 主文與 YouTube 訪談未取得全文，頁面不補寫發言、逐字稿或吞吐成效。
- 沒有量測本學院的學習成效，也沒有對 pstack 作完整跨 harness runtime 或速度品質實驗。
- 尚未完成的 browser QA 路徑與操作方式列於驗證報告。

本學院為研究與教學作品，不是 pstack 官方產品。打包的 pstack 原始碼依來源 MIT 授權保留於 Source Viewer，`pstack/` 保持不變。
