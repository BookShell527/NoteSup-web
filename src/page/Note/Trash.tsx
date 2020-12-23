import React, { useEffect, useContext } from 'react';
import { context } from "../../context/context";

const Trash = () => {
    const { currentUser } = useContext(context);

    useEffect(() => {
        if (currentUser === null) {
            window.location.href = "login";
        }
    })

    return (
        <div>
            
        </div>
    )
}

export default Trash
