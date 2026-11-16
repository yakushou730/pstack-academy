# pstack 外部一手來源研究

研究日期：2026-11-16（Asia/Taipei）。本報告只做 Phase 1 研究，未安裝、執行或修改 pstack。研究基準是本機唯讀 mirror `pstack/`，commit `74bcc61bd216687b1d6d480c28f109adfc9824ec`；外部網站的 `main` 或個人簡介可能已變動，不能當成此 commit 的逐字快照。

## 作者、上游與 mirror 的證據鏈

上游是 [cursor/plugins 的 pstack 目錄](https://github.com/cursor/plugins/tree/main/pstack)，不是 backnotprop 的原創專案。上游 [plugin manifest](https://raw.githubusercontent.com/cursor/plugins/main/pstack/.cursor-plugin/plugin.json) 明列作者 **Lauren Tan**、版本 `0.15.42`、MIT 授權，以及指向 `cursor/plugins` 的 repository。這是直接取得的 JSON，發表日期未標示。上游 README 自稱 poteto，將目標寫為減少低品質產出、先深入再提高速度，以及透過可驗證的單一 agent 工作建立並行的信任；這是作者的設計主張，並非效果經驗研究。[來源：上游 README](https://github.com/cursor/plugins/tree/main/pstack)。

[GitHub：poteto（lauren）](https://github.com/poteto) 是作者自行維護的個人頁，發表日期未標示；實際讀到的簡介為 xAI 軟體工程師及 React compiler core team，並連到 X 的 `@poteto`。[React 官方 Meet the Team](https://react.dev/community/team) 也列 Lauren Tan 於 Compiler 工作組並連到 GitHub `poteto`，但仍寫任職 Cursor。這兩個頁面能交叉支持身分與 Compiler 關係；任職文字不同，不能據此捏造轉職日期，課程也不宜把目前雇主當成固定人物介紹。

本機 [MIRROR.md](../../pstack/MIRROR.md) 說明 `backnotprop/pstack` 複製上游，另加 README 開頭與部分 harness-neutral 改寫；`upstream` 分支保留 Cursor 原檔，`main` 加 mirror 修改。[固定版本 MIRROR.md](https://github.com/backnotprop/pstack/blob/74bcc61bd216687b1d6d480c28f109adfc9824ec/MIRROR.md)。mirror 的 [README](https://github.com/backnotprop/pstack/blob/74bcc61bd216687b1d6d480c28f109adfc9824ec/README.md) 明列跨 harness 安裝方式，以及 `no-comments`、Windows `statechart` 的社群修正；這些應標記為 mirror 的附加維護，不能全歸 Lauren Tan。其 [SYNC-LOG](https://github.com/backnotprop/pstack/blob/74bcc61bd216687b1d6d480c28f109adfc9824ec/SYNC-LOG.md) 記錄 2026-11-15 同步 `0.15.42 @ bf0c7cd`，屬 mirror 維護者記錄，未在本研究獨立重跑同步比對。

## 已讀到內容的一手資料

### 1. How Cursor Turned AI Agents Into Better Engineers

- 講者：Lauren Tan；共同講師／主持：Colin Matthews。
- [Maven 官方活動及錄影頁](https://maven.com/p/e23d9c/how-cursor-turned-ai-agents-into-better-engineers)。
- 日期：頁面顯示活動日期 **2026-08-12**；錄影正式發布日期未標示。時間因頁面／時區版本有差異，這裡不推定時區。
- 取得範圍：完整活動介紹與章節清單；**未取得影片影音或逐字稿**。

頁面介紹指出，工作坊分享 Cursor 內部使用並以 pstack 開源的工程技能框架，透過可重用工作流程、決策、審查與除錯改善 agent 輸出。章節標題可確認涵蓋信任曲線（03:58）、verification 與 feature maps（08:35）、用 eval 維護 skills（20:04）以及 CI 約束（41:00）。這些時間來自**主辦方章節標題**，不是已驗證的發言引用。[來源：Maven](https://maven.com/p/e23d9c/how-cursor-turned-ai-agents-into-better-engineers)。

**對應本機內容：** [create-verification-skill](../../pstack/skills/create-verification-skill/SKILL.md) 要求從 repo 找出啟動、驅動與觀察方式，生成 Launch／Doctor／Drive／Evidence／Cleanup，建立 feature map，再親自跑通一條真實功能路徑。[eval playbook](../../pstack/skills/poteto-mode/playbooks/eval.md) 則規定盲評、相同自然任務、隱藏模型身分，以及從實際 transcript／產物檢查遵循狀況。這是程式庫文字的直接發現；只能說它與講座章節相呼應，不能說已證實講座逐字講過這些實作細節。

### 2. The Importance of Being Experience First

- 作者：Lauren Tan。
- [作者部落格全文](https://www.no.lol/2015-04-10-the-importance-of-being-experience-first/)。
- 日期：**2015-04-10**（頁面明示）。
- 取得範圍：全文。

文章把設計放在整體使用經驗、運作方式、形式與功能，而不只視覺；當建立網站或 app 更容易，完整體驗成為差異來源。這是 AI agent 普及前的文章，可作作者工程觀的歷史背景，不能當成 pstack 的發表文或 AI 成效證明。[來源：作者文章](https://www.no.lol/2015-04-10-the-importance-of-being-experience-first/)。

**對應本機內容：** [principle-experience-first](../../pstack/skills/principle-experience-first/SKILL.md) 要求便利性與使用者體驗衝突時選擇體驗、縮小功能數量以打磨細節，並將 API 使用者與後續維護者也視為使用者。**研究者推論：** 這篇舊文適合作此原則的延伸閱讀；檔案沒有引用該文，故未證實作者直接由此文抽出這項 skill。

### 3. Type Narrowing in TypeScript

- 作者：Lauren Tan。
- [作者部落格全文](https://www.no.lol/2019-12-27-type-narrowing/)。
- 日期：**2019-12-28**（頁面明示；URL 的 `12-27` 不作日期依據）。
- 取得範圍：全文，含程式碼。

文章以 lexer／parser 示範把 token 範圍縮小成布林 token，以 assertion function 與 type guard 協助編譯器拒絕錯誤組合；結尾也提醒型別精確度需要務實取捨。這是一篇具體技術案例，未談 pstack 或現代模型。[來源：作者文章](https://www.no.lol/2019-12-27-type-narrowing/)。

**對應本機內容：** [principle-type-system-discipline](../../pstack/skills/principle-type-system-discipline/SKILL.md) 把不可能狀態交由編譯器拒絕、在邊界解析外部資料，並從權威 schema 推導型別；[typescript-best-practices](../../pstack/skills/typescript-best-practices/SKILL.md) 提供語言層做法。**研究者推論：** 可用文章的 token 範例解釋原則，但沒有證據宣稱這是 pstack 原則的直接來源。

### 4. Speaking（作者演講索引）

- 作者：Lauren Tan。
- [作者 Speaking 頁](https://www.no.lol/speaking/)。
- 索引頁發表日期：未標示；頁面列 `Just Use Any: js.la Edition` 為 **2020-01-30**、`From Front End to Full Stack` 為 **2017-03-23** 及 **2016-09-02**。
- 取得範圍：演講介紹與日期；未播放嵌入影片。

索引確認作者長期談型別系統、工程效能與從前端到全端的學習；它適合補人物背景，不足以重建演講內容，更不能把這些舊演講描述為 pstack 教學。[來源：作者演講索引](https://www.no.lol/speaking/)。

## 已定位但未能讀到實質內容的來源

| 來源／連結 | 作者或主辦 | 日期 | 實際取得及限制 |
|---|---|---|---|
| [Pstack Blog（README 的連結標籤）](https://x.com/poteto/article/2094457600259842065?lang=en) | X `@poteto`，由本機上游 README 連出 | 未確認 | 直接擷取回覆 403；未取得文章正式標題、全文或發表日期。不能把搜尋摘要當成作者完整論證。 |
| [LIVE: Poteto (creator of pstack) on shipping 1,000's of PR's a month at SpaceX](https://www.youtube.com/watch?v=MN9dGgmLyso) | 搜尋結果指向 Matt Pocock 訪談 Lauren Tan；本輪未從一手頁驗證頻道欄位 | 未確認 | 網頁回傳 YouTube 登入／頁尾外殼，沒有可讀影片介紹、字幕或逐字稿；oEmbed 擷取亦失敗。標題可作待核實的影片索引，不能作產量或工作流程的證據。 |

搜尋另出現第三方 transcript、摘要及教學站，僅用於找到原始連結，未拿它們替代一手發言。尤其「每月 2,500 PR」、「信任階梯」的完整內容、數字定義、適用時間與品質衡量，本研究**未由影片或 X 原文核實**，不應放入課程作為確定事實。

## 對後續教材的使用方式與未知事項

可以從本機固定版本教「可驗證工作單位 → 真實使用路徑 → 證據 → 再並行」，並用 Maven 的主辦方章節說明作者公開談過 verification／eval 這些主題；流程細節仍須引用固定版本 skill。[程式庫證據：create-verification-skill](https://github.com/backnotprop/pstack/blob/74bcc61bd216687b1d6d480c28f109adfc9824ec/skills/create-verification-skill/SKILL.md)。外部兩篇歷史文章則可補充體驗與型別的工程背景。

仍待補證：X 主文章全文與日期、訪談及分享影片的官方字幕／影音、任何宣稱吞吐提升的測量基線與品質結果、mirror 與指定上游 commit 的逐檔差異。此階段沒有證據證明單靠安裝 pstack 就能取得特定倍數的效能或相同產量。網頁抓取亦顯示上游 README 與最新 manifest 的模型預設及原則數量可能不同步，因此教材的命令、數量、模型名稱應以本機 commit 為準，不把外部 `main` 當固定規格。
