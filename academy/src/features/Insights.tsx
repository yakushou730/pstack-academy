import { insights, comparisons } from '../content/editorial';
import { coreRef } from '../content/catalog';
import { Badge, PageHeading, Panel, SourceLink } from '../shared/ui';

export function Insights(){
  return <><PageHeading eyebrow="06 / PRACTICAL INSIGHTS" title="借鑑設計，不只複製指令。" description="從有來源的具體機制，思考自己的工作流能如何改善。以下的效益、採用方式與 trade-offs 是研究推論，並非成效量測。"><Badge kind="inference"/></PageHeading>
    <div className="insights-grid">{insights.map((item,i)=><article className="insight-card" key={item.id}><div className="eyebrow"><span className="mono insight-number">0{i+1}</span>{item.subtitle}</div><h2>{item.title}</h2><div className="insight-section"><h3>有證據的機制</h3><p>{item.mechanism}</p><SourceLink source={item.source} label="檢查原始規範" compact/></div><div className="insight-section"><h3>可以怎麼採用 <span className="inference-label">Inference</span></h3><p>{item.application}</p></div><div className="tradeoff"><h3>代價與邊界</h3><p>{item.tradeoff}</p></div>{item.componentId&&<a className="text-link" href={`#/components/${item.componentId}`}>深入這個元件 →</a>}</article>)}</div>
    <div className="section-heading"><div><div className="eyebrow">COMPARE THE MECHANISM</div><h2>相似的動作，不同的責任。</h2></div></div>
    {comparisons.map(comparison=><Panel key={comparison.title} title={comparison.title}><div className="table-scroll"><table className="comparison-table"><thead><tr>{comparison.columns.map(c=><th key={c}>{c}</th>)}</tr></thead><tbody>{comparison.rows.map(row=><tr key={row[0]}>{row.map((cell,i)=>i===0?<th scope="row" key={i}>{cell}</th>:<td key={i}>{cell}</td>)}</tr>)}</tbody></table></div><div className="inline-links">{comparison.sources.map((s,i)=><SourceLink key={s.sourceId} source={s} label={`對照來源 ${i+1}`} compact/>)}</div></Panel>)}
    <Panel title="與一般單 Agent 工作方式的比較"><Badge kind="inference"/><p>若以「直接交付 coding task 給一個 Agent」作教學基準，pstack 將設計探索、工作隔離、驗證與交接寫成可重用程序。這不是完整市場比較，也不是其能力獨有的證據。</p><SourceLink source={coreRef('readme')} label="作者的原始目標"/></Panel>
  </>;
}
