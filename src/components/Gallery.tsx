const IMGS = ["/lab.jpg","/screens1.jpg","/screens2.jpg","/screens3.jpg","/hero.jpg","/brain.jpg"];

export default function Gallery(){
  return (
    <div className="container section">
      <h2>Gallery</h2>
      <div className="grid grid-3" style={{marginTop:12}}>
        {IMGS.map((src,i)=>(
          <div key={i} className="card" style={{padding:12}}>
            <img src={src} alt="" onError={(e)=>((e.target as HTMLImageElement).style.display="none")}
                 style={{width:"100%", height:200, objectFit:"cover", borderRadius:12}}/>
            <div className="ph" />
          </div>
        ))}
      </div>
      <p style={{marginTop:8}}>Tip: drop your screenshots into <code>/public</code> with the same filenames to replace placeholders.</p>
    </div>
  );
}
