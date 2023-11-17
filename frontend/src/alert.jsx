import React, {createContext, useState} from 'react';

export const MessageContext = createContext();

export const MessageProvider = ({children}) => {
    const [message, setMessage] = useState('');
    const [bad, setBad] = useState(false);
    return(
        <MessageContext.Provider value={{message, setMessage, bad, setBad}}>
            {children}
        </MessageContext.Provider>
        
    )
}

export const Alert = ({content, bad}) => {
    return(
        <>
        { bad ?
        <div className="bg-red-500 text-white text-center">{content}</div>:
        <div className="bg-green-500 text-white text-center">{content}</div>
        }
        </>
       
    )
}