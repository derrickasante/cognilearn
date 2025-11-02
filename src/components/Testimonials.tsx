const items = [
  { n:"Sam • CS student", q:"The dashboard shows improvement without fluff. Clear and motivating." },
  { n:"Amara • Psychology", q:"Loved the Learn page—finally a non-jargony explanation of Stroop." },
  { n:"Kai • Player", q:"Go/No-Go is addicting. The SPACE timing makes me focus for real." },
];

export default function Testimonials(){
  return (
    <div className="container section">
      <h2>What early users say</h2>
      <div className="grid grid-3" style={{marginTop:12}}>
        {items.map((x,i)=>(
          <div key={i} className="card">
            <p style={{fontStyle:"italic"}}>“{x.q}”</p>
            <p style={{opacity:.7, marginTop:8}}>— {x.n}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
