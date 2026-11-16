import { componentRef, workflowRef, coreRef } from './catalog';
import type { SourceRef } from './model';
export interface Question {
  id: string; title: string; articleSourceId?: string; scenario: string; options: { id: string; text: string; correct: boolean; feedback: string }[]; source: SourceRef;
}
export interface Lesson { id: string; title: string; subtitle: string; description: string; duration: string; icon: string; questions: Question[]; workflowId?: string; context?: string }
export const lessons: Lesson[] = [
  {id:'verification',title:'Agent 改好了，怎麼證明？',subtitle:'把 CLI 與 Feature Map 接成驗證迴圈',duration:'約 4 分鐘',icon:'◎',context:'先建立能控制與觀察產品的工具，再用功能地圖帶 Agent 抵達目標；每份證據都要能回答原本的驗收問題。',
    description:'依 Part 1 設計的合成情境：你要驗證專案儲存功能，並處理已過時的操作文件。',questions:[
      {id:'verify-map',title:'可以點擊，為何還是驗不到？',articleSourceId:'x-blog',scenario:'Agent 有 click 與 screenshot 工具，卻不知道「儲存專案」在哪裡，也沒有成功判準。最有幫助的補強是？',source:componentRef('create-verification-skill'),options:[
        {id:'volume',text:'增加平行 Agent 數量，讓它們各自猜入口',correct:false,feedback:'平行化不能補上缺失的產品知識。先讓一個 Agent 能依工具和功能地圖抵達正確路徑，並判斷是否真的成功。'},
        {id:'map',text:'補上 Feature Map：入口、操作、成功訊號與帳號條件',correct:true,feedback:'正確。Part 1 將可操作產品的 CLI 與功能地圖配合使用。教材的儲存例子還要重新開啟專案，確認資料留存，不能只看提示消失。'},
      ]},
      {id:'verify-maintain',title:'地圖跟不上產品，要先做什麼？',articleSourceId:'x-blog',scenario:'儲存按鈕已移到新面板，舊驗證路徑失敗。團隊準備用更多雲端 Agent 跑同一套流程。',source:componentRef('maintain-verification-skill'),options:[
        {id:'maintain',text:'先修正並實跑 CLI 與地圖，再擴大平行驗證',correct:true,feedback:'正確。Part 1 將驗證能力視為需要持續照顧的基礎設施，並建議每天維護；維護頻率是作者建議，不是本站會自動啟動的排程。'},
        {id:'skip',text:'忽略失敗步驟，只要其他測試通過就算驗證完成',correct:false,feedback:'這會把無法抵達目標誤記為成功。先核對產品變化、更新文件與工具，再親自走通實際使用路徑。'},
      ]},
    ]},
  {id:'design',title:'第一份設計看起來很好，接著呢？',subtitle:'用研究與原型選擇設計',duration:'約 4 分鐘',icon:'⊞',workflowId:'prototype',context:'先確認問題與既有約束，再以使用範例和小原型比較候選方案；選定設計後才展開可驗證的執行計畫。',
    description:'依 Part 2 設計的合成情境：團隊想重做搜尋清單，需求仍含糊，第一份方案也尚未實測。',questions:[
      {id:'design-restate',title:'「搜尋很難用」代表要換框架嗎？',articleSourceId:'x-part-2',scenario:'Slack 有人說搜尋很難用，你懷疑是框架太舊。Agent 還沒讀回報與程式碼。應先怎麼提示？',source:componentRef('teach'),options:[
        {id:'replace',text:'直接要求換框架，並替這個方向寫完整計畫',correct:false,feedback:'這會把尚未證實的猜測當成需求。Part 2 建議先讓 Agent 用自己的話重述問題，及早發現誤解，再理解機制與歷史。'},
        {id:'restate',text:'先讀回報、重述受影響行為，分開事實與假設',correct:true,feedback:'正確。釐清目標能讓後續研究和原型回答正確問題。how 查機制、why 查動機，teach 協助建立人與 Agent 都能核對的理解。'},
      ]},
      {id:'design-prove',title:'該繼續審抽象計畫，還是做原型？',articleSourceId:'x-part-2',scenario:'已有兩個搜尋介面方案，但鍵盤操作與長清單效能都未驗證。團隊已反覆修改計畫五次。',source:workflowRef('prototype'),options:[
        {id:'prototype',text:'做兩個小原型，用同一資料與路徑比較，再定執行計畫',correct:true,feedback:'正確。Part 2 用原型與實際觀察回答開放問題，架構候選再以用法、型別和取捨比較。選定方向後，每個工作單位仍需真實驗證證據。'},
        {id:'longer',text:'繼續擴寫所有可能風險，直到文件看起來無懈可擊',correct:false,feedback:'在缺少實測時持續擴寫，無法回答真正的互動與效能問題。先定比較準則，用小原型取得證據，避免把計畫長度當成進度。'},
      ]},
    ]},
  { id: 'debug', title: '捲動異常，從哪裡開始？', subtitle: '從症狀到可驗證的修正', duration: '約 4 分鐘', icon: '⌁', workflowId: 'bug-fix',
    description: '一個每隔 750ms 漂移的畫面。練習辨認假設、重現與真正的完成證據。',
    questions: [
      { id: 'debug-repro', title: '先動手改，還是先看見錯誤？', scenario: '使用者說畫面閒置時會漂移。你剛讀到一個可能相關的 timer，還沒有重現。下一步是？', source: workflowRef('bug-fix'), options: [
        {id:'patch',text:'先在 timer 加一個 guard，再看使用者是否還遇到',correct:false,feedback:'這仍是猜測。Bug fix 要求先在 matching surface 親自重現，再用 runtime evidence 排除假設；沒有證據的 guard 不保留。'},
        {id:'repro',text:'在真實使用 surface 重現，必要時加 instrumentation',correct:true,feedback:'正確。先觀察相同症狀，再證明哪個機制導致它。這能區分讀 source 的合理猜測與實際根因。'},
      ]},
      { id:'debug-proof',title:'測試綠了，可以宣告完成嗎？',scenario:'你修改了 timer，unit tests 全數通過，但尚未重新操作原本會漂移的畫面。',source:componentRef('principle-prove-it-works'),options:[
        {id:'tests',text:'可以，unit tests 已涵蓋修改的函式',correct:false,feedback:'Unit tests 能顯示局部分支行為，不能取代原始使用 surface。修正要回到同一路徑觀察症狀消失與正確結果。'},
        {id:'surface',text:'回到同一路徑重跑，保留修正前後的可觀察證據',correct:true,feedback:'正確。Prove It Works 要求檢查真正的產物。若 driver 到不了目標，需說明具體限制，不能把 inconclusive 算成 pass。'},
      ]},
    ]},
  {id:'shipping',title:'CI 綠了，現在能合併嗎？',subtitle:'分開 ready、verified 與 merged',duration:'約 4 分鐘',icon:'⇄',workflowId:'shipping',
    description:'觀察一個虛構 PR stack，練習判斷什麼證據足以推進 merge frontier。',questions:[
      {id:'ship-ready',title:'通過檢查還缺少什麼？',scenario:'這是模擬的 PR #42：CI 通過、review threads 已清除、forge 回報可合併。只有撰寫程式的 Agent 自行驗證，使用者尚未要求 merge。',source:workflowRef('shipping'),options:[
        {id:'merge',text:'現在就 merge，所有 check 都是綠色',correct:false,feedback:'Babysit 到 merge-ready 就停止。Shipping 另需明確 merge 授權與非作者 verifier；CI 和自我驗證不能取代獨立判定。'},
        {id:'wait',text:'交回 merge-ready，取得 merge 授權與非作者 verifier 的證據',correct:true,feedback:'正確。這是三個不同條件：forge readiness、獨立行為驗證、使用者授權。此模擬不會操作任何真實 PR。'},
      ]},
      {id:'ship-queue',title:'排進佇列就是完成嗎？',scenario:'已獲授權且獨立驗證通過。merge 指令成功退出，但讀回 PR 顯示仍在 queue、狀態仍 open。',source:coreRef('watch-types'),options:[
        {id:'done',text:'指令成功就記錄為 merged',correct:false,feedback:'成功排入 queue 不等於真正 merged。Shipping 要讀回狀態，確認已合併且 base 是 trunk；queued watch 的 COMPLETE 要全 queue 都 merged。'},
        {id:'observe',text:'繼續觀察並讀回，直到真正 merged 才記錄完成',correct:true,feedback:'正確。工具退出碼與產品終點不是同一件事。queued mode 沒 blocker 時仍可 WAITING／merge-queue，不會輸出 READY。'},
      ]},
    ]},
  {id:'formal',title:'模型通過，代表什麼？',subtitle:'理解 scope 與 counterexample',duration:'約 3 分鐘',icon:'◇',
    description:'以一個合成的租約情境，練習解讀形式驗證的範圍。沒有在背景執行 TLC。',questions:[
      {id:'formal-scope',title:'把通過的範圍說清楚',scenario:'合成模型只描述兩個 worker 與一次重試。TLC 在這個設定下未找到 invariant 違反。可以如何報告？',source:componentRef('create-formal-verification-skill'),options:[
        {id:'all',text:'整個真實系統在任何數量的 worker 下都不會出錯',correct:false,feedback:'這超出證據。模型的 bounds、atomicity 假設與 code 對應都限制結論；通過模型不代表所有程式和任意規模正確。'},
        {id:'bounded',text:'此模型在指定 bounds 與假設下通過，列出未涵蓋的情況',correct:true,feedback:'正確。形式驗證需要 scope 與 code mapping，並以 broken variant 確認檢查真的能發現錯誤。'},
      ]},
      {id:'formal-break',title:'規則失敗，要怎麼處理？',scenario:'合成路徑：worker A 取得租約 → worker B 未檢查持有者就寫入 → 同時寫入的 invariant 失敗。',source:componentRef('statechart'),options:[
        {id:'weaken',text:'放寬 invariant，先讓圖表通過再說',correct:false,feedback:'不能為了得到通過而弱化規則。應把 counterexample 對應到真正 code，分辨模型錯誤與產品問題，再據實報告。'},
        {id:'trace',text:'讀最短 counterexample，核對 atomic steps 與真實 code',correct:true,feedback:'正確。statechart 協助閱讀模型結果；這裡的三步是教學合成，並非 pstack 本身的 runtime state trace。'},
      ]},
    ]},
];
export const introQuestions: Question[] = [
  {id:'intro-host',title:'誰真正建立與執行子 Agent？',scenario:'poteto-mode 要求委派工作。實際程序由誰提供？',source:componentRef('poteto-mode'),options:[
    {id:'host',text:'宿主 Coding Agent 的工具',correct:true,feedback:'正確。pstack 提供工作規範；建立子 Agent、model access 等能力來自宿主。'},
    {id:'daemon',text:'pstack 自帶的常駐 scheduler',correct:false,feedback:'本版沒有找到這個通用 scheduler。核心是由宿主 Agent 讀取 Markdown 規範並操作工具。'},
  ]},
  {id:'intro-skills',title:'58 個 Skills 與 23 個 Playbooks 是什麼關係？',scenario:'你準備從目錄挑選一個適合的任務流程。',source:componentRef('poteto-mode'),options:[
    {id:'same',text:'每個 Playbook 都是一個獨立 executable command',correct:false,feedback:'Playbook 是 mode 路由使用的 Markdown 程序。Skill、Playbook、程式工具是不同層次，不可混為命令數量。'},
    {id:'route',text:'Playbook 組織任務步驟，依條件使用相關 Skills',correct:true,feedback:'正確。例如 Feature 先 architect，再依實作形狀使用 arena；不是每次無條件串接全部 Skills。'},
  ]},
  {id:'intro-evidence',title:'作者目標等於實測成效嗎？',scenario:'README 說目標是更少、更高品質的程式碼。',source:coreRef('readme'),options:[
    {id:'goal',text:'這是作者說明，需要另外的實驗才能證明效果',correct:true,feedback:'正確。設計目標與控制實驗不同，本研究沒有證明固定百分比的品質或速度提升。'},
    {id:'proof',text:'安裝後就保證有固定倍數的提升',correct:false,feedback:'沒有這份證據。教材區分作者說明、已查證實作、推論與未知。'},
  ]},
];
