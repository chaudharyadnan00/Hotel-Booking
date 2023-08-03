import { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const UserContext = createContext({});

function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

export function UserContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [ready, setReady] = useState(false);
    useEffect(() => {
        if (!user) {
            axios.get('/profile', {
                headers: {
                    'Authorization': 'Bearer ' + getCookie('token')
                }
            }).then(({ data }) => {

                setUser(data);
                setReady(true);
            });
        }
    }, []);
    return (
        <UserContext.Provider value={{ user, setUser,ready,setReady }}>
            {children}
        </UserContext.Provider>
    );
}
