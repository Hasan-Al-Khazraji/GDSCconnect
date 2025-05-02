import { db } from '../firebase';
import { doc, getDoc } from 'firebase/firestore';

export async function getHackerData(uniqueId: string) {
  const dataRef = doc(db, 'hackers', uniqueId);
  return await getDoc(dataRef);
}
