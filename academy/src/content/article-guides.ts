export interface ArticleStep {
  id: string; title: string; idea: string; practice: string; evidence: string; componentIds: string[];
  example?: { label: string; text: string };
}
export interface ArticleGuide {
  id: string; title: string; subtitle: string; url: string; date: string; takeaway: string;
  lessonId: string; steps: ArticleStep[];
}

// Chinese teaching adaptations. Examples are authored for this course, not verbatim article excerpts.
export const articleGuides: ArticleGuide[] = [
  {id:'part-1',title:'Part 1 · 建立驗證能力',subtitle:'讓 Agent 能操作、觀察，再證明結果',
    url:'https://x.com/poteto/article/2094457600259842065?lang=en',date:'頁面顯示 9 月 1 日，未顯示年份',lessonId:'verification',
    takeaway:'先把一條使用路徑做成可重複的驗證迴圈，再擴大任務與並行數量。',steps:[
      {id:'verification-loop',title:'先打通操作與觀察的迴圈',idea:'作者把驗證能力視為需要持續投資的工程基礎設施。Agent 必須能看見真實結果，才有依據判斷下一次修正。',practice:'挑一條核心路徑，例如建立專案後重新開啟。列出如何啟動、操作，以及在哪裡看見成功或失敗。',evidence:'一條已親自跑通的操作路徑，附預期結果、實際觀察及證據位置。',componentIds:['create-verification-skill','principle-prove-it-works']},
      {id:'verification-cli',title:'把重複操作收進小型 CLI',idea:'可組合的工具能減少每次臨時寫腳本的成本。文章建議逐層揭露指令、提供明確錯誤與機器可讀輸出，讓操作可重現。',practice:'先實作健康檢查、取得畫面狀態及一個常用操作。會改變資料的指令應提供預覽或乾跑方式。',evidence:'穩定的指令介面、help、結構化結果，以及失敗時能指向修法的訊息。',componentIds:['principle-build-the-lever','create-verification-skill'],example:{label:'教材自編 · 假想 CLI，本站不執行',text:'node tools/control-demo.mjs doctor\nnode tools/control-demo.mjs snapshot\nnode tools/control-demo.mjs create-project --name demo --dry-run\nnode tools/control-demo.mjs screenshot /tmp/project-proof.png'}},
      {id:'verification-map',title:'用 Feature Map 記住如何抵達功能',idea:'功能地圖應以使用者能看見的功能與入口組織，並連到操作細節和限制。這讓工具的能力與 Agent 對產品的理解接得起來。',practice:'為剛才的路徑寫下入口、操作、成功訊號、帳號條件與常見陷阱。地圖連到細節，避免單一文件無限增長。',evidence:'下一位 Agent 能依文件找到功能，並核對畫面或輸出，而非猜測路由。',componentIds:['create-verification-skill','maintain-verification-skill'],example:{label:'教材自編 · Feature Map 範本',text:'功能：建立專案\n入口：首頁 → 新增專案\n操作：填名稱 → 儲存 → 重新開啟\n成功訊號：清單與詳情顯示同一個專案\n條件：測試帳號具建立權限\n陷阱：失敗提示消失不代表儲存成功'}},
      {id:'verification-proof',title:'讓驗證配合任務的問題',idea:'新功能需要操作結果，效能改善需要基準與比較，錯誤回報則需要重現。截圖或影片是證據的一部分，仍須對得上驗收條件。',practice:'先寫要證明的變化，再選量測方式。效能任務比較同一情境的修正前後資料；錯誤修正回到原始重現路徑。',evidence:'可比較的基準與結果、相同操作條件，以及仍未涵蓋的範圍。',componentIds:['principle-prove-it-works','swarm']},
      {id:'verification-maintain',title:'產品改了，驗證知識也要更新',idea:'工具與功能地圖會隨產品演進而過時。作者建議每天維護驗證技能；這是其工作方式，不是安裝後自動具備的排程服務。',practice:'改動功能時同步檢查對應工具、入口和功能地圖，另安排定期維護以找出遺漏。',evidence:'維護後重新跑通的功能路徑；若需測試帳號或環境，明列其條件。',componentIds:['maintain-verification-skill']},
      {id:'verification-parallel',title:'環境可重現後，再增加並行工作',idea:'文章偏好可獨立啟動的雲端 Agent，並指出本機 worktree 的資源成本。並行效益仍取決於環境、驗證品質、宿主能力與服務費用。',practice:'先讓一個乾淨環境能安裝依賴、建立測試資料、啟動產品並跑驗證，再比較適合本機或雲端的隔離方式。',evidence:'每個執行環境各自產生可核對的結果；增加 Agent 數量本身不算成功。',componentIds:['swarm','principle-separate-before-serializing-shared-state']},
    ]},
  {id:'part-2',title:'Part 2 · 研究與設計',subtitle:'把意圖、脈絡與實驗帶進設計',
    url:'https://x.com/poteto/article/2097732320606507506',date:'頁面顯示 9 月 10 日，未顯示年份',lessonId:'design',
    takeaway:'用可理解的問題陳述建立共同脈絡，以原型與可使用的介面驗證設計，再拆成可驗收工作。',steps:[
      {id:'design-restate',title:'先讓 Agent 用自己的話重述問題',idea:'作者先要求 Agent 理解回報，再核對其問題陳述。這能及早發現誤解，也減少人類先入為主的根因猜測。',practice:'提供原始回報，要求列出觀察、未知與可能解釋。確認要改善的使用者結果，再進入修正。',evidence:'讀者能理解的問題陳述，且已知事實與假設清楚分開。',componentIds:['teach','how','why'],example:{label:'教材自編 · 釐清問題的提示',text:'/poteto-mode 閱讀這份錯誤回報，先用白話重述使用者受影響的行為。分開列出已知事實、假設與缺少的證據，再說明要如何重現。'}},
      {id:'design-context',title:'把現在的機制與過去的決策接起來',idea:'文章以 how 理解運作、why 追查動機、teach 壓縮成能理解的說明，並用 recall 找回過往工作的脈絡。可用的歷史來源依宿主連接能力而定。',practice:'追蹤受影響路徑與責任邊界，核對相關提交、決策及過往嘗試。歷史摘要必須能回到實際證據。',evidence:'帶有來源的現況模型、既有約束及曾經排除的方法。',componentIds:['how','why','teach','recall']},
      {id:'design-backwards',title:'從使用方式倒推設計',idea:'作者先寫面向使用者的教學或呼叫範例，以此檢查介面是否容易使用。文章也以 Diátaxis 區分教學、操作指南、參考與解釋的用途。',practice:'挑一個新使用者任務，先寫最短教學與預期輸出，再找出實作需要提供的介面。將完整 API 清單放在參考文件。',evidence:'使用者能完成的範例與清楚的完成目標，不只有內部實作步驟。',componentIds:['technical-writing','architect']},
      {id:'design-prototype',title:'讓原型回答設計中的未知',idea:'文章提醒不要直接接受第一份設計，也不要在缺乏實驗時反覆雕琢抽象計畫。原型應比較具體選項，取得互動、時間或結構上的證據。',practice:'列出需要回答的問題與比較準則，再做兩個可丟棄的小原型。用同一使用路徑操作，記錄各自的優缺點。',evidence:'候選方案的實際觀察、可比較的證據，以及選擇其中一案的理由。',componentIds:['architect','arena'],example:{label:'教材自編 · 原型任務提示',text:'/poteto-mode 為搜尋結果做兩個可丟棄的原型，用相同資料比較鍵盤操作與長清單捲動。保留操作證據，說明取捨；先讓我看結果。'}},
      {id:'design-architecture',title:'先比較呼叫端與型別，再補入實作',idea:'文章將 architect 描述為理解現況、提出候選介面、評估合成、實作與必要時推翻設計的迴圈。候選可以借助不同模型，但模型與評估能力由宿主提供。',practice:'把用法、核心型別與函式簽章一起比較；實作若反覆需要額外狀態或例外，回頭檢查責任邊界。',evidence:'選定介面能承受真實使用案例，且實作偏離草圖時有明確判斷。',componentIds:['architect','arena','principle-type-system-discipline']},
      {id:'design-plan',title:'把選定設計拆成可驗證的工作單位',idea:'設計方向成立後，再整理執行計畫。文章強調每項工作要能實際運行與驗證，計畫格式檢查與測試通過仍不能代替產品行為證據。',practice:'每個工作單位寫出目標結果、前提、驗證方法與證據。小型 PR 應能獨立理解與檢查；遷移則逐項核對原有行為。',evidence:'每項都能回答「怎麼知道完成」，並留有真實執行結果。',componentIds:['check-plan','principle-prove-it-works']},
    ]},
];
