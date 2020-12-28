import React, { useState, useEffect, createContext, FC, Context, memo } from "react";
import { auth, firestore } from "../firebase";
import firebase from "firebase";

export const context: Context<any> = createContext(null);

interface ContextParameter {
    children: any;
}

export const ContextProvider: FC<ContextParameter> = memo(({ children }) => {
    const [currentUser, setCurrentUser] = useState(null) as any;
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

    const toggleInTrash = async (docId: string, inTrash: boolean) => {
        await noteCollection.doc(docId).update({ inTrash: !inTrash });
    }

    const toggleArchived = async (docId: string, archived: boolean) => {
        await noteCollection.doc(docId).update({ archived: !archived });
    }

    const deleteNote = async (docId: string) => {
        await noteCollection.doc(docId).delete();
    }

    const deleteAllNote = async () => {
        await noteCollection.where("uid", "==", currentUser.uid).where("inTrash", "==", true).get().then((qSnap) => {
            const batch = firestore.batch();

            qSnap.forEach((m) => {
                batch.delete(m.ref);
            });

            return batch.commit();
        })
    }

    const addNote = async (title: string, body: string, color: number) => {
        await noteCollection.doc().set({
            uid: currentUser.uid,
            title,
            body,
            color,
            important: false,
            inTrash: false,
            archived: false,
        })
    }

    const sendMessage = async (message: string) => {
        await firestore.collection("message").doc(currentUser.uid).set({
            email: currentUser.email,
            message
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
            addNote,
            sendMessage,
            toggleArchived,
            toggleInTrash,
            deleteNote,
            deleteAllNote
        }}>
            { !loading && children }
        </context.Provider>
    )
})