import { useEffect, useState } from 'react';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from '../lib/firebase';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function Dashboard(){
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const u = auth.currentUser; if (!u) return;
    (async () => {
      const q = query(collection(db, 'sessions'), where('uid','==',u.uid), orderBy('startedAt','asc'));
      const snap = await getDocs(q);
      const rows = snap.docs.map(d => d.data() as any)
        .filter(r => r.avgRT && r.accuracy)
        .map((r, i) => ({ i, avgRT: r.avgRT, acc: Math.round(r.accuracy*100) }));
      setData(rows);
    })();
  }, []);

  if (!data.length) return <div style={{ padding:24 }}>Play a session to see your progress.</div>;

  return (
    <div style={{ padding:24 }}>
      <h2>Progress</h2>
      <div style={{ height:320 }}>
        <ResponsiveContainer>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="i" tickFormatter={(i) => `S${i+1}`} />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Line yAxisId="left" type="monotone" dataKey="avgRT" dot={false} />
            <Line yAxisId="right" type="monotone" dataKey="acc" dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
