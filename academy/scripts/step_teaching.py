"""Step-specific teaching paraphrases. Raw instructions remain the authority."""
# Each row contains why / inputs / expected output. A format is not invented where the source does not define one.
CORE = {
 'investigation': [
 ('先從實際程式回答問題，動機則另查決策紀錄。','限定的唯讀問題與相關子系統。','對執行路徑的理解；動機問題附 why 調查。'),
 ('避免為唯讀問題虛構實作吞吐規劃。','已確認任務為 read-only investigation。','一行 n/a 的 throughput checkpoint。'),
 ('讓讀者能從概念一路找到檔案，而非只有檔案列表。','已查證的 source 與問題類型。','Overview／Key Concepts／How It Works／Where Things Live／Gotchas，或取捨表。'),
 ('去掉空泛說法，保留可追溯內容。','準備交付的解釋或建議。','經 unslop 整理的回答；沒有 PR。')],
 'bug-fix':[
 ('先證明使用者的症狀存在，避免在猜測上堆修正。','回報症狀、真實使用路徑與 control surface。','可重現的失敗；必要時合成 trigger 或增加 instrumentation。'),
 ('從候選假設中排除錯誤解釋，確認第一個出錯機制。','已重現症狀、subsystem trace 與 regression history。','由 runtime evidence 支持的 surviving mechanism。'),
 ('讓修正範圍由根因決定，跨邊界先比較架構。','機制證據、檔案範圍與成功條件。','修正設計與委派後的實作；需要時有 architect sketch。'),
 ('修正必須讓同一個使用者問題消失，不能只通過別的 surface。','原始 repro 與修正後產物。','相同路徑由失敗變成功；inconclusive 明示不通過。'),
 ('保留先失敗再修復的歷史，讓 reviewer 可重現回歸保護。','便宜明確的 local test target，若適用。','failing repro commit 在前、fix 在後；昂貴／不明路徑可略過 tdd。'),
 ('把修正與證據交給 reviewer 審查。','已驗證的 diff、commits 與 repro 輸出。','依 Opening a PR 規範建立的 PR 與前後證據。')],
 'feature':[
 ('先理解要接上的系統，避免把新功能放在錯誤邊界。','功能目標與受影響程式庫。','子系統路徑與既有約束。'),
 ('在實作前比較資料與責任邊界，避免鎖進第一個形狀。','grounding、需求與架構限制。','經 architect／arena 比較後的 sketch 與 rationale。'),
 ('先處理 blocking gates，再決定哪些工作真的能平行。','設計、依賴與可能共享的 mutable state。','四項 checkpoint：blocking、independent streams、shared state、decomposition。'),
 ('將有界實作交給 worker，保留 parent 的設計與審查分離。','scope、data shape、成功條件與模型角色。','worker 實作；多形狀時透過 arena 產生候選與合成。'),
 ('功能需要在使用者真正接觸的地方成立。','實作與 matching surface driver。','真實產物上的行為驗證；wrong surface／inconclusive 不過關。'),
 ('讓每個交付單位能獨立被驗證與審查。','已驗證的修改與 commit history。','小而有順序的 commits／必要時 PR stack。'),
 ('設計有爭議時用能重跑的反例施壓，而非投票決定。','contested design 與可檢查 scope。','interrogate 的 verified findings；無爭議可不進入。'),
 ('清楚呈現功能、取捨與驗證，而非只交付 diff。','功能產物、proof、checkpoint 與 open decisions。','依 Opening a PR 完成的可審查 PR。')],
 'shipping':[
 ('避免作者只驗證自己原本想做的事。','merge 授權、forge 與每 PR 的 parent／head。','非作者 verifier 的 PASS／PASS+NOTES／FAIL 與 evidence。'),
 ('上方 PR 依賴下方程式，不能越過未驗證缺口。','由底向上的 PRs 與獨立 verdict。','連續已驗證的一段 run 與明確 ceiling。'),
 ('rebase 或 push 可能讓舊判定不再涵蓋實際 patch。','verdict SHA、current head、patch-id 與必要 build 證據。','仍有效的 verdict，或對 drift 重做的驗證。'),
 ('每次只讓已驗證的最底層 PR 落地，並確認真正合併。','current verified patch、green checks 與正確 base。','讀回 state／mergedAt／base，確認 merged into trunk，再搬下一 PR。'),
 ('落地期間改 branch／base 可能讓另一份未驗證程式被合併。','已界定的 run、queue 與本步允許的下一 PR 搬移。','GitHub COMPLETE 或 Origin 讀回 ceiling 已 merged。'),
 ('擴大合併範圍需要新的獨立判定。','已達原定 ceiling 的證據。','停止於原範圍；下一個 gap 與所需 verdict。')],
 'autopilot-stack':[
 ('沿用 full 的驗證，但保留 operator 的 merge 決策。','Autopilot-full 流程、current head 與 no-merge 授權。','全部 verified／green 後交回；交接後不再 push。'),
 ('只有真正相依的 PR 才需要 stack，避免無關工作綁在一起。','PR 的依賴與 parent branch／head。','正確 parent base 與 restack；patch-id 不變依規則保留 verdict。')],
 'orchestrate':[
 ('先建立一個 owner 一個 PR 的責任與可接手拓樸，再放大工作量。','program 目標、可分割單位與宿主能力。','首個單位從 kickoff 到 merge 的驗證；適用時才加 sub-coordinator。'),
 ('真實 side effects 與 evidence 才能區分進度、漂移與 stall。','每個 owner 的 kickoff、diff、artifact、live PR 與重試原因。','經查證的 program 狀態；stall replacement 或重試後 drop／replan。')],
}

