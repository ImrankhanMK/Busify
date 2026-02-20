import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth ,db} from "../services/Firebase";
import { doc, getDoc } from "firebase/firestore";
// import { db } from "../services/Firebase";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
    const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        setUser(currentUser);

        // Fetch Firestore user document
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setUserData(docSnap.data());
        }
      } else {
        setUser(null);
        setUserData(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);
  return (
    // <AuthContext.Provider value={{ user ,userData}}>
    <AuthContext.Provider value={{ user, userData, loading }}>

      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
