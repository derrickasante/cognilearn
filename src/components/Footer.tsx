export default function Footer(){
  return (
    <footer style={{borderTop:"1px solid rgba(255,255,255,.08)", marginTop:40}}>
      <div className="container" style={{display:"flex", gap:12, justifyContent:"space-between", alignItems:"center"}}>
        <p style={{opacity:.65}}>© {new Date().getFullYear()} CogniLearn</p>
        <p style={{opacity:.65}}>Built by students • Science-inspired • Privacy-first</p>
      </div>
    </footer>
  );
}
