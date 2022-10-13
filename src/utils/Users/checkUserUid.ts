import { getFirestore, collection, query, where, getDocs, QuerySnapshot } from "firebase/firestore";
import { app } from '../../app/firebase/config'

export const checkUserUid = async (uid: string) => {
  const db = getFirestore(app)
  const request = query(collection(db, "users"), where("uid", "==", uid))
  const response = await getDocs(request)
  if(response.empty) return false
  if(!response.empty) return true
}