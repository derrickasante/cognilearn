const POSTS = [
  {
    slug:"computers-vs-brains",
    title:"How computers and brains process information differently",
    body: `**Computers** use fixed clocked operations; **brains** rely on massively parallel, noisy neurons.
- Digital memory is exact; biological memory is reconstructive.
- Speed in tasks like Stroop is not IQ; it's task-specific adaptation.`
  },
  {
    slug:"why-stroop-works",
    title:"Why the Stroop task reveals interference",
    body:"The word meaning competes with color naming. Practice reduces interference but doesn't remove it."
  }
];

export default function Blog(){
  return (
    <div style={{ padding:24 }}>
      <h1>Blog</h1>
      {POSTS.map(p=>(
        <article key={p.slug} style={{margin:"16px 0",padding:"12px 0",borderTop:"1px solid #333"}}>
          <h3>{p.title}</h3>
          <p style={{whiteSpace:"pre-wrap"}}>{p.body}</p>
        </article>
      ))}
      <p style={{opacity:.7,marginTop:16}}>You can migrate these to Firestore later for live posts.</p>
    </div>
  );
}