REASONS = {
 'perf-issue':['先確認 baseline 量到真實工作。','依由便宜到昂貴的策略順序，避免過早並行或局部微調。','讓修正針對 trace 證實的瓶頸，再取得 after capture。','從實際 artifacts 比較，而非從 source 宣稱改善。','讓 reviewer 能找到數字與原始證據。','以小而可審查的變更交付量測結果。'],
 'hillclimb':['真實 workload 與可檢查終點，才能讓每輪有意義。','先證明 harness 能區分不同工作量，再固定它以避免移動球門。','保留成功與失敗嘗試，避免重做已排除的方向。','讓每個假設描述明確架構機制，而非隨機調參。','一次修改一次量測，只保留超過噪音且 regression gate 通過的結果。','第一個 plateau 可能只是目前策略的極限。','停止條件不能為了看起來成功而放寬。','將 accepted commits 與量測結果一起交付。'],
 'runtime-forensics':['先擷取 live signal，避免只從 code 想像執行狀態。','把大量資料縮成能支持診斷的關鍵路徑。','可疑 hot path 還不是證明，需要執行中的 probe。','讓觀察回到具體 file、symbol 與配置位置。','診斷是唯讀交付，不虛構實作吞吐。'],
 'trace-forensics':['不同 artifact 格式需要對應工具，不能用錯 parser。','先建立可 query 的資料形狀，才讀大量 raw output。','沿樣本或 retainer 找出真正承擔成本的位置。','缺 source mapping 的 frame 仍不是完整診斷。','paired captures 能幫助確認，單一 capture 則保留假設標記。','診斷與修正分開授權，避免分析範圍自行擴大。'],
 'refactoring':['先保護原行為，結構移動時才知道有沒有改壞。','選一個能刪分支或非法狀態的領域結構。','先決定新邊界，避免在搬移途中堆補丁。','刪除 dead weight 能讓後續遷移在較小基礎上進行。','每一步保持行為 pin，並同波遷移 callers／刪 legacy。','編譯成功不足以證明行為等價。','沒有降低 reader load 的重構不值得保留。','讓 subtraction、reshape 與後續清理各自可審查。'],
 'prototype':['沒有具體待決問題，就無法知道原型何時完成。','設計空間未定時，參考能幫助比較不同方向。','把 throwaway 實驗與正式程式隔離，縮短回饋時間。','同一切換器讓比較基準一致，而非靠記憶。','決策需要實際觀察，不能只描述預期效果。','原型的產物是選擇與證據，正式實作另有流程。'],
 'visual-parity':['沒有修改前 baseline，就不能宣稱等價。','禁止改測量方式迎合結果，才能保護證據。','先搬共享 primitive，獨立 components 再分 worktrees。','用 pixel diff 而非肉眼判斷等價。','每個安全批次獨立交付，避免混淆驗證範圍。'],
 'authoring-a-skill':['用正確 authoring 格式，讓宿主可發現並讀取。','宣告、相對檔案與 cross-skill links 都必須可解析。','結構行為值得測，主觀文字不必製造鏡像測試。','讓 skill 改動以清楚 scope 與驗證供審查。'],
 'eval':['先寫成功條件，避免看完結果才改評分標準。','候選環境的命名與內容不能洩露測量目的。','自然任務能減少模型迎合評測的偏差。','相同 prompt 下獨立完成，才有可比較的產物。','隱藏模型身分，以同一 rubric 評判。','實際打開的檔案與 code shape 比自述可靠。','parent 親讀結果，檢查 judge 分歧或 rubric 模糊。'],
 'babysit':['不同請求需要不同 mode，不能把查狀態變成長迴圈。','最低 unmerged frontier 決定整個 stack 能否前進。','多個 babysitters 可能互相覆寫與重啟 checks。','branch／base 的改動應由 owner 統一負責。','先解會阻止後續判定的 conflict，再處理 review 與 CI。','forge 的合併判定比單純綠色 check 列表完整。','重複 retry 可能掩蓋 stale base 或真正程式問題。','bot finding 需要具體重現或反證，不盲目迎合。','merge-ready 是交接點，merge 本身另需授權。'],
 'autonomous-run':['明確 predicate 才能知道何時結束。','喚醒頻率依事件與值得重查的時間決定，不忙等。','每輪只保留證據支持的進展。','相關障礙是 run 的責任，額外修正獨立 scope。','逐輪紀錄讓無人值守工作可稽核。','停滯不代表達標，真正 dead end 要如實回報。'],
 'autopilot-full':['operator 的 gate 與 queue 邊界優先於自動化。','owner 的 branch 與 trail 要能在 VM 消失後接手。','獨立 PR 從 trunk 平行，避免不必要的 stack 依賴。','非作者的真實 surface proof 才能支持 root verdict。','合併的程式必須涵蓋實際 trunk 變動與目前 patch。','root 稽核能發現 gate 鬆綁、未記 head 或 stalled children。','明確 stop 立即終止寫入，不能用舊授權繼續。'],
 'session-pickup':['先讀已有 trail，避免丟失或重做既有決策。','Git、worktree、todos 才能還原 operational state。','對照已落地與待處理，找出真正 resume point。','剩餘工作應交給合適 Playbook，而不是無限延長 pickup。','前人自述是線索，原目標仍需真實 artifact 證據。'],
 'pause-safely':['在安全原子邊界停下，處理仍在運作的 children。','暫停不應創造新的不可逆外部動作。','記憶與未提交編輯不是可靠交接媒介。','冷啟動 agent 需要不依賴舊 context 的恢復紀錄。'],
 'multi-phase-plan':['小且明確的改動不需要大型計畫的成本。','可用觀察解決的事實問題先實驗，不交給人猜。','由 repo 找出 conventions、entry points 與 checks。','固定 skeleton 讓 owner 與 operator 用相同證據契約。','文件結構與文字都要服務可執行步驟。','用 checker 確認模板要求存在，但不冒稱計畫已被執行。','先交付計畫；explicit go 才授權開始 execution。'],
 'worktree-cleanup':['先建立磁碟與 worktree 的真實 baseline。','分類 bucket 只是建議，pinned／active chats 才是使用證據。','近期 chat 可能仍持有 sibling worktrees，不能只看名稱。','uncommitted work 的損失不可只靠 clean branch 判定。','只移除已確認不用的路徑，再確認 refs／磁碟結果。','其他 cache／simulator 也要遵守已知保留與使用約束。'],
 'opening-a-pr':['隔離 branch 與不相關編輯，避免 scope 混入。','小且有順序的 commits 能說明修改與驗證。','先整理程式與文字，再交給 reviewer。','標題應說清楚真正改變的行為或 symbol。','PR body 是一分鐘 briefing，而不是實驗逐步紀錄。','同一份 PR 的讀寫與合併使用一致 forge。','內建 PR 工具可能追蹤 CLI 不會保留的狀態。','stack base 要對應真正依賴，獨立工作才從 trunk 分開。','讀回實際狀態，避免以工具預設誤報 draft／ready。','開 PR 不自動開始 babysit，先完成目前 phase。'],
}
