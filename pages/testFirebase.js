// pages/testFirebase.js

import { db } from '@/shared/FirebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export default function TestFirebase() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const writeAndRead = async () => {
      // 🔁 Write test
      await addDoc(collection(db, 'test'), { name: 'Test User', timestamp: Date.now() });

      // 📥 Read test
      const snapshot = await getDocs(collection(db, 'test'));
      const items = snapshot.docs.map(doc => doc.data());
      setData(items);
    };

    writeAndRead();
  }, []);

  return (
    <div className='p-6'>
      <h1 className='text-xl font-bold mb-4'>🔧 Firebase Test</h1>
      {data.map((item, index) => (
        <p key={index}>👤 {item.name} – {new Date(item.timestamp).toLocaleString()}</p>
      ))}
    </div>
  );
}
