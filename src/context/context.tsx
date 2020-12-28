import React, { useState, useEffect, createContext, FC, Context, memo } from "react";
import { auth, firestore } from "../firebase";
import firebase from "firebase";

export const context: Context<any> = createContext(null);

interface ContextParameter {
    children: any;
}

export const ContextProvider: FC<ContextParameter> = memo(({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const noteCollection = firestore.collection("note");

    const register = (email: string, password: string) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }

    const login = (email: string, password: string) => {
        return auth.signInWithEmailAndPassword(email, password);
    }

    const signOut = () => {
        return auth.signOut();
    }

    const loginGoogle = async () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        await firebase.auth().signInWithPopup(provider);
    }

    const toggleImportant = async (docId: string, important: boolean) => {
        await noteCollection.doc(docId).update({ important: !important });
    }

    const addNote = async (uid: string, title: string, body: string, color: number) => {
        await noteCollection.doc().set({
            uid,
            title,
            body,
            color,
            important: false,
            inTrash: false,
            archived: false,
            createdDate: Date.now()
        })
    }

    useEffect(() => {
        auth.onAuthStateChanged((user: any) => {
            setCurrentUser(user);
            setLoading(false);
        });
    }, [])

    return (
        <context.Provider value={{
            currentUser,
            loading,
            login,
            signOut,
            register,
            loginGoogle,
            toggleImportant,
            addNote()
        }}>
            { !loading && children }
        </context.Provider>
    )
})