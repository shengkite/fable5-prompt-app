import React, { useState } from 'react';
import { 
  Book, ListTree, BrainCircuit, Sliders, UserCircle, 
  ShieldCheck, LayoutTemplate, PenTool, Hash, Copy, Check, Menu, X
} from 'lucide-react';

// --- 資料結構區 ---
const promptData = [
  {
    id: 'part1',
    title: 'PART 1 提示詞要素',
    icon: <Book size={18} />,
    tasks: [
      {
        taskId: 'TASK 1',
        name: '提示詞要素範例',
        context: '企業AI自動化轉型課程規劃',
        prompt: `Role 你是一位專精於大型語言模型部署與AI自動化工作流的資深技術專家。
Context Claude Fable 5已發布,其Mathas 級別的思考能力能徹底擊穿編程門檻。我們需要為非技術背景的行政與行銷同仁規劃培訓。
Task 請依據 Fable 5的物理理解與程式生成特性,編製一份『零基礎完美 App 開發實戰』課程大綱。
Instruction 分析 Fable 5 在 Swift 原生開發與SVG 物理動模組的優勢,並規劃為4個教學模組。
Constraints 嚴禁使用大陸用語(如:調研、優化),專業術語(如 SVG, SDK, Automated Testing)請保留英文。
Examples 例如:模組一:利用Fable 5生成具備重力感應的3D水槽模擬原型。
Output Format 以 Markdown條列式輸出。`
      }
    ]
  },
  {
    id: 'part2_1',
    title: 'PART 2-1 範例引導類',
    icon: <ListTree size={18} />,
    tasks: [
      { taskId: 'TASK 2', name: '零範例提示', context: 'App 使用者回饋情緒分析', prompt: '請將下列針對Fable 5開發之單字 App 的評論分類為:效能讚賞、功能建議或Bug回報:『這款App的自動發音與震動反饋非常流暢,但希望能增加更多詞庫選擇。』' },
      { taskId: 'TASK 3', name: '單一範例提示', context: 'SVG動畫邏輯標籤', prompt: '請依照以下格式,分類 SVG 物理動畫的複雜度。\n範例:【土星環賽道競速動畫】一包含等比例縮放、多物體追逐、背景渲染。\n請開始撰寫:【複合弓射箭動態模擬】一' },
      { taskId: 'TASK 4', name: '少數範例提示', context: '程式代碼安全漏洞分級', prompt: '以下是Fable 5執行安全審計後的漏洞處置準則:\n1. 高危漏洞:立即啟動自動修復模式,並生成修復日誌。\n2. 低位漏洞:標註代碼行號,建議於下個版本更新。\n請以同樣邏輯判斷:『發現一個中維漏洞,涉及API 密鑰明文存儲』該如何處置?' },
      { taskId: 'TASK 5', name: '對比範例提示', context: 'Fable 5行銷推廣文案語氣', prompt: '我要為『Fable 5 擊穿編程門檻』撰寫社群貼文。\n錯誤語氣:這個模型很強,不用學程式也能做App,大家快來用。\n正確語氣:程式開發的民主化時代已降臨! Claude Fable 5 讓物理理解與複雜編程化繁為簡,即刻實現你腦中的完美應用。\n請參照正確語氣,為『3D水槽流體模擬技術』撰寫推廣短文。' },
      { taskId: 'TASK 6', name: '類比推理提示', context: '向客戶解釋 Fable 5 的路由機制', prompt: '在向客戶解釋為何 Fable 5檢測到敏感請求會路由給 OPC 4.8 之前,請先舉出兩個日常生活中『專家遇到非專業領域問題時轉介給特定部門』的例子,接著以此類比來解釋安全護欄機制。' }
    ]
  },
  {
    id: 'part2_2',
    title: 'PART 2-2 推理與規劃類',
    icon: <BrainCircuit size={18} />,
    tasks: [
      { taskId: 'TASK 7', name: '思維鏈提示', context: '3D遊戲物理邏輯規劃', prompt: '我計畫開發一款『恐龍射擊遊戲』。請一步一步 (Step-by-step) 說明遊戲規劃的推理過程:先定義坦克與砲塔的鼠標連動邏輯,再計算砲彈的拋物線物理軌跡,最後說明如何根據恐龍體型設定不同的血量與音效。' },
      { taskId: 'TASK 8', name: '自我一致性提示', context: '模型價格與效能平衡評估', prompt: '若開發一個中型 iOS 單字 App,使用 Fable 5可能面臨高額 Token 消耗。請提供3種不同的營運推導路徑(如:先用Fable 5生成核心代碼、後續修改切換模型等)進行成本分析,並找出最具經濟效益的開發方案。' },
      { taskId: 'TASK 9', name: '思維樹提示', context: '企業級AI導入戰略', prompt: '公司欲將 Claude Fable 5整合至自動化 App 測試流程中。請展開3個不同的導入路徑(如:全自動黑盒測試、協助修復漏洞、UI體驗評估),分別評估其效能提升與成本風險,最後篩選出最佳方案。' },
      { taskId: 'TASK 10', name: '思維圖提示', context: 'Fable5對物理世界理解的影響分析', prompt: '請分析『Fable 5具備精準物理模擬能力』對遊戲與教育產業的全面性影響。請採用思維圖路徑:先界定科學教育、遊戲沉浸感、模擬訓練等面向,接著探討這些脈絡間的網狀關連(例如:流體模擬如何提升科學實驗的安全性)。' },
      { taskId: 'TASK 11', name: '逐步分解提示', context: 'iOS 單字練習 App 開發 SOP', prompt: '我要開發一個具備Swift UI 的單字App。請將任務拆解為4大步驟。請先詳細說明『步驟一:初始化 Xcode 專案與定義 Core Data 結構』,待我確認後,再進行下一步的卡片翻轉動畫說明。' },
      { taskId: 'TASK 12', name: 'ReAct 框架提示', context: '即時追蹤 Claude 模型更新資訊', prompt: '你目前具備聯網權限。我想知道『Fable 5在最新的基準測試中與GPT 5.5的具體得分差異』。請先判斷需檢索哪些技術論壇,說明你的策略,分析後再給出最終對比數據。' },
      { taskId: 'TASK 13', name: '互動式需求釐清提示', context: '客製化音樂播放器開發', prompt: '請協助我開發一款適配 macOS 的沉浸式音樂播放器。在撰寫代碼前,請先向我提出5個關鍵問題(例如:是否需要情緒星圖、專輯牆的呈現方式等)來釐清細節,待我回答完後你再啟動撰寫。' },
      { taskId: 'TASK 14', name: '自動提示工程(APE)', context: 'SVG 精準動畫指令優化', prompt: '我需要一個精確指令,讓AI生成『黑洞吸積盤的多普勒效應模擬』。請為我設計3個不同切入點的提示詞版本(側重參數調節、側重視覺還原、側重物理計算),並推薦表現最穩定的一個。' }
    ]
  },
  {
    id: 'part2_3',
    title: 'PART 2-3 輸出控制類',
    icon: <Sliders size={18} />,
    tasks: [
      { taskId: 'TASK 15', name: '正向指令', context: '內容摘要與啟發', prompt: '請將這段關於『Fable 5將編程門檻擊穿』的演講摘要為150字,並明確指出其對零基礎開發者的具體啟發。' },
      { taskId: 'TASK 16', name: '負向指令', context: '代碼審計結果總結', prompt: '請總結 Fable5的代碼審計結果。嚴禁包含冗長的函數定義、嚴禁使用大陸用語(如:接口、封裝),且避免過多非技術性的客套開場。' },
      { taskId: 'TASK 17', name: '格式控制', context: 'App 自動化測試報告輸出', prompt: '請分析以下 App 自動化測試報告,並嚴格以JSON格式輸出:包含"測試功能"、"耗時"、"通過狀態"、"錯誤描述"四個欄位。' },
      { taskId: 'TASK 18', name: '順向提示', context: '物理需求對應代碼撰寫', prompt: '根據以下物理需求:『透明玻璃水槽、橡皮鴨、沙灘球、真實波紋折射』,請依據 Fable 5的物理模擬能力撰寫對應的JavaScript 代碼。' },
      { taskId: 'TASK 19', name: '逆向提示', context: '視覺效果反推指令與參數', prompt: '我希望能生成像《星際效應》中那樣擬真的黑洞視覺模擬動畫。請反推這段動畫的SVG 代碼撰寫指令與物理參數設定邏輯。' },
      { taskId: 'TASK 20', name: '方向刺激提示', context: '報導總結聚焦', prompt: '請總結這篇關於Fable 5價格的分析報導。你的總結必須強烈聚焦於:『Token 成本』、『官網訂閱限制』與『企業長期負擔能力』。' }
    ]
  },
  {
    id: 'part2_4',
    title: 'PART 2-4 情境與角色類',
    icon: <UserCircle size={18} />,
    tasks: [
      { taskId: 'TASK 21', name: '角色提示', context: '代碼架構審查', prompt: '你是一位擁有20年經驗的『高級軟體架構師』。請以最嚴謹的系統設計標準,審查以下由Fable 5生成的單字 App 代碼架構是否有擴充性問題。' },
      { taskId: 'TASK 22', name: '情境提示', context: '技術演示草案擬定', prompt: '情境:我是一家新創公司的技術總監,正向投資人展示如何利用 Fable 5快速交付產品。\n任務:請擬定一份5分鐘的技術演示草案,重點在於展示 Fable 5 如何在幾分鐘內完成3D流體模擬。' }
    ]
  },
  {
    id: 'part2_5',
    title: 'PART 2-5 品質控制與知識',
    icon: <ShieldCheck size={18} />,
    tasks: [
      { taskId: 'TASK 23', name: '自我批評', context: '推廣文案撰寫與修正', prompt: '第一步:請寫一段介紹 Fable 5如何解決網路安全威脅的推廣文案。\n第二步:請用『資安審核專家』的角度,批評這段文案是否過度誇大模型的安全性或忽視了護欄的限制,並修正為更專業的版本。' },
      { taskId: 'TASK 24', name: '反思修正', context: '代碼審計功能說明檢視', prompt: '任務:撰寫 Fable 5的代碼審計功能說明,要求100字以內,並強調其對高微漏洞的識別能力。\n(AI生成後:) 現在請檢視你是否達到了『100字內』與『強調高微漏洞』的要求?請重新修正到完美。' },
      { taskId: 'TASK 25', name: '檢索增強生成(RAG)', context: '依據特定文件回答問題', prompt: '【最高指導原則】:請『僅依據』上傳的《Claude Code V2.1.170 使用指南》,回答『如何切換到Fable 5思考級別?』。若文件未提及,請回答『來源未提及』。' },
      { taskId: 'TASK 26', name: '知識生成', context: '指標建立與評估', prompt: '第一步:列出決定一個SVG 動畫是否具有『真實物理感』的四大指標。\n第二步:以此指標框架為基礎,評估『複合弓滑輪轉動模擬』的精準度。' }
    ]
  },
  {
    id: 'part2_6',
    title: 'PART 2-6 Prompt 架構',
    icon: <LayoutTemplate size={18} />,
    tasks: [
      { taskId: 'TASK 27', name: '系統指令', context: '口語需求轉為技術指令', prompt: '你是一位資深的Apple 開發者。將以下開發者的口語需求,全面改寫為符合 Swift 編碼規範、邏輯清晰的技術開發指令。' },
      { taskId: 'TASK 28', name: '使用者指令', context: '口語化描述轉化', prompt: '請改寫這句話:『我想做一個App能背單字,要有聲音,還要能看到學習進度。』' },
      { taskId: 'TASK 29', name: '開發者指令', context: '代碼隱私與安全規範設定', prompt: 'VERSION: 2.0 / POLICY: 代碼隱私與安全規範。\n核心目標:將App原型轉為生產環境代碼。\n強制約束:自動偵測並屏蔽任何硬編碼的敏感密鑰,若發現洩漏風險需立即中斷輸出。' },
      { taskId: 'TASK 30', name: '個人化背景設定', context: '設定特定身分與偏好', prompt: '#USER PROFILE: AI 原生開發講師\n#專注領域:Swift UI 與SVG 動畫整合\n#目標受眾:零基礎學員\n#禁用語:優化、調研\n#寫作偏好:嚴格保留 Token等英文。\n請記住此設定。' },
      { taskId: 'TASK 31', name: '指令串接', context: '萃取數據並撰寫評測', prompt: 'Step 1: 從Fable 5的基準測試報告中萃取出所有與GPT5.5的對比數據。\nStep 2:運用上述數據,為技術部落格撰寫一份500字的對比評測文章。' },
      { taskId: 'TASK 32', name: '指令模板', context: '依據格式與設定解說機制', prompt: '你是一位專精於技術領域的專家。請向目標受眾解釋 Fable 5特定功能的運作機制。要求長度字數字,語氣專業/通俗,並強調核心優勢。' },
      { taskId: 'TASK 33', name: '後設提示', context: '優化既有指令', prompt: '我目前的指令是:『幫我寫一個App代碼』。請幫我把這句話改寫為『要求包含 Core Data 模型、自動化測試邏輯與 Swift UI 視圖的高階開發指令』。' }
    ]
  },
  {
    id: 'part3',
    title: 'PART 3 指令的撰寫步驟',
    icon: <PenTool size={18} />,
    tasks: [
      { taskId: 'TASK 34', name: 'Agent 指令撰寫', context: '發想→草稿→優化→審查', prompt: '發想:製作 Fable 5 Token 消耗計算器。\n草擬:你是一位AI財務分析師,請列出 Fable 5輸入輸出成本。\n審查:請檢查產出的公式是否包含10美金/百萬輸入與50美金/百萬輸出的正確單價?' },
      { taskId: 'TASK 35', name: '取得程式碼指令', context: 'Google 表單測驗自動化', prompt: '請扮演 GAS 開發專家。撰寫一段程式碼,將我提供的『Claude Fable 5物理理解實測』20題測驗,自動轉換為 Google表單測驗,並將物理原理解析寫入回饋欄位。' },
      { taskId: 'TASK 36', name: '先詢問提問方式設計', context: '安全審計流程釐清', prompt: '我想請你協助設計一套『AI 驅動的App安全審計流程』。請先以網路安全專家的角度,反問我3到5個關鍵問題(例如:是否涉及生物、化學等敏感領域?),以便生成最精準的指令。' },
      { taskId: 'TASK 37', name: '模型互評的指令', context: '物理代碼邏輯審查', prompt: '你是一名計算幾何專家。請嚴格審查另一位AI產出的『SVG 拋物線代碼』。\n第一部分:指出代碼是否有違背重力加速度規律的錯誤。\n第二部分:提供修正後的物理正確版本。' }
    ]
  },
  {
    id: 'part4',
    title: 'PART 4 常用符號',
    icon: <Hash size={18} />,
    tasks: [
      { taskId: 'TASK 38', name: '項目符號與破折號', context: '- 或 *', prompt: '請分析 Fable 5適合開發遊戲的三大關鍵物理特性:\n- 多維度拋物線追蹤\n- 精準流體力學波紋模擬\n- 複雜物體運動聯動邏輯(如複合弓滑輪)' },
      { taskId: 'TASK 39', name: '星號與粗體語法', context: '**文字**', prompt: '在設定 Fable 5開發指令時,極度重要:**務必標示『嚴禁在代碼中包含任何真實 API 密鑰』**。' },
      { taskId: 'TASK 40', name: '角括號與XML 標籤', context: '< >', prompt: '請比較以下兩項功能的開發難度:\n<feature1> 3D沉浸式專輯牆 </feature1>\n<feature2> 自動化 App 橫向測試 </feature2>' },
      { taskId: 'TASK 41', name: '三反引號', context: '\u0060\u0060\u0060', prompt: '請分析這段 Fable 5生成的 Swift 代碼並檢查音效觸發邏輯:\n\u0060\u0060\u0060swift\nfunc playSound() {\n    audioPlayer.play()\n}\n\u0060\u0060\u0060' },
      { taskId: 'TASK 42', name: '方括號', context: '[ ] 變數佔位符', prompt: '請針對 [iOS平台] 進行 [單字 App] 自動化測試的UI/UX 審查。' },
      { taskId: 'TASK 43', name: '大括號', context: '{ } 格式控制', prompt: '輸出格式請遵守:\n{"input_token_cost": "10 USD", "output_token_cost": "50 USD", "model_class": "Mathas"}' },
      { taskId: 'TASK 44', name: '小括號', context: '( ) 解釋說明', prompt: '撰寫時若遇到物理計算重點,請在後方加上解釋(例如:考慮多普勒頻移對色彩偏移的影響)。' },
      { taskId: 'TASK 45', name: '雙引號與單引號', context: '"" 或 \'\'', prompt: '在應用程式最後請加上這句警示:"本App 代碼由 Claude Fable 5自動生成,請於生產部署前進行人工覆核。"' },
      { taskId: 'TASK 46', name: '等號', context: '= 設定條件', prompt: '請設定 Model = Fable 5; Price_Level = High_Premium; Capability = Physics_Heavy。' },
      { taskId: 'TASK 47', name: '分號', context: '; 分隔連續短指令', prompt: '步驟一:生成SVG 靜態圖案;步驟二:加入CSS 動畫時間軸;步驟三:注入物理模擬參數。' }
    ]
  }
];

