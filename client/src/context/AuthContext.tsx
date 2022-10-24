import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  UserCredential,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase";

interface Context {
  signUp: (email: string, password: string) => Promise<UserCredential> | null;
  updateData: (email: string) => Promise<void> | null;
  signIn: (email: string, password: string) => Promise<UserCredential> | null;
  logOut: () => Promise<void> | null;
  user: any;
}

const UserContext = createContext<Context>({
  signUp: () => null,
  updateData: () => null,
  signIn: () => null,
  logOut: () => null,
  user: "",
});

export const AuthContextProvider = ({ children }: any) => {
  const [user, setUser] = useState<any>();

  const signUp = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const updateData = (email: string) => {
    return setDoc(doc(db, "users", email), {
      watchList: [],
    });
  };

  const signIn = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logOut = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <UserContext.Provider value={{ signUp, updateData, signIn, logOut, user }}>
      {children}
    </UserContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(UserContext);
};
