import React, { useState, useEffect, createContext, FC, Context } from "react";
import { auth } from "../firebase";
import firebase from "firebase";

export const context: Context<any> = createContext(null);

interface ContextParameter {
    children: any;
}

export const ContextProvider: FC<ContextParameter> = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const register = (email: string, password: string) => {
        return auth.createUserWithEmailAndPassword(email, password);
    }
    
    const login = (email: string, password: string) => {
        return auth.signInWithEmailAndPassword(email, password);
    }
    
    const signOut = () => {
        return auth.signOut();
    }

    const loginGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then((result) => {
            console.log(result);
        }).catch(function(error) {
            console.log(error);
        });
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user: any) => {
            setCurrentUser(user);
            setLoading(false);
        });

        return unsubscribe
    }, [])

    return (
        <context.Provider value={{
            currentUser,
            loading,
            login,
            signOut,
            register,
            loginGoogle
        }}>
            { !loading && children }
        </context.Provider>
    )
}