// --- 複製按鈕元件 ---
const CopyButton = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    // 使用 document.execCommand 確保在 iframe 中也能複製
    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.position = "fixed";
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
      const successful = document.execCommand('copy');
      if (successful) {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (err) {
      console.error('複製失敗', err);
    }
    document.body.removeChild(textArea);
  };

  return (
    <button 
      onClick={handleCopy}
      className={`p-2 rounded-lg transition-colors flex items-center space-x-1
        ${copied ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}
      `}
      title="複製提示詞"
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
      <span className="text-sm font-medium">{copied ? '已複製' : '複製'}</span>
    </button>
  );
};


// --- 主應用程式 ---
export default function App() {
  const [activeCategoryId, setActiveCategoryId] = useState(promptData[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const activeCategory = promptData.find(cat => cat.id === activeCategoryId);

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800">
      
      {/* 行動版遮罩 */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 側邊導航欄 */}
      <aside className={`
        fixed md:static inset-y-0 left-0 z-30 w-72 bg-white border-r border-gray-200 flex flex-col transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        <div className="p-5 border-b border-gray-100 flex justify-between items-center bg-indigo-600 text-white shadow-sm">
          <div>
            <h1 className="text-xl font-bold tracking-wide">Fable 5</h1>
            <p className="text-xs text-indigo-200 mt-1">提示詞與指令實務圖鑑</p>
          </div>
          <button className="md:hidden text-white" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-1">
          {promptData.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategoryId(category.id);
                setIsSidebarOpen(false); // 在行動版點擊後關閉側邊欄
              }}
              className={`
                w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all text-left
                ${activeCategoryId === category.id 
                  ? 'bg-indigo-50 text-indigo-700 font-semibold shadow-sm ring-1 ring-indigo-100' 
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
              `}
            >
              <div className={activeCategoryId === category.id ? 'text-indigo-600' : 'text-gray-400'}>
                {category.icon}
              </div>
              <span className="text-sm">{category.title}</span>
            </button>
          ))}
        </div>
        
        <div className="p-4 border-t border-gray-100 text-xs text-gray-400 text-center">
          Claude Fable 5 專屬應用
        </div>
      </aside>

      {/* 主要內容區 */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        
        {/* 頂部導航列 (行動版) */}
        <header className="bg-white border-b border-gray-200 p-4 flex items-center md:hidden z-10 sticky top-0">
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="mr-4 text-gray-600 hover:text-gray-900 focus:outline-none"
          >
            <Menu size={24} />
          </button>
          <h2 className="text-lg font-bold text-gray-800 truncate">
            {activeCategory?.title}
          </h2>
        </header>

        {/* 內容區 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 scroll-smooth">
          
          <div className="max-w-4xl mx-auto space-y-6 pb-20">
            {/* 分類標題 */}
            <div className="mb-8 hidden md:block">
              <h2 className="text-3xl font-extrabold text-gray-900 flex items-center gap-3">
                {activeCategory?.icon} {activeCategory?.title}
              </h2>
              <p className="text-gray-500 mt-2">從下方挑選您需要的指令，點擊右上角即可一鍵複製。</p>
            </div>

            {/* 任務卡片列表 */}
            {activeCategory?.tasks.map((task, index) => (
              <div 
                key={task.taskId}
                className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-300"
              >
                <div className="bg-gray-50 px-5 py-4 border-b border-gray-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-center space-x-3">
                    <span className="bg-indigo-100 text-indigo-700 text-xs font-bold px-2 py-1 rounded">
                      {task.taskId}
                    </span>
                    <h3 className="text-lg font-bold text-gray-800">
                      {task.name}
                    </h3>
                  </div>
                  <CopyButton text={task.prompt} />
                </div>
                
                <div className="p-5">
                  <div className="mb-3 flex items-start text-sm">
                    <span className="inline-block bg-blue-50 text-blue-700 border border-blue-200 rounded-full px-3 py-1 font-medium">
                      情境：{task.context}
                    </span>
                  </div>
                  <div className="bg-gray-800 rounded-xl p-4 overflow-x-auto relative group">
                    <pre className="text-gray-100 font-mono text-sm leading-relaxed whitespace-pre-wrap font-medium">
                      {task.prompt}
                    </pre>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
        </div>
      </main>

    </div>
  );
}